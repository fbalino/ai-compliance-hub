import type { Metadata } from "next";
import Link from "next/link";
import {
  Microscope,
  Building2,
  Scale,
  Monitor,
  BookOpen,
  ArrowRight,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  ChevronRight,
  Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { NewsletterForm } from "@/components/NewsletterForm";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "regulome.io — The Regulatory Intelligence Platform for AI Compliance",
  description:
    "Map your AI systems to applicable regulations worldwide. Track the EU AI Act, Colorado AI Act, NYC LL 144, and more. Free compliance checker + verified provider directory.",
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
  { value: "7", label: "Regulations tracked" },
  { value: "30+", label: "Verified providers" },
  { value: "Free", label: "Compliance checker" },
  { value: "48h", label: "Avg. time to publish" },
];

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Globe,
    title: "Global regulation coverage",
    description: "EU AI Act, US state laws, UK frameworks — tracked in one place, updated as laws change.",
  },
  {
    icon: Zap,
    title: "Instant compliance mapping",
    description: "Answer 4 questions. Get a precise map of which regulations apply and what you need to do.",
  },
  {
    icon: Shield,
    title: "Verified provider network",
    description: "Vetted auditors, lawyers, and compliance software platforms — matched to your specific needs.",
  },
  {
    icon: TrendingUp,
    title: "Regulatory intelligence",
    description: "Stay ahead with weekly digests, enforcement action alerts, and deadline tracking.",
  },
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
  const breadcrumbs = breadcrumbListSchema([{ name: "Home", url: "/" }]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-4 py-24 sm:py-32"
        style={{ background: "var(--bg-page)" }}
      >
        {/* Dot grid texture */}
        <div className="absolute inset-0 bg-dot-grid" aria-hidden="true" />

        {/* Top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] blur-3xl opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, var(--accent-primary) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Status badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              color: "var(--text-secondary)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse shrink-0" aria-hidden="true" />
            Colorado AI Act takes effect June 30, 2026
            <ChevronRight className="h-3 w-3 opacity-50" aria-hidden="true" />
          </div>

          {/* Headline */}
          <h1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          >
            The regulatory genome{" "}
            <span className="block text-gradient-brand">for AI compliance.</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Map your AI systems to applicable laws worldwide. From the EU AI Act to state mandates —
            we track every regulation so you know exactly what&apos;s required.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/checker"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ outlineColor: "var(--accent-primary)" }}
            >
              Check My Compliance
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/regulations"
              className="btn-secondary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ outlineColor: "var(--accent-primary)" }}
            >
              Browse Regulations
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative mx-auto mt-20 max-w-3xl">
          <div
            className="grid grid-cols-2 sm:grid-cols-4 rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="px-4 sm:px-6 py-5 text-center"
                style={{
                  borderRight: i % 2 === 0 ? "1px solid var(--border-subtle)" : undefined,
                  borderBottom: i < 2 ? "1px solid var(--border-subtle)" : undefined,
                }}
              >
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {stat.value}
                </div>
                <div className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features grid ─────────────────────────────────────────── */}
      <section
        className="px-4 py-16 sm:py-20"
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-5"
                style={{
                  background: "var(--bg-page)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: "var(--bg-accent)", color: "var(--accent-primary)" }}
                >
                  <f.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Regulations ──────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20" style={{ background: "var(--bg-page)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-3.5 w-3.5" style={{ color: "var(--accent-primary)" }} aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent-primary)" }}>
                  Regulation Tracker
                </p>
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                Key AI regulations to know
              </h2>
            </div>
            <Link
              href="/regulations"
              className="text-link-muted hidden sm:inline-flex items-center gap-1 text-sm font-medium"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURED_REGULATIONS.map((reg) => (
              <Link
                key={reg.slug}
                href={`/regulations/${reg.slug}`}
                className="card-item group block rounded-xl p-5 focus-visible:outline focus-visible:outline-2"
                style={{ outlineColor: "var(--accent-primary)" }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {reg.jurisdiction}
                    </span>
                    <h3 className="mt-0.5 font-semibold text-sm leading-snug" style={{ color: "var(--text-primary)" }}>
                      {reg.name}
                    </h3>
                  </div>
                  <Badge variant={statusVariant[reg.status] ?? "default"} className="shrink-0">
                    {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                  {reg.summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Effective {reg.effectiveDate}
                  </div>
                  <ChevronRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    style={{ color: "var(--text-muted)" }}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/regulations"
              className="btn-secondary flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
            >
              View all regulations
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Compliance Checker CTA ────────────────────────────────── */}
      <section
        className="px-4 py-16 sm:py-20 relative overflow-hidden"
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        {/* Radial glow bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 100%, var(--glow-primary), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <div
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              background: "var(--bg-accent)",
              border: "1px solid var(--border-subtle)",
              color: "var(--accent-primary)",
            }}
          >
            <Shield className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-primary)" }}>
            Find out which AI laws apply to your business
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Answer 4 short questions about your organization and AI use. We&apos;ll map them to the regulations
            that matter and tell you exactly what you need to do.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/checker"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ outlineColor: "var(--accent-primary)" }}
            >
              Start Free Compliance Check
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/checker/pro-report"
              className="btn-secondary inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ outlineColor: "var(--accent-primary)" }}
            >
              Get Pro Report ($49)
            </Link>
          </div>
          <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
            Not legal advice. Results are for informational purposes only.
          </p>
        </div>
      </section>

      {/* ── Provider Directory ────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20" style={{ background: "var(--bg-page)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--accent-primary)" }}>
                Provider Directory
              </p>
              <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                Find compliance experts
              </h2>
              <p className="mt-2 text-sm max-w-xl" style={{ color: "var(--text-muted)" }}>
                Vetted auditors, consultants, lawyers, and software platforms specializing in AI regulatory compliance.
              </p>
            </div>
            <Link
              href="/directory"
              className="text-link-muted hidden sm:inline-flex items-center gap-1 text-sm font-medium"
            >
              Browse all
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PROVIDER_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/directory/categories/${cat.slug}`}
                className="cat-item group flex flex-col items-center rounded-xl p-4 text-center focus-visible:outline focus-visible:outline-2"
                style={{ outlineColor: "var(--accent-primary)" }}
              >
                <span
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: "var(--bg-accent)", color: "var(--accent-primary)" }}
                >
                  <cat.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium leading-snug mb-1" style={{ color: "var(--text-primary)" }}>
                  {cat.label}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {cat.count} providers
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/directory"
              className="btn-secondary flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium"
            >
              Browse all providers
            </Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────── */}
      <section
        className="px-4 py-14 sm:py-16"
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-lg font-bold sm:text-xl" style={{ color: "var(--text-primary)" }}>
            Stay ahead of AI regulation changes
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            Weekly digest of new laws, enforcement actions, and compliance deadlines. Free, no spam.
          </p>
          <NewsletterForm source="homepage" className="mt-6 max-w-md mx-auto" />
        </div>
      </section>
    </>
  );
}
