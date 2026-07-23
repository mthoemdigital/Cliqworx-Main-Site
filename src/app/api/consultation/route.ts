import { consultationSchema, HELP_OPTIONS, COMPANY_SIZE_OPTIONS } from "@/lib/validation";
import { addHubSpotNote, splitName, upsertHubSpotContact } from "@/lib/hubspot";

export const dynamic = "force-dynamic";

function label(options: readonly { value: string; label: string }[], value?: string) {
  return options.find((o) => o.value === value)?.label ?? value ?? "Not specified";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request body." }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please check the form and try again.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot: a real visitor never populates this field. If it's filled, silently
  // pretend success so the bot doesn't learn its submission was rejected.
  if (data.company_website) {
    return Response.json({ ok: true });
  }

  if (!process.env.HUBSPOT_ACCESS_TOKEN) {
    console.error("[consultation] HUBSPOT_ACCESS_TOKEN is not set. See project README for setup steps.");
    return Response.json(
      { error: "The booking service isn't configured yet. Please email hello@cliqworx.com directly." },
      { status: 500 }
    );
  }

  const helpWithLabel = label(HELP_OPTIONS, data.helpWith);
  const companySizeLabel = data.companySize ? label(COMPANY_SIZE_OPTIONS, data.companySize) : "Not specified";
  const { firstname, lastname } = splitName(data.name);

  const noteBody =
    `New consultation request from the Cliqworx website.\n\n` +
    `Company size: ${companySizeLabel}\n` +
    `Needs help with: ${helpWithLabel}\n` +
    `Preferred contact: ${data.contactMethod}` +
    `${data.contactMethod === "call" && data.phone ? ` (${data.phone})` : ""}\n\n` +
    `Situation:\n${data.situation}`;

  try {
    const contact = await upsertHubSpotContact({
      email: data.email,
      firstname,
      lastname,
      company: data.company,
      phone: data.contactMethod === "call" ? data.phone : undefined,
    });

    if (contact) {
      try {
        await addHubSpotNote(contact.id, noteBody);
      } catch (noteErr) {
        console.error("[consultation] Contact created but note failed:", noteErr);
      }
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[consultation] HubSpot delivery failed:", err);
    return Response.json(
      { error: "We couldn't send your request right now. Please try again or email hello@cliqworx.com." },
      { status: 502 }
    );
  }
}
