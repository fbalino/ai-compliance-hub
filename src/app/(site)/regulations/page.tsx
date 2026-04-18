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
    code: "EU-AIA-24",
    name: "EU AI Act",
    shortName: "EU 2024/1689",
    jurisdiction: "European Union",
    status: "active" as const,
    effectiveDate: "02 Aug 2026",
    maxPenalty: "€35M or 7% global revenue",
    summary:
      "A comprehensive risk-based framework governing AI systems in the EU, with strict requirements for high-risk applications and outright bans on unacceptable-risk AI.",
    topics: ["Generative AI", "High-risk", "GPAI"],
    providers: 12,
  },
  {
    slug: "colorado-ai-act",
    code: "US-CO-205",
    name: "Colorado AI Act",
    shortName: "CO SB 24-205",
    jurisdiction: "US · Colorado",
    status: "pending" as const,
    effectiveDate: "01 Feb 2026",
    maxPenalty: "CCPA enforcement",
    summary:
      "The first US state comprehensive AI law. Requires deployers of high-risk AI systems to use reasonable care to protect consumers from known risks of algorithmic discrimination.",
    topics: ["Hiring", "Housing"],
    providers: 7,
  },
  {
    slug: "nyc-local-law-144",
    code: "NYC-144",
    name: "NYC Local Law 144",
    shortName: "NYC LL 144",
    jurisdiction: "US · New York City",
    status: "active" as const,
    effectiveDate: "05 Jul 2023",
    maxPenalty: "$1,500 per violation per day",
    summary:
      "Requires employers using automated employment decision tools (AEDTs) in hiring or promotion decisions to conduct annual bias audits and post results publicly.",
    topics: ["Employment", "Bias audit"],
    providers: 9,
  },
  {
    slug: "california-ab-2013",
    code: "CA-AB-2013",
    name: "California AB 2013",
    shortName: "CA AB 2013",
    jurisdiction: "US · California",
    status: "pending" as const,
    effectiveDate: "01 Jan 2026",
    maxPenalty: "Civil penalty",
    summary:
      "Requires developers of generative AI systems trained on data exceeding certain compute thresholds to publish detailed training data transparency reports.",
    topics: ["AI Transparency"],
    providers: 4,
  },
  {
    slug: "illinois-ai-video-interview-act",
    code: "IL-AIVIRA",
    name: "Illinois AI Video Interview Act",
    shortName: "IL AIVIRA",
    jurisdiction: "US · Illinois",
    status: "active" as const,
    effectiveDate: "01 Jan 2020",
    maxPenalty: "Civil damages",
    summary:
      "Requires employers using AI to analyze video interviews to notify candidates, obtain consent, explain how the AI is used, and limit sharing of video data.",
    topics: ["Employment"],
    providers: 5,
  },
  {
    slug: "virginia-hb-2094",
    code: "VA-HB-2094",
    name: "Virginia HB 2094",
    shortName: "VA HB 2094",
    jurisdiction: "US · Virginia",
    status: "pending" as const,
    effectiveDate: "01 Jul 2026",
    maxPenalty: "$7,500 per violation",
    summary:
      "Virginia's legislation governing automated decision systems used in consequential decisions. Requires impact assessments, consumer notifications, and opt-out rights.",
    topics: ["ADS", "Consumer protection"],
    providers: 3,
  },
];

const UPCOMING = [
  {
    slug: null,
    code: "EU-GPAI",
    name: "EU AI Act — GPAI Rules",
    jurisdiction: "European Union",
    status: "pending" as const,
    effectiveDate: "Aug 2025",
    summary: "General-purpose AI model obligations including capability evaluations and incident reporting for systemic-risk models.",
    topics: ["GPAI", "Systemic risk"],
  },
  {
    slug: "texas-hb-1709",
    code: "TX-HB-1709",
    name: "Texas Responsible AI Governance Act",
    jurisdiction: "US · Texas",
    status: "proposed" as const,
    effectiveDate: "TBD",
    summary: "Proposed AI regulation modeled on the Colorado AI Act, covering high-risk AI system obligations for Texas businesses.",
    topics: ["High-risk AI"],
  },
];

function StatusDot({ status }: { status: string }) {
  return (
    <span className="chip" style={{ fontSize: 11, padding: "2px 8px" }}>
      <span className={`dot dot-${status}`} />
      {status}
    </span>
  );
}

