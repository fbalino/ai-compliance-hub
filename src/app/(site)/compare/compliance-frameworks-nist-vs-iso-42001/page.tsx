import type { Metadata } from "next";
import Link from "next/link";
import { Flag, Globe, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "NIST AI RMF vs. ISO/IEC 42001: Which Framework Should You Use? (2026)",
  description:
    "Side-by-side comparison of NIST AI Risk Management Framework (AI RMF 1.0) and ISO/IEC 42001 — coverage, certification, cost, timeline, and which AI regulations each satisfies.",
  alternates: {
    canonical: `${SITE_URL}/compare/compliance-frameworks-nist-vs-iso-42001`,
  },
  openGraph: {
    title: "NIST AI RMF vs. ISO/IEC 42001: Complete Comparison",
    description:
      "Side-by-side comparison of the two leading AI governance frameworks — coverage, certification, cost, timeline, and regulatory alignment.",
    type: "article",
    url: `${SITE_URL}/compare/compliance-frameworks-nist-vs-iso-42001`,
  },
};

const COMPARISON_TABLE = [
  {
    attribute: "Published by",
    nist: "US National Institute of Standards and Technology (NIST)",
    iso: "International Organization for Standardization (ISO) / IEC",
  },
  {
    attribute: "Published",
    nist: "January 2023 (AI RMF 1.0); Playbook published alongside",
    iso: "December 2023 (ISO/IEC 42001:2023)",
  },
  {
    attribute: "Type",
    nist: "Voluntary framework — not certifiable",
    iso: "International standard — third-party certification available",
  },
  {
    attribute: "Core structure",
    nist: "Four functions: GOVERN, MAP, MEASURE, MANAGE",
    iso: "PDCA management system structure (same as ISO 27001, ISO 9001)",
  },
  {
    attribute: "Certification available",
    nist: "No — voluntary reference framework only",
    iso: "Yes — accredited third-party certification bodies issue ISO 42001 certificates",
  },
  {
    attribute: "Typical cost",
    nist: "Framework is free; implementation varies ($0–$50K depending on consultant use)",
    iso: "Audit and certification: $15K–$60K depending on organization size; ongoing surveillance audits",
  },
  {
    attribute: "Implementation timeline",
    nist: "3–12 months depending on maturity starting point",
    iso: "6–18 months to certification readiness from scratch",
  },
  {
    attribute: "Prescriptiveness",
    nist: "Principles-based with flexible implementation guidance (the Playbook)",
    iso: "Requirements-based — mandatory clauses must be satisfied to certify",
  },
  {
    attribute: "Geographic focus",
    nist: "US-primary, widely adopted internationally",
    iso: "International — adopted in EU, UK, Asia-Pacific, and globally",
  },
  {
    attribute: "EU AI Act alignment",
    nist: "Referenced in EU AI Act recitals as compatible standard; supports gap analysis",
    iso: "ISO 42001 is a harmonized standard candidate for EU AI Act conformity; certification may satisfy conformity assessment requirements",
  },
  {
    attribute: "Colorado AI Act alignment",
    nist: "Directly cited in CO AG guidance as best-practice reference for impact assessments and risk programs",
    iso: "Satisfies the spirit of Colorado's governance program requirements; not specifically referenced in CO guidance",
  },
  {
    attribute: "NYC LL 144 alignment",
    nist: "Not specifically referenced; general bias testing practices align with MEASURE function",
    iso: "Not specifically referenced; ISO 42001's bias management controls address LL 144 audit concepts",
  },
  {
    attribute: "Best for",
    nist: "US companies building internal AI governance programs; early-stage programs",
    iso: "Companies needing certifiable proof of AI governance for enterprise customers, regulators, or EU market access",
  },
  {
    attribute: "Auditable by regulators",
    nist: "No formal audit mechanism — used as self-assessment reference",
    iso: "Yes — certificate and surveillance audit reports can be provided to regulators",
  },
];

const CHOOSE_NIST = [
  "You're in the US and primarily need to comply with Colorado AI Act or similar state laws",
  "You're in early stages of AI governance and need a flexible starting framework",
  "Your team needs a shared language for AI risk management without formal certification overhead",
  "You want to build internal governance before pursuing certification",
  "Budget is constrained — NIST AI RMF is free and widely understood",
];

const CHOOSE_ISO = [
  "You need a certifiable credential to satisfy enterprise procurement requirements",
  "You're selling AI products or services into the EU market and need harmonized standard alignment",
  "Your organization already uses ISO management system standards (ISO 27001, 9001) and wants consistent structure",
  "You need to demonstrate AI governance to regulators, investors, or M&A due diligence",
  "You're preparing for EU AI Act conformity assessment and want third-party validation",
];

