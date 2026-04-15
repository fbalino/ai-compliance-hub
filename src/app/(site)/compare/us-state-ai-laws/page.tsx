import type { Metadata } from "next";
import Link from "next/link";
import { Mountain, Landmark, Wheat, TreePine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "US State AI Laws Compared: Colorado, NYC, Illinois & California (2026)",
  description:
    "Compare the four most significant US state and local AI compliance laws: Colorado AI Act, NYC Local Law 144, Illinois AIVIRA, and California AB 2013. Scope, obligations, penalties, and enforcement.",
  alternates: {
    canonical: `${SITE_URL}/compare/us-state-ai-laws`,
  },
  openGraph: {
    title: "US State AI Laws Compared (2026)",
    description:
      "Side-by-side comparison of Colorado AI Act, NYC Local Law 144, Illinois AIVIRA, and California AB 2013.",
    type: "article",
    url: `${SITE_URL}/compare/us-state-ai-laws`,
  },
};

const LAWS: {
  slug: string;
  flag: LucideIcon;
  name: string;
  shortName: string;
  jurisdiction: string;
  effectiveDate: string;
  focus: string;
  scope: string;
  trigger: string;
  mainObligation: string;
  penalty: string;
  enforcement: string;
  privateAction: boolean;
  keyColor: string;
}[] = [
  {
    slug: "colorado-ai-act",
    flag: Mountain,
    name: "Colorado AI Act",
    shortName: "CO SB 24-205",
    jurisdiction: "Colorado (statewide)",
    effectiveDate: "June 30, 2026",
    focus: "High-risk AI in consequential decisions",
    scope: "Any deployer/developer of AI making consequential decisions affecting CO consumers",
    trigger: "Consequential decision in 8 domains (employment, credit, healthcare, housing, etc.)",
    mainObligation: "Impact assessment, consumer disclosures, human review right, governance program",
    penalty: "$20,000 per violation",
    enforcement: "Colorado Attorney General",
    privateAction: false,
    keyColor: "blue",
  },
  {
    slug: "nyc-local-law-144",
    flag: Landmark,
    name: "NYC Local Law 144",
    shortName: "NYC LL 144",
    jurisdiction: "New York City",
    effectiveDate: "July 5, 2023 (already in effect)",
    focus: "AI hiring & promotion tools (AEDTs)",
    scope: "Employers/agencies using AEDTs to screen NYC-based candidates or employees",
    trigger: "Automated Employment Decision Tool (AEDT) used for hiring/promotion in NYC",
    mainObligation: "Annual independent bias audit, public posting of results, 10-day advance notice to candidates",
    penalty: "Up to $1,500 per violation per day",
    enforcement: "NYC Dept. of Consumer and Worker Protection (DCWP)",
    privateAction: false,
    keyColor: "purple",
  },
  {
    slug: "illinois-ai-video-interview-act",
    flag: Wheat,
    name: "Illinois AIVIRA",
    shortName: "IL AIVIRA",
    jurisdiction: "Illinois (statewide)",
    effectiveDate: "January 1, 2020 (already in effect)",
    focus: "AI analysis of employment video interviews",
    scope: "Employers using AI to analyze video interviews of Illinois applicants",
    trigger: "AI analysis of video interview content (facial expression, tone, word choice)",
    mainObligation: "Pre-interview notice, explanation of AI characteristics, written consent, 30-day deletion on request",
    penalty: "Injunctive relief + actual damages (private right of action)",
    enforcement: "Private litigation",
    privateAction: true,
    keyColor: "green",
  },
  {
    slug: "california-ab-2013",
    flag: TreePine,
    name: "California AB 2013",
    shortName: "CA AB 2013",
    jurisdiction: "California (statewide)",
    effectiveDate: "January 1, 2026",
    focus: "AI training data transparency",
    scope: "Developers of generative AI systems above compute threshold made available to CA consumers",
    trigger: "Generative AI trained with >~10²³ FLOPs made publicly available in California",
    mainObligation: "Public disclosure of training data sources, licensing, biases, synthetic data usage",
    penalty: "Injunctive relief + actual damages",
    enforcement: "CA Attorney General + private litigation",
    privateAction: true,
    keyColor: "orange",
  },
];

const TABLE_ROWS = [
  {
    label: "Jurisdiction",
    values: ["Colorado (statewide)", "New York City", "Illinois (statewide)", "California (statewide)"],
  },
  {
    label: "In effect since",
    values: ["June 30, 2026", "July 5, 2023", "January 1, 2020", "January 1, 2026"],
  },
  {
    label: "Primary focus",
    values: [
      "High-risk AI in 8 consequential decision domains",
      "AI hiring/promotion tools (AEDTs)",
      "AI video interview analysis",
      "Generative AI training data transparency",
    ],
  },
  {
    label: "Who must comply",
    values: [
      "Deployers + developers of high-risk AI affecting CO consumers",
      "Employers/agencies using AEDTs for NYC-based candidates",
      "Employers using AI video analysis for IL applicants",
      "Generative AI developers above compute threshold",
    ],
  },
  {
    label: "Key obligation",
    values: [
      "Impact assessment + consumer appeal right",
      "Annual bias audit + public disclosure",
      "Consent + notice + deletion rights",
      "Training data transparency disclosure",
    ],
  },
  {
    label: "Max penalty",
    values: [
      "$20,000/violation",
      "$1,500/day/violation",
      "Actual damages",
      "Actual damages",
    ],
  },
  {
    label: "Private lawsuit?",
    values: ["No", "No", "Yes", "Yes"],
  },
  {
    label: "Enforcement agency",
    values: ["Colorado AG", "NYC DCWP", "Courts only", "California AG + Courts"],
  },
  {
    label: "Sector scope",
    values: ["All sectors using high-risk AI", "Employment only", "Employment (video) only", "AI developers (generative)"],
  },
];

