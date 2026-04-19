import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { db } from "@/db";
import { providers, providerRegulations, providerServices } from "@/db/schema";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Regulome <hello@aicompliancehub.com>";
const NOTIFY_EMAIL = "hello@aicompliancehub.com";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

async function uniqueSlug(base: string): Promise<string> {
  let candidate = base;
  let attempt = 0;
  while (true) {
    const [existing] = await db
      .select({ slug: providers.slug })
      .from(providers)
      .where(eq(providers.slug, candidate))
      .limit(1);
    if (!existing) return candidate;
    attempt++;
    candidate = `${base}-${attempt}`;
  }
}

function buildAdminEmail(data: {
  companyName: string;
  website: string;
  headquarters: string;
  foundedYear: string;
  pitch: string;
  contactName: string;
  contactEmail: string;
  regulations: string[];
  services: string[];
  plan: string;
  fileCount: number;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New Provider Registration: ${data.companyName}</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background:#0f172a;padding:28px 40px;">
            <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:0.08em;color:#94a3b8;text-transform:uppercase;">Regulome</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#ffffff;">New Provider Registration</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:24px;">
              <tr style="background:#f8fafc;"><td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;width:140px;">Company</td><td style="padding:10px 16px;font-size:14px;color:#1e293b;">${data.companyName}</td></tr>
              <tr><td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;border-top:1px solid #e2e8f0;">Website</td><td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;"><a href="${data.website}">${data.website}</a></td></tr>
              <tr style="background:#f8fafc;"><td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;border-top:1px solid #e2e8f0;">HQ</td><td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.headquarters}${data.foundedYear ? ` · Est. ${data.foundedYear}` : ""}</td></tr>
              <tr><td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;border-top:1px solid #e2e8f0;">Contact</td><td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.contactName} &lt;<a href="mailto:${data.contactEmail}">${data.contactEmail}</a>&gt;</td></tr>
              <tr style="background:#f8fafc;"><td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;border-top:1px solid #e2e8f0;">Plan</td><td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;font-weight:${data.plan === "featured" ? 700 : 400}">${data.plan === "featured" ? "★ Featured ($490/mo)" : "Basic (free)"}</td></tr>
              <tr><td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;border-top:1px solid #e2e8f0;">Regulations</td><td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.regulations.join(", ") || "—"}</td></tr>
              <tr style="background:#f8fafc;"><td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;border-top:1px solid #e2e8f0;">Services</td><td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.services.join(", ") || "—"}</td></tr>
              ${data.fileCount > 0 ? `<tr><td style="padding:10px 16px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;border-top:1px solid #e2e8f0;">Files</td><td style="padding:10px 16px;font-size:14px;color:#1e293b;border-top:1px solid #e2e8f0;">${data.fileCount} file(s) attached</td></tr>` : ""}
            </table>
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;">Pitch</p>
            <div style="background:#f8fafc;border-left:3px solid #0f172a;padding:12px 16px;border-radius:4px;">
              <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${data.pitch}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">Regulome — Provider Registration</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const companyName = (formData.get("companyName") as string | null)?.trim() ?? "";
    const website = (formData.get("website") as string | null)?.trim() ?? "";
    const headquarters = (formData.get("headquarters") as string | null)?.trim() ?? "";
    const foundedYear = (formData.get("foundedYear") as string | null)?.trim() ?? "";
    const pitch = (formData.get("pitch") as string | null)?.trim() ?? "";
    const contactName = (formData.get("contactName") as string | null)?.trim() ?? "";
    const contactEmail = (formData.get("contactEmail") as string | null)?.trim() ?? "";
    const plan = (formData.get("plan") as string | null)?.trim() ?? "basic";

    const regulationsRaw = formData.get("regulations") as string | null;
    const servicesRaw = formData.get("services") as string | null;

    let regulations: string[] = [];
    let services: string[] = [];
    try { regulations = JSON.parse(regulationsRaw ?? "[]") as string[]; } catch { /* empty */ }
    try { services = JSON.parse(servicesRaw ?? "[]") as string[]; } catch { /* empty */ }

    const files = formData.getAll("files").filter((v): v is File => v instanceof File && v.size > 0);

    // Basic server-side validation
    if (!companyName || !website || !headquarters || !contactEmail || !contactName || !pitch) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Normalise website
    const websiteUrl = website.startsWith("http") ? website : `https://${website}`;

    // Build a unique slug
    const baseSlug = slugify(companyName);
    const slug = await uniqueSlug(baseSlug);

    // Determine tier
    const tier = plan === "featured" ? "premium" : "free";

    // Insert provider (unverified — pending review)
    const [provider] = await db
      .insert(providers)
      .values({
        slug,
        name: companyName,
        tagline: pitch.slice(0, 150),
        description: pitch,
        websiteUrl: websiteUrl,
        headquarters,
        foundedYear: foundedYear ? parseInt(foundedYear, 10) : null,
        tier,
        isVerified: false,
      })
      .returning({ id: providers.id });

    if (!provider) {
      throw new Error("Failed to create provider record");
    }

    // Insert regulation associations
    if (regulations.length > 0) {
      await db.insert(providerRegulations).values(
        regulations.map((r) => ({ providerId: provider.id, regulationSlug: r.toLowerCase().replace(/\s+/g, "-") }))
      );
    }

    // Insert service associations
    if (services.length > 0) {
      await db.insert(providerServices).values(
        services.map((s) => ({ providerId: provider.id, serviceType: s }))
      );
    }

    // Send admin notification
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails
        .send({
          from: FROM_EMAIL,
          to: NOTIFY_EMAIL,
          subject: `New Provider Registration — ${companyName} (${plan === "featured" ? "★ Featured" : "Basic"})`,
          html: buildAdminEmail({
            companyName, website: websiteUrl, headquarters, foundedYear, pitch,
            contactName, contactEmail, regulations, services, plan,
            fileCount: files.length,
          }),
          text: `New provider registration\n\nCompany: ${companyName}\nWebsite: ${websiteUrl}\nHQ: ${headquarters}\nContact: ${contactName} <${contactEmail}>\nPlan: ${plan}\nRegulations: ${regulations.join(", ")}\nServices: ${services.join(", ")}\n\nPitch:\n${pitch}`,
        })
        .catch((err: unknown) => {
          console.error("[register] Resend notification error:", err);
        });
    } else {
      console.warn("[register] RESEND_API_KEY not set — skipping notification email");
    }

    return NextResponse.json({ success: true, slug });
  } catch (err) {
    console.error("[register] Error:", err);
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 });
  }
}
