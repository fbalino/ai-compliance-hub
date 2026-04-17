import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { NewsletterForm } from "@/components/NewsletterForm";

// ISR: homepage revalidates every 6 hours
export const revalidate = 21600;

export const metadata: Metadata = {
  title: "regulome.io — The directory of AI regulations",
  description:
    "Browse every AI law that applies to your business — current, upcoming, and in draft — and connect with vetted compliance providers.",
};

// ── Preview card rows ──────────────────────────────────
const PREVIEW_ROWS: {
  jur: string;
  name: string;
  sub: string;
  status: "applies" | "action" | "clear" | "watch";
  label: string;
}[] = [
  { jur: "EU", name: "EU AI Act", sub: "transparency · Article 52", status: "applies", label: "Applies" },
  { jur: "CO", name: "Colorado AI Act", sub: "effective 30 Jun 2026", status: "action", label: "Action needed" },
  { jur: "NY", name: "NYC Local Law 144", sub: "automated hiring tools", status: "applies", label: "Applies" },
  { jur: "CA", name: "California SB 1047", sub: "frontier-model safety — vetoed", status: "clear", label: "Does not apply" },
  { jur: "UK", name: "UK AI Bill", sub: "principles framework · in draft", status: "watch", label: "Watch" },
];

// ── Featured regulations ──────────────────────────────
type Status = "applies" | "action" | "clear" | "watch";
type Tint = "blue" | "green" | "amber" | "slate" | "teal" | "rose" | "plum";

const REGS: {
  slug: string;
  sigil: string;
  name: string;
  meta: string;
  status: Status;
  statusLabel: string;
  who: string;
  footLeft: React.ReactNode;
  feature?: boolean;
  tint: Tint;
}[] = [
  {
    slug: "eu-ai-act",
    sigil: "EU",
    name: "EU AI Act",
    meta: "EU-001 · Reg. 2024/1689",
    status: "applies",
    statusLabel: "In force",
    who: "any company offering AI products or services in the EU, or whose AI output is used in the EU — regardless of where the company is based.",
    footLeft: <>27 member states · <strong>GPAI effective Aug 2026</strong></>,
    feature: true,
    tint: "blue",
  },
  {
    slug: "colorado-ai-act",
    sigil: "CO",
    name: "Colorado AI Act",
    meta: "US-CO-014 · SB 24-205",
    status: "action",
    statusLabel: "In 75 days",
    who: "companies deploying high-risk AI affecting Colorado consumers in employment, lending, insurance, housing, education, or healthcare.",
    footLeft: <>Effective <strong>30 Jun 2026</strong></>,
    tint: "green",
  },
  {
    slug: "nyc-local-law-144",
    sigil: "NY",
    name: "NYC Local Law 144",
    meta: "US-NY-007 · LL 144",
    status: "applies",
    statusLabel: "Enforcing",
    who: "employers using automated tools to screen, rank, or decide on candidates for jobs or promotions in New York City.",
    footLeft: <>Enforcing since <strong>Jul 2023</strong></>,
    tint: "amber",
  },
  {
    slug: "virginia-hb-2094",
    sigil: "VA",
    name: "Virginia HB 2094",
    meta: "US-VA-011 · HB 2094",
    status: "action",
    statusLabel: "Incoming",
    who: "businesses using high-risk automated decision systems affecting Virginia residents — impact assessments and opt-out rights required.",
    footLeft: <>Effective <strong>1 Jul 2026</strong></>,
    tint: "slate",
  },
  {
    slug: "utah-ai-policy-act",
    sigil: "UT",
    name: "Utah AI Policy Act",
    meta: "US-UT-009 · SB 149",
    status: "applies",
    statusLabel: "Enforcing",
    who: "businesses using generative AI in interactions with Utah consumers — especially in regulated occupations like healthcare, law, and finance.",
    footLeft: <>Amendments <strong>Q3 2026</strong></>,
    tint: "teal",
  },
  {
    slug: "california-ab-2013",
    sigil: "CA",
    name: "California AB 2013",
    meta: "US-CA-019 · AB 2013",
    status: "action",
    statusLabel: "In 260 days",
    who: "developers of generative AI models released or substantially modified for use in California on or after Jan 1, 2022.",
    footLeft: <>Effective <strong>Jan 2027</strong></>,
    tint: "rose",
  },
  {
    slug: "uk-ai-bill",
    sigil: "UK",
    name: "UK AI Regulation Bill",
    meta: "UK-023 · AI Bill",
    status: "watch",
    statusLabel: "In draft",
    who: "any company offering AI products in the UK — obligations flow through existing regulators (ICO, FCA, MHRA, CMA) by sector.",
    footLeft: <>Consultation <strong>open</strong></>,
    tint: "plum",
  },
];