export default function RegulationsPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Regulations", url: "/regulations" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="page-banner">
        <div className="container" style={{ padding: 0 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Regulations" }]} />
          <h1 className="h1">Catalog — {REGULATIONS.length + UPCOMING.length} regulations</h1>
          <p className="lede" style={{ maxWidth: 640, marginTop: 8 }}>
            Track every major AI compliance law — enforcement dates, penalties, and what your business needs to do.
          </p>
        </div>
      </div>

      <section className="container" style={{ padding: "var(--s-8) var(--s-7)", display: "grid", gridTemplateColumns: "240px 1fr", gap: 40 }}>
        {/* Sidebar filters */}
        <aside>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Filters</div>

          <div style={{ marginBottom: 20 }}>
            <div className="h5" style={{ marginBottom: 8 }}>Status</div>
            {[
              ["active", "Active"],
              ["pending", "Pending"],
              ["proposed", "Proposed"],
            ].map(([s, n]) => (
              <label key={s} className="flex items-center small" style={{ gap: 8, padding: "6px 0" }}>
                <input type="checkbox" defaultChecked />
                <span className={`dot dot-${s}`} />
                <span>{n}</span>
              </label>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="h5" style={{ marginBottom: 8 }}>Jurisdiction</div>
            {["European Union", "United States", "United Kingdom", "Asia-Pacific"].map((n) => (
              <label key={n} className="flex items-center small" style={{ gap: 8, padding: "6px 0" }}>
                <input type="checkbox" defaultChecked />
                <span>{n}</span>
              </label>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="h5" style={{ marginBottom: 8 }}>Topic</div>
            {["Generative AI", "Employment", "Privacy", "High-risk AI", "Critical infra"].map((n) => (
              <label key={n} className="flex items-center small" style={{ gap: 8, padding: "6px 0" }}>
                <input type="checkbox" />
                <span>{n}</span>
              </label>
            ))}
          </div>

          <button className="btn btn-ghost btn-sm w-full">Clear all filters</button>
        </aside>

        {/* Main content */}
        <div>
          <div className="between" style={{ marginBottom: 20 }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <span className="chip chip-ink">Active ✕</span>
              <span className="chip chip-ink">Pending ✕</span>
              <span className="chip chip-ink">Proposed ✕</span>
            </div>
            <div className="flex" style={{ gap: 8 }}>
              <span className="btn btn-sm btn-ghost">Sort: newest ▾</span>
            </div>
          </div>

          {/* Regulation table */}
          <table className="data">
            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Jurisdiction</th>
                <th>Effective</th>
                <th>Status</th>
                <th>Providers</th>
              </tr>
            </thead>
            <tbody>
              {REGULATIONS.map((reg) => (
                <tr key={reg.slug}>
                  <td style={{ width: 110 }}>
                    <Link href={`/regulations/${reg.slug}`}>
                      <span className="chip chip-code">{reg.code}</span>
                    </Link>
                  </td>
                  <td>
                    <Link href={`/regulations/${reg.slug}`} className="h4" style={{ fontSize: 15 }}>
                      {reg.name}
                    </Link>
                    <div className="tag-strip" style={{ marginTop: 6 }}>
                      {reg.topics.map((t) => (
                        <span key={t} className="chip" style={{ fontSize: 11 }}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="small">{reg.jurisdiction}</td>
                  <td className="mono xs">{reg.effectiveDate}</td>
                  <td><StatusDot status={reg.status} /></td>
                  <td>
                    <span className="mono" style={{ fontSize: 13, color: "var(--ink)" }}>{reg.providers}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Upcoming section */}
          <div style={{ marginTop: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Upcoming &amp; In Development</div>
            <table className="data">
              <tbody>
                {UPCOMING.map((reg) => {
                  const inner = (
                    <tr key={reg.name} style={{ opacity: reg.slug ? 1 : 0.7 }}>
                      <td style={{ width: 110 }}>
                        <span className="chip chip-code">{reg.code}</span>
                      </td>
                      <td>
                        <div className="h4" style={{ fontSize: 15 }}>{reg.name}</div>
                        <div className="tag-strip" style={{ marginTop: 6 }}>
                          {reg.topics.map((t) => (
                            <span key={t} className="chip" style={{ fontSize: 11 }}>{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="small">{reg.jurisdiction}</td>
                      <td className="mono xs">{reg.effectiveDate}</td>
                      <td><StatusDot status={reg.status} /></td>
                    </tr>
                  );
                  return reg.slug ? (
                    <Link key={reg.name} href={`/regulations/${reg.slug}`} style={{ display: "contents" }}>
                      {inner}
                    </Link>
                  ) : (
                    inner
                  );
                })}
              </tbody>
            </table>
            <p className="small" style={{ marginTop: 14 }}>
              We monitor legislative databases, government feeds, and legal news to keep this list current.{" "}
              <Link href="/newsletter" style={{ textDecoration: "underline" }}>Subscribe for updates</Link>.
            </p>
          </div>

          {/* CTA */}
          <div className="card card-tint" style={{ marginTop: 40, padding: "var(--s-7)", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="h3">Not sure which regulations apply to you?</div>
              <p className="small" style={{ marginTop: 4 }}>Our free compliance checker maps your business and AI use cases to the regulations that matter.</p>
            </div>
            <div className="flex" style={{ gap: 8 }}>
              <Link href="/checker" className="btn btn-primary">Start Free Check</Link>
              <Link href="/compare/us-state-ai-laws" className="btn btn-ghost">Compare Regulations</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
