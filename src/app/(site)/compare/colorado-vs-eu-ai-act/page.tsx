import type { Metadata } from "next";
import Link from "next/link";
import { Mountain, Globe, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/brand";

export const revalidate = false;


export const metadata: Metadata = {
  title: "Colorado AI Act vs. EU AI Act: Complete Comparison (2026)",
  description:
    "Side-by-side comparison of the Colorado AI Act (SB 24-205) and the EU AI Act (Regulation 2024/1689) \u2014 scope, obligations, risk classification, penalties, and compliance strategy.",
  alternates: { canonical: `${SITE_URL}/compare/colorado-vs-eu-ai-act` },
  openGraph: {
    title: "Colorado AI Act vs. EU AI Act: Complete Comparison",
    description: "Side-by-side comparison of the Colorado AI Act and EU AI Act on scope, obligations, risk classification, and penalties.",
    type: "article",
    url: `${SITE_URL}/compare/colorado-vs-eu-ai-act`,
  },
};

const COMPARISON_TABLE = [
  { attribute: "Jurisdiction", colorado: "US \u00b7 Colorado (consumers)", eu: "European Union (28 member states)" },
  { attribute: "Legal basis", colorado: "SB 24-205, signed May 2024", eu: "Regulation 2024/1689, effective August 2024" },
  { attribute: "Core approach", colorado: "Reasonable care standard for algorithmic discrimination", eu: "Risk-based conformity requirements with CE marking" },
  { attribute: "Risk classification", colorado: "Binary: high-risk vs. not (based on consequential decision context)", eu: "Four tiers: unacceptable / high / limited / minimal" },
  { attribute: "High-risk definition", colorado: "AI making consequential decisions in 8 domains affecting CO consumers", eu: "Annex I (safety components) + Annex III (8 sensitive-domain standalone AI)" },
  { attribute: "Prohibited AI", colorado: "None \u2014 regulation focuses on risk management, not prohibition", eu: "Yes \u2014 8 categories banned outright (social scoring, facial scraping, etc.)" },
  { attribute: "Who bears obligations", colorado: "Deployers + Developers (separate, complementary obligations)", eu: "Providers + Deployers (separate obligations; provider is primary duty-holder)" },
  { attribute: "Pre-deployment assessment", colorado: "Impact assessment (deployers)", eu: "Conformity assessment + technical documentation (providers)" },
  { attribute: "Consumer disclosures", colorado: "Required: must disclose AI use, contact info, how to appeal", eu: "Required for high-risk AI deployers; transparency notices for limited-risk AI" },
  { attribute: "Human review right", colorado: "Yes \u2014 consumers can request meaningful human review of any consequential decision", eu: "Human oversight required in system design; no individual appeal right in law itself" },
  { attribute: "Max penalty", colorado: "$20,000 per violation", eu: "\u20ac35 million or 7% of global annual turnover (prohibited AI violations)" },
  { attribute: "Private right of action", colorado: "No \u2014 AG enforcement only", eu: "No \u2014 national market surveillance authorities and European AI Office enforce" },
  { attribute: "Enforcement date", colorado: "June 30, 2026", eu: "High-risk AI: August 2, 2026 (prohibited AI was February 2025)" },
  { attribute: "GPAI / Foundation models", colorado: "Not specifically addressed", eu: "Dedicated GPAI chapter with systemic risk tier (>10\u00b2\u2075 FLOPs)" },
  { attribute: "Extraterritorial reach", colorado: "Yes \u2014 any entity deploying AI affecting CO consumers", eu: "Yes \u2014 any entity placing AI on EU market or affecting EU residents" },
];

export default function ColoradoVsEuPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Comparisons", url: "/compare" },
    { name: "Colorado AI Act vs. EU AI Act", url: "/compare/colorado-vs-eu-ai-act" },
  ]);

  const schema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "Colorado AI Act vs. EU AI Act: Complete Comparison (2026)",
    description: "Side-by-side comparison of the Colorado AI Act and EU AI Act on scope, obligations, risk classification, and penalties.",
    url: `${SITE_URL}/compare/colorado-vs-eu-ai-act`, dateModified: "2026-04-13",
  };

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      <div className="page-banner">
        <div className="container" style={{ maxWidth: 1100, padding: 0 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Comparisons", href: "/compare" }, { label: "Colorado AI Act vs. EU AI Act" }]} />
          <h1 className="h1">Colorado AI Act vs. EU AI Act</h1>
          <p className="lede" style={{ maxWidth: 680, marginTop: 8 }}>
            The world&apos;s most comprehensive AI regulation framework versus the first major US state AI law. Colorado takes effect June 30, 2026; EU AI Act high-risk provisions follow on August 2, 2026 &mdash; here&apos;s how they compare.
          </p>
          <div className="tag-strip" style={{ marginTop: 16 }}>
            <Link href="/regulations/colorado-ai-act" className="btn btn-ghost" style={{ fontSize: 13 }}>Colorado AI Act Guide &rarr;</Link>
            <Link href="/regulations/eu-ai-act" className="btn btn-ghost" style={{ fontSize: 13 }}>EU AI Act Guide &rarr;</Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1100, padding: "var(--s-8) var(--s-7)" }}>

        {/* Summary cards */}
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
          <div className="card" style={{ borderColor: "rgba(37,99,235,0.25)", background: "rgba(37,99,235,0.04)" }}>
            <div className="flex items-center" style={{ gap: 8, marginBottom: 12 }}>
              <Mountain className="h-5 w-5" style={{ color: "#2563eb", flexShrink: 0 }} aria-hidden="true" />
              <strong style={{ color: "#1e3a5f" }}>Colorado AI Act</strong>
              <span className="mono xs" style={{ marginLeft: "auto", color: "#60a5fa" }}>CO SB 24-205</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "#1e3a5f" }}>
              <li>&bull; First comprehensive US state AI law</li>
              <li>&bull; Focuses on algorithmic discrimination in 8 domains</li>
              <li>&bull; Reasonable care standard &mdash; not a checklist approach</li>
              <li>&bull; Impact assessment + consumer rights + AG enforcement</li>
              <li>&bull; Max penalty: $20,000 per violation</li>
              <li>&bull; Effective: June 30, 2026</li>
            </ul>
          </div>
          <div className="card" style={{ borderColor: "rgba(202,138,4,0.25)", background: "rgba(202,138,4,0.04)" }}>
            <div className="flex items-center" style={{ gap: 8, marginBottom: 12 }}>
              <Globe className="h-5 w-5" style={{ color: "#ca8a04", flexShrink: 0 }} aria-hidden="true" />
              <strong style={{ color: "#713f12" }}>EU AI Act</strong>
              <span className="mono xs" style={{ marginLeft: "auto", color: "#ca8a04" }}>Reg. 2024/1689</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "#713f12" }}>
              <li>&bull; World&apos;s first comprehensive AI regulation</li>
              <li>&bull; Risk-based: 4 tiers from prohibited to minimal</li>
              <li>&bull; Detailed technical conformity requirements</li>
              <li>&bull; CE marking + EU AI database registration</li>
              <li>&bull; Max penalty: &euro;35M or 7% of global revenue</li>
              <li>&bull; High-risk enforcement: August 2, 2026</li>
            </ul>
          </div>
        </div>

        {/* Comparison table */}
        <div className="eyebrow" style={{ marginBottom: 20 }}>Detailed Comparison</div>
        <div style={{ overflowX: "auto" }}>
          <table className="data">
            <thead>
              <tr>
                <th style={{ width: 160 }}>Attribute</th>
                <th style={{ color: "#2563eb" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Mountain className="h-3.5 w-3.5" aria-hidden="true" /> Colorado AI Act
                  </span>
                </th>
                <th style={{ color: "#ca8a04" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Globe className="h-3.5 w-3.5" aria-hidden="true" /> EU AI Act
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_TABLE.map((row) => (
                <tr key={row.attribute}>
                  <td style={{ fontWeight: 500 }}>{row.attribute}</td>
                  <td>{row.colorado}</td>
                  <td>{row.eu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key differences analysis */}
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginTop: 48 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Where They Align</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>
              {[
                ["Similar domain scope:", "Both cover employment, credit/finance, healthcare, housing, and education as the highest-priority areas"],
                ["Extraterritorial reach:", "Both apply to any organization whose AI affects residents in their jurisdiction, regardless of headquarters location"],
                ["Developer/provider obligations:", "Both place upstream documentation and disclosure obligations on the organizations that build AI systems"],
                ["Human oversight:", "Both require that humans can meaningfully review and override AI decisions in high-risk contexts"],
                ["Near-simultaneous enforcement:", "Colorado takes effect June 30, 2026; EU AI Act high-risk provisions follow August 2, 2026 \u2014 33 days apart, creating tightly aligned compliance deadlines"],
              ].map(([label, desc]) => (
                <li key={label} style={{ display: "flex", gap: 8 }}>
                  <Check className="h-4 w-4" style={{ color: "var(--sage)", flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                  <span><strong>{label}</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Critical Differences</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>
              {[
                ["No prohibitions in Colorado:", "The EU bans 8 AI practices outright. Colorado only requires risk management \u2014 no AI is prohibited under Colorado law"],
                ["Conformity vs. reasonable care:", "EU AI Act requires formal conformity assessment and CE marking. Colorado requires reasonable care \u2014 a more flexible but less prescriptive standard"],
                ["Penalty magnitude:", "EU penalties (up to 7% of global turnover) are orders of magnitude larger than Colorado\u2019s $20,000 per violation"],
                ["GPAI coverage:", "The EU AI Act has a detailed GPAI chapter with systemic risk tiers. Colorado does not specifically address foundation models"],
                ["Consumer appeal rights:", "Colorado explicitly grants consumers the right to request human review of adverse decisions. The EU AI Act mandates human oversight but does not create an explicit individual appeal right"],
              ].map(([label, desc]) => (
                <li key={label} style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: "var(--stone)", flexShrink: 0, marginTop: 2 }}>&ne;</span>
                  <span><strong>{label}</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance strategy */}
        <div className="card card-tint" style={{ marginTop: 48 }}>
          <strong className="h4">Dual Compliance Strategy</strong>
          <p className="small" style={{ marginTop: 8, color: "var(--ink-2)" }}>
            If your AI system is subject to both frameworks, you can build a unified compliance program. The EU AI Act&apos;s more detailed requirements generally exceed Colorado&apos;s &mdash; a system that satisfies EU AI Act high-risk AI obligations will typically satisfy Colorado AI Act obligations in the same domain.
          </p>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginTop: 16 }}>
            {[
              { step: "1", title: "Classify once", body: "Map your AI system to Annex III (EU) and to Colorado\u2019s consequential decision domains simultaneously. The overlap is significant." },
              { step: "2", title: "EU standards cover Colorado", body: "EU AI Act technical documentation + conformity assessment satisfies Colorado\u2019s impact assessment and governance program requirements." },
              { step: "3", title: "Add CO-specific elements", body: "Colorado requires consumer-facing disclosures and an explicit appeal/human review process \u2014 add these to your EU-compliant system." },
            ].map((item) => (
              <div key={item.step} className="card" style={{ background: "var(--paper-2)" }}>
                <div className="flex items-center" style={{ gap: 8, marginBottom: 8 }}>
                  <span style={{ display: "flex", width: 24, height: 24, alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--accent)", color: "#fff", fontSize: 12, fontWeight: 700 }}>
                    {item.step}
                  </span>
                  <strong className="small" style={{ fontWeight: 600 }}>{item.title}</strong>
                </div>
                <p className="xs" style={{ color: "var(--ink-2)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="tag-strip" style={{ marginTop: 40 }}>
          <Link href="/checker" className="btn btn-primary">Check My Compliance</Link>
          <Link href="/directory?regulation=eu-ai-act" className="btn btn-ghost">Find EU AI Act Experts</Link>
          <Link href="/compare/us-state-ai-laws" className="btn btn-ghost">Compare US State AI Laws &rarr;</Link>
        </div>
      </div>
    </>
  );
}