// ── Featured providers ────────────────────────────────
const PROVIDERS = [
  {
    id: "PRV-001",
    slug: "babl-ai",
    type: "Bias auditor · US",
    logo: "Ba",
    name: "BABL AI",
    loc: "Iowa City · Remote",
    body: "NYC Local Law 144 bias audits and AI impact assessments for HR tech, financial services, and public-sector deployments.",
    tags: ["NYC LL 144", "CO AI Act", "NIST AI RMF"],
  },
  {
    id: "PRV-008",
    slug: "credo-ai",
    type: "Platform · US + EU",
    logo: "Cr",
    name: "Credo AI",
    loc: "San Francisco · Berlin",
    body: "Governance platform for AI policy enforcement, risk assessment, and compliance reporting across mid-market and enterprise AI teams.",
    tags: ["EU AI Act", "GDPR", "ISO 42001"],
  },
  {
    id: "PRV-014",
    slug: "luminos-law",
    type: "Law firm · US",
    logo: "Ll",
    name: "Luminos.Law",
    loc: "New York · Washington DC",
    body: "Full-service AI law firm covering Colorado AI Act, NYC LL 144, and federal enforcement. Pragmatic memos for product and policy teams.",
    tags: ["Multi-jurisdictional", "CO AI Act", "SOC 2"],
  },
  {
    id: "PRV-019",
    slug: "orcaa",
    type: "Auditor · US",
    logo: "Or",
    name: "ORCAA",
    loc: "New York",
    body: "Independent algorithmic bias and governance audits under NYC LL 144 and high-risk-system reviews for Colorado deployers.",
    tags: ["NYC LL 144", "CO AI Act", "NIST AI RMF"],
  },
  {
    id: "PRV-025",
    slug: "holistic-ai",
    type: "Platform · UK",
    logo: "Ha",
    name: "Holistic AI",
    loc: "London · New York",
    body: "AI risk management suite with automated testing for bias, robustness, privacy, and explainability — trusted by Fortune 500 deployers.",
    tags: ["EU AI Act", "NYC LL 144", "ISO 42001"],
  },
  {
    id: "PRV-031",
    slug: "trustible",
    type: "Fractional CCO",
    logo: "Tr",
    name: "Trustible",
    loc: "Virginia · Remote",
    body: "Embedded AI governance for Series A–C AI companies. Build programs, draft policies, handle the regulator call so founders don't have to.",
    tags: ["Multi-jurisdictional", "VA HB 2094", "NIST AI RMF"],
  },
];

function StatusPill({ status, label }: { status: Status; label: string }) {
  const cls =
    status === "applies"
      ? "rg-pill-applies"
      : status === "action"
      ? "rg-pill-action"
      : status === "clear"
      ? "rg-pill-clear"
      : "rg-pill-watch";
  return <span className={`rg-pill-status ${cls}`}>{label}</span>;
}

