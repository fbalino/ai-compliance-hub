import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "Colorado AI Act vs. EU AI Act: Complete Comparison (2026)",
  description:
    "Side-by-side comparison of the Colorado AI Act (SB 24-205) and the EU AI Act (Regulation 2024/1689) — scope, obligations, risk classification, penalties, and compliance strategy.",
  alternates: {
    canonical: `${SITE_URL}/compare/colorado-vs-eu-ai-act`,
  },
  openGraph: {
    title: "Colorado AI Act vs. EU AI Act: Complete Comparison",
    description:
      "Side-by-side comparison of the Colorado AI Act and EU AI Act on scope, obligations, risk classification, and penalties.",
    type: "article",
    url: `${SITE_URL}/compare/colorado-vs-eu-ai-act`,
  },
};

const COMPARISON_TABLE = [
  {
    attribute: "Jurisdiction",
    colorado: "US · Colorado (consumers)",
    eu: "European Union (28 member states)",
  },
  {
    attribute: "Legal basis",
    colorado: "SB 24-205, signed May 2024",
    eu: "Regulation 2024/1689, effective August 2024",
  },
  {
    attribute: "Core approach",
    colorado: "Reasonable care standard for algorithmic discrimination",
    eu: "Risk-based conformity requirements with CE marking",
  },
  {
    attribute: "Risk classification",
    colorado: "Binary: high-risk vs. not (based on consequential decision context)",
    eu: "Four tiers: unacceptable / high / limited / minimal",
  },
  {
    attribute: "High-risk definition",
    colorado: "AI making consequential decisions in 8 domains affecting CO consumers",
    eu: "Annex I (safety components) + Annex III (8 sensitive-domain standalone AI)",
  },
  {
    attribute: "Prohibited AI",
    colorado: "None — regulation focuses on risk management, not prohibition",
    eu: "Yes — 8 categories banned outright (social scoring, facial scraping, etc.)",
  },
  {
    attribute: "Who bears obligations",
    colorado: "Deployers + Developers (separate, complementary obligations)",
    eu: "Providers + Deployers (separate obligations; provider is primary duty-holder)",
  },
  {
    attribute: "Pre-deployment assessment",
    colorado: "Impact assessment (deployers)",
    eu: "Conformity assessment + technical documentation (providers)",
  },
  {
    attribute: "Consumer disclosures",
    colorado: "Required: must disclose AI use, contact info, how to appeal",
    eu: "Required for high-risk AI deployers; transparency notices for limited-risk AI",
  },
  {
    attribute: "Human review right",
    colorado: "Yes — consumers can request meaningful human review of any consequential decision",
    eu: "Human oversight required in system design; no individual appeal right in law itself",
  },
  {
    attribute: "Max penalty",
    colorado: "$20,000 per violation",
    eu: "€35 million or 7% of global annual turnover (prohibited AI violations)",
  },
  {
    attribute: "Private right of action",
    colorado: "No — AG enforcement only",
    eu: "No — national market surveillance authorities and European AI Office enforce",
  },
  {
    attribute: "Enforcement date",
    colorado: "June 30, 2026",
    eu: "High-risk AI: August 2, 2026 (prohibited AI was February 2025)",
  },
  {
    attribute: "GPAI / Foundation models",
    colorado: "Not specifically addressed",
    eu: "Dedicated GPAI chapter with systemic risk tier (>10²⁵ FLOPs)",
  },
  {
    attribute: "Extraterritorial reach",
    colorado: "Yes — any entity deploying AI affecting CO consumers",
    eu: "Yes — any entity placing AI on EU market or affecting EU residents",
  },
];

