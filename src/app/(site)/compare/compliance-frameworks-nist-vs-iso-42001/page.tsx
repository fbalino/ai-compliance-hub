import type { Metadata } from "next";
import Link from "next/link";
import { Flag, Globe, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "NIST AI RMF vs. ISO/IEC 42001: Which Framework Should You Use? (2026)",
  description:
    "Side-by-side comparison of NIST AI Risk Management Framework (AI RMF 1.0) and ISO/IEC 42001 \u2014 coverage, certification, cost, timeline, and which AI regulations each satisfies.",
  alternates: { canonical: `${SITE_URL}/compare/compliance-frameworks-nist-vs-iso-42001` },
  openGraph: {
    title: "NIST AI RMF vs. ISO/IEC 42001: Complete Comparison",
    description: "Side-by-side comparison of the two leading AI governance frameworks \u2014 coverage, certification, cost, timeline, and regulatory alignment.",
    type: "article",
    url: `${SITE_URL}/compare/compliance-frameworks-nist-vs-iso-42001`,
  },
};

const COMPARISON_TABLE = [
  { attribute: "Published by", nist: "US National Institute of Standards and Technology (NIST)", iso: "International Organization for Standardization (ISO) / IEC" },
  { attribute: "Published", nist: "January 2023 (AI RMF 1.0); Playbook published alongside", iso: "December 2023 (ISO/IEC 42001:2023)" },
  { attribute: "Type", nist: "Voluntary framework \u2014 not certifiable", iso: "International standard \u2014 third-party certification available" },
  { attribute: "Core structure", nist: "Four functions: GOVERN, MAP, MEASURE, MANAGE", iso: "PDCA management system structure (same as ISO 27001, ISO 9001)" },
  { attribute: "Certification available", nist: "No \u2014 voluntary reference framework only", iso: "Yes \u2014 accredited third-party certification bodies issue ISO 42001 certificates" },
  { attribute: "Typical cost", nist: "Framework is free; implementation varies ($0\u2013$50K depending on consultant use)", iso: "Audit and certification: $15K\u2013$60K depending on organization size; ongoing surveillance audits" },
  { attribute: "Implementation timeline", nist: "3\u201312 months depending on maturity starting point", iso: "6\u201318 months to certification readiness from scratch" },
  { attribute: "Prescriptiveness", nist: "Principles-based with flexible implementation guidance (the Playbook)", iso: "Requirements-based \u2014 mandatory clauses must be satisfied to certify" },
  { attribute: "Geographic focus", nist: "US-primary, widely adopted internationally", iso: "International \u2014 adopted in EU, UK, Asia-Pacific, and globally" },
  { attribute: "EU AI Act alignment", nist: "Referenced in EU AI Act recitals as compatible standard; supports gap analysis", iso: "ISO 42001 is a harmonized standard candidate for EU AI Act conformity; certification may satisfy conformity assessment requirements" },
  { attribute: "Colorado AI Act alignment", nist: "Directly cited in CO AG guidance as best-practice reference for impact assessments and risk programs", iso: "Satisfies the spirit of Colorado\u2019s governance program requirements; not specifically referenced in CO guidance" },
  { attribute: "NYC LL 144 alignment", nist: "Not specifically referenced; general bias testing practices align with MEASURE function", iso: "Not specifically referenced; ISO 42001\u2019s bias management controls address LL 144 audit concepts" },
  { attribute: "Best for", nist: "US companies building internal AI governance programs; early-stage programs", iso: "Companies needing certifiable proof of AI governance for enterprise customers, regulators, or EU market access" },
  { attribute: "Auditable by regulators", nist: "No formal audit mechanism \u2014 used as self-assessment reference", iso: "Yes \u2014 certificate and surveillance audit reports can be provided to regulators" },
];

