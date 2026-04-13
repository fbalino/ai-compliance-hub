import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge, regulationStatusVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "AI Regulations Tracker — All AI Compliance Laws (2025)",
  description:
    "Comprehensive tracker of AI regulations worldwide: EU AI Act, Colorado AI Act, NYC Local Law 144, California AB 2013, Illinois AIVIRA, and more. Updated regularly.",
  alternates: {
    canonical: `${SITE_URL}/regulations`,
  },
};

const REGULATIONS = [
  {
    slug: "eu-ai-act",
    name: "EU AI Act",
    shortName: "EU 2024/1689",
    jurisdiction: "European Union",
    status: "enforced" as const,
    effectiveDate: "August 2026",
    maxPenalty: "€35M or 7% global revenue",
    summary:
      "A comprehensive risk-based framework governing AI systems in the EU, with strict requirements for high-risk applications and outright bans on unacceptable-risk AI. The world's most sweeping AI regulation.",
    category: "Comprehensive AI Framework",
  },
  {
    slug: "colorado-ai-act",
    name: "Colorado AI Act",
    shortName: "CO SB 24-205",
    jurisdiction: "US · Colorado",
    status: "enacted" as const,
    effectiveDate: "June 30, 2026",
    maxPenalty: "CCPA enforcement",
    summary:
      "The first US state comprehensive AI law. Requires deployers of high-risk AI systems to use reasonable care to protect consumers from known risks of algorithmic discrimination.",
    category: "Consumer Protection",
  },
  {
    slug: "nyc-local-law-144",
    name: "NYC Local Law 144",
    shortName: "NYC LL 144",
    jurisdiction: "US · New York City",
    status: "enforced" as const,
    effectiveDate: "July 5, 2023",
    maxPenalty: "$1,500 per violation per day",
    summary:
      "Requires employers using automated employment decision tools (AEDTs) in hiring or promotion decisions affecting NYC employees to conduct annual bias audits and post results publicly.",
    category: "Employment / Hiring AI",
  },
  {
    slug: "california-ab-2013",
    name: "California AB 2013",
    shortName: "CA AB 2013",
    jurisdiction: "US · California",
    status: "enacted" as const,
    effectiveDate: "January 1, 2026",
    maxPenalty: "Civil penalty",
    summary:
      "Requires developers of generative AI systems trained on data exceeding certain compute thresholds to publish detailed training data transparency reports on their websites.",
    category: "AI Transparency",
  },
  {
    slug: "illinois-ai-video-interview-act",
    name: "Illinois AI Video Interview Act",
    shortName: "IL AIVIRA",
    jurisdiction: "US · Illinois",
    status: "enforced" as const,
    effectiveDate: "January 1, 2020",
    maxPenalty: "Civil damages",
    summary:
      "Requires employers using AI to analyze video interviews to notify candidates, obtain consent, explain how the AI is used, and limit sharing of video data with third parties.",
    category: "Employment / Hiring AI",
  },
];

const UPCOMING = [
  {
    name: "EU AI Act — GPAI Rules",
    jurisdiction: "European Union",
    status: "enacted" as const,
    effectiveDate: "August 2025",
    summary: "General-purpose AI model obligations including capability evaluations and incident reporting for systemic-risk models.",
  },
  {
    name: "Texas HB 1709",
    jurisdiction: "US · Texas",
    status: "draft" as const,
    effectiveDate: "TBD",
    summary: "Proposed AI regulation modeled on the Colorado AI Act, covering high-risk AI system obligations for Texas businesses.",
  },
  {
    name: "Virginia HB 2094",
    jurisdiction: "US · Virginia",
    status: "draft" as const,
    effectiveDate: "TBD",
    summary: "High-risk AI framework bill requiring impact assessments and transparency disclosures for covered AI systems.",
  },
];

export default function RegulationsPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Regulations", url: "/regulations" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      {/* Page header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Regulations" }]}
          />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                AI Regulations Tracker
              </h1>
              <p className="mt-2 text-lg text-neutral-600 max-w-2xl">
                Track every major AI compliance law — enforcement dates, penalties, and what your business needs to do.
              </p>
            </div>
            <Link
              href="/checker"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-800 transition-colors shadow-sm"
            >
              Check My Compliance
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-sm text-neutral-600">
                <strong className="text-neutral-900">3</strong> Enforced Now
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-sm text-neutral-600">
                <strong className="text-neutral-900">2</strong> Enacted — Effective Soon
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-neutral-400" />
              <span className="text-sm text-neutral-600">
                <strong className="text-neutral-900">3+</strong> In Progress Globally
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">

        {/* Active / Enacted regulations */}
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-5">
            Active &amp; Enacted Regulations
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {REGULATIONS.map((reg) => (
              <Link key={reg.slug} href={`/regulations/${reg.slug}`} className="group block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700">
                <Card hover className="h-full group-hover:border-brand-300 transition-all">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="text-xs font-medium text-neutral-400">
                          {reg.jurisdiction}
                        </span>
                        <span className="text-xs text-neutral-300">·</span>
                        <span className="text-xs font-medium text-neutral-400">
                          {reg.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-neutral-900 group-hover:text-brand-800 transition-colors">
                        {reg.name}
                      </h3>
                      {reg.shortName && (
                        <span className="text-xs font-mono text-neutral-400">{reg.shortName}</span>
                      )}
                    </div>
                    <Badge variant={regulationStatusVariant(reg.status)}>
                      {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    {reg.summary}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Effective {reg.effectiveDate}
                    </span>
                    {reg.maxPenalty && (
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Max penalty: {reg.maxPenalty}
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Upcoming regulations */}
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-5">
            Upcoming &amp; In Development
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {UPCOMING.map((reg) => (
              <Card key={reg.name} className="opacity-80">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs font-medium text-neutral-400">
                      {reg.jurisdiction}
                    </span>
                    <h3 className="mt-0.5 font-semibold text-neutral-700">{reg.name}</h3>
                  </div>
                  <Badge variant={regulationStatusVariant(reg.status)}>
                    {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  {reg.summary}
                </p>
                <p className="text-xs text-neutral-400">
                  Expected: {reg.effectiveDate}
                </p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-xs text-neutral-400">
            We monitor legislative databases, government feeds, and legal news to keep this list current.{" "}
            <Link href="/newsletter" className="underline hover:text-neutral-600 transition-colors">
              Subscribe for updates
            </Link>
            .
          </p>
        </section>

        {/* Compare CTA */}
        <section className="rounded-xl bg-brand-50 border border-brand-100 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-brand-900">
              Not sure which regulations apply to you?
            </h2>
            <p className="mt-1.5 text-sm text-brand-700">
              Our free compliance checker maps your business and AI use cases to the regulations that matter.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/checker"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors shadow-sm"
            >
              Start Free Check
            </Link>
            <Link
              href="/compare/us-state-ai-laws"
              className="inline-flex items-center gap-2 rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
            >
              Compare Regulations
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
