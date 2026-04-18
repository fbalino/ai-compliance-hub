import type { Metadata } from "next";
import { ClipboardList, Scale, Calendar, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { NewsletterForm } from "@/components/NewsletterForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "AI Compliance Newsletter — Weekly Regulation Updates",
  description:
    "Subscribe to our free weekly newsletter covering new AI laws, enforcement actions, compliance deadlines, and expert guides. Stay ahead of AI regulation.",
  alternates: { canonical: `${SITE_URL}/newsletter` },
};

const WHAT_TO_EXPECT: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: ClipboardList, title: "Regulation Roundup", description: "New laws, proposed rules, and regulatory guidance from the US and EU \u2014 summarized in plain English." },
  { icon: Scale, title: "Enforcement Watch", description: "Fines, investigations, and enforcement actions as they happen. Know what regulators are actually going after." },
  { icon: Calendar, title: "Deadline Calendar", description: "Upcoming compliance deadlines you can\u2019t miss \u2014 90-day, 30-day, and 7-day alerts." },
  { icon: Wrench, title: "Compliance How-To", description: "Practical guides, templates, and step-by-step instructions from our compliance team." },
];

export default function NewsletterPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Newsletter", url: "/newsletter" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="rg-page-head">
        <div className="rg-container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Newsletter" }]} />
        </div>
      </div>

      <div className="rg-cta-dark" style={{ borderRadius: 0, padding: "64px 40px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
            <svg style={{ width: 26, height: 26, color: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 38px)" }}>Stay ahead of AI regulation</h2>
          <p style={{ maxWidth: 520 }}>
            The AI compliance landscape changes weekly. Our free newsletter distills what matters &mdash; enforcement actions, new laws, compliance deadlines &mdash; so you don&apos;t have to track it all yourself.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20, fontSize: 13, color: "var(--rg-dark-muted)" }}>
            <span>&check; Free forever</span>
            <span>&check; Weekly, every Monday</span>
            <span>&check; Unsubscribe anytime</span>
          </div>
          <NewsletterForm source="newsletter_page" variant="hero" className="mt-8 max-w-md mx-auto" />
          <p style={{ marginTop: 12, fontSize: 12, color: "var(--rg-dark-muted)", opacity: 0.7 }}>
            Join compliance and legal professionals at companies navigating AI regulation.
          </p>
        </div>
      </div>

      <div className="rg-page-body">
        <div className="rg-container" style={{ maxWidth: 1000 }}>
          <div className="rg-kicker" style={{ textAlign: "center", display: "block" }}>What you&apos;ll get every week</div>
          <div className="rg-scard-grid" style={{ marginTop: 24 }}>
            {WHAT_TO_EXPECT.map((item) => (
              <div key={item.title} className="rg-scard" style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <span style={{
                  display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: "var(--rg-primary-faint)", color: "var(--rg-primary-deep)",
                }}>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 style={{ marginBottom: 4 }}>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
