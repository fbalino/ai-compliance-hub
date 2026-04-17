import type { Metadata } from "next";
import Link from "next/link";
import { Mountain, Landmark, Wheat, TreePine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "US State AI Laws Compared: Colorado, NYC, Illinois & California (2026)",
  description:
    "Compare the four most significant US state and local AI compliance laws: Colorado AI Act, NYC Local Law 144, Illinois AIVIRA, and California AB 2013. Scope, obligations, penalties, and enforcement.",
  alternates: { canonical: `${SITE_URL}/compare/us-state-ai-laws` },
  openGraph: {
    title: "US State AI Laws Compared (2026)",
    description: "Side-by-side comparison of Colorado AI Act, NYC Local Law 144, Illinois AIVIRA, and California AB 2013.",
    type: "article",
    url: `${SITE_URL}/compare/us-state-ai-laws`,
  },
};

const LAWS: {
  slug: string; flag: LucideIcon; name: string; shortName: string; jurisdiction: string;
  effectiveDate: string; focus: string; scope: string; trigger: string; mainObligation: string;
  penalty: string; enforcement: string; privateAction: boolean; keyColor: string;
}[] = [
  { slug: "colorado-ai-act", flag: Mountain, name: "Colorado AI Act", shortName: "CO SB 24-205", jurisdiction: "Colorado (statewide)", effectiveDate: "June 30, 2026", focus: "High-risk AI in consequential decisions", scope: "Any deployer/developer of AI making consequential decisions affecting CO consumers", trigger: "Consequential decision in 8 domains (employment, credit, healthcare, housing, etc.)", mainObligation: "Impact assessment, consumer disclosures, human review right, governance program", penalty: "$20,000 per violation", enforcement: "Colorado Attorney General", privateAction: false, keyColor: "blue" },
  { slug: "nyc-local-law-144", flag: Landmark, name: "NYC Local Law 144", shortName: "NYC LL 144", jurisdiction: "New York City", effectiveDate: "July 5, 2023 (already in effect)", focus: "AI hiring & promotion tools (AEDTs)", scope: "Employers/agencies using AEDTs to screen NYC-based candidates or employees", trigger: "Automated Employment Decision Tool (AEDT) used for hiring/promotion in NYC", mainObligation: "Annual independent bias audit, public posting of results, 10-day advance notice to candidates", penalty: "Up to $1,500 per violation per day", enforcement: "NYC Dept. of Consumer and Worker Protection (DCWP)", privateAction: false, keyColor: "purple" },
  { slug: "illinois-ai-video-interview-act", flag: Wheat, name: "Illinois AIVIRA", shortName: "IL AIVIRA", jurisdiction: "Illinois (statewide)", effectiveDate: "January 1, 2020 (already in effect)", focus: "AI analysis of employment video interviews", scope: "Employers using AI to analyze video interviews of Illinois applicants", trigger: "AI analysis of video interview content (facial expression, tone, word choice)", mainObligation: "Pre-interview notice, explanation of AI characteristics, written consent, 30-day deletion on request", penalty: "Injunctive relief + actual damages (private right of action)", enforcement: "Private litigation", privateAction: true, keyColor: "green" },
  { slug: "california-ab-2013", flag: TreePine, name: "California AB 2013", shortName: "CA AB 2013", jurisdiction: "California (statewide)", effectiveDate: "January 1, 2026", focus: "AI training data transparency", scope: "Developers of generative AI systems above compute threshold made available to CA consumers", trigger: "Generative AI trained with >~10\u00b2\u00b3 FLOPs made publicly available in California", mainObligation: "Public disclosure of training data sources, licensing, biases, synthetic data usage", penalty: "Injunctive relief + actual damages", enforcement: "CA Attorney General + private litigation", privateAction: true, keyColor: "orange" },
];

