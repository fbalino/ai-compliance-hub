import type { Metadata } from "next";
import { ClipboardList, Scale, Calendar, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SITE_URL } from "@/lib/brand";


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

      <div className="page-banner">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Newsletter" }]} />
        </div>
      </div>

      <div style={{ background: "var(--paper-inverse)", color: "var(--ink-inverse)", padding: "64px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: "var(--line-inverse)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
            <svg style={{ width: 26, height: 26, color: "var(--ink-inverse)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <rect x="3" y="6" width="18" height="13" rx="1.5" /><path d="m3 8 9 6 9-6" />
            </svg>
          </div>
          <h2 className="h1" style={{ color: "var(--ink-inverse)" }}>Stay ahead of AI regulation</h2>
          <p className="lede" style={{ color: "var(--ink-inverse-soft)", maxWidth: 520, margin: "12px auto 0" }}>
            The AI compliance landscape changes weekly. Our free newsletter distills what matters — enforcement actions, new laws, compliance deadlines — so you don&apos;t have to track it all yourself.
          </p>
          <div className="flex" style={{ justifyContent: "center", gap: 20, marginTop: 20, fontSize: 13, color: "var(--ink-inverse-soft)" }}>
            <span>✓ Free forever</span>
            <span>✓ Weekly, every Monday</span>
            <span>✓ Unsubscribe anytime</span>
          </div>
          <div style={{ marginTop: 32, maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
            <NewsletterForm source="newsletter_page" variant="hero" />
          </div>
          <p className="xs" style={{ marginTop: 12, color: "var(--ink-inverse-soft)" }}>
            Join compliance and legal professionals at companies navigating AI regulation.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1000, padding: "var(--s-10) var(--s-7)" }}>
        <div className="eyebrow" style={{ textAlign: "center", marginBottom: 24 }}>What you&apos;ll get every week</div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 16 }}>
          {WHAT_TO_EXPECT.map((item) => (
            <div key={item.title} className="card" style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <span style={{
                display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 6, flexShrink: 0,
                background: "var(--accent-soft)", color: "var(--accent)",
              }}>
                <item.icon style={{ width: 20, height: 20 }} aria-hidden="true" />
              </span>
              <div>
                <div className="h4" style={{ marginBottom: 4 }}>{item.title}</div>
                <p className="small" style={{ lineHeight: 1.5, color: "var(--ink-2)" }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