export default function HomePage() {
  const breadcrumbs = breadcrumbListSchema([{ name: "Home", url: "/" }]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      {/* ── HERO ── */}
      <section
        style={{
          padding: "72px 0 88px",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--rg-border)",
          background:
            "radial-gradient(ellipse 900px 600px at 85% 20%, rgba(37,99,235,0.06) 0%, transparent 60%), radial-gradient(ellipse 700px 500px at 10% 90%, rgba(14,165,233,0.05) 0%, transparent 60%), var(--rg-page)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(var(--rg-border-soft) 1px, transparent 1px), linear-gradient(90deg, var(--rg-border-soft) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            opacity: 0.4,
            maskImage:
              "radial-gradient(ellipse at 70% 40%, rgba(0,0,0,0.7) 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 70% 40%, rgba(0,0,0,0.7) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="rg-container">
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.02fr 0.98fr",
              gap: 72,
              alignItems: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div>
              <div className="rg-eyebrow rg-rise" style={{ marginBottom: 26 }}>
                <span className="rg-eyebrow-pill">New</span>
                14 regulations · 38 vetted providers
              </div>
              <h1 className="rg-display rg-rise rg-d1" style={{ marginBottom: 24 }}>
                The directory of <span className="rg-blue">AI regulations</span> and the experts who know them.
              </h1>
              <p className="rg-lead rg-rise rg-d2" style={{ maxWidth: 520, marginBottom: 32 }}>
                Browse every AI law that applies to your business — current, upcoming, and in draft — and connect with{" "}
                <strong style={{ color: "var(--rg-ink)", fontWeight: 600 }}>vetted compliance providers</strong> in a few clicks.
              </p>
              <div
                className="rg-rise rg-d3"
                style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}
              >
                <Link href="/regulations" className="rg-btn rg-btn-primary rg-btn-lg">
                  Browse regulations <span className="rg-arrow">→</span>
                </Link>
                <Link href="/directory" className="rg-btn rg-btn-outline rg-btn-lg">
                  Find a provider
                </Link>
              </div>
            </div>

            {/* Preview card */}
            <div className="rg-drift rg-d4" style={{ position: "relative" }}>
              <div
                style={{
                  background: "var(--rg-card)",
                  border: "1px solid var(--rg-border)",
                  borderRadius: 14,
                  padding: "22px 22px 18px",
                  boxShadow:
                    "0 1px 0 rgba(12,22,40,0.02), 0 2px 4px rgba(12,22,40,0.04), 0 12px 32px -8px rgba(12,22,40,0.08), 0 40px 80px -20px rgba(12,22,40,0.12)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    paddingBottom: 16,
                    borderBottom: "1px solid var(--rg-hair)",
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: "var(--rg-ink)",
                        letterSpacing: "-0.4px",
                        lineHeight: 1.25,
                        marginBottom: 4,
                      }}
                    >
                      Mid-market SaaS — US &amp; EU
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--rg-ink-dim)", fontWeight: 500 }}>
                      ~180 employees · classification &amp; retrieval AI
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10.5,
                      fontWeight: 500,
                      letterSpacing: 0.2,
                      color: "var(--rg-ink-dim)",
                      padding: "4px 8px",
                      background: "var(--rg-card-soft)",
                      border: "1px solid var(--rg-border)",
                      borderRadius: 6,
                      whiteSpace: "nowrap",
                    }}
                  >
                    preview
                  </span>
                </div>

                {PREVIEW_ROWS.map((row, i) => (
                  <div
                    key={row.name}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "40px 1fr auto",
                      gap: 14,
                      padding: "14px 0",
                      borderBottom: i === PREVIEW_ROWS.length - 1 ? "none" : "1px solid var(--rg-hair)",
                      paddingBottom: i === PREVIEW_ROWS.length - 1 ? 16 : 14,
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--rg-ink-dim)",
                        letterSpacing: 0.2,
                        textTransform: "uppercase",
                      }}
                    >
                      {row.jur}
                    </span>
                    <div
                      style={{
                        fontSize: 14.5,
                        fontWeight: 600,
                        color: "var(--rg-ink)",
                        letterSpacing: "-0.2px",
                        lineHeight: 1.3,
                      }}
                    >
                      {row.name}
                      <small
                        style={{
                          display: "block",
                          fontSize: 12.5,
                          fontWeight: 400,
                          color: "var(--rg-ink-dim)",
                          letterSpacing: "-0.05px",
                          marginTop: 2,
                        }}
                      >
                        {row.sub}
                      </small>
                    </div>
                    <StatusPill status={row.status} label={row.label} />
                  </div>
                ))}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 14,
                    marginTop: 6,
                    borderTop: "1px solid var(--rg-hair)",
                    fontSize: 12.5,
                    color: "var(--rg-ink-dim)",
                    fontWeight: 500,
                  }}
                >
                  <span>12 matched providers</span>
                  <Link
                    href="/directory"
                    style={{
                      color: "var(--rg-primary)",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Browse all →
                  </Link>
                </div>
              </div>

              {/* Floating number badges */}
              <div
                className="preview-badges"
                style={{
                  position: "absolute",
                  bottom: -24,
                  left: 40,
                  right: 40,
                  display: "flex",
                  justifyContent: "space-around",
                  gap: 10,
                  padding: "14px 20px",
                  background: "var(--rg-card)",
                  border: "1px solid var(--rg-border)",
                  borderRadius: 10,
                  boxShadow: "0 8px 20px -6px rgba(12,22,40,0.12)",
                }}
              >
                {[
                  { n: "14", l: "Regulations" },
                  { n: "14", l: "Jurisdictions" },
                  { n: "38", l: "Providers" },
                  { n: "48h", l: "Refresh" },
                ].map((b) => (
                  <div key={b.l} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 18,
                        letterSpacing: "-0.5px",
                        color: "var(--rg-ink)",
                        lineHeight: 1,
                      }}
                    >
                      {b.n}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "var(--rg-ink-dim)",
                        marginTop: 4,
                      }}
                    >
                      {b.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REGULATIONS GRID ── */}
      <section className="rg-section" id="regs" style={{ paddingTop: 120 }}>
        <div className="rg-container">
          <header className="rg-section-head">
            <div>
              <div className="rg-kicker">Regulations</div>
              <h2 className="rg-h1">
                Every AI law that matters,<br />
                <span className="rg-blue">in one place.</span>
              </h2>
            </div>
            <p className="rg-section-lead">
              Filter by jurisdiction, deadline, or risk tier. Every summary is written in plain English and{" "}
              <strong>reviewed by a lawyer licensed in that jurisdiction.</strong>
            </p>
          </header>

          <div className="rg-reg-grid">
            {REGS.map((r) => (
              <Link
                key={r.slug}
                href={`/regulations/${r.slug}`}
                className={`rg-reg ${r.feature ? "rg-reg-feature" : ""} rg-t-${r.tint}`}
              >
                <div className="rg-plate">
                  <div className="rg-plate-corners">
                    <span className="tl" /><span className="tr" /><span className="bl" /><span className="br" />
                  </div>
                  <span className="rg-plate-glyph">{r.sigil}</span>
                </div>
                <div className="rg-reg-body">
                  <div className="rg-reg-meta">
                    <span>{r.meta}</span>
                    <StatusPill status={r.status} label={r.statusLabel} />
                  </div>
                  <h3>{r.name}</h3>
                  <p className="rg-reg-who">
                    <strong>Who it covers:</strong> {r.who}
                  </p>
                  <div className="rg-reg-foot">
                    <span>{r.footLeft}</span>
                    <span className="rg-reg-open">
                      Open <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="rg-section-end">
            <Link href="/regulations" className="rg-btn rg-btn-outline rg-btn-lg">
              See all 14 regulations <span className="rg-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROVIDERS GRID ── */}
      <section className="rg-section" id="providers" style={{ paddingTop: 40 }}>
        <div className="rg-container">
          <header className="rg-section-head">
            <div>
              <div className="rg-kicker">Providers</div>
              <h2 className="rg-h1">
                The people who actually<br />
                <span className="rg-blue">do the work.</span>
              </h2>
            </div>
            <p className="rg-section-lead">
              Law firms, auditors, and fractional compliance officers — searchable by regulation.{" "}
              <strong>Every listing is vetted, none are paid placements.</strong>
            </p>
          </header>

          <div className="rg-prov-grid">
            {PROVIDERS.map((p) => (
              <Link key={p.slug} href={`/directory/providers/${p.slug}`} className="rg-prov">
                <div className="rg-prov-label">
                  <span>{p.id}</span>
                  <span className="rg-prov-type">{p.type}</span>
                </div>
                <div className="rg-prov-head">
                  <div className="rg-prov-logo">{p.logo}</div>
                  <div>
                    <h3>{p.name}</h3>
                    <div className="rg-prov-loc">{p.loc}</div>
                  </div>
                </div>
                <p>{p.body}</p>
                <div className="rg-prov-tags">
                  {p.tags.map((t, i) => (
                    <span key={t} className={`rg-tag${i === 0 ? " rg-tag-primary" : ""}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="rg-section-end">
            <Link href="/directory" className="rg-btn rg-btn-outline rg-btn-lg">
              Browse all 38 providers <span className="rg-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOR PROVIDERS (dark callout) ── */}
      <section className="rg-join">
        <div className="rg-container">
          <div className="rg-join-card">
            <div>
              <div className="rg-join-label">For compliance providers</div>
              <h2>Get in front of buyers who are already searching.</h2>
              <p>
                Regulome routes <strong>14,000+ founders, general counsel, and heads of policy</strong>{" "}
                every month toward the regulations they need help with — listed by what you actually do,
                not who paid the most.
              </p>
              <div className="rg-join-ctas">
                <Link href="/directory" className="rg-btn rg-btn-on-dark rg-btn-lg">
                  Apply to be listed <span className="rg-arrow">→</span>
                </Link>
                <Link href="/directory" className="rg-btn rg-btn-dark-ghost rg-btn-lg">
                  See what we require
                </Link>
              </div>
            </div>
            <div className="rg-join-plan">
              <div className="rg-join-plan-head">
                <span className="rg-jp-title">Verified listing</span>
                <span className="rg-jp-tier">Standard</span>
              </div>
              <div className="rg-join-plan-body">
                <div className="rg-jp-row"><span>Status</span><strong>Vetted · active</strong></div>
                <div className="rg-jp-row"><span>Regulations you can tag</span><strong>Up to 6</strong></div>
                <div className="rg-jp-row"><span>Monthly readers</span><strong>14k+ qualified</strong></div>
                <div className="rg-jp-row"><span>Warm introductions</span><strong>Unlimited</strong></div>
                <div className="rg-jp-row"><span>Annual fee</span><strong>$2,400<em>/ yr</em></strong></div>
                <div className="rg-jp-row"><span>Trial</span><strong>30 days free</strong></div>
              </div>
              <div className="rg-jp-foot">
                <strong>No-lead guarantee:</strong> if the trial doesn&apos;t produce a single qualified introduction,
                we remove the listing and cancel the invoice.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="rg-sub-wrap" id="newsletter">
        <div className="rg-container">
          <div className="rg-sub-grid">
            <div>
              <div className="rg-kicker">Weekly newsletter</div>
              <h2>
                One short email on <span className="rg-blue">what changed.</span>
              </h2>
              <p>
                Every Thursday: <strong>what regulators published this week, who it affects, and what to do about it.</strong>{" "}
                No marketing, no digest filler, one-click unsubscribe.
              </p>
              <div className="rg-sub-meta">
                <div><strong><em>14,203</em></strong>Subscribers</div>
                <div><strong><em>61%</em></strong>Open rate</div>
                <div><strong><em>78</em></strong>Issues sent</div>
              </div>
            </div>
            <div className="rg-sub-form">
              <div className="rg-fl">
                <label>Your work email</label>
                <span className="rg-req">required</span>
              </div>
              <NewsletterForm source="homepage" />
              <p
                style={{
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: "1px solid var(--rg-hair)",
                  fontSize: 12,
                  color: "var(--rg-ink-dim)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.05px",
                }}
              >
                We&apos;ll never share your address, and every email has a one-click unsubscribe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