const TABLE_ROWS = [
  { label: "Jurisdiction", values: ["Colorado (statewide)", "New York City", "Illinois (statewide)", "California (statewide)"] },
  { label: "In effect since", values: ["June 30, 2026", "July 5, 2023", "January 1, 2020", "January 1, 2026"] },
  { label: "Primary focus", values: ["High-risk AI in 8 consequential decision domains", "AI hiring/promotion tools (AEDTs)", "AI video interview analysis", "Generative AI training data transparency"] },
  { label: "Who must comply", values: ["Deployers + developers of high-risk AI affecting CO consumers", "Employers/agencies using AEDTs for NYC-based candidates", "Employers using AI video analysis for IL applicants", "Generative AI developers above compute threshold"] },
  { label: "Key obligation", values: ["Impact assessment + consumer appeal right", "Annual bias audit + public disclosure", "Consent + notice + deletion rights", "Training data transparency disclosure"] },
  { label: "Max penalty", values: ["$20,000/violation", "$1,500/day/violation", "Actual damages", "Actual damages"] },
  { label: "Private lawsuit?", values: ["No", "No", "Yes", "Yes"] },
  { label: "Enforcement agency", values: ["Colorado AG", "NYC DCWP", "Courts only", "California AG + Courts"] },
  { label: "Sector scope", values: ["All sectors using high-risk AI", "Employment only", "Employment (video) only", "AI developers (generative)"] },
];

