import type { Metadata } from "next";
import Link from "next/link";
import { Microscope, Building2, Scale, Monitor, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { NewsletterForm } from "@/components/NewsletterForm";

// ISR: homepage revalidates every 6 hours
export const revalidate = 21600;

export const metadata: Metadata = {
  title: "AI Compliance Hub — Know What's Required. Find Who Can Help.",
  description:
    "The central destination for understanding, navigating, and acting on AI regulation worldwide. Track regulations, use our free compliance checker, and find verified providers.",
};

const FEATURED_REGULATIONS = [
  {
    slug: "colorado-ai-act",
    name: "Colorado AI Act",
    shortName: "CO SB 24-205",
    jurisdiction: "US · Colorado",
    status: "enacted" as const,
    effectiveDate: "June 30, 2026",
    summary:
      "Requires deployers of high-risk AI systems to use reasonable care to protect consumers from known risks of algorithmic discrimination.",
  },
  {
    slug: "eu-ai-act",
    name: "EU AI Act",
    shortName: "EU 2024/1689",
    jurisdiction: "European Union",
    status: "enforced" as const,
    effectiveDate: "August 2026",
    summary:
      "A comprehensive risk-based framework governing AI systems in the EU, with strict requirements for high-risk applications and outright bans on unacceptable-risk AI.",
  },
  {
    slug: "nyc-local-law-144",
    name: "NYC Local Law 144",
    shortName: "NYC LL 144",
    jurisdiction: "US · New York City",
    status: "enforced" as const,
    effectiveDate: "July 5, 2023",
    summary:
      "Requires employers using AI in hiring or promotion decisions affecting NYC employees to conduct annual bias audits and post results publicly.",
  },
  {
    slug: "virginia-hb-2094",
    name: "Virginia HB 2094",
    shortName: "VA HB 2094",
    jurisdiction: "US · Virginia",
    status: "enacted" as const,
    effectiveDate: "July 1, 2026",
    summary:
      "Requires businesses using high-risk automated decision systems affecting Virginia residents to conduct impact assessments and provide consumers with opt-out rights.",
  },
];

const STATS = [
  { value: "7", label: "AI Regulations Tracked" },
  { value: "30+", label: "Verified Providers" },
  { value: "Free", label: "AI-Powered Checker" },
  { value: "48h", label: "Average Time to Publish New Laws" },
];

const PROVIDER_CATEGORIES: { slug: string; label: string; icon: LucideIcon; count: number }[] = [
  { slug: "bias-audit", label: "Bias Auditors", icon: Microscope, count: 6 },
  { slug: "governance-consulting", label: "Governance Consulting", icon: Building2, count: 6 },
  { slug: "legal", label: "Legal & Compliance", icon: Scale, count: 6 },
  { slug: "compliance-software", label: "Compliance Software", icon: Monitor, count: 7 },
  { slug: "training", label: "Training & Education", icon: BookOpen, count: 6 },
];

const statusVariant: Record<string, "enforced" | "enacted" | "draft"> = {
  enforced: "enforced",
  enacted: "enacted",
  draft: "draft",
};

export default function HomePage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 to-brand-900 px-4 py-20 sm:py-28">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-5"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-800/60 px-3 py-1.5 text-xs font-medium text-brand-200">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Colorado AI Act takes effect June 30, 2026 — are you ready?
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Know what&apos;s required.{" "}
            <span className="text-brand-300">Find who can help.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-brand-200 leading-relaxed">
            The only platform that combines AI regulation intelligence with a verified provider marketplace. From the EU AI Act to state laws — we track it all so you can focus on compliance.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/checker"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-900 shadow-sm hover:bg-brand-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Check My Compliance
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/regulations"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-600 bg-brand-800/40 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700/60 transition-colors"
            >
              Browse Regulations
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl overflow-hidden bg-brand-800/40">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-brand-900/60 px-3 sm:px-6 py-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-0.5 text-xs text-brand-300 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Regulations ── */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                Regulation Tracker
              </p>
              <h2 className="mt-1 text-2xl font-bold text-neutral-900">
                Key AI Regulations
              </h2>
            </div>
            <Link
              href="/regulations"
              className="text-sm font-medium text-brand-700 hover:text-brand-900 transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURED_REGULATIONS.map((reg) => (
              <Link key={reg.slug} href={`/regulations/${reg.slug}`} className="group block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700">
                <Card hover className="h-full transition-all group-hover:border-brand-300">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-xs font-medium text-neutral-500">
                        {reg.jurisdiction}
                      </span>
                      <h3 className="mt-0.5 font-semibold text-neutral-900 group-hover:text-brand-800 transition-colors">
                        {reg.name}
                      </h3>
                    </div>
                    <Badge variant={statusVariant[reg.status] ?? "default"}>
                      {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                    {reg.summary}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Effective {reg.effectiveDate}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance Checker CTA ── */}
      <section className="bg-neutral-50 px-4 py-16 sm:py-20 border-y border-neutral-200">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
            <svg className="h-6 w-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Find out which AI laws apply to your business
          </h2>
          <p className="mt-3 text-neutral-600 leading-relaxed">
            Answer a few questions about your company and the AI systems you use. Our free checker maps your situation to the regulations that apply and tells you exactly what you need to do.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/checker"
              className="inline-flex items-center justify-center rounded-lg bg-brand-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-brand-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              Start Free Compliance Check
            </Link>
            <Link
              href="/checker/pro-report"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Get Pro Report ($49)
            </Link>
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            Not legal advice. Results are for informational purposes only.
          </p>
        </div>
      </section>

      {/* ── Provider Directory CTA ── */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                Provider Directory
              </p>
              <h2 className="mt-1 text-2xl font-bold text-neutral-900">
                Find Compliance Experts
              </h2>
              <p className="mt-2 text-neutral-500 max-w-xl">
                Auditors, consultants, lawyers, and software platforms vetted for AI compliance expertise.
              </p>
            </div>
            <Link
              href="/directory"
              className="hidden sm:block text-sm font-medium text-brand-700 hover:text-brand-900 transition-colors"
            >
              Browse all providers →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PROVIDER_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/directory/categories/${cat.slug}`}
                className="group flex flex-col items-center rounded-xl border border-neutral-200 bg-white p-4 text-center hover:border-brand-300 hover:shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
              >
                <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-100 transition-colors">
                  <cat.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-neutral-800 group-hover:text-brand-800 transition-colors leading-snug">
                  {cat.label}
                </span>
                <span className="mt-1 text-xs text-neutral-500">
                  {cat.count} providers
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex gap-3 sm:hidden">
            <Link
              href="/directory"
              className="flex w-full items-center justify-center rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Browse all providers
            </Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-brand-900 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold text-white">
            Stay ahead of AI regulation changes
          </h2>
          <p className="mt-2 text-sm text-brand-200">
            Weekly digest of new laws, enforcement actions, and compliance deadlines. Free, no spam.
          </p>
          <NewsletterForm
            source="homepage"
            className="mt-5 max-w-md mx-auto"
          />
        </div>
      </section>
    </>
  );
}
