import { Resend } from "resend";
import { z } from "zod";

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
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONSULTATION_TO_EMAIL || "hello@cliqworx.com";
  const fromEmail =
    process.env.CONSULTATION_FROM_EMAIL || "Cliqworx Website <onboarding@resend.dev>";

  const summary = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    focus: data.focus,
    practice,
    challenge: data.challenge || "(not provided)",
    at: new Date().toISOString(),
  };

  if (!apiKey) {
    // Email delivery is not configured. Never surface that to the visitor:
    // record the lead in server logs so it is recoverable, and respond ok.
    console.error("[lead] RESEND_API_KEY missing. Lead captured in logs:", JSON.stringify(summary));
    return Response.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `Strategy session request: ${data.name} (${practice})`,
      html: `
        <h2>New strategy session request</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Focus:</strong> ${escapeHtml(data.focus)} (${escapeHtml(practice)})</p>
        <p><strong>Biggest challenge:</strong></p>
        <p>${escapeHtml(data.challenge || "(not provided)").replace(/\n/g, "<br>")}</p>
        <p>Submitted from the homepage lead form.</p>
      `,
    });
    if (result.error) {
      console.error("[lead] Resend error. Lead captured in logs:", JSON.stringify(summary), result.error);
      return Response.json({ ok: true });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[lead] Send failed. Lead captured in logs:", JSON.stringify(summary), err);
    return Response.json({ ok: true });
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