export default function NistVsIsoPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Comparisons", url: "/compare" },
    { name: "NIST AI RMF vs. ISO/IEC 42001", url: "/compare/compliance-frameworks-nist-vs-iso-42001" },
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "NIST AI RMF vs. ISO/IEC 42001: Which Framework Should You Use? (2026)",
    description:
      "Side-by-side comparison of NIST AI RMF 1.0 and ISO/IEC 42001 — coverage, certification, cost, timeline, and regulatory alignment.",
    url: `${SITE_URL}/compare/compliance-frameworks-nist-vs-iso-42001`,
    dateModified: "2026-04-14",
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
              { label: "NIST AI RMF vs. ISO/IEC 42001" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            NIST AI RMF vs. ISO/IEC 42001
          </h1>
          <p className="mt-3 text-lg text-neutral-600 max-w-3xl">
            The two leading AI governance frameworks compared — so your compliance team can choose the right foundation for your program.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/blog/nist-ai-rmf-explainer-for-compliance-teams"
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              NIST AI RMF Explainer →
            </Link>
            <Link
              href="/compare/colorado-vs-eu-ai-act"
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Colorado vs. EU AI Act →
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="border-blue-200 bg-blue-50">
            <div className="flex items-center gap-2 mb-3">
              <Flag className="h-5 w-5 text-blue-600 shrink-0" aria-hidden="true" />
              <h2 className="font-bold text-blue-900">NIST AI RMF 1.0</h2>
              <span className="ml-auto text-xs font-mono text-blue-500">NIST AI 100-1</span>
            </div>
            <ul className="space-y-1.5 text-sm text-blue-800">
              <li>• Published by NIST, January 2023</li>
              <li>• Voluntary — no certification, no penalties</li>
              <li>• Four functions: GOVERN, MAP, MEASURE, MANAGE</li>
              <li>• Free framework; flexible and principles-based</li>
              <li>• Referenced in Colorado AI Act guidance</li>
              <li>• De facto US AI governance standard</li>
            </ul>
          </Card>
          <Card className="border-purple-200 bg-purple-50">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="h-5 w-5 text-purple-600 shrink-0" aria-hidden="true" />
              <h2 className="font-bold text-purple-900">ISO/IEC 42001:2023</h2>
              <span className="ml-auto text-xs font-mono text-purple-500">ISO 42001</span>
            </div>
            <ul className="space-y-1.5 text-sm text-purple-900">
              <li>• Published by ISO/IEC, December 2023</li>
              <li>• Certifiable — third-party audit available</li>
              <li>• PDCA management system (like ISO 27001)</li>
              <li>• Certification cost: $15K–$60K+</li>
              <li>• EU AI Act harmonized standard candidate</li>
              <li>• International standard for enterprise/EU use</li>
            </ul>
          </Card>
        </div>

        {/* Comparison table */}
        <div>
          <h2 className="text-xl font-bold text-neutral-900 mb-5">Detailed Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-4 py-3 font-semibold text-neutral-500 uppercase tracking-wider text-xs w-48">
                    Attribute
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-blue-700 uppercase tracking-wider text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <Flag className="h-3.5 w-3.5" aria-hidden="true" />
                      NIST AI RMF 1.0
                    </span>
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-purple-700 uppercase tracking-wider text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                      ISO/IEC 42001
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}>
                    <td className="px-4 py-3 font-medium text-neutral-700 align-top">
                      {row.attribute}
                    </td>
                    <td className="px-4 py-3 text-neutral-700 align-top">{row.nist}</td>
                    <td className="px-4 py-3 text-neutral-700 align-top">{row.iso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Decision guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="font-bold text-blue-900 mb-3">Choose NIST AI RMF if...</h2>
            <ul className="space-y-2">
              {CHOOSE_NIST.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-blue-800">
                  <Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
            <h2 className="font-bold text-purple-900 mb-3">Choose ISO/IEC 42001 if...</h2>
            <ul className="space-y-2">
              {CHOOSE_ISO.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-purple-800">
                  <Check className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* They're not mutually exclusive */}
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">
            They&apos;re Not Mutually Exclusive
          </h2>
          <p className="text-sm text-brand-800 mb-4">
            Most mature AI governance programs use both. The common path: start with NIST AI RMF to build your governance program and internal processes, then layer on ISO/IEC 42001 certification when external validation becomes a business requirement. ISO 42001 is structurally compatible with NIST AI RMF — the four NIST functions map cleanly to ISO 42001 clauses.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: "Phase 1",
                title: "Start with NIST AI RMF",
                body: "Build your AI inventory, governance structure, and impact assessment processes using NIST's GOVERN/MAP/MEASURE/MANAGE framework.",
              },
              {
                step: "Phase 2",
                title: "Gap analysis for ISO 42001",
                body: "Map your NIST-aligned controls to ISO 42001 clauses. Identify and close gaps. Typically 20–40% of controls are already satisfied.",
              },
              {
                step: "Phase 3",
                title: "ISO 42001 certification",
                body: "Engage an accredited certification body. Pass stage 1 (documentation review) and stage 2 (on-site audit). Receive certificate.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-lg bg-white border border-brand-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
                    {item.step.split(" ")[1]}
                  </span>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-brand-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/checker"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800 transition-colors"
          >
            Check My Compliance
          </Link>
          <Link
            href="/directory/categories/governance-consulting"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Find Framework Consultants
          </Link>
          <Link
            href="/compare/colorado-vs-eu-ai-act"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Colorado vs. EU AI Act →
          </Link>
        </div>
      </div>
    </>
  );
}
