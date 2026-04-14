import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "AI Regulation by Industry: Healthcare, HR, Fintech & Insurance (2026)",
  description:
    "Which AI regulations apply to your industry? Healthcare, HR/recruiting, fintech, and insurance compliance matrix for EU AI Act, NYC LL 144, Colorado AI Act, and Illinois AIVIRA.",
  alternates: {
    canonical: `${SITE_URL}/compare/ai-regulation-by-industry`,
  },
  openGraph: {
    title: "AI Regulation by Industry: Who Must Comply With What",
    description:
      "Industry compliance matrix: which AI regulations apply to healthcare, HR-recruiting, fintech, and insurance — and what each requires.",
    type: "article",
    url: `${SITE_URL}/compare/ai-regulation-by-industry`,
  },
};

const REGULATIONS = [
  { key: "eu", label: "EU AI Act", short: "Reg. 2024/1689", color: "yellow" },
  { key: "nyc", label: "NYC LL 144", short: "NYC Local Law 144", color: "blue" },
  { key: "co", label: "Colorado AI Act", short: "CO SB 24-205", color: "green" },
  { key: "il", label: "IL AIVIRA", short: "Illinois AIVIRA", color: "purple" },
];

interface Cell {
  applies: boolean;
  note: string;
}

interface IndustryRow {
  industry: string;
  icon: string;
  eu: Cell;
  nyc: Cell;
  co: Cell;
  il: Cell;
}

const MATRIX: IndustryRow[] = [
  {
    industry: "Healthcare",
    icon: "🏥",
    eu: {
      applies: true,
      note: "Annex III Class IIb+ medical device AI is high-risk. Clinical decision support, diagnosis, treatment recommendation AI requires conformity assessment, CE marking, and post-market monitoring.",
    },
    nyc: {
      applies: false,
      note: "NYC LL 144 covers employment decisions only — not clinical AI. Healthcare employers using AI for hiring are covered.",
    },
    co: {
      applies: true,
      note: "AI that makes consequential decisions in healthcare (diagnosis, treatment, medication) is high-risk under CO AI Act. Impact assessment + consumer notice required.",
    },
    il: {
      applies: false,
      note: "Illinois AIVIRA covers employment AI (video interview analysis, resume screening) only. Clinical AI is not covered.",
    },
  },
  {
    industry: "HR / Recruiting",
    icon: "👥",
    eu: {
      applies: true,
      note: "Annex III Item 2: AI used for recruitment, selection, CV screening, promotion, and termination is high-risk. Full conformity assessment required.",
    },
    nyc: {
      applies: true,
      note: "Core use case for NYC LL 144. Any automated employment decision tool (AEDT) used for NYC-based hiring or promotion must have an annual third-party bias audit and public posting.",
    },
    co: {
      applies: true,
      note: "Employment decisions (hiring, promotion, termination, compensation) affecting Colorado employees are covered. Impact assessment + consumer rights required.",
    },
    il: {
      applies: true,
      note: "Illinois AIVIRA (HB 2557) specifically covers AI video interview analysis tools. Employers must notify candidates and report demographic data annually to the IDHR.",
    },
  },
  {
    industry: "Fintech / Lending",
    icon: "🏦",
    eu: {
      applies: true,
      note: "Annex III Item 5b: AI for creditworthiness assessment and credit scoring is high-risk. Full conformity requirements apply. GDPR Art. 22 profiling rules also apply.",
    },
    nyc: {
      applies: false,
      note: "NYC LL 144 covers employment decisions only — lending AI is not covered under this law. Federal ECOA/FCRA and NYC Human Rights Law may apply separately.",
    },
    co: {
      applies: true,
      note: "Credit and lending decisions (loan approvals, pricing, leases) affecting Colorado consumers are covered. Impact assessment + opt-out + adverse action notice required.",
    },
    il: {
      applies: false,
      note: "Illinois AIVIRA covers employment AI only — lending and credit AI is out of scope.",
    },
  },
  {
    industry: "Insurance",
    icon: "🛡️",
    eu: {
      applies: true,
      note: "Annex III Item 5c: AI for life and health insurance risk assessment and pricing is high-risk. Third-party conformity assessment required for some uses.",
    },
    nyc: {
      applies: false,
      note: "NYC LL 144 covers employment decisions only — insurance underwriting AI is not covered unless used for employment purposes.",
    },
    co: {
      applies: true,
      note: "Insurance applications, pricing, and claims decisions affecting Colorado consumers are covered. Impact assessments, consumer notice, and opt-out rights required.",
    },
    il: {
      applies: false,
      note: "Illinois AIVIRA covers video interview AI only. Insurance AI is out of scope, though Illinois Department of Insurance has separate guidance on AI underwriting.",
    },
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-900",
    badge: "bg-yellow-100 text-yellow-800",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-900",
    badge: "bg-blue-100 text-blue-800",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-900",
    badge: "bg-green-100 text-green-800",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-900",
    badge: "bg-purple-100 text-purple-800",
  },
};

