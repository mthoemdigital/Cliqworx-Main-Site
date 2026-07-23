/* Minimal HubSpot CRM client used by the site's lead-capture API routes.
   Requires HUBSPOT_ACCESS_TOKEN (a Private App token with contact write
   access) set in the environment. Callers check for a falsy return / catch
   thrown errors themselves so each route can keep its own fallback UX. */

const HUBSPOT_API_BASE = "https://api.hubapi.com";

type HubSpotContactProperties = {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  company?: string;
};

function authHeaders() {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : null;
}

/** Splits a single "full name" field into first/last for HubSpot's default properties. */
export function splitName(fullName: string): { firstname: string; lastname: string } {
  const trimmed = fullName.trim();
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return { firstname: trimmed, lastname: "" };
  return { firstname: trimmed.slice(0, idx), lastname: trimmed.slice(idx + 1) };
}

/**
 * Creates or updates a HubSpot contact by email using only HubSpot's default
 * (always-present) contact properties, so no custom property setup is
 * required in the portal. Returns null if HUBSPOT_ACCESS_TOKEN isn't set;
 * throws on any non-2xx response from HubSpot.
 */
export async function upsertHubSpotContact(
  properties: HubSpotContactProperties
): Promise<{ id: string } | null> {
  const headers = authHeaders();
  if (!headers) return null;

  const cleanProperties = Object.fromEntries(
    Object.entries(properties).filter(([, v]) => v !== undefined && v !== "")
  );

  const res = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/batch/upsert`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      inputs: [{ idProperty: "email", id: properties.email, properties: cleanProperties }],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`HubSpot contact upsert failed (${res.status}): ${detail}`);
  }

  const json = (await res.json()) as { results?: { id: string }[] };
  return json.results?.[0] ? { id: json.results[0].id } : null;
}

/**
 * Attaches a free-text note to a contact. Used to carry the site-specific
 * context (challenge, situation, help topic, etc.) that has no matching
 * default HubSpot property, without requiring custom property setup.
 * No-ops if HUBSPOT_ACCESS_TOKEN isn't set; throws on API failure.
 */
export async function addHubSpotNote(contactId: string, body: string): Promise<void> {
  const headers = authHeaders();
  if (!headers) return;

  const res = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/notes`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      properties: { hs_note_body: body, hs_timestamp: Date.now() },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }],
        },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`HubSpot note create failed (${res.status}): ${detail}`);
  }
}
