import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "About & Methodology — AI Compliance Hub",
  description:
    "How we track AI regulations worldwide: daily monitoring of 40+ official sources, editorial analysis, and curated provider matching. Open, transparent, correctable.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Regulome — How We Track AI Regulation",
    description: "Daily monitoring of 40+ official gazettes. Editorial analysis. Curated provider matching.",
    type: "website",
    url: `${SITE_URL}/about`,
  },
};

const PROCESS_STEPS = [
  { num: "01", label: "Monitor", desc: "Daily scans of 40+ official gazettes, agency feeds, and legislative trackers." },
  { num: "02", label: "Analyse", desc: "Editors write plain-English summaries and classify by topic, scope, and sector." },
  { num: "03", label: "Match", desc: "We map each regulation to vetted providers who cover it \u2014 curated + self-tagged." },
];

const TEAM_INITIALS = ["Ed", "Ana", "Rui", "Sal", "Lin", "Mo", "+5"];

export default function AboutPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  const schema = {
    "@context": "https://schema.org", "@type": "AboutPage",
    name: "About Regulome",
    description: "How we track AI regulations worldwide.",
    url: `${SITE_URL}/about`,
  };

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      <section className="container-narrow" style={{ padding: "var(--s-8) var(--s-7)" }}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <div className="eyebrow" style={{ marginTop: 16, marginBottom: 12 }}>Colophon</div>
        <h1 className="display">About Regulome.</h1>
        <p className="lede" style={{ marginTop: 20 }}>
          An open register of the world&apos;s AI &amp; cyber regulations &mdash; and a directory of the people who can help you comply.
        </p>

        {/* How we track */}
        <div id="methodology" className="eyebrow" style={{ marginTop: 48, marginBottom: 16, scrollMarginTop: 80 }}>&sect; How we track (methodology)</div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} className="card">
              <div className="eyebrow" style={{ marginBottom: 8 }}>{step.num} &middot; {step.label}</div>
              <p className="small" style={{ color: "var(--ink-2)", lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Provider matching */}
        <div className="eyebrow" style={{ marginTop: 48, marginBottom: 16 }}>&sect; Provider matching</div>
        <p className="lede" style={{ color: "var(--ink)" }}>
          Providers self-tag the regulations they cover. Our editors verify each listing (case studies, team, certifications) before it goes live.{" "}
          <span className="feature-flag">★ Featured</span> providers pay to appear in the top slot on matched regulation pages &mdash; always clearly labeled. Matching is never sold below the line.
        </p>

        {/* Corrections */}
        <div id="corrections" className="eyebrow" style={{ marginTop: 48, marginBottom: 16, scrollMarginTop: 80 }}>&sect; Corrections</div>
        <p className="lede">
          Every entry has a <span className="link" style={{ cursor: "pointer" }}>report correction</span> link. Corrections are logged publicly with dates and editor initials. We&apos;d rather be corrected than wrong.
        </p>

        {/* Team & Contact */}
        <div id="contact" className="eyebrow" style={{ marginTop: 48, marginBottom: 16, scrollMarginTop: 80 }}>&sect; Team &amp; Contact</div>
        <div className="flex" style={{ gap: 12 }}>
          {TEAM_INITIALS.map((n) => (
            <div key={n} className="avatar" style={{ width: 56, height: 56, fontSize: 18 }}>{n}</div>
          ))}
        </div>
        <p className="small" style={{ marginTop: 16, color: "var(--ink-2)" }}>
          hello@regulome.io &middot; Lisbon-based &middot; funded by Point Nine &amp; angels
        </p>

        {/* CTAs */}
        <div className="tag-strip" style={{ marginTop: 40 }}>
          <Link href="/join" className="btn btn-primary">List Your Practice</Link>
          <Link href="/regulations" className="btn btn-ghost">Browse Regulations</Link>
          <Link href="/directory" className="btn btn-ghost">Provider Directory</Link>
        </div>
      </section>
    </>
  );
}
