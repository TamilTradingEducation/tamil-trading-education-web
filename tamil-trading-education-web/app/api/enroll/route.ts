import { NextRequest, NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/email";

/**
 * Course enrollment submission handler — see app/api/contact/route.ts and
 * lib/email.ts for notes on the underlying email delivery.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, course, experience } = body ?? {};

    if (!name || !phone || !email || !course) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await sendLeadEmail({
      subject: `New enrollment request — ${course} (${name})`,
      heading: "New Course Enrollment Request",
      fields: {
        Name: name,
        Phone: phone,
        Email: email,
        Course: course,
        Experience: experience || "Not provided",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