export default function UsStateAiLawsPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Comparisons", url: "/compare" },
    { name: "US State AI Laws Compared", url: "/compare/us-state-ai-laws" },
  ]);

  const schema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "US State AI Laws Compared: Colorado, NYC, Illinois & California (2026)",
    description: "Side-by-side comparison of the four most significant US state and local AI compliance laws.",
    url: `${SITE_URL}/compare/us-state-ai-laws`, dateModified: "2026-04-13",
  };

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      <div className="rg-page-head">
        <div className="rg-container" style={{ maxWidth: 1100 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Comparisons", href: "/compare" }, { label: "US State AI Laws" }]} />
          <h1>US State AI Laws Compared</h1>
          <p className="rg-page-desc" style={{ maxWidth: 680 }}>
            Four states and cities have enacted substantive AI compliance laws. Here&apos;s how Colorado, New York City, Illinois, and California compare on scope, obligations, and enforcement.
          </p>
        </div>
      </div>

      <div className="rg-page-body">
        <div className="rg-container" style={{ maxWidth: 1100 }}>

          {/* Quick overview cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14, marginBottom: 48 }}>
            {LAWS.map((law) => (
              <Link key={law.slug} href={`/regulations/${law.slug}`} className="rg-scard-link">
                <div className="rg-scard" style={{ height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ display: "flex", width: 32, height: 32, flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: 8, background: "var(--rg-bg)", color: "var(--rg-ink-dim)" }}>
                      <law.flag className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <div style={{ fontSize: 11, fontFamily: "monospace", color: "var(--rg-ink-dim)" }}>{law.shortName}</div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{law.name}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--rg-ink-dim)", marginBottom: 4 }}>{law.jurisdiction}</div>
                  <div style={{ fontSize: 12, color: "var(--rg-ink-dim)", lineHeight: 1.5 }}>{law.focus}</div>
                  <div style={{ marginTop: 8, fontSize: 12, fontWeight: 500, color: "var(--rg-primary-deep)" }}>Full guide &rarr;</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Comparison table */}
          <div className="rg-kicker" style={{ marginBottom: 20 }}>Side-by-Side Comparison</div>
          <div className="rg-table-wrap">
            <table className="rg-table" style={{ minWidth: 700 }}>
              <thead>
                <tr>
                  <th style={{ width: 140 }}>Attribute</th>
                  {LAWS.map((law) => (
                    <th key={law.slug}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <law.flag className="h-3.5 w-3.5" aria-hidden="true" />
                        {law.shortName}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td style={{ fontWeight: 500, fontSize: 12 }}>{row.label}</td>
                    {row.values.map((val, j) => (
                      <td key={j} style={{ fontSize: 12 }}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Analysis */}
          <div style={{ marginTop: 48 }}>
            <div className="rg-kicker" style={{ marginBottom: 16 }}>Who Needs to Worry About What</div>
            <div className="rg-scard-grid">
              {[
                { title: "HR Tech / Hiring Platforms", laws: ["NYC Local Law 144", "Illinois AIVIRA"], body: "If you offer automated resume screening, candidate scoring, or video interview analysis to employers, you need annual bias audits (NYC) and consent/deletion workflows (Illinois). These apply to your customers\u2019 use of your platform." },
                { title: "Generative AI Developers / LLM Companies", laws: ["California AB 2013", "EU AI Act (GPAI)"], body: "If you train large language models or image generation models and make them available to US or EU users, California AB 2013 requires training data transparency disclosure. EU AI Act adds additional GPAI requirements." },
                { title: "Enterprise AI Deployers (Any Sector)", laws: ["Colorado AI Act", "EU AI Act"], body: "If you deploy AI that makes consequential decisions affecting Colorado consumers in employment, credit, healthcare, or housing, the Colorado AI Act requires impact assessments and consumer disclosures from June 2026." },
                { title: "Financial Services", laws: ["Colorado AI Act", "NYC Local Law 144", "EU AI Act"], body: "Financial institutions deploying AI for credit, insurance underwriting, or employment screening face the most overlapping obligations \u2014 Colorado\u2019s high-risk AI rules, NYC\u2019s hiring AI audit requirements, and EU AI Act high-risk classification." },
              ].map((item) => (
                <div key={item.title} className="rg-scard">
                  <h3 style={{ fontSize: 14, marginBottom: 4 }}>{item.title}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                    {item.laws.map((law) => (
                      <span key={law} className="rg-tag" style={{ background: "var(--rg-primary-faint)", color: "var(--rg-primary-deep)", borderColor: "var(--rg-primary-faint)" }}>{law}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 12, lineHeight: 1.6 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key insight */}
          <div style={{ marginTop: 40 }}>
            <div className="rg-kicker" style={{ marginBottom: 16 }}>Key Insight: The Patchwork Problem</div>
            <div className="rg-scard" style={{ borderColor: "rgba(217,119,6,0.3)", background: "rgba(217,119,6,0.06)" }}>
              <p style={{ fontSize: 14, color: "#78350f", lineHeight: 1.7 }}>
                Unlike the EU AI Act &mdash; which creates a unified framework across 27 countries &mdash; US AI compliance is a growing patchwork of state and local laws, each with different triggers, obligations, and enforcement mechanisms. A single AI product used across the US may be subject to NYC&apos;s bias audit requirements, Colorado&apos;s impact assessment mandate, Illinois&apos;s consent and deletion rules, and California&apos;s training data disclosure requirements &mdash; simultaneously.
              </p>
              <p style={{ marginTop: 12, fontSize: 14, color: "#78350f", lineHeight: 1.7 }}>
                The practical solution is to build the most demanding requirement into your baseline. A compliance program designed for the Colorado AI Act and NYC LL 144 simultaneously &mdash; combined with California AB 2013 disclosure documentation &mdash; will satisfy most US AI compliance obligations as additional states pass laws.
              </p>
              <div style={{ marginTop: 16 }}>
                <Link href="/checker" className="rg-btn rg-btn-primary">Check My Compliance Obligations</Link>
              </div>
            </div>
          </div>

          {/* Related links */}
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {LAWS.map((law) => (
              <Link key={law.slug} href={`/regulations/${law.slug}`} className="rg-btn rg-btn-outline" style={{ fontSize: 13 }}>
                <law.flag className="h-3.5 w-3.5" aria-hidden="true" style={{ marginRight: 6 }} />
                {law.name} Guide
              </Link>
            ))}
            <Link href="/compare/colorado-vs-eu-ai-act" className="rg-btn rg-btn-outline" style={{ fontSize: 13 }}>
              Colorado vs. EU AI Act &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
