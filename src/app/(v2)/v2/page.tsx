// Design preview — accessible at /v2
// Violet editorial SaaS aesthetic — completely standalone, does not affect main site
import Link from "next/link";
import {
  ArrowRight,
  Dna,
  Globe,
  Zap,
  Shield,
  ChevronRight,
  BookOpen,
  Users,
  TrendingUp,
  CheckCircle,
  Scale,
  Monitor,
  Building2,
  Microscope,
  Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Preview v2 — regulome.io",
  robots: { index: false, follow: false },
};

// ── Design tokens (scoped to this page only) ──────────────
const t = {
  bg: "#FFFFFF",
  bgSubtle: "#FAFAFA",
  bgAccent: "#F5F3FF",
  accent: "#7C3AED",
  accentDark: "#6D28D9",
  accentLight: "#EDE9FE",
  accentMid: "#8B5CF6",
  text: "#111827",
  textSub: "#374151",
  muted: "#6B7280",
  border: "#E5E7EB",
  borderAccent: "#DDD6FE",
  success: "#059669",
  successBg: "#D1FAE5",
  enacted: "#1D4ED8",
  enactedBg: "#DBEAFE",
  draft: "#B45309",
  draftBg: "#FEF3C7",
};

const REGS = [
  {
    slug: "eu-ai-act",
    name: "EU AI Act",
    jurisdiction: "European Union",
    status: "enforced",
    effective: "Aug 2026",
    summary: "Comprehensive risk-based framework with strict rules for high-risk AI systems and outright bans on unacceptable-risk uses.",
  },
  {
    slug: "colorado-ai-act",
    name: "Colorado AI Act",
    jurisdiction: "US · Colorado",
    status: "enacted",
    effective: "Jun 30 2026",
    summary: "Requires deployers of high-risk AI to use reasonable care preventing algorithmic discrimination against consumers.",
  },
  {
    slug: "nyc-local-law-144",
    name: "NYC Local Law 144",
    jurisdiction: "US · New York City",
    status: "enforced",
    effective: "Jul 2023",
    summary: "Annual bias audits required for AI used in hiring or promotion decisions affecting NYC employees.",
  },
  {
    slug: "virginia-human-civil-rights-act",
    name: "Virginia HB 2094",
    jurisdiction: "US · Virginia",
    status: "enacted",
    effective: "Jul 1 2026",
    summary: "Impact assessments and opt-out rights required for high-risk automated decision systems affecting Virginia residents.",
  },
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

const CATEGORIES: { slug: string; label: string; icon: LucideIcon; count: number }[] = [
  { slug: "bias-audit", label: "Bias Auditors", icon: Microscope, count: 6 },
  { slug: "governance-consulting", label: "Governance Consulting", icon: Building2, count: 6 },
  { slug: "legal", label: "Legal & Compliance", icon: Scale, count: 6 },
  { slug: "compliance-software", label: "Compliance Software", icon: Monitor, count: 7 },
];

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    enforced: { bg: t.successBg, text: t.success, label: "Enforced" },
    enacted: { bg: t.enactedBg, text: t.enacted, label: "Enacted" },
    draft: { bg: t.draftBg, text: t.draft, label: "Draft" },
  };
  const s = map[status] ?? { bg: "#F3F4F6", text: "#6B7280", label: status };
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ background: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}

