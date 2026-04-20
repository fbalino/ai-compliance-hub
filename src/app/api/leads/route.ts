import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { db } from "@/db";
import { providers, users, leads } from "@/db/schema";
import { BRAND_NAME, BRAND_EMAIL_HELLO } from "@/lib/brand";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? `${BRAND_NAME} <${BRAND_EMAIL_HELLO}>`;

const NOTIFY_EMAIL = BRAND_EMAIL_HELLO;

interface LeadRequestBody {
  providerSlug: string;
  name: string;
  email: string;
  company: string;
  regulationSlug?: string;
  serviceType?: string;
  message?: string;
}

function buildNotificationHtml(data: LeadRequestBody & { providerName: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Lead: ${data.providerName}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#0f172a;padding:28px 40px;">
              <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:0.08em;color:#94a3b8;text-transform:uppercase;">Regulome</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#ffffff;">New Quote Request</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Provider</p>
              <p style="margin:0 0 24px;font-size:16px;font-weight:700;color:#0f172a;">${data.providerName}</p>

              <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:24px;">
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;width:120px;">Name</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e2e8f0;">Email</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color:#0f172a;">${data.email}</a></td>
                </tr>
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e2e8f0;">Company</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.company}</td>
                </tr>
                ${data.serviceType ? `
                <tr>
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e2e8f0;">Service</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.serviceType}</td>
                </tr>` : ""}
                ${data.regulationSlug ? `
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e2e8f0;">Regulation</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.regulationSlug}</td>
                </tr>` : ""}
              </table>

              ${data.message ? `
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Message</p>
              <div style="background:#f8fafc;border-left:3px solid #0f172a;padding:12px 16px;border-radius:4px;margin-bottom:24px;">
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${data.message.replace(/\n/g, "<br />")}</p>
              </div>` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">Regulome — Lead Notification</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadRequestBody;

    const { providerSlug, name, email, company, regulationSlug, serviceType, message } = body;

    // Validate required fields
    if (!providerSlug || !name || !email || !company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Look up provider by slug
    const [provider] = await db
      .select({ id: providers.id, name: providers.name })
      .from(providers)
      .where(eq(providers.slug, providerSlug))
      .limit(1);

    if (!provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    // Upsert user (find by email or create)
    let userId: string | undefined;
    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const [newUser] = await db
        .insert(users)
        .values({ email, name, companyName: company })
        .returning({ id: users.id });
      userId = newUser?.id;
    }

    // Insert lead
    await db.insert(leads).values({
      userId,
      providerId: provider.id,
      regulationSlug: regulationSlug ?? null,
      serviceType: serviceType ?? null,
      message: message ?? null,
      status: "new",
    });

    // Send notification email
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails
        .send({
          from: FROM_EMAIL,
          to: NOTIFY_EMAIL,
          subject: `New Quote Request — ${provider.name} (from ${company})`,
          html: buildNotificationHtml({ ...body, providerName: provider.name }),
          text: `New quote request for ${provider.name}\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}${serviceType ? `\nService: ${serviceType}` : ""}${regulationSlug ? `\nRegulation: ${regulationSlug}` : ""}${message ? `\n\nMessage:\n${message}` : ""}`,
        })
        .catch((err: unknown) => {
          console.error("[leads] Resend notification error:", err);
        });
    } else {
      console.warn("[leads] RESEND_API_KEY not set — skipping notification email");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[leads] Error:", err);
    return NextResponse.json({ error: "Failed to submit lead" }, { status: 500 });
  }
}
