import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const email = body.get("email");

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // TODO: integrate with email service (Resend, ConvertKit, etc.)
    // For now, log and acknowledge
    console.log(`[subscribe] New subscriber: ${email}`);

    // Redirect to a success page or back with success param
    const referer = request.headers.get("referer") ?? "/";
    const successUrl = new URL(referer);
    successUrl.searchParams.set("subscribed", "1");

    return NextResponse.redirect(successUrl.toString(), { status: 303 });
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
