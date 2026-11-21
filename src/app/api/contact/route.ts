import { NextRequest, NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort limit per server instance; serverless instances don't share it.
const recent = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (limited(ip)) {
      return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
    }

    const body = await request.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const honeypot = typeof body?.company === "string" ? body.company : "";

    // Bots fill the hidden field; pretend success so they don't retry.
    if (honeypot) return NextResponse.json({ success: true });

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (name.length > 100 || email.length > 200 || message.length > 5000 || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.warn("Contact form: RESEND_API_KEY is not set; message not delivered.");
      return NextResponse.json({ error: "Email delivery is not configured" }, { status: 503 });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? "me@pawanjoshi.dev",
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      replyTo: email,
    });
    if (error) {
      console.error("Contact form: Resend error", error.name);
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
