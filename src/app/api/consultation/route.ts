import { Resend } from "resend";
import { consultationSchema, HELP_OPTIONS, COMPANY_SIZE_OPTIONS } from "@/lib/validation";

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

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONSULTATION_TO_EMAIL || "hello@cliqworx.com";
  const fromEmail = process.env.CONSULTATION_FROM_EMAIL || "CliqWorx Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.error(
      "[consultation] RESEND_API_KEY is not set. See project README for setup steps."
    );
    return Response.json(
      { error: "The booking service isn't configured yet. Please email hello@cliqworx.com directly." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const helpWithLabel = label(HELP_OPTIONS, data.helpWith);
  const companySizeLabel = data.companySize ? label(COMPANY_SIZE_OPTIONS, data.companySize) : "Not specified";

  const html = `
    <h2>New consultation request</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
    <p><strong>Company size:</strong> ${escapeHtml(companySizeLabel)}</p>
    <p><strong>Needs help with:</strong> ${escapeHtml(helpWithLabel)}</p>
    <p><strong>Preferred contact:</strong> ${escapeHtml(data.contactMethod)}${
    data.contactMethod === "call" && data.phone ? ` (${escapeHtml(data.phone)})` : ""
  }</p>
    <p><strong>Situation:</strong></p>
    <p>${escapeHtml(data.situation).replace(/\n/g, "<br>")}</p>
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `New consultation request from ${data.name} (${data.company})`,
      html,
    });

    if (result.error) {
      console.error("[consultation] Resend API error:", result.error);
      return Response.json(
        { error: "We couldn't send your request right now. Please try again or email hello@cliqworx.com." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[consultation] Unexpected error sending email:", err);
    return Response.json(
      { error: "We couldn't send your request right now. Please try again or email hello@cliqworx.com." },
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