export default function UsStateAiLawsPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Comparisons", url: "/compare" },
    { name: "US State AI Laws Compared", url: "/compare/us-state-ai-laws" },
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "US State AI Laws Compared: Colorado, NYC, Illinois & California (2026)",
    description:
      "Side-by-side comparison of the four most significant US state and local AI compliance laws.",
    url: `${SITE_URL}/compare/us-state-ai-laws`,
    dateModified: "2026-04-13",
  };

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Comparisons", href: "/compare" },
              { label: "US State AI Laws" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            US State AI Laws Compared
          </h1>
          <p className="mt-3 text-lg text-neutral-600 max-w-3xl">
            Four states and cities have enacted substantive AI compliance laws. Here's how Colorado, New York City, Illinois, and California compare on scope, obligations, and enforcement.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Quick overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {LAWS.map((law) => (
            <Link
              key={law.slug}
              href={`/regulations/${law.slug}`}
              className="group rounded-xl border border-neutral-200 bg-white p-4 hover:border-brand-300 hover:shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
                  <law.flag className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-xs text-neutral-500 font-mono">{law.shortName}</div>
                  <div className="font-semibold text-sm text-neutral-900 group-hover:text-brand-800 transition-colors">
                    {law.name}
                  </div>
                </div>
              </div>
              <div className="text-xs text-neutral-500 mb-1">{law.jurisdiction}</div>
              <div className="text-xs text-neutral-600 leading-relaxed">{law.focus}</div>
              <div className="mt-2 text-xs font-medium text-brand-700 group-hover:underline">
                Full guide →
              </div>
            </Link>
          ))}
        </div>

        {/* Full comparison table */}
        <h2 className="text-xl font-bold text-neutral-900 mb-5">Side-by-Side Comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="text-left px-4 py-3 font-semibold text-neutral-500 uppercase tracking-wider text-xs w-36">
                  Attribute
                </th>
                {LAWS.map((law) => (
                  <th key={law.slug} className="text-left px-4 py-3 font-semibold text-neutral-700 uppercase tracking-wider text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <law.flag className="h-3.5 w-3.5" aria-hidden="true" />
                      {law.shortName}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {TABLE_ROWS.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}>
                  <td className="px-4 py-3 font-medium text-neutral-600 align-top text-xs">
                    {row.label}
                  </td>
                  {row.values.map((val, j) => (
                    <td key={j} className="px-4 py-3 text-neutral-700 align-top text-xs">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Analysis section */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Who Needs to Worry About What</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "HR Tech / Hiring Platforms",
                  laws: ["NYC Local Law 144", "Illinois AIVIRA"],
                  body: "If you offer automated resume screening, candidate scoring, or video interview analysis to employers, you need annual bias audits (NYC) and consent/deletion workflows (Illinois). These apply to your customers' use of your platform.",
                },
                {
                  title: "Generative AI Developers / LLM Companies",
                  laws: ["California AB 2013", "EU AI Act (GPAI)"],
                  body: "If you train large language models or image generation models and make them available to US or EU users, California AB 2013 requires training data transparency disclosure. EU AI Act adds additional GPAI requirements.",
                },
                {
                  title: "Enterprise AI Deployers (Any Sector)",
                  laws: ["Colorado AI Act", "EU AI Act"],
                  body: "If you deploy AI that makes consequential decisions affecting Colorado consumers in employment, credit, healthcare, or housing, the Colorado AI Act requires impact assessments and consumer disclosures from June 2026.",
                },
                {
                  title: "Financial Services",
                  laws: ["Colorado AI Act", "NYC Local Law 144", "EU AI Act"],
                  body: "Financial institutions deploying AI for credit, insurance underwriting, or employment screening face the most overlapping obligations — Colorado's high-risk AI rules, NYC's hiring AI audit requirements, and EU AI Act high-risk classification.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-neutral-200 bg-white p-5">
                  <h3 className="font-semibold text-neutral-900 text-sm mb-1">{item.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.laws.map((law) => (
                      <span
                        key={law}
                        className="inline-flex items-center rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-800"
                      >
                        {law}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Key Insight: The Patchwork Problem</h2>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm text-amber-900 leading-relaxed">
                Unlike the EU AI Act — which creates a unified framework across 27 countries — US AI compliance is a growing patchwork of state and local laws, each with different triggers, obligations, and enforcement mechanisms. A single AI product used across the US may be subject to NYC's bias audit requirements, Colorado's impact assessment mandate, Illinois's consent and deletion rules, and California's training data disclosure requirements — simultaneously.
              </p>
              <p className="mt-3 text-sm text-amber-900 leading-relaxed">
                The practical solution is to build the most demanding requirement into your baseline. A compliance program designed for the Colorado AI Act and NYC LL 144 simultaneously — combined with California AB 2013 disclosure documentation — will satisfy most US AI compliance obligations as additional states pass laws.
              </p>
              <div className="mt-4">
                <Link
                  href="/checker"
                  className="inline-flex items-center gap-2 rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800 transition-colors"
                >
                  Check My Compliance Obligations
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related links */}
        <div className="mt-10 flex flex-wrap gap-3">
          {LAWS.map((law) => (
            <Link
              key={law.slug}
              href={`/regulations/${law.slug}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              <law.flag className="h-3.5 w-3.5" aria-hidden="true" />
              {law.name} Guide
            </Link>
          ))}
          <Link
            href="/compare/colorado-vs-eu-ai-act"
            className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Colorado vs. EU AI Act →
          </Link>
        </div>
      </div>
    </>
  );
}
