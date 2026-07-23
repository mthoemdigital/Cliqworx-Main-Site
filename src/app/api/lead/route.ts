import { z } from "zod";
import { addHubSpotNote, splitName, upsertHubSpotContact } from "@/lib/hubspot";

export const dynamic = "force-dynamic";

// Problem-oriented options shown to visitors, mapped to internal practices.
const FOCUS_TO_PRACTICE: Record<string, string> = {
  "I need more customers": "Growth",
  "I need a better website": "Build",
  "I want to automate my business": "Build / Automation",
  "I'm not sure where to start": "Strategy",
};

const leadSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Valid email required"),
  phone: z.string().trim().min(7, "Valid phone number required"),
  focus: z.enum([
    "I need more customers",
    "I need a better website",
    "I want to automate my business",
    "I'm not sure where to start",
  ]),
  challenge: z.string().trim().max(1000).optional().or(z.literal("")),
  // Honeypot: must be empty for real submissions.
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  const data = parsed.data;

  // Bot filled the honeypot: pretend success.
  if (data.website) return Response.json({ ok: true });

  const practice = FOCUS_TO_PRACTICE[data.focus] ?? "Unmapped";

  const summary = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    focus: data.focus,
    practice,
    challenge: data.challenge || "(not provided)",
    at: new Date().toISOString(),
  };

  if (!process.env.HUBSPOT_ACCESS_TOKEN) {
    // CRM delivery is not configured. Never surface that to the visitor:
    // record the lead in server logs so it is recoverable, and respond ok.
    console.error("[lead] HUBSPOT_ACCESS_TOKEN missing. Lead captured in logs:", JSON.stringify(summary));
    return Response.json({ ok: true });
  }

  try {
    const { firstname, lastname } = splitName(data.name);
    const contact = await upsertHubSpotContact({
      email: data.email,
      firstname,
      lastname,
      phone: data.phone,
    });

    if (contact) {
      try {
        await addHubSpotNote(
          contact.id,
          `Strategy session request from the Cliqworx website.\n\n` +
            `Focus: ${data.focus} (${practice})\n` +
            `Biggest challenge: ${data.challenge || "(not provided)"}`
        );
      } catch (noteErr) {
        // The contact (and their email) is already captured; a failed note
        // is a loss of context, not a lost lead. Log and continue.
        console.error("[lead] Contact created but note failed:", noteErr);
      }
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[lead] HubSpot delivery failed. Lead captured in logs:", JSON.stringify(summary), err);
    return Response.json({ ok: true });
  }
}
