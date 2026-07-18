import { Resend } from "resend";
import { z } from "zod";

export const dynamic = "force-dynamic";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Valid email required"),
  interest: z.enum(["Strategy", "Build", "Growth", "Not sure yet"]),
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

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONSULTATION_TO_EMAIL || "hello@cliqworx.com";
  const fromEmail =
    process.env.CONSULTATION_FROM_EMAIL || "Cliqworx Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("[lead] RESEND_API_KEY is not set. See .env.example.");
    return Response.json(
      { error: "The booking service is not configured yet. Please email hello@cliqworx.com directly." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `New consultation request from ${data.name} (${data.interest})`,
      html: `
        <h2>New consultation request</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Focused on:</strong> ${escapeHtml(data.interest)}</p>
        <p>Submitted from the homepage lead form.</p>
      `,
    });
    if (result.error) {
      console.error("[lead] Resend API error:", result.error);
      return Response.json(
        { error: "We could not send your request right now. Please email hello@cliqworx.com." },
        { status: 502 }
      );
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[lead] Unexpected error:", err);
    return Response.json(
      { error: "We could not send your request right now. Please email hello@cliqworx.com." },
      { status: 500 }
    );
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
