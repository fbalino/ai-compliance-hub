import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

interface CategoryMeta {
  label: string;
  icon: string;
  description: string;
  longDescription: string;
  regulations: string[];
}

const CATEGORIES: Record<string, CategoryMeta> = {
  "bias-audit": {
    label: "Bias Auditors",
    icon: "🔬",
    description:
      "Firms that conduct algorithmic bias and fairness audits required by NYC LL 144, Colorado AI Act, and other laws.",
    longDescription:
      "Bias auditors assess AI systems for discriminatory outcomes across protected classes. NYC Local Law 144 requires annual third-party bias audits for hiring tools. The Colorado AI Act and other laws have similar requirements. These firms conduct statistical testing, disparate impact analysis, and produce the audit summaries required by law.",
    regulations: ["NYC LL 144", "Colorado AI Act", "EU AI Act"],
  },
  "governance-consulting": {
    label: "Governance Consulting",
    icon: "🏛",
    description:
      "Consultants who build AI governance programs, risk management frameworks, and compliance policies.",
    longDescription:
      "AI governance consultants help organizations build the policies, procedures, and oversight structures needed to comply with AI regulations. They align internal practices with NIST AI RMF, ISO 42001, and regulatory requirements. Engagements typically include risk register development, policy drafting, and board-level governance program design.",
    regulations: ["EU AI Act", "NIST AI RMF", "ISO 42001"],
  },
  legal: {
    label: "Legal & Compliance",
    icon: "⚖️",
    description:
      "Law firms and legal consultants specializing in AI regulatory compliance and risk assessment.",
    longDescription:
      "AI law specialists advise on regulatory interpretation, compliance strategy, and risk mitigation. They draft AI use policies, review vendor contracts for compliance risk, provide privileged legal assessments, and represent clients in enforcement actions. Essential for navigating ambiguous requirements and multi-jurisdictional obligations.",
    regulations: ["EU AI Act", "Colorado AI Act", "State Laws"],
  },
  "compliance-software": {
    label: "Compliance Software",
    icon: "💻",
    description:
      "SaaS platforms for AI risk assessment, documentation, policy management, and audit trails.",
    longDescription:
      "AI compliance platforms provide the tooling for continuous compliance monitoring, documentation generation, and audit trail management. Features typically include model risk cards, impact assessment workflows, policy libraries, and evidence collection for regulatory audits. Designed for organizations deploying multiple AI systems at scale.",
    regulations: ["EU AI Act", "ISO 42001", "NIST AI RMF"],
  },
  training: {
    label: "Training & Education",
    icon: "📚",
    description:
      "AI literacy, compliance training, and certification programs for teams and executives.",
    longDescription:
      "AI compliance training providers offer courses, certifications, and custom programs for legal, compliance, engineering, and executive teams. The EU AI Act explicitly requires AI literacy training for staff deploying high-risk AI systems. Programs range from awareness training to technical deep-dives on bias testing methodology.",
    regulations: ["EU AI Act", "General Compliance"],
  },
};

