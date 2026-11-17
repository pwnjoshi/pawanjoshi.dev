import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Log to console in development; in production wire up Resend or similar
    console.log("Contact form submission:", { name, email, message });

    // If RESEND_API_KEY is set, send via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "me@joshipawan.com.np",
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        replyTo: email,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
