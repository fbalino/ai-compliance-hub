import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { providerSchema, breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Review {
  id: string;
  authorName: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  isVerified: boolean;
}

interface ProviderData {
  id: string;
  slug: string;
  name: string;
  description: string;
  logoUrl?: string;
  websiteUrl?: string;
  foundedYear?: number;
  headquarters?: string;
  employeeCountRange?: string;
  tier: "free" | "premium" | "enterprise";
  isVerified: boolean;
  serviceTypes: string[];
  regulations: string[];
  industries: string[];
  reviews: Review[];
  averageRating?: number;
}

// ── Data fetching (will query Neon DB once credentials provisioned) ────────────

// Static sample providers — will be replaced with DB query once Neon is provisioned.
const STATIC_PROVIDERS: Record<string, ProviderData> = {
  "holistic-ai": {
    id: "holistic-ai",
    slug: "holistic-ai",
    name: "Holistic AI",
    description:
      "Holistic AI is a global AI governance, assurance, and compliance platform. They provide enterprises with tools and services to audit, monitor, and mitigate AI risks across EU AI Act, NYC Local Law 144, NIST AI RMF, and other frameworks. Services span algorithmic bias audits, risk assessments, technical documentation, and ongoing compliance monitoring.",
    websiteUrl: "https://holisticai.com",
    foundedYear: 2018,
    headquarters: "London, UK / New York, US",
    employeeCountRange: "50–200",
    tier: "premium",
    isVerified: true,
    serviceTypes: ["Bias Audits", "Risk Assessment", "Compliance Software", "EU AI Act Advisory"],
    regulations: ["EU AI Act", "NYC LL 144", "NIST AI RMF", "Colorado AI Act"],
    industries: ["Financial Services", "Healthcare", "HR Technology", "Retail"],
    reviews: [],
  },
  "babl-ai": {
    id: "babl-ai",
    slug: "babl-ai",
    name: "BABL AI",
    description:
      "BABL AI is an independent auditing firm specializing in algorithmic bias and fairness audits for automated employment decision tools. They are one of the leading auditors for NYC Local Law 144 compliance and have audited hundreds of hiring AI systems across industries. Their audits produce the publicly-postable summaries required by law.",
    websiteUrl: "https://bablai.com",
    foundedYear: 2021,
    headquarters: "New York, NY",
    employeeCountRange: "10–49",
    tier: "premium",
    isVerified: true,
    serviceTypes: ["Bias Audits", "NYC LL 144 Compliance", "Algorithmic Audits"],
    regulations: ["NYC LL 144", "Colorado AI Act", "EEOC Guidelines"],
    industries: ["HR Technology", "Financial Services", "Healthcare", "Enterprise"],
    reviews: [],
  },
  "orcaa": {
    id: "orcaa",
    slug: "orcaa",
    name: "ORCAA",
    description:
      "ORCAA (O'Neil Risk Consulting and Algorithmic Auditing) is an algorithm accountability auditing firm founded by Cathy O'Neil, author of 'Weapons of Math Destruction'. They conduct independent audits of algorithmic systems for bias, fairness, and transparency, with deep expertise in hiring, lending, and recidivism algorithms.",
    websiteUrl: "https://orcaarisk.com",
    foundedYear: 2017,
    headquarters: "New York, NY",
    employeeCountRange: "10–49",
    tier: "premium",
    isVerified: true,
    serviceTypes: ["Algorithmic Audits", "Bias Analysis", "Fair Housing", "NYC LL 144"],
    regulations: ["NYC LL 144", "Fair Housing Act", "ECOA", "Colorado AI Act"],
    industries: ["Financial Services", "HR Technology", "Criminal Justice", "Insurance"],
    reviews: [],
  },
  "credo-ai": {
    id: "credo-ai",
    slug: "credo-ai",
    name: "Credo AI",
    description:
      "Credo AI is an AI governance platform that helps enterprises build responsible AI programs at scale. The platform provides a centralized system for AI policy management, risk assessments, model cards, compliance tracking across EU AI Act and other frameworks, and evidence collection for audits.",
    websiteUrl: "https://credo.ai",
    foundedYear: 2020,
    headquarters: "San Francisco, CA",
    employeeCountRange: "50–200",
    tier: "premium",
    isVerified: true,
    serviceTypes: ["AI Governance Platform", "Policy Management", "Risk Assessment", "Compliance Tracking"],
    regulations: ["EU AI Act", "NIST AI RMF", "ISO 42001", "Colorado AI Act"],
    industries: ["Financial Services", "Healthcare", "Technology", "Enterprise"],
    reviews: [],
  },
  "fairly-ai": {
    id: "fairly-ai",
    slug: "fairly-ai",
    name: "Fairly AI",
    description:
      "Fairly AI is an AI compliance automation platform designed for financial services and healthcare organizations. It automates the evidence collection, documentation, and monitoring required for ongoing AI compliance, with pre-built workflows for model risk management and regulatory examination readiness.",
    websiteUrl: "https://fairly.ai",
    headquarters: "Toronto, Canada / New York, US",
    employeeCountRange: "10–49",
    tier: "free",
    isVerified: false,
    serviceTypes: ["Compliance Automation", "Model Risk Management", "Audit Readiness"],
    regulations: ["EU AI Act", "SR 11-7", "NIST AI RMF"],
    industries: ["Financial Services", "Healthcare", "Insurance"],
    reviews: [],
  },
  "aletheia-ai": {
    id: "aletheia-ai",
    slug: "aletheia-ai",
    name: "AletheiAI",
    description:
      "AletheiAI provides enterprise AI governance strategy and NIST AI RMF implementation services. Their consultants help organizations design and deploy AI governance programs, including risk registers, policy frameworks, board-level oversight structures, and vendor due diligence protocols.",
    headquarters: "Washington, DC",
    tier: "premium",
    isVerified: true,
    serviceTypes: ["AI Governance Strategy", "NIST AI RMF", "Policy Development", "Board Advisory"],
    regulations: ["NIST AI RMF", "EU AI Act", "ISO 42001", "Colorado AI Act"],
    industries: ["Government", "Defense", "Financial Services", "Healthcare"],
    reviews: [],
  },
  "responsible-ai-institute": {
    id: "responsible-ai-institute",
    slug: "responsible-ai-institute",
    name: "Responsible AI Institute",
    description:
      "The Responsible AI Institute (RAI Institute) provides AI governance certifications and consulting for enterprise and government organizations. Their RAI Certification program evaluates AI systems against a comprehensive framework covering fairness, explainability, accountability, and security.",
    websiteUrl: "https://responsible.ai",
    foundedYear: 2019,
    headquarters: "Austin, TX",
    employeeCountRange: "10–49",
    tier: "premium",
    isVerified: true,
    serviceTypes: ["AI Certification", "Governance Consulting", "Risk Assessment"],
    regulations: ["NIST AI RMF", "EU AI Act", "ISO 42001"],
    industries: ["Technology", "Healthcare", "Financial Services", "Government"],
    reviews: [],
  },
  "impartial-ai": {
    id: "impartial-ai",
    slug: "impartial-ai",
    name: "Impartial AI",
    description:
      "Impartial AI provides automated bias detection and annual audit reports specifically designed for NYC Local Law 144 compliance. Their platform streamlines the auditing process for employers using AI hiring tools, producing compliant audit summaries ready for public posting.",
    tier: "free",
    isVerified: false,
    serviceTypes: ["NYC LL 144 Audits", "Bias Detection", "Hiring AI Compliance"],
    regulations: ["NYC LL 144"],
    industries: ["HR Technology", "Staffing", "Enterprise"],
    reviews: [],
  },
  "ai-policy-lab": {
    id: "ai-policy-lab",
    slug: "ai-policy-lab",
    name: "AI Policy Lab",
    description:
      "AI Policy Lab provides strategic AI policy consulting for enterprises navigating global AI regulatory frameworks. Their advisors specialize in multi-jurisdictional compliance strategies, regulatory advocacy, and preparing organizations for emerging AI laws before they take effect.",
    tier: "free",
    isVerified: false,
    serviceTypes: ["Policy Development", "Regulatory Strategy", "Multi-jurisdictional Compliance"],
    regulations: ["EU AI Act", "Colorado AI Act", "UK AI Regulations", "Singapore AI Governance"],
    industries: ["Technology", "Financial Services", "Healthcare", "Retail"],
    reviews: [],
  },
  "fieldfisher-ai": {
    id: "fieldfisher-ai",
    slug: "fieldfisher-ai",
    name: "Fieldfisher — AI Practice",
    description:
      "Fieldfisher's AI practice group provides EU AI Act compliance counsel and cross-border AI regulatory advice for technology companies and enterprises deploying AI in Europe. Services include AI system classification, conformity assessment support, contractual compliance, and AI liability analysis.",
    websiteUrl: "https://fieldfisher.com",
    foundedYear: 1980,
    headquarters: "London / Brussels / Munich",
    tier: "free",
    isVerified: true,
    serviceTypes: ["EU AI Act Counsel", "GDPR Intersection", "Product Liability", "Regulatory Advice"],
    regulations: ["EU AI Act", "GDPR", "EU Product Liability Directive"],
    industries: ["Technology", "Financial Services", "Healthcare", "Manufacturing"],
    reviews: [],
  },
  "wiley-ai-law": {
    id: "wiley-ai-law",
    slug: "wiley-ai-law",
    name: "Wiley Rein — AI & Tech",
    description:
      "Wiley Rein's AI and Technology practice advises US companies on AI regulatory compliance, government contracting requirements, and policy advocacy. Their team monitors US federal agency AI guidance and state-level AI legislation to keep clients ahead of compliance obligations.",
    websiteUrl: "https://wiley.law",
    headquarters: "Washington, DC",
    tier: "free",
    isVerified: false,
    serviceTypes: ["US AI Regulatory", "Government Contracting", "Policy Advocacy", "State AI Laws"],
    regulations: ["Colorado AI Act", "NYC LL 144", "California AB 2013", "Federal AI Guidance"],
    industries: ["Government Contracting", "Technology", "Healthcare", "Financial Services"],
    reviews: [],
  },
  "venable-ai": {
    id: "venable-ai",
    slug: "venable-ai",
    name: "Venable LLP — AI Group",
    description:
      "Venable LLP's AI group provides AI regulatory risk assessment, contract review, and enforcement defense for technology companies and their enterprise customers. Their team advises on FTC AI-related enforcement risk and prepares clients for state-level AI law obligations.",
    websiteUrl: "https://venable.com",
    headquarters: "Washington, DC / New York",
    tier: "free",
    isVerified: false,
    serviceTypes: ["Risk Assessment", "Contract Review", "FTC Defense", "State AI Law Compliance"],
    regulations: ["FTC Guidelines", "Colorado AI Act", "NYC LL 144", "California AI Laws"],
    industries: ["Technology", "Retail", "Financial Services", "Healthcare"],
    reviews: [],
  },
  "vanta-ai": {
    id: "vanta-ai",
    slug: "vanta-ai",
    name: "Vanta — AI Compliance",
    description:
      "Vanta's AI compliance module extends their automated compliance platform to cover AI-specific frameworks including ISO 42001 and emerging AI regulations. The platform automates evidence collection, monitors AI system controls, and generates audit-ready reports.",
    websiteUrl: "https://vanta.com",
    headquarters: "San Francisco, CA",
    tier: "free",
    isVerified: false,
    serviceTypes: ["Compliance Automation", "Audit Readiness", "SOC 2", "ISO 42001"],
    regulations: ["ISO 42001", "NIST AI RMF", "EU AI Act"],
    industries: ["Technology", "SaaS", "Financial Services", "Healthcare"],
    reviews: [],
  },
  "ai-governance-professional": {
    id: "ai-governance-professional",
    slug: "ai-governance-professional",
    name: "AI Governance Professional (AIGP)",
    description:
      "The IAPP's AI Governance Professional (AIGP) credential is the leading certification program for AI governance practitioners. It covers global AI regulations, ethics frameworks, governance program design, and practical compliance skills. Holders are recognized across industries as qualified AI governance professionals.",
    websiteUrl: "https://iapp.org/certify/aigp/",
    foundedYear: 2023,
    headquarters: "Portsmouth, NH (IAPP)",
    tier: "free",
    isVerified: true,
    serviceTypes: ["AI Governance Certification", "Training", "Professional Development"],
    regulations: ["EU AI Act", "NIST AI RMF", "ISO 42001", "OECD AI Principles"],
    industries: ["Legal", "Compliance", "Technology", "Financial Services", "Healthcare"],
    reviews: [],
  },
  "isaca-ai-audit": {
    id: "isaca-ai-audit",
    slug: "isaca-ai-audit",
    name: "ISACA — AI Audit Training",
    description:
      "ISACA offers AI auditing frameworks, training programs, and certifications for IT audit and risk professionals. Their courses cover AI risk assessment methodologies, audit program design, and how to apply COBIT and NIST frameworks to AI system governance.",
    websiteUrl: "https://isaca.org",
    headquarters: "Schaumburg, IL",
    tier: "free",
    isVerified: true,
    serviceTypes: ["AI Audit Training", "Risk Management Certification", "IT Governance"],
    regulations: ["NIST AI RMF", "ISO 42001", "COBIT"],
    industries: ["Audit", "IT Governance", "Financial Services", "Government"],
    reviews: [],
  },
};

async function getProvider(slug: string): Promise<ProviderData | null> {
  // Static data for sample listings.
  // TODO: Replace with DB query once Neon is provisioned:
  //   const db = getDb();
  //   const provider = await db.query.providers.findFirst({ where: eq(providers.slug, slug) });
  return STATIC_PROVIDERS[slug] ?? null;
}

export async function generateStaticParams() {
  return Object.keys(STATIC_PROVIDERS).map((slug) => ({ slug }));
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const provider = await getProvider(slug);
  if (!provider) return {};

  const title = `${provider.name} — AI Compliance Provider`;
  const description = provider.description.slice(0, 155);

  return {
    title,
    description,
    openGraph: { title, description, type: "profile" },
    alternates: { canonical: `${SITE_URL}/directory/providers/${slug}` },
  };
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  const provider = await getProvider(slug);
  if (!provider) notFound();

  const schemas = [
    breadcrumbListSchema([
      { name: "Home", url: "/" },
      { name: "Provider Directory", url: "/directory" },
      { name: provider.name, url: `/directory/providers/${slug}` },
    ]),
    providerSchema({
      name: provider.name,
      description: provider.description,
      url: provider.websiteUrl ?? `${SITE_URL}/directory/providers/${slug}`,
      serviceTypes: provider.serviceTypes,
      ratingValue: provider.averageRating,
      reviewCount: provider.reviews.length,
    }),
  ];

  return (
    <>
      <script {...jsonLdScriptProps(schemas)} />

      {/* Header bar */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Provider Directory", href: "/directory" },
              { label: provider.name },
            ]}
          />

          <div className="mt-4 flex flex-col sm:flex-row gap-5 items-start">
            {/* Logo placeholder */}
            <div className="h-16 w-16 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0 overflow-hidden">
              {provider.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={provider.logoUrl}
                  alt={`${provider.name} logo`}
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <span className="text-2xl font-bold text-neutral-300">
                  {provider.name.charAt(0)}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {provider.isVerified && (
                  <Badge variant="brand">
                    <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </Badge>
                )}
                {provider.tier === "premium" && (
                  <Badge variant="warning">Premium</Badge>
                )}
              </div>
              <h1 className="text-2xl font-bold text-neutral-900">{provider.name}</h1>
              {provider.headquarters && (
                <p className="mt-0.5 text-sm text-neutral-500">
                  {provider.headquarters}
                  {provider.foundedYear && ` · Founded ${provider.foundedYear}`}
                  {provider.employeeCountRange && ` · ${provider.employeeCountRange} employees`}
                </p>
              )}
              {provider.averageRating && provider.reviews.length > 0 && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  <StarRating rating={provider.averageRating} />
                  <span className="text-sm text-neutral-500">
                    {provider.averageRating.toFixed(1)} ({provider.reviews.length} review{provider.reviews.length !== 1 ? "s" : ""})
                  </span>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="flex gap-2 shrink-0">
              {provider.websiteUrl && (
                <a
                  href={provider.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  Visit Website
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              <Link
                href={`/directory/providers/${slug}/request-quote`}
                className="inline-flex items-center gap-1.5 rounded-md bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800 transition-colors shadow-sm"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* About */}
            <section>
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">About</h2>
              <p className="text-neutral-600 leading-relaxed">{provider.description}</p>
            </section>

            {/* Services */}
            {provider.serviceTypes.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Services</h2>
                <div className="flex flex-wrap gap-2">
                  {provider.serviceTypes.map((svc) => (
                    <Badge key={svc} variant="default">
                      {formatServiceType(svc)}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Regulations covered */}
            {provider.regulations.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Regulations Covered</h2>
                <div className="flex flex-wrap gap-2">
                  {provider.regulations.map((regSlug) => (
                    <Link
                      key={regSlug}
                      href={`/regulations/${regSlug}`}
                      className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 hover:bg-brand-100 transition-colors"
                    >
                      {formatRegulationSlug(regSlug)}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Industries */}
            {provider.industries.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Industries Served</h2>
                <div className="flex flex-wrap gap-2">
                  {provider.industries.map((ind) => (
                    <Badge key={ind} variant="default">
                      {formatIndustry(ind)}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            {provider.reviews.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">Reviews</h2>
                <div className="space-y-4">
                  {provider.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-4">
            <Card>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                Quick Info
              </h3>
              <dl className="space-y-2.5">
                {provider.foundedYear && (
                  <InfoRow label="Founded" value={String(provider.foundedYear)} />
                )}
                {provider.headquarters && (
                  <InfoRow label="Location" value={provider.headquarters} />
                )}
                {provider.employeeCountRange && (
                  <InfoRow label="Team Size" value={`${provider.employeeCountRange} employees`} />
                )}
                <InfoRow label="Listing" value={provider.tier === "free" ? "Standard" : "Premium"} />
              </dl>
            </Card>

            <Card>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                Get in Touch
              </h3>
              <p className="text-sm text-neutral-600 mb-3">
                Get a free quote for your compliance project.
              </p>
              <Link
                href={`/directory/providers/${slug}/request-quote`}
                className="block w-full rounded-md bg-brand-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-800 transition-colors"
              >
                Request a Quote
              </Link>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= Math.round(rating) ? "text-amber-400" : "text-neutral-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-neutral-900 text-sm">
              {review.authorName}
            </span>
            {review.isVerified && (
              <Badge variant="success" className="text-xs">Verified</Badge>
            )}
          </div>
          <p className="text-sm font-medium text-neutral-700 mt-0.5">{review.title}</p>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-sm text-neutral-600 leading-relaxed">{review.body}</p>
      <p className="mt-2 text-xs text-neutral-500">
        {new Date(review.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })}
      </p>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2 text-sm">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="text-neutral-800 font-medium text-right">{value}</dd>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatServiceType(slug: string): string {
  const map: Record<string, string> = {
    "bias-audit": "Bias Audit",
    "governance-consulting": "Governance Consulting",
    legal: "Legal & Compliance",
    "compliance-software": "Compliance Software",
    training: "Training",
  };
  return map[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatRegulationSlug(slug: string): string {
  const map: Record<string, string> = {
    "colorado-ai-act": "Colorado AI Act",
    "eu-ai-act": "EU AI Act",
    "nyc-local-law-144": "NYC LL 144",
    "california-ab-2013": "California AB 2013",
    "illinois-ai-video-interview-act": "Illinois AIVIRA",
  };
  return map[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatIndustry(slug: string): string {
  const map: Record<string, string> = {
    healthcare: "Healthcare",
    fintech: "Fintech",
    "hr-recruiting": "HR & Recruiting",
    insurance: "Insurance",
    education: "Education",
  };
  return map[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
