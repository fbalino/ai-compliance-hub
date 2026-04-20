import { NextRequest, NextResponse } from "next/server";
import { eq, inArray, sql } from "drizzle-orm";
import { Resend } from "resend";
import { db } from "@/db";
import {
  users,
  rfps,
  providers,
  providerRegulations,
  providerServices,
} from "@/db/schema";
import { BRAND_NAME, BRAND_EMAIL_HELLO } from "@/lib/brand";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? `${BRAND_NAME} <${BRAND_EMAIL_HELLO}>`;

const NOTIFY_EMAIL = BRAND_EMAIL_HELLO;

interface RfpRequestBody {
  contactName: string;
  contactEmail: string;
  companyName: string;
  companySize?: string;
  industry?: string;
  description: string;
  regulationSlugs?: string[];
  serviceTypes?: string[];
  jurisdictions?: string[];
  timeline?: string;
  budget?: string;
}

function buildNotificationHtml(
  data: RfpRequestBody,
  matchedProviders: string[],
): string {
  const providerList = matchedProviders.length
    ? matchedProviders.map((n) => `<li style="padding:4px 0;font-size:14px;color:#1e293b;">${n}</li>`).join("")
    : `<li style="padding:4px 0;font-size:14px;color:#94a3b8;">No matched providers</li>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New RFP: ${data.companyName}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#0f172a;padding:28px 40px;">
              <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:0.08em;color:#94a3b8;text-transform:uppercase;">Regulome</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#ffffff;">New RFP Submission</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:24px;">
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;width:130px;">Contact</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;">${data.contactName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e2e8f0;">Email</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;"><a href="mailto:${data.contactEmail}" style="color:#0f172a;">${data.contactEmail}</a></td>
                </tr>
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e2e8f0;">Company</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.companyName}${data.companySize ? ` (${data.companySize})` : ""}</td>
                </tr>
                ${data.industry ? `
                <tr>
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e2e8f0;">Industry</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.industry}</td>
                </tr>` : ""}
                ${data.regulationSlugs?.length ? `
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e2e8f0;">Regulations</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.regulationSlugs.join(", ")}</td>
                </tr>` : ""}
                ${data.serviceTypes?.length ? `
                <tr>
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e2e8f0;">Services</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.serviceTypes.join(", ")}</td>
                </tr>` : ""}
                ${data.jurisdictions?.length ? `
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e2e8f0;">Jurisdictions</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.jurisdictions.join(", ")}</td>
                </tr>` : ""}
                ${data.timeline ? `
                <tr>
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e2e8f0;">Timeline</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.timeline}</td>
                </tr>` : ""}
                ${data.budget ? `
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e2e8f0;">Budget</td>
                  <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.budget}</td>
                </tr>` : ""}
              </table>

              <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Compliance Need</p>
              <div style="background:#f8fafc;border-left:3px solid #0f172a;padding:12px 16px;border-radius:4px;margin-bottom:24px;">
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${data.description.replace(/\n/g, "<br />")}</p>
              </div>

              <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Matched Providers (Top ${matchedProviders.length})</p>
              <ul style="margin:0;padding-left:18px;">${providerList}</ul>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">Regulome — RFP Notification</p>
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
    const body = (await request.json()) as RfpRequestBody;

    const {
      contactName,
      contactEmail,
      companyName,
      companySize,
      industry,
      description,
      regulationSlugs,
      serviceTypes,
      jurisdictions,
      timeline,
      budget,
    } = body;

    if (!contactName || !contactEmail || !companyName || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Upsert user by email
    let userId: string | undefined;
    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, contactEmail))
      .limit(1);

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const [newUser] = await db
        .insert(users)
        .values({
          email: contactEmail,
          name: contactName,
          companyName,
          companySize: companySize ?? null,
          industry: industry ?? null,
        })
        .returning({ id: users.id });
      userId = newUser?.id;
    }

    // Insert RFP
    await db.insert(rfps).values({
      userId,
      contactName,
      contactEmail,
      companyName,
      companySize: companySize ?? null,
      industry: industry ?? null,
      description,
      regulationSlugs: regulationSlugs ?? null,
      serviceTypes: serviceTypes ?? null,
      jurisdictions: jurisdictions ?? null,
      timeline: timeline ?? null,
      budget: budget ?? null,
      status: "open",
    });

    // Query matched providers by regulation + service overlap, ranked by match count
    let matchedProviderNames: string[] = [];

    const hasRegulations = regulationSlugs && regulationSlugs.length > 0;
    const hasServices = serviceTypes && serviceTypes.length > 0;

    if (hasRegulations || hasServices) {
      const regMatches = hasRegulations
        ? db
            .select({
              providerId: providerRegulations.providerId,
              matchCount: sql<number>`1`.as("match_count"),
            })
            .from(providerRegulations)
            .where(inArray(providerRegulations.regulationSlug, regulationSlugs))
        : null;

      const svcMatches = hasServices
        ? db
            .select({
              providerId: providerServices.providerId,
              matchCount: sql<number>`1`.as("match_count"),
            })
            .from(providerServices)
            .where(inArray(providerServices.serviceType, serviceTypes))
        : null;

      // Combine matches
      const allMatches = [
        ...(regMatches ? await regMatches : []),
        ...(svcMatches ? await svcMatches : []),
      ];

      // Count overlaps per provider
      const providerCounts = new Map<string, number>();
      for (const m of allMatches) {
        providerCounts.set(
          m.providerId,
          (providerCounts.get(m.providerId) ?? 0) + 1,
        );
      }

      // Sort by count desc, take top 10
      const topProviderIds = [...providerCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([id]) => id);

      if (topProviderIds.length > 0) {
        const matched = await db
          .select({ name: providers.name })
          .from(providers)
          .where(inArray(providers.id, topProviderIds));

        matchedProviderNames = matched.map((p) => p.name);
      }
    }

    // Send admin notification email
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails
        .send({
          from: FROM_EMAIL,
          to: NOTIFY_EMAIL,
          subject: `New RFP — ${companyName} (${contactName})`,
          html: buildNotificationHtml(body, matchedProviderNames),
          text: `New RFP from ${companyName}\n\nContact: ${contactName} (${contactEmail})\nCompany: ${companyName}${companySize ? ` (${companySize})` : ""}${industry ? `\nIndustry: ${industry}` : ""}\n\nCompliance Need:\n${description}${regulationSlugs?.length ? `\nRegulations: ${regulationSlugs.join(", ")}` : ""}${serviceTypes?.length ? `\nServices: ${serviceTypes.join(", ")}` : ""}${jurisdictions?.length ? `\nJurisdictions: ${jurisdictions.join(", ")}` : ""}${timeline ? `\nTimeline: ${timeline}` : ""}${budget ? `\nBudget: ${budget}` : ""}\n\nMatched Providers: ${matchedProviderNames.length ? matchedProviderNames.join(", ") : "None"}`,
        })
        .catch((err: unknown) => {
          console.error("[rfp] Resend notification error:", err);
        });
    } else {
      console.warn("[rfp] RESEND_API_KEY not set — skipping notification email");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[rfp] Error:", err);
    return NextResponse.json(
      { error: "Failed to submit RFP" },
      { status: 500 },
    );
  }
}
