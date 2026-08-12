import { NextRequest, NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/email";

/**
 * Contact form submission handler.
 *
 * Sends a formatted notification email to LEAD_NOTIFICATION_EMAIL via Resend
 * (see lib/email.ts and .env.example). If RESEND_API_KEY isn't configured,
 * this still validates and logs the lead so the form remains fully testable
 * without any setup.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, topic, message } = body ?? {};

    if (!name || !phone || !email || !topic || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await sendLeadEmail({
      subject: `New inquiry from ${name} — ${topic}`,
      heading: "New Website Inquiry",
      fields: { Name: name, Phone: phone, Email: email, Topic: topic, Message: message },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