export default function ColoradoVsEuPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Comparisons", url: "/compare" },
    { name: "Colorado AI Act vs. EU AI Act", url: "/compare/colorado-vs-eu-ai-act" },
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Colorado AI Act vs. EU AI Act: Complete Comparison (2026)",
    description:
      "Side-by-side comparison of the Colorado AI Act and EU AI Act on scope, obligations, risk classification, and penalties.",
    url: `${SITE_URL}/compare/colorado-vs-eu-ai-act`,
    dateModified: "2026-04-13",
  };

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Comparisons", href: "/compare" },
              { label: "Colorado AI Act vs. EU AI Act" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Colorado AI Act vs. EU AI Act
          </h1>
          <p className="mt-3 text-lg text-neutral-600 max-w-3xl">
            The world's most comprehensive AI regulation framework versus the first major US state AI law. Both take effect in August 2026 — here's how they compare.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/regulations/colorado-ai-act"
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Colorado AI Act Guide →
            </Link>
            <Link
              href="/regulations/eu-ai-act"
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              EU AI Act Guide →
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Quick summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          <Card className="border-blue-200 bg-blue-50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🏔️</span>
              <h2 className="font-bold text-blue-900">Colorado AI Act</h2>
              <span className="ml-auto text-xs font-mono text-blue-500">CO SB 24-205</span>
            </div>
            <ul className="space-y-1.5 text-sm text-blue-800">
              <li>• First comprehensive US state AI law</li>
              <li>• Focuses on algorithmic discrimination in 8 domains</li>
              <li>• Reasonable care standard — not a checklist approach</li>
              <li>• Impact assessment + consumer rights + AG enforcement</li>
              <li>• Max penalty: $20,000 per violation</li>
              <li>• Effective: June 30, 2026</li>
            </ul>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🇪🇺</span>
              <h2 className="font-bold text-yellow-900">EU AI Act</h2>
              <span className="ml-auto text-xs font-mono text-yellow-600">Reg. 2024/1689</span>
            </div>
            <ul className="space-y-1.5 text-sm text-yellow-900">
              <li>• World's first comprehensive AI regulation</li>
              <li>• Risk-based: 4 tiers from prohibited to minimal</li>
              <li>• Detailed technical conformity requirements</li>
              <li>• CE marking + EU AI database registration</li>
              <li>• Max penalty: €35M or 7% of global revenue</li>
              <li>• High-risk enforcement: August 2, 2026</li>
            </ul>
          </Card>
        </div>

        {/* Comparison table */}
        <h2 className="text-xl font-bold text-neutral-900 mb-5">Detailed Comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="text-left px-4 py-3 font-semibold text-neutral-500 uppercase tracking-wider text-xs w-40">
                  Attribute
                </th>
                <th className="text-left px-4 py-3 font-semibold text-blue-700 uppercase tracking-wider text-xs">
                  🏔️ Colorado AI Act
                </th>
                <th className="text-left px-4 py-3 font-semibold text-yellow-700 uppercase tracking-wider text-xs">
                  🇪🇺 EU AI Act
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {COMPARISON_TABLE.map((row, i) => (
                <tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}>
                  <td className="px-4 py-3 font-medium text-neutral-700 align-top">
                    {row.attribute}
                  </td>
                  <td className="px-4 py-3 text-neutral-700 align-top">{row.colorado}</td>
                  <td className="px-4 py-3 text-neutral-700 align-top">{row.eu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key differences analysis */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Where They Align</h2>
            <ul className="space-y-3 text-sm text-neutral-700">
              <li className="flex gap-2">
                <span className="text-green-600 shrink-0 mt-0.5">✓</span>
                <span><strong>Similar domain scope:</strong> Both cover employment, credit/finance, healthcare, housing, and education as the highest-priority areas</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 shrink-0 mt-0.5">✓</span>
                <span><strong>Extraterritorial reach:</strong> Both apply to any organization whose AI affects residents in their jurisdiction, regardless of headquarters location</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 shrink-0 mt-0.5">✓</span>
                <span><strong>Developer/provider obligations:</strong> Both place upstream documentation and disclosure obligations on the organizations that build AI systems</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 shrink-0 mt-0.5">✓</span>
                <span><strong>Human oversight:</strong> Both require that humans can meaningfully review and override AI decisions in high-risk contexts</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 shrink-0 mt-0.5">✓</span>
                <span><strong>Simultaneous enforcement:</strong> Both take effect for most high-risk AI systems in summer 2026, creating aligned compliance deadlines</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Critical Differences</h2>
            <ul className="space-y-3 text-sm text-neutral-700">
              <li className="flex gap-2">
                <span className="text-red-500 shrink-0 mt-0.5">≠</span>
                <span><strong>No prohibitions in Colorado:</strong> The EU bans 8 AI practices outright. Colorado only requires risk management — no AI is prohibited under Colorado law</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 shrink-0 mt-0.5">≠</span>
                <span><strong>Conformity vs. reasonable care:</strong> EU AI Act requires formal conformity assessment and CE marking. Colorado requires reasonable care — a more flexible but less prescriptive standard</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 shrink-0 mt-0.5">≠</span>
                <span><strong>Penalty magnitude:</strong> EU penalties (up to 7% of global turnover) are orders of magnitude larger than Colorado's $20,000 per violation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 shrink-0 mt-0.5">≠</span>
                <span><strong>GPAI coverage:</strong> The EU AI Act has a detailed GPAI chapter with systemic risk tiers. Colorado does not specifically address foundation models</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 shrink-0 mt-0.5">≠</span>
                <span><strong>Consumer appeal rights:</strong> Colorado explicitly grants consumers the right to request human review of adverse decisions. The EU AI Act mandates human oversight but does not create an explicit individual appeal right</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance strategy */}
        <div className="mt-12 rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            Dual Compliance Strategy
          </h2>
          <p className="text-sm text-brand-800 mb-4">
            If your AI system is subject to both frameworks, you can build a unified compliance program. The EU AI Act's more detailed requirements generally exceed Colorado's — a system that satisfies EU AI Act high-risk AI obligations will typically satisfy Colorado AI Act obligations in the same domain.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: "1",
                title: "Classify once",
                body: "Map your AI system to Annex III (EU) and to Colorado's consequential decision domains simultaneously. The overlap is significant.",
              },
              {
                step: "2",
                title: "EU standards cover Colorado",
                body: "EU AI Act technical documentation + conformity assessment satisfies Colorado's impact assessment and governance program requirements.",
              },
              {
                step: "3",
                title: "Add CO-specific elements",
                body: "Colorado requires consumer-facing disclosures and an explicit appeal/human review process — add these to your EU-compliant system.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-lg bg-white border border-brand-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
                    {item.step}
                  </span>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-brand-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/checker"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800 transition-colors"
          >
            Check My Compliance
          </Link>
          <Link
            href="/directory?regulation=eu-ai-act"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Find EU AI Act Experts
          </Link>
          <Link
            href="/compare/us-state-ai-laws"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Compare US State AI Laws →
          </Link>
        </div>
      </div>
    </>
  );
}
