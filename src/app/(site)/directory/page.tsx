import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "AI Compliance Provider Directory — Find Auditors, Lawyers & Software",
  description:
    "Find verified AI compliance experts: bias auditors, governance consultants, legal counsel, and compliance software platforms. Searchable directory with specialization filters.",
  alternates: {
    canonical: `${SITE_URL}/directory`,
  },
};

const CATEGORIES = [
  {
    slug: "bias-audit",
    label: "Bias Auditors",
    icon: "🔬",
    count: 12,
    description:
      "Firms that conduct algorithmic bias and fairness audits required by NYC LL 144, Colorado AI Act, and other laws.",
    regulations: ["NYC LL 144", "Colorado AI Act"],
  },
  {
    slug: "governance-consulting",
    label: "Governance Consulting",
    icon: "🏛",
    count: 18,
    description:
      "Consultants who build AI governance programs, risk management frameworks, and compliance policies.",
    regulations: ["EU AI Act", "NIST AI RMF"],
  },
  {
    slug: "legal",
    label: "Legal & Compliance",
    icon: "⚖️",
    count: 14,
    description:
      "Law firms and legal consultants specializing in AI regulatory compliance and risk assessment.",
    regulations: ["EU AI Act", "Colorado AI Act", "State Laws"],
  },
  {
    slug: "compliance-software",
    label: "Compliance Software",
    icon: "💻",
    count: 9,
    description:
      "SaaS platforms for AI risk assessment, documentation, policy management, and audit trails.",
    regulations: ["EU AI Act", "ISO 42001"],
  },
  {
    slug: "training",
    label: "Training & Education",
    icon: "📚",
    count: 7,
    description:
      "AI literacy, compliance training, and certification programs for teams and executives.",
    regulations: ["EU AI Act", "General"],
  },
];

const FEATURED_PROVIDERS = [
  {
    slug: "holistic-ai",
    name: "Holistic AI",
    category: "Bias Auditors",
    tagline: "AI governance, assurance, and compliance for enterprise teams.",
    verified: true,
    specializations: ["Bias Audits", "EU AI Act", "Risk Assessment"],
    jurisdictions: ["US", "EU", "UK"],
  },
  {
    slug: "credo-ai",
    name: "Credo AI",
    category: "Compliance Software",
    tagline: "AI governance platform for responsible AI development and deployment.",
    verified: true,
    specializations: ["AI Governance", "Policy Management", "Compliance Tracking"],
    jurisdictions: ["US", "EU"],
  },
  {
    slug: "babl-ai",
    name: "BABL AI",
    category: "Bias Auditors",
    tagline: "Independent bias audits compliant with NYC LL 144 and emerging US laws.",
    verified: true,
    specializations: ["NYC LL 144", "Algorithmic Audits", "EEOC"],
    jurisdictions: ["US"],
  },
  {
    slug: "fairly-ai",
    name: "Fairly AI",
    category: "Compliance Software",
    tagline: "AI compliance automation platform for financial services and healthcare.",
    verified: false,
    specializations: ["Compliance Automation", "Risk Management", "Financial Services"],
    jurisdictions: ["US", "EU"],
  },
  {
    slug: "orcaa",
    name: "ORCAA",
    category: "Bias Auditors",
    tagline: "Algorithm accountability audit firm founded by prominent AI ethics researchers.",
    verified: true,
    specializations: ["Algorithmic Audits", "NYC LL 144", "Fair Housing"],
    jurisdictions: ["US"],
  },
  {
    slug: "ai-forensics",
    name: "AlgorithmWatch",
    category: "Governance Consulting",
    tagline: "AI impact assessment and algorithmic transparency for public and private sector.",
    verified: false,
    specializations: ["Impact Assessments", "EU AI Act", "Public Sector"],
    jurisdictions: ["EU"],
  },
];

export default function DirectoryPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Provider Directory", url: "/directory" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Provider Directory" }]}
          />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                AI Compliance Provider Directory
              </h1>
              <p className="mt-2 text-lg text-neutral-600 max-w-2xl">
                Verified auditors, consultants, lawyers, and software platforms specializing in AI regulatory compliance.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:items-end gap-1.5">
              <span className="text-2xl font-bold text-neutral-900">60+</span>
              <span className="text-sm text-neutral-500">verified providers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">

        {/* Browse by category */}
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-5">
            Browse by Specialization
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/directory/categories/${cat.slug}`}
                className="group block"
              >
                <Card hover className="h-full group-hover:border-brand-300 transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0" role="img" aria-label={cat.label}>
                      {cat.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-neutral-900 group-hover:text-brand-800 transition-colors">
                          {cat.label}
                        </h3>
                        <span className="shrink-0 text-xs font-medium text-neutral-500">
                          {cat.count} providers
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">
                        {cat.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {cat.regulations.map((reg) => (
                          <span
                            key={reg}
                            className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600"
                          >
                            {reg}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured providers */}
        <section>
          <div className="flex items-end justify-between mb-5">
            <h2 className="text-lg font-bold text-neutral-900">Featured Providers</h2>
            <span className="text-xs text-neutral-500">Sample listings — full directory coming soon</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_PROVIDERS.map((provider) => (
              <Link
                key={provider.slug}
                href={`/directory/providers/${provider.slug}`}
                className="group block"
              >
                <Card hover className="h-full group-hover:border-brand-300 transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-neutral-900 group-hover:text-brand-800 transition-colors">
                      {provider.name}
                    </h3>
                    {provider.verified && (
                      <span className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 rounded-full px-2 py-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-brand-700 mb-2">{provider.category}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                    {provider.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {provider.specializations.slice(0, 3).map((spec) => (
                      <span
                        key={spec}
                        className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {provider.jurisdictions.map((j) => (
                      <Badge key={j} variant="default">
                        {j}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA — list your business */}
        <section className="rounded-xl border border-brand-200 bg-brand-50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-900">
                Are you a compliance provider?
              </h2>
              <p className="mt-1.5 text-sm text-brand-700 max-w-xl">
                List your firm in our directory and reach businesses actively looking for AI compliance help.
                Featured listings include verified badges, lead routing, and analytics dashboards.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-brand-700">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Starting at $99/month — featured placement in relevant categories
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Lead routing from compliance checker results
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Verified badge after vetting
                </li>
              </ul>
            </div>
            <div className="shrink-0">
              <a
                href="mailto:providers@aicompliancehub.com"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800 transition-colors shadow-sm"
              >
                Get Listed
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
