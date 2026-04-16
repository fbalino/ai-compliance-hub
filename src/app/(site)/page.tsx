import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Microscope,
  Building2,
  Scale,
  Monitor,
  BookOpen,
  Globe,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  Shield,
  ChevronRight,
  Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { NewsletterForm } from "@/components/NewsletterForm";

// ISR: homepage revalidates every 6 hours
export const revalidate = 21600;

export const metadata: Metadata = {
  title: "regulome.io — Regulatory Intelligence for AI Compliance",
  description:
    "Map your AI products to applicable laws worldwide. Track regulations, use our free compliance checker, and find verified providers. EU AI Act, US state laws, and more.",
};

const FEATURED_REGULATIONS = [
  {
    slug: "colorado-ai-act",
    name: "Colorado AI Act",
    jurisdiction: "US · Colorado",
    status: "enacted" as const,
    effectiveDate: "June 30, 2026",
    summary:
      "Requires deployers of high-risk AI systems to use reasonable care to protect consumers from known risks of algorithmic discrimination.",
  },
  {
    slug: "eu-ai-act",
    name: "EU AI Act",
    jurisdiction: "European Union",
    status: "enforced" as const,
    effectiveDate: "August 2026",
    summary:
      "A comprehensive risk-based framework governing AI systems in the EU, with strict requirements for high-risk applications and outright bans on unacceptable-risk AI.",
  },
  {
    slug: "nyc-local-law-144",
    name: "NYC Local Law 144",
    jurisdiction: "US · New York City",
    status: "enforced" as const,
    effectiveDate: "July 5, 2023",
    summary:
      "Requires employers using AI in hiring or promotion decisions affecting NYC employees to conduct annual bias audits and post results publicly.",
  },
  {
    slug: "virginia-hb-2094",
    name: "Virginia HB 2094",
    jurisdiction: "US · Virginia",
    status: "enacted" as const,
    effectiveDate: "July 1, 2026",
    summary:
      "Requires businesses using high-risk automated decision systems affecting Virginia residents to conduct impact assessments and provide opt-out rights.",
  },
];

const STATS = [
  { value: "7", label: "Regulations tracked" },
  { value: "30+", label: "Verified providers" },
  { value: "Free", label: "Compliance checker" },
  { value: "48h", label: "Avg. publish time" },
];

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Globe,
    title: "Every AI regulation, tracked",
    body: "EU AI Act, US state laws, UK and Canada frameworks — continuously updated as regulations evolve.",
  },
  {
    icon: Zap,
    title: "Know your exposure in minutes",
    body: "Answer 4 questions about your product and org. Get a precise map of which laws apply and what they require.",
  },
  {
    icon: Users,
    title: "Verified compliance experts",
    body: "A vetted network of auditors, legal counsel, and software platforms matched to your regulatory situation.",
  },
  {
    icon: TrendingUp,
    title: "Stay ahead of enforcement",
    body: "Deadline tracking, enforcement alerts, and weekly regulatory intelligence delivered to your inbox.",
  },
  {
    icon: Scale,
    title: "Side-by-side comparisons",
    body: "Compare requirements across jurisdictions to understand where you have overlapping obligations.",
  },
  {
    icon: BookOpen,
    title: "Plain-English explanations",
    body: "Every regulation broken down into clear obligations — no legal degree required to understand your duties.",
  },
];

const PROVIDER_CATEGORIES: { slug: string; label: string; icon: LucideIcon; count: number }[] = [
  { slug: "bias-audit", label: "Bias Auditors", icon: Microscope, count: 6 },
  { slug: "governance-consulting", label: "Governance Consulting", icon: Building2, count: 6 },
  { slug: "legal", label: "Legal & Compliance", icon: Scale, count: 6 },
  { slug: "compliance-software", label: "Compliance Software", icon: Monitor, count: 7 },
  { slug: "training", label: "Training & Education", icon: BookOpen, count: 6 },
];

const WHY_POINTS = [
  "Always current — updated within 48h of any regulatory change",
  "Plain-English breakdowns of complex legal text",
  "Free compliance checker — no account, no credit card",
  "Vetted provider directory — every listing manually reviewed",
  "Covers 7+ jurisdictions from EU to US state laws",
  "Built for product and compliance teams, not just lawyers",
];