export default function V2Page() {
  return (
    <div style={{ fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif", background: t.bg, color: t.text }}>

      {/* ── Preview banner ─────────────────────────────────────── */}
      <div style={{ background: t.accent, color: "#fff", textAlign: "center", padding: "8px 16px", fontSize: "13px", fontWeight: 500 }}>
        Design Preview — This is a draft concept at /v2. The main site is unchanged at{" "}
        <Link href="/" style={{ color: "#E9D5FF", textDecoration: "underline" }}>regulome.io</Link>
      </div>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header style={{ background: "#fff", borderBottom: `1px solid ${t.border}`, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ background: t.accent, borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Dna size={15} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em", color: t.text }}>
              regulome<span style={{ color: t.accent }}>.io</span>
            </span>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {["Regulations", "Directory", "Glossary", "Blog"].map((label) => (
              <a
                key={label}
                href="#"
                style={{ padding: "6px 12px", fontSize: 14, fontWeight: 500, color: t.muted, borderRadius: 6, textDecoration: "none" }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a href="#" style={{ fontSize: 14, fontWeight: 500, color: t.accent, textDecoration: "none", padding: "6px 12px" }}>
              Log in
            </a>
            <a
              href="#"
              style={{ background: t.accent, color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}
            >
              Get started free
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "80px 24px 72px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Announcement pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: t.accentLight, border: `1px solid ${t.borderAccent}`, borderRadius: 999, padding: "6px 14px", marginBottom: 24, fontSize: 13, fontWeight: 500, color: t.accentDark }}>
            <Activity size={12} />
            Colorado AI Act effective June 30, 2026
            <ChevronRight size={12} />
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, color: t.text, margin: "0 0 20px" }}>
            Regulatory intelligence<br />
            <span style={{ color: t.accent }}>for your AI stack.</span>
          </h1>

          <p style={{ fontSize: 18, color: t.textSub, lineHeight: 1.65, maxWidth: 560, margin: "0 auto 36px", fontWeight: 400 }}>
            Map your AI products to applicable laws worldwide. Know exactly which regulations apply, what they require, and who can help you comply.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/checker"
              style={{ background: t.accent, color: "#fff", borderRadius: 10, padding: "13px 24px", fontSize: 15, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: `0 4px 24px ${t.accent}40` }}
            >
              Check my compliance
              <ArrowRight size={16} />
            </a>
            <a
              href="/regulations"
              style={{ background: "#fff", color: t.text, border: `1.5px solid ${t.border}`, borderRadius: 10, padding: "13px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none" }}
            >
              Browse regulations
            </a>
          </div>

          <p style={{ fontSize: 13, color: t.muted, marginTop: 16 }}>
            Free · No account required · Instant results
          </p>
        </div>

        {/* Stats row */}
        <div style={{ maxWidth: 640, margin: "56px auto 0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: t.border, borderRadius: 12, overflow: "hidden", border: `1px solid ${t.border}` }}>
          {[
            { n: "7", label: "Regulations tracked" },
            { n: "30+", label: "Verified providers" },
            { n: "Free", label: "Compliance checker" },
            { n: "48h", label: "Avg. publish time" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", padding: "20px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: t.text, letterSpacing: "-0.03em" }}>{s.n}</div>
              <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section style={{ background: t.bgSubtle, padding: "72px 24px", borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: t.accent, marginBottom: 8 }}>
              Platform
            </p>
            <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: t.text, margin: 0 }}>
              Everything you need to stay compliant
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{ background: "#fff", border: `1px solid ${t.border}`, borderRadius: 12, padding: "24px", transition: "box-shadow 0.2s" }}
              >
                <div style={{ width: 36, height: 36, background: t.accentLight, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <f.icon size={18} color={t.accent} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: t.text, margin: "0 0 6px" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: t.muted, lineHeight: 1.6, margin: 0 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Regulations ──────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "72px 24px", borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: t.accent, marginBottom: 6 }}>
                Regulation tracker
              </p>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", color: t.text, margin: 0 }}>
                Key regulations right now
              </h2>
            </div>
            <a href="/regulations" style={{ fontSize: 14, fontWeight: 600, color: t.accent, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              View all <ArrowRight size={14} />
            </a>
          </div>

          <div style={{ border: `1px solid ${t.border}`, borderRadius: 12, overflow: "hidden" }}>
            {REGS.map((reg, i) => (
              <a
                key={reg.slug}
                href={`/regulations/${reg.slug}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "20px 24px",
                  borderTop: i > 0 ? `1px solid ${t.border}` : undefined,
                  background: "#fff",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{reg.name}</span>
                    <StatusPill status={reg.status} />
                  </div>
                  <p style={{ fontSize: 13, color: t.muted, margin: 0, lineHeight: 1.5 }}>{reg.summary}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: t.muted, marginBottom: 2 }}>{reg.jurisdiction}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{reg.effective}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance checker CTA ──────────────────────────────── */}
      <section style={{ background: t.accent, padding: "72px 24px", borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Shield size={24} color="#fff" />
          </div>
          <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 12px" }}>
            Find out which AI laws apply to your business
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: "0 0 32px" }}>
            Answer 4 questions about your organization and AI systems. Get an instant map of the regulations that apply and exactly what you need to do.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/checker"
              style={{ background: "#fff", color: t.accent, borderRadius: 10, padding: "13px 24px", fontSize: 15, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              Start free compliance check
              <ArrowRight size={16} />
            </a>
            <a
              href="/checker/pro-report"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 10, padding: "13px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none" }}
            >
              Pro Report — $49
            </a>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 16 }}>Not legal advice. For informational purposes only.</p>
        </div>
      </section>

      {/* ── Provider directory ──────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "72px 24px", borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: t.accent, marginBottom: 6 }}>
                Provider directory
              </p>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", color: t.text, margin: 0 }}>
                Find compliance experts
              </h2>
            </div>
            <a href="/directory" style={{ fontSize: 14, fontWeight: 600, color: t.accent, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              Browse all <ArrowRight size={14} />
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {CATEGORIES.map((cat) => (
              <a
                key={cat.slug}
                href={`/directory/categories/${cat.slug}`}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px", border: `1.5px solid ${t.border}`, borderRadius: 12, textDecoration: "none", textAlign: "center", transition: "border-color 0.15s, box-shadow 0.15s" }}
              >
                <div style={{ width: 44, height: 44, background: t.accentLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <cat.icon size={20} color={t.accent} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 4 }}>{cat.label}</span>
                <span style={{ fontSize: 12, color: t.muted }}>{cat.count} providers</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why regulome.io ─────────────────────────────────────── */}
      <section style={{ background: t.bgSubtle, padding: "72px 24px", borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", color: t.text, margin: 0 }}>
              Why compliance teams use regulome.io
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              "Always current — updated within 48h of any regulatory change",
              "Plain-English breakdowns of complex legal text",
              "Free compliance checker — no account, no credit card",
              "Vetted provider directory — every listing manually reviewed",
              "Covers 7+ jurisdictions from EU to US state laws",
              "Built for product and compliance teams, not just lawyers",
            ].map((point) => (
              <div key={point} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <CheckCircle size={18} color={t.success} style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: 14, color: t.textSub, lineHeight: 1.5 }}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "64px 24px", borderTop: `1px solid ${t.border}`, textAlign: "center" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: t.text, margin: "0 0 8px" }}>
            Stay ahead of AI regulation
          </h2>
          <p style={{ fontSize: 14, color: t.muted, margin: "0 0 24px" }}>
            Weekly digest of new laws, enforcement actions, and compliance deadlines.
          </p>
          <form style={{ display: "flex", gap: 8 }} action="/newsletter" method="get">
            <input
              type="email"
              placeholder="you@company.com"
              style={{ flex: 1, border: `1.5px solid ${t.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none", color: t.text }}
            />
            <button
              type="submit"
              style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              Subscribe
            </button>
          </form>
          <p style={{ fontSize: 12, color: t.muted, marginTop: 10 }}>No spam, unsubscribe any time.</p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer style={{ background: t.bgSubtle, borderTop: `1px solid ${t.border}`, padding: "40px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ minWidth: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ background: t.accent, borderRadius: 6, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Dna size={13} color="#fff" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 14, color: t.text }}>
                regulome<span style={{ color: t.accent }}>.io</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: t.muted, lineHeight: 1.5, maxWidth: 220 }}>
              Regulatory intelligence for AI compliance teams.
            </p>
          </div>
          {[
            { title: "Product", links: ["Compliance Checker", "Provider Directory", "Regulation Tracker", "Glossary"] },
            { title: "Regulations", links: ["EU AI Act", "Colorado AI Act", "NYC LL 144", "Virginia HB 2094"] },
            { title: "Company", links: ["Blog", "Newsletter", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: t.muted, marginBottom: 10 }}>
                {col.title}
              </div>
              {col.links.map((l) => (
                <div key={l} style={{ marginBottom: 6 }}>
                  <a href="#" style={{ fontSize: 13, color: t.textSub, textDecoration: "none" }}>{l}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1100, margin: "24px auto 0", paddingTop: 24, borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 12, color: t.muted }}>
            &copy; {new Date().getFullYear()} regulome.io — Not legal advice.
          </span>
          <span style={{ fontSize: 12, color: t.muted }}>
            This is a design preview at /v2
          </span>
        </div>
      </footer>

    </div>
  );
}