const CHOOSE_NIST = [
  "You\u2019re in the US and primarily need to comply with Colorado AI Act or similar state laws",
  "You\u2019re in early stages of AI governance and need a flexible starting framework",
  "Your team needs a shared language for AI risk management without formal certification overhead",
  "You want to build internal governance before pursuing certification",
  "Budget is constrained \u2014 NIST AI RMF is free and widely understood",
];

const CHOOSE_ISO = [
  "You need a certifiable credential to satisfy enterprise procurement requirements",
  "You\u2019re selling AI products or services into the EU market and need harmonized standard alignment",
  "Your organization already uses ISO management system standards (ISO 27001, 9001) and wants consistent structure",
  "You need to demonstrate AI governance to regulators, investors, or M&A due diligence",
  "You\u2019re preparing for EU AI Act conformity assessment and want third-party validation",
];

export default function NistVsIsoPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Comparisons", url: "/compare" },
    { name: "NIST AI RMF vs. ISO/IEC 42001", url: "/compare/compliance-frameworks-nist-vs-iso-42001" },
  ]);

  const schema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "NIST AI RMF vs. ISO/IEC 42001: Which Framework Should You Use? (2026)",
    description: "Side-by-side comparison of NIST AI RMF 1.0 and ISO/IEC 42001 \u2014 coverage, certification, cost, timeline, and regulatory alignment.",
    url: `${SITE_URL}/compare/compliance-frameworks-nist-vs-iso-42001`, dateModified: "2026-04-14",
  };

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      <div className="page-banner">
        <div className="container" style={{ maxWidth: 1100, padding: 0 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Comparisons", href: "/compare" }, { label: "NIST AI RMF vs. ISO/IEC 42001" }]} />
          <h1 className="h1">NIST AI RMF vs. ISO/IEC 42001</h1>
          <p className="lede" style={{ maxWidth: 680, marginTop: 8 }}>
            The two leading AI governance frameworks compared &mdash; so your compliance team can choose the right foundation for your program.
          </p>
          <div className="tag-strip" style={{ marginTop: 16 }}>
            <Link href="/blog/nist-ai-rmf-explainer-for-compliance-teams" className="btn btn-ghost" style={{ fontSize: 13 }}>NIST AI RMF Explainer &rarr;</Link>
            <Link href="/compare/colorado-vs-eu-ai-act" className="btn btn-ghost" style={{ fontSize: 13 }}>Colorado vs. EU AI Act &rarr;</Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1100, padding: "var(--s-8) var(--s-7)" }}>

        {/* Summary cards */}
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
          <div className="card" style={{ borderColor: "rgba(37,99,235,0.25)", background: "rgba(37,99,235,0.04)" }}>
            <div className="flex items-center" style={{ gap: 8, marginBottom: 12 }}>
              <Flag className="h-5 w-5" style={{ color: "#2563eb", flexShrink: 0 }} aria-hidden="true" />
              <strong style={{ color: "#1e3a5f" }}>NIST AI RMF 1.0</strong>
              <span className="mono xs" style={{ marginLeft: "auto", color: "#60a5fa" }}>NIST AI 100-1</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "#1e3a5f" }}>
              <li>&bull; Published by NIST, January 2023</li>
              <li>&bull; Voluntary &mdash; no certification, no penalties</li>
              <li>&bull; Four functions: GOVERN, MAP, MEASURE, MANAGE</li>
              <li>&bull; Free framework; flexible and principles-based</li>
              <li>&bull; Referenced in Colorado AI Act guidance</li>
              <li>&bull; De facto US AI governance standard</li>
            </ul>
          </div>
          <div className="card" style={{ borderColor: "rgba(147,51,234,0.25)", background: "rgba(147,51,234,0.04)" }}>
            <div className="flex items-center" style={{ gap: 8, marginBottom: 12 }}>
              <Globe className="h-5 w-5" style={{ color: "#9333ea", flexShrink: 0 }} aria-hidden="true" />
              <strong style={{ color: "#3b0764" }}>ISO/IEC 42001:2023</strong>
              <span className="mono xs" style={{ marginLeft: "auto", color: "#9333ea" }}>ISO 42001</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "#3b0764" }}>
              <li>&bull; Published by ISO/IEC, December 2023</li>
              <li>&bull; Certifiable &mdash; third-party audit available</li>
              <li>&bull; PDCA management system (like ISO 27001)</li>
              <li>&bull; Certification cost: $15K&ndash;$60K+</li>
              <li>&bull; EU AI Act harmonized standard candidate</li>
              <li>&bull; International standard for enterprise/EU use</li>
            </ul>
          </div>
        </div>

        {/* Comparison table */}
        <div className="eyebrow" style={{ marginBottom: 20 }}>Detailed Comparison</div>
        <div style={{ overflowX: "auto" }}>
          <table className="data">
            <thead>
              <tr>
                <th style={{ width: 180 }}>Attribute</th>
                <th style={{ color: "#2563eb" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Flag className="h-3.5 w-3.5" aria-hidden="true" /> NIST AI RMF 1.0
                  </span>
                </th>
                <th style={{ color: "#9333ea" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Globe className="h-3.5 w-3.5" aria-hidden="true" /> ISO/IEC 42001
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_TABLE.map((row) => (
                <tr key={row.attribute}>
                  <td style={{ fontWeight: 500 }}>{row.attribute}</td>
                  <td>{row.nist}</td>
                  <td>{row.iso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Decision guide */}
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginTop: 48 }}>
          <div className="card" style={{ borderColor: "rgba(37,99,235,0.25)", background: "rgba(37,99,235,0.04)" }}>
            <strong style={{ color: "#1e3a5f", marginBottom: 12, display: "block" }}>Choose NIST AI RMF if...</strong>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {CHOOSE_NIST.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "#1e3a5f" }}>
                  <Check className="h-4 w-4" style={{ color: "#3b82f6", flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card" style={{ borderColor: "rgba(147,51,234,0.25)", background: "rgba(147,51,234,0.04)" }}>
            <strong style={{ color: "#3b0764", marginBottom: 12, display: "block" }}>Choose ISO/IEC 42001 if...</strong>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {CHOOSE_ISO.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "#3b0764" }}>
                  <Check className="h-4 w-4" style={{ color: "#9333ea", flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Not mutually exclusive */}
        <div className="card card-tint" style={{ marginTop: 48 }}>
          <strong className="h4">They&apos;re Not Mutually Exclusive</strong>
          <p className="small" style={{ marginTop: 8, color: "var(--ink-2)" }}>
            Most mature AI governance programs use both. The common path: start with NIST AI RMF to build your governance program and internal processes, then layer on ISO/IEC 42001 certification when external validation becomes a business requirement. ISO 42001 is structurally compatible with NIST AI RMF &mdash; the four NIST functions map cleanly to ISO 42001 clauses.
          </p>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginTop: 16 }}>
            {[
              { step: "1", title: "Start with NIST AI RMF", body: "Build your AI inventory, governance structure, and impact assessment processes using NIST\u2019s GOVERN/MAP/MEASURE/MANAGE framework." },
              { step: "2", title: "Gap analysis for ISO 42001", body: "Map your NIST-aligned controls to ISO 42001 clauses. Identify and close gaps. Typically 20\u201340% of controls are already satisfied." },
              { step: "3", title: "ISO 42001 certification", body: "Engage an accredited certification body. Pass stage 1 (documentation review) and stage 2 (on-site audit). Receive certificate." },
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

        {/* CTAs */}
        <div className="tag-strip" style={{ marginTop: 40 }}>
          <Link href="/checker" className="btn btn-primary">Check My Compliance</Link>
          <Link href="/directory/categories/governance-consulting" className="btn btn-ghost">Find Framework Consultants</Link>
          <Link href="/compare/colorado-vs-eu-ai-act" className="btn btn-ghost">Colorado vs. EU AI Act &rarr;</Link>
        </div>
      </div>
    </>
  );
}