export default function AIRegulationByIndustryPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Comparisons", url: "/compare" },
    { name: "AI Regulation by Industry", url: "/compare/ai-regulation-by-industry" },
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "AI Regulation by Industry: Healthcare, HR, Fintech & Insurance (2026)",
    description:
      "Industry compliance matrix showing which AI regulations apply to healthcare, HR-recruiting, fintech, and insurance.",
    url: `${SITE_URL}/compare/ai-regulation-by-industry`,
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
              { label: "AI Regulation by Industry" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            AI Regulation by Industry
          </h1>
          <p className="mt-3 text-lg text-neutral-600 max-w-3xl">
            Which AI laws apply to your industry — and what they actually require. Healthcare, HR/recruiting, fintech, and insurance across the four major AI compliance frameworks.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {REGULATIONS.map((reg) => {
              const c = colorMap[reg.color];
              return (
                <span
                  key={reg.key}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${c.badge}`}
                >
                  {reg.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">

        {/* Regulation legend */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {REGULATIONS.map((reg) => {
            const c = colorMap[reg.color];
            return (
              <div
                key={reg.key}
                className={`rounded-lg border p-3 ${c.bg} ${c.border}`}
              >
                <p className={`font-semibold text-sm ${c.text}`}>{reg.label}</p>
                <p className={`text-xs mt-0.5 ${c.text} opacity-75`}>{reg.short}</p>
              </div>
            );
          })}
        </div>

        {/* Industry matrix */}
        <div className="space-y-6">
          {MATRIX.map((row) => (
            <div
              key={row.industry}
              className="rounded-xl border border-neutral-200 overflow-hidden"
            >
              {/* Industry header */}
              <div className="bg-neutral-50 border-b border-neutral-200 px-5 py-3 flex items-center gap-2">
                <span className="text-xl">{row.icon}</span>
                <h2 className="font-bold text-neutral-900 text-lg">{row.industry}</h2>
              </div>

              {/* Regulation cells */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
                {REGULATIONS.map((reg) => {
                  const cell = row[reg.key as keyof IndustryRow] as Cell;
                  const c = colorMap[reg.color];
                  return (
                    <div key={reg.key} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-semibold ${c.text}`}>{reg.label}</span>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            cell.applies
                              ? "bg-red-100 text-red-700"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {cell.applies ? "Applies" : "Not covered"}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed">{cell.note}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Important notes */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-900 mb-2">Important Notes</h2>
          <ul className="space-y-1.5 text-sm text-amber-800">
            <li>• This matrix shows the primary AI-specific regulations. Federal laws (ECOA, FCRA, HIPAA, ADA) and general anti-discrimination laws apply independently and may impose additional requirements.</li>
            <li>• "Not covered" means the specific law does not apply — it does not mean there are no applicable regulations in that sector.</li>
            <li>• Virginia HB 2094 (effective July 2026) follows the Colorado AI Act model and will add similar coverage for Virginia consumers across these industries.</li>
            <li>• This matrix reflects the law as of April 2026. Always verify with qualified legal counsel for your specific situation.</li>
          </ul>
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
            href="/directory"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Find Industry Experts
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