// Demo provider data per category
const CATEGORY_PROVIDERS: Record<string, Array<{
  slug: string;
  name: string;
  tagline: string;
  verified: boolean;
  specializations: string[];
  jurisdictions: string[];
  founded?: string;
}>> = {
  "bias-audit": [
    {
      slug: "holistic-ai",
      name: "Holistic AI",
      tagline: "AI governance, assurance, and compliance for enterprise teams.",
      verified: true,
      specializations: ["Bias Audits", "EU AI Act", "Risk Assessment", "NYC LL 144"],
      jurisdictions: ["US", "EU", "UK"],
      founded: "2018",
    },
    {
      slug: "babl-ai",
      name: "BABL AI",
      tagline: "Independent bias audits compliant with NYC LL 144 and emerging US laws.",
      verified: true,
      specializations: ["NYC LL 144", "Algorithmic Audits", "EEOC", "Colorado AI Act"],
      jurisdictions: ["US"],
      founded: "2021",
    },
    {
      slug: "orcaa",
      name: "ORCAA",
      tagline: "Algorithm accountability audit firm founded by prominent AI ethics researchers.",
      verified: true,
      specializations: ["Algorithmic Audits", "NYC LL 144", "Fair Housing", "Fairness Testing"],
      jurisdictions: ["US"],
      founded: "2017",
    },
    {
      slug: "impartial-ai",
      name: "Impartial AI",
      tagline: "Automated bias detection and annual audit reports for hiring tools.",
      verified: false,
      specializations: ["NYC LL 144", "Hiring AI", "Bias Testing"],
      jurisdictions: ["US"],
    },
  ],
  "governance-consulting": [
    {
      slug: "aletheia-ai",
      name: "AletheiAI",
      tagline: "Enterprise AI governance strategy and NIST AI RMF implementation.",
      verified: true,
      specializations: ["NIST AI RMF", "EU AI Act", "AI Strategy", "ISO 42001"],
      jurisdictions: ["US", "EU"],
    },
    {
      slug: "responsible-ai-institute",
      name: "Responsible AI Institute",
      tagline: "AI governance certifications and consulting for enterprise and government.",
      verified: true,
      specializations: ["AI Governance", "Certification", "Risk Management"],
      jurisdictions: ["US", "EU"],
      founded: "2019",
    },
    {
      slug: "ai-policy-lab",
      name: "AI Policy Lab",
      tagline: "Strategic AI policy consulting for enterprises navigating global regulations.",
      verified: false,
      specializations: ["Policy Development", "Regulatory Strategy", "Multi-jurisdictional"],
      jurisdictions: ["US", "EU", "UK"],
    },
  ],
  legal: [
    {
      slug: "fieldfisher-ai",
      name: "Fieldfisher — AI Practice",
      tagline: "EU AI Act compliance counsel and cross-border AI regulatory advice.",
      verified: true,
      specializations: ["EU AI Act", "GDPR Intersection", "Product Liability", "Data Protection"],
      jurisdictions: ["EU", "UK"],
      founded: "1980",
    },
    {
      slug: "wiley-ai-law",
      name: "Wiley Rein — AI & Tech",
      tagline: "US AI regulatory compliance, government contracting, and policy advocacy.",
      verified: false,
      specializations: ["US Regulatory", "Government Contracting", "Policy", "State Laws"],
      jurisdictions: ["US"],
    },
    {
      slug: "venable-ai",
      name: "Venable LLP — AI Group",
      tagline: "AI regulatory risk assessment, contract review, and enforcement defense.",
      verified: false,
      specializations: ["Risk Assessment", "Contract Review", "FTC", "State AI Laws"],
      jurisdictions: ["US"],
    },
  ],
  "compliance-software": [
    {
      slug: "credo-ai",
      name: "Credo AI",
      tagline: "AI governance platform for responsible AI development and deployment.",
      verified: true,
      specializations: ["AI Governance", "Policy Management", "Compliance Tracking", "EU AI Act"],
      jurisdictions: ["US", "EU"],
      founded: "2020",
    },
    {
      slug: "fairly-ai",
      name: "Fairly AI",
      tagline: "AI compliance automation platform for financial services and healthcare.",
      verified: false,
      specializations: ["Compliance Automation", "Risk Management", "Financial Services"],
      jurisdictions: ["US", "EU"],
    },
    {
      slug: "vanta-ai",
      name: "Vanta — AI Compliance",
      tagline: "Automated AI compliance evidence collection and audit readiness.",
      verified: false,
      specializations: ["Compliance Automation", "Audit Readiness", "SOC 2", "ISO 42001"],
      jurisdictions: ["US", "EU"],
    },
  ],
  training: [
    {
      slug: "ai-governance-professional",
      name: "AI Governance Professional (AIGP)",
      tagline: "The leading certification program for AI governance practitioners worldwide.",
      verified: true,
      specializations: ["AI Governance", "Certification", "IAPP"],
      jurisdictions: ["US", "EU", "Global"],
      founded: "2023",
    },
    {
      slug: "isaca-ai-audit",
      name: "ISACA — AI Audit Training",
      tagline: "AI auditing frameworks and certification for IT audit and risk professionals.",
      verified: true,
      specializations: ["AI Audit", "Risk Management", "IT Governance"],
      jurisdictions: ["US", "EU", "Global"],
    },
  ],
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES[slug];
  if (!cat) return {};

  return {
    title: `${cat.label} — AI Compliance Provider Directory`,
    description: cat.description,
    alternates: {
      canonical: `${SITE_URL}/directory/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = CATEGORIES[slug];
  if (!cat) notFound();

  const providers = CATEGORY_PROVIDERS[slug] ?? [];

  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Provider Directory", url: "/directory" },
    { name: cat.label, url: `/directory/categories/${slug}` },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Provider Directory", href: "/directory" },
              { label: cat.label },
            ]}
          />
          <div className="mt-4 flex items-start gap-4">
            <span className="text-4xl" role="img" aria-label={cat.label}>
              {cat.icon}
            </span>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                {cat.label}
              </h1>
              <p className="mt-2 text-lg text-neutral-600 max-w-2xl">
                {cat.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        {/* What are these providers */}
        <section className="prose prose-neutral max-w-none">
          <p className="text-neutral-600 leading-relaxed">{cat.longDescription}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm font-medium text-neutral-500">Relevant regulations:</span>
            {cat.regulations.map((reg) => (
              <span
                key={reg}
                className="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700"
              >
                {reg}
              </span>
            ))}
          </div>
        </section>

        {/* Provider list */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-neutral-900">
              {providers.length > 0 ? `${providers.length} Providers` : "Providers"}
            </h2>
            <span className="text-xs text-neutral-400">
              Sample listings — more being added
            </span>
          </div>

          {providers.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {providers.map((provider) => (
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
                    {provider.founded && (
                      <p className="text-xs text-neutral-400 mb-1.5">Est. {provider.founded}</p>
                    )}
                    <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                      {provider.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {provider.specializations.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {provider.jurisdictions.map((j) => (
                        <Badge key={j} variant="default">{j}</Badge>
                      ))}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="text-center py-10">
              <p className="text-neutral-500">Providers in this category are being added shortly.</p>
              <Link href="/directory" className="mt-3 inline-block text-sm font-medium text-brand-700 hover:text-brand-900 transition-colors">
                Browse all categories →
              </Link>
            </Card>
          )}
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-brand-50 border border-brand-100 p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h2 className="font-bold text-brand-900">
                Are you a {cat.label.toLowerCase().replace(/s$/, "")}?
              </h2>
              <p className="mt-1 text-sm text-brand-700">
                Get listed in this directory and reach businesses looking for your expertise.
              </p>
            </div>
            <a
              href="mailto:providers@aicompliancehub.com"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors"
            >
              Apply to List
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
