import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface SendLeadEmailArgs {
  subject: string;
  heading: string;
  fields: Record<string, string>;
}

/**
 * Sends a formatted notification email for a new lead (contact inquiry or
 * course enrollment) to LEAD_NOTIFICATION_EMAIL via Resend.
 *
 * If RESEND_API_KEY is not set (e.g. local development without a .env.local),
 * this quietly falls back to a console log instead of throwing — so the
 * forms remain fully testable out of the box. Set the env vars in
 * .env.example to enable real delivery.
 */
export async function sendLeadEmail({ subject, heading, fields }: SendLeadEmailArgs) {
  const to = process.env.LEAD_NOTIFICATION_EMAIL || "info@tamiltradingeducation.com";
  const from = process.env.RESEND_FROM_EMAIL || "Tamil Trading Education <onboarding@resend.dev>";

  const rows = Object.entries(fields)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px;color:#8a94ab;font-family:sans-serif;font-size:13px;white-space:nowrap;">${label}</td><td style="padding:8px 16px;color:#0a1128;font-family:sans-serif;font-size:14px;">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");

  const html = `
    <div style="background:#f4f5f7;padding:32px;font-family:sans-serif;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
        <div style="background:#0a1128;padding:20px 24px;">
          <span style="color:#e0bf5f;font-weight:700;font-size:15px;">Tamil Trading Education</span>
        </div>
        <div style="padding:24px;">
          <h2 style="margin:0 0 16px;color:#0a1128;font-size:18px;">${heading}</h2>
          <table style="width:100%;border-collapse:collapse;">${rows}</table>
        </div>
      </div>
    </div>
  `;

  if (!resend) {
    console.log(`[lead-email:not-configured] ${subject}`, fields);
    return { delivered: false };
  }

  try {
    await resend.emails.send({ from, to, subject, html });
    return { delivered: true };
  } catch (err) {
    console.error("Failed to send lead email via Resend:", err);
    return { delivered: false };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
