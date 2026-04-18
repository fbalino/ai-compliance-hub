import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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
    maxPenalty: "\u20AC35M or 7% global revenue",
    summary:
      "A comprehensive risk-based framework governing AI systems in the EU, with strict requirements for high-risk applications and outright bans on unacceptable-risk AI. The world\u2019s most sweeping AI regulation.",
    category: "Comprehensive AI Framework",
  },
  {
    slug: "colorado-ai-act",
    name: "Colorado AI Act",
    shortName: "CO SB 24-205",
    jurisdiction: "US \u00B7 Colorado",
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
    jurisdiction: "US \u00B7 New York City",
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
    jurisdiction: "US \u00B7 California",
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
    jurisdiction: "US \u00B7 Illinois",
    status: "enforced" as const,
    effectiveDate: "January 1, 2020",
    maxPenalty: "Civil damages",
    summary:
      "Requires employers using AI to analyze video interviews to notify candidates, obtain consent, explain how the AI is used, and limit sharing of video data with third parties.",
    category: "Employment / Hiring AI",
  },
  {
    slug: "virginia-hb-2094",
    name: "Virginia HB 2094",
    shortName: "VA HB 2094",
    jurisdiction: "US \u00B7 Virginia",
    status: "enacted" as const,
    effectiveDate: "July 1, 2026",
    maxPenalty: "$7,500 per violation",
    summary:
      "Virginia\u2019s legislation governing automated decision systems used in consequential decisions. Requires impact assessments, consumer notifications, and opt-out rights for covered AI deployments.",
    category: "Automated Decision Systems",
  },
];

const UPCOMING = [
  {
    slug: null,
    name: "EU AI Act \u2014 GPAI Rules",
    jurisdiction: "European Union",
    status: "enacted" as const,
    effectiveDate: "August 2025",
    summary: "General-purpose AI model obligations including capability evaluations and incident reporting for systemic-risk models.",
  },
  {
    slug: "texas-hb-1709",
    name: "Texas Responsible AI Governance Act (HB 1709)",
    jurisdiction: "US \u00B7 Texas",
    status: "draft" as const,
    effectiveDate: "TBD (pending enactment)",
    summary: "Proposed AI regulation modeled on the Colorado AI Act, covering high-risk AI system obligations for Texas businesses. Passed House committee; awaiting floor vote.",
  },
];

function statusPill(status: string) {
  if (status === "enforced") return "rg-pill-status rg-pill-applies";
  if (status === "enacted") return "rg-pill-status rg-pill-action";
  if (status === "draft") return "rg-pill-status rg-pill-watch";
  return "rg-pill-status rg-pill-watch";
}

export default function RegulationsPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Regulations", url: "/regulations" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="rg-page-head">
        <div className="rg-container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Regulations" }]} />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h1>AI Regulations Tracker</h1>
              <p className="rg-page-desc">
                Track every major AI compliance law &mdash; enforcement dates, penalties, and what your business needs to do.
              </p>
            </div>
            <Link href="/checker" className="rg-btn rg-btn-primary">
              Check My Compliance <span className="rg-arrow">&rarr;</span>
            </Link>
          </div>

          <div className="rg-stat-row">
            <div className="rg-stat-item">
              <span className="rg-stat-dot" style={{ background: "var(--rg-red)" }} />
              <strong>3</strong> Enforced Now
            </div>
            <div className="rg-stat-item">
              <span className="rg-stat-dot" style={{ background: "var(--rg-amber)" }} />
              <strong>3</strong> Enacted &mdash; Effective Soon
            </div>
            <div className="rg-stat-item">
              <span className="rg-stat-dot" style={{ background: "var(--rg-ink-faint)" }} />
              <strong>3+</strong> In Progress Globally
            </div>
          </div>
        </div>
      </div>

      <div className="rg-page-body">
        <div className="rg-container">

          <div className="rg-page-section">
            <div className="rg-kicker">Active &amp; Enacted Regulations</div>
            <div className="rg-scard-grid">
              {REGULATIONS.map((reg) => (
                <Link key={reg.slug} href={`/regulations/${reg.slug}`} className="rg-scard-link">
                  <div className="rg-scard" style={{ height: "100%" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 500, color: "var(--rg-ink-dim)", letterSpacing: "0.2px", textTransform: "uppercase" as const }}>
                            {reg.jurisdiction}
                          </span>
                          <span style={{ fontSize: 11, color: "var(--rg-ink-faint)" }}>&middot;</span>
                          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 500, color: "var(--rg-ink-dim)", letterSpacing: "0.2px", textTransform: "uppercase" as const }}>
                            {reg.category}
                          </span>
                        </div>
                        <h3>{reg.name}</h3>
                        {reg.shortName && (
                          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--rg-ink-dim)" }}>{reg.shortName}</span>
                        )}
                      </div>
                      <span className={statusPill(reg.status)}>
                        {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                      </span>
                    </div>
                    <p style={{ marginBottom: 14 }}>{reg.summary}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 12, color: "var(--rg-ink-dim)", fontWeight: 500, paddingTop: 12, borderTop: "1px solid var(--rg-hair)" }}>
                      <span>Effective {reg.effectiveDate}</span>
                      {reg.maxPenalty && <span>Max penalty: {reg.maxPenalty}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rg-page-section">
            <div className="rg-kicker">Upcoming &amp; In Development</div>
            <div className="rg-scard-grid-3">
              {UPCOMING.map((reg) => {
                const inner = (
                  <div className="rg-scard" style={{ height: "100%", opacity: reg.slug ? 1 : 0.8 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                      <div>
                        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 500, color: "var(--rg-ink-dim)", letterSpacing: "0.2px", textTransform: "uppercase" as const }}>
                          {reg.jurisdiction}
                        </span>
                        <h3 style={{ marginTop: 4 }}>{reg.name}</h3>
                      </div>
                      <span className={statusPill(reg.status)}>
                        {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                      </span>
                    </div>
                    <p style={{ marginBottom: 10 }}>{reg.summary}</p>
                    <span style={{ fontSize: 12, color: "var(--rg-ink-dim)", fontWeight: 500 }}>Expected: {reg.effectiveDate}</span>
                  </div>
                );
                return reg.slug ? (
                  <Link key={reg.name} href={`/regulations/${reg.slug}`} className="rg-scard-link">{inner}</Link>
                ) : (
                  <div key={reg.name}>{inner}</div>
                );
              })}
            </div>
            <p style={{ marginTop: 14, fontSize: 12, color: "var(--rg-ink-dim)" }}>
              We monitor legislative databases, government feeds, and legal news to keep this list current.{" "}
              <Link href="/newsletter" style={{ textDecoration: "underline" }}>Subscribe for updates</Link>.
            </p>
          </div>

          <div className="rg-cta-banner" style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2>Not sure which regulations apply to you?</h2>
              <p>Our free compliance checker maps your business and AI use cases to the regulations that matter.</p>
            </div>
            <div className="rg-cta-actions">
              <Link href="/checker" className="rg-btn rg-btn-primary">Start Free Check</Link>
              <Link href="/compare/us-state-ai-laws" className="rg-btn rg-btn-outline">Compare Regulations</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
