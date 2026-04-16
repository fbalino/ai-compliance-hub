import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "AI Compliance Hub <hello@aicompliancehub.com>";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

function buildConfirmationHtml(email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're subscribed to AI Compliance Hub</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#0f172a;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:14px;font-weight:700;letter-spacing:0.08em;color:#94a3b8;text-transform:uppercase;">AI Compliance Hub</p>
              <h1 style="margin:12px 0 0;font-size:26px;font-weight:800;color:#ffffff;line-height:1.3;">
                You&rsquo;re subscribed!
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 16px;font-size:16px;color:#374151;line-height:1.6;">
                Welcome aboard. Every Monday you&rsquo;ll receive a concise briefing covering:
              </p>
              <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 24px;">
                <tr>
                  <td style="padding:10px 14px;background:#f8fafc;border-left:3px solid #0f172a;border-radius:4px;margin-bottom:8px;">
                    <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">Regulation Roundup</p>
                    <p style="margin:4px 0 0;font-size:13px;color:#64748b;">New laws and guidance from the US and EU — summarized in plain English.</p>
                  </td>
                </tr>
              </table>
              <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 24px;">
                <tr>
                  <td style="padding:10px 14px;background:#f8fafc;border-left:3px solid #0f172a;border-radius:4px;">
                    <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">Enforcement Watch</p>
                    <p style="margin:4px 0 0;font-size:13px;color:#64748b;">Fines, investigations, and enforcement actions as they happen.</p>
                  </td>
                </tr>
              </table>
              <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 24px;">
                <tr>
                  <td style="padding:10px 14px;background:#f8fafc;border-left:3px solid #0f172a;border-radius:4px;">
                    <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">Deadline Calendar</p>
                    <p style="margin:4px 0 0;font-size:13px;color:#64748b;">Upcoming compliance deadlines you can&rsquo;t miss.</p>
                  </td>
                </tr>
              </table>
              <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 32px;">
                <tr>
                  <td style="padding:10px 14px;background:#f8fafc;border-left:3px solid #0f172a;border-radius:4px;">
                    <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">Compliance How-To</p>
                    <p style="margin:4px 0 0;font-size:13px;color:#64748b;">Practical guides and templates from our compliance team.</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">
                While you wait for your first issue, explore the site:
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="background:#0f172a;border-radius:8px;">
                    <a href="${SITE_URL}/regulations"
                       style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;">
                      Browse AI Regulations →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.5;">
                You subscribed with <strong>${email}</strong>.<br />
                <a href="${SITE_URL}" style="color:#64748b;text-decoration:underline;">AI Compliance Hub</a>
                &nbsp;&middot;&nbsp;
                <a href="${SITE_URL}/privacy" style="color:#64748b;text-decoration:underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildConfirmationText(email: string): string {
  return `Welcome to AI Compliance Hub!

You're subscribed. Every Monday you'll get:

- Regulation Roundup — new laws and guidance summarized in plain English
- Enforcement Watch — fines and investigations as they happen
- Deadline Calendar — upcoming compliance deadlines
- Compliance How-To — practical guides and templates

Explore the site while you wait for your first issue:
${SITE_URL}/regulations

---
You subscribed with: ${email}
Privacy Policy: ${SITE_URL}/privacy
AI Compliance Hub — ${SITE_URL}
`;
}

export async function POST(request: NextRequest) {
  const referer = request.headers.get("referer") ?? "/newsletter";
  const contentType = request.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  // Helper: respond with success (redirect for form submissions, JSON for API calls)
  const respondSuccess = () => {
    if (isJson) return NextResponse.json({ success: true });
    const successUrl = new URL(referer, SITE_URL);
    successUrl.searchParams.set("subscribed", "1");
    return NextResponse.redirect(successUrl.toString(), { status: 303 });
  };

  try {
    let email: string | null = null;

    if (isJson) {
      const body = (await request.json()) as { email?: unknown };
      email = typeof body.email === "string" ? body.email : null;
    } else {
      const body = await request.formData();
      const raw = body.get("email");
      email = typeof raw === "string" ? raw : null;
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Add contact and send email via Resend (non-blocking — failures should not prevent redirect)
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("[subscribe] RESEND_API_KEY not set — skipping Resend integration");
      return respondSuccess();
    }

    const resend = new Resend(apiKey);

    const contactPromise = resend.contacts.create({ email }).catch((err: unknown) => {
      console.error("[subscribe] Resend contacts.create error:", err);
    });

    // Send confirmation email (non-blocking)
    const emailPromise = resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "You're subscribed to AI Compliance Hub",
      html: buildConfirmationHtml(email),
      text: buildConfirmationText(email),
    }).catch((err: unknown) => {
      console.error("[subscribe] Resend emails.send error:", err);
    });

    // Wait for both — errors already caught above
    await Promise.all([contactPromise, emailPromise]);

    return respondSuccess();
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    // Still respond on unexpected error so UX is not broken
    return respondSuccess();
  }
}