export default function HomePage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      {/* ── Hero ── */}
      <section className="bg-white px-4 pt-16 pb-14 sm:pt-20 sm:pb-16 text-center border-b border-neutral-100">
        <div className="mx-auto max-w-3xl">
          {/* Announcement pill */}
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-4 py-1.5 text-xs font-semibold text-brand-700">
            <Activity className="h-3 w-3" aria-hidden="true" />
            Colorado AI Act effective June 30, 2026
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl md:text-6xl leading-[1.05]">
            Regulatory intelligence
            <br />
            <span className="text-brand-600">for your AI stack.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-600 leading-relaxed">
            Map your AI products to applicable laws worldwide. Know exactly which regulations apply, what they require, and who can help you comply.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/checker"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Check my compliance
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/regulations"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Browse regulations
            </Link>
          </div>

          <p className="mt-4 text-xs text-neutral-400">
            Free · No account required · Instant results
          </p>
        </div>

        {/* Stats bar */}
        <div className="mx-auto mt-14 max-w-2xl grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-neutral-200 rounded-xl border border-neutral-200 overflow-hidden">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white px-4 py-5 text-center">
              <div className="text-2xl font-extrabold text-neutral-900 tracking-tight">{stat.value}</div>
              <div className="mt-0.5 text-xs text-neutral-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-neutral-50 px-4 py-16 sm:py-20 border-b border-neutral-200">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">Platform</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              Everything you need to stay compliant
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-neutral-200 bg-white p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
                  <f.icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mb-1">{f.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Regulations ── */}
      <section className="bg-white px-4 py-16 sm:py-20 border-b border-neutral-100">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-1.5">
                Regulation Tracker
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">
                Key regulations right now
              </h2>
            </div>
            <Link
              href="/regulations"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors"
            >
              View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-xl border border-neutral-200 overflow-hidden divide-y divide-neutral-100">
            {FEATURED_REGULATIONS.map((reg) => (
              <Link
                key={reg.slug}
                href={`/regulations/${reg.slug}`}
                className="flex items-start gap-4 px-6 py-5 bg-white hover:bg-neutral-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-sm font-bold text-neutral-900">{reg.name}</span>
                    <Badge variant={reg.status}>
                      {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed">{reg.summary}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-neutral-400 mb-1">{reg.jurisdiction}</div>
                  <div className="text-xs font-semibold text-neutral-700">{reg.effectiveDate}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance Checker CTA ── */}
      <section className="bg-brand-600 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
            <Shield className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Find out which AI laws apply to your business
          </h2>
          <p className="mt-3 text-brand-100 leading-relaxed">
            Answer 4 questions about your organization and AI systems. Get an instant map of the regulations that apply and exactly what you need to do.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/checker"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-brand-600 hover:bg-brand-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Start free compliance check
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/checker/pro-report"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/15 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Pro Report — $49
            </Link>
          </div>
          <p className="mt-4 text-xs text-brand-200">Not legal advice. For informational purposes only.</p>
        </div>
      </section>

      {/* ── Provider Directory CTA ── */}
      <section className="bg-white px-4 py-16 sm:py-20 border-b border-neutral-100">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-1.5">
                Provider Directory
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">
                Find compliance experts
              </h2>
              <p className="mt-1.5 text-neutral-500 max-w-xl text-sm">
                Auditors, consultants, lawyers, and software platforms vetted for AI compliance expertise.
              </p>
            </div>
            <Link
              href="/directory"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors"
            >
              Browse all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PROVIDER_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/directory/categories/${cat.slug}`}
                className="group flex flex-col items-center rounded-xl border border-neutral-200 bg-white p-5 text-center hover:border-brand-300 hover:shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors">
                  <cat.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-neutral-800 group-hover:text-brand-700 transition-colors leading-snug">
                  {cat.label}
                </span>
                <span className="mt-1 text-xs text-neutral-400">
                  {cat.count} providers
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/directory"
              className="flex w-full items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Browse all providers
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why regulome.io ── */}
      <section className="bg-neutral-50 px-4 py-16 sm:py-20 border-b border-neutral-200">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              Why compliance teams use regulome.io
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_POINTS.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-neutral-600 leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-white px-4 py-14 sm:py-16 text-center">
        <div className="mx-auto max-w-md">
          <h2 className="text-xl font-extrabold tracking-tight text-neutral-900">
            Stay ahead of AI regulation
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Weekly digest of new laws, enforcement actions, and compliance deadlines.
          </p>
          <NewsletterForm
            source="homepage"
            className="mt-6"
          />
          <p className="mt-3 text-xs text-neutral-400">No spam, unsubscribe any time.</p>
        </div>
      </section>
    </>
  );
}
