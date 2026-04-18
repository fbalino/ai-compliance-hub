import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { HeroSearch } from "@/components/home/HeroSearch";
import { NewsletterForm } from "@/components/NewsletterForm";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Regulome — Find what you need to comply with",
  description:
    "Search the register of 912 AI regulations — or describe your situation in plain English and let us route you to the right regulations and providers.",
};

function RegCard({
  code,
  title,
  juris,
  status,
  effective,
  providers,
  topics,
  summary,
  slug,
}: {
  code: string;
  title: string;
  juris: string;
  status: string;
  effective: string;
  providers: number;
  topics: string[];
  summary: string;
  slug: string;
}) {
  return (
    <Link href={`/regulations/${slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article className="card" style={{ height: "100%" }}>
        <div className="between" style={{ marginBottom: 12 }}>
          <span className="chip chip-code">{code}</span>
          <span className="chip" style={{ fontSize: 11, padding: "2px 8px" }}>
            <span className={`dot dot-${status}`} />
            {status}
          </span>
        </div>
        <div className="h3" style={{ fontSize: 22, marginBottom: 4 }}>{title}</div>
        <div className="small" style={{ marginBottom: 12 }}>
          {juris} · effective <span className="mono">{effective}</span>
        </div>
        <div className="small" style={{ marginBottom: 12, color: "var(--ink-2)", lineHeight: 1.5 }}>
          {summary}
        </div>
        <div className="tag-strip" style={{ marginBottom: 16 }}>
          {topics.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <div className="hr" style={{ marginBottom: 16 }} />
        <div className="between">
          <span className="small">
            <b style={{ color: "var(--ink)" }}>{providers}</b> providers
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--mono)", fontSize: 12 }}>
            Open →
          </span>
        </div>
      </article>
    </Link>
  );
}

function ProviderCard({
  name,
  type,
  hq,
  blurb,
  regs,
  featured,
  slug,
}: {
  name: string;
  type: string;
  hq: string;
  blurb: string;
  regs: string[];
  featured?: boolean;
  slug: string;
}) {
  return (
    <Link href={`/directory/providers/${slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article className={`card ${featured ? "card-feature" : ""}`} style={{ height: "100%" }}>
        <div className="flex items-center" style={{ gap: 12, marginBottom: 12 }}>
          <div
            className="avatar avatar-sq"
            style={{ width: 44, height: 44, fontSize: 17 }}
          >
            {name[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div className="h4">{name}</div>
            <div className="xs">{type} · {hq}</div>
          </div>
          {featured && (
            <span className="feature-flag">★ Featured</span>
          )}
        </div>
        <div className="small" style={{ color: "var(--ink-2)", lineHeight: 1.5, marginBottom: 12 }}>
          {blurb}
        </div>
        <div className="mono xs" style={{ marginBottom: 16, letterSpacing: "0.04em" }}>
          <span className="soft">Covers: </span>
          {regs.slice(0, 3).join(" · ")}
          {regs.length > 3 && <span className="soft"> +{regs.length - 3}</span>}
        </div>
        <div className="flex" style={{ gap: 8 }}>
          <span className="btn btn-sm btn-primary" style={{ flex: 1, textAlign: "center" }}>Contact</span>
          <span className="btn btn-sm btn-ghost">Profile</span>
        </div>
      </article>
    </Link>
  );
}

function Icon({ name, size = 28 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    book: (
      <>
        <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" />
        <path d="M5 17a3 3 0 0 1 3-3h11" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
    building: (
      <>
        <path d="M4 21V7l8-4 8 4v14" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="1.5" />
        <path d="m3 8 9 6 9-6" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      {paths[name] || <circle cx="12" cy="12" r="2" />}
    </svg>
  );
}

export default function HomePage() {
  const breadcrumbs = breadcrumbListSchema([{ name: "Home", url: "/" }]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      {/* ── HERO — search-first with keyword / describe toggle ── */}
      <section className="hero-bg" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56, textAlign: "center" }}>
          <h1
            className="display v4-rise"
            style={{ maxWidth: 960, margin: "0 auto" }}
          >
            Find what you need to{" "}
            <em className="serif" style={{ color: "var(--accent)" }}>comply with</em>.
          </h1>
          <p
            className="lede soft v4-rise v4-d1"
            style={{ maxWidth: 640, margin: "20px auto 0" }}
          >
            Search the register of 912 regulations — or describe your situation in plain English and let us route you.
          </p>

          <div
            className="v4-rise v4-d2"
            style={{ maxWidth: 760, margin: "32px auto 0" }}
          >
            <HeroSearch />
          </div>

          <div
            className="flex v4-rise v4-d3"
            style={{ gap: 12, marginTop: 32, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}
          >
            <span className="xs faint">Or start with:</span>
            <Link href="/regulations/eu-ai-act" className="chip" style={{ cursor: "pointer" }}>🇪🇺 EU AI Act</Link>
            <Link href="/regulations/colorado-ai-act" className="chip" style={{ cursor: "pointer" }}>🇺🇸 Colorado AI</Link>
            <Link href="/regulations" className="chip" style={{ cursor: "pointer" }}>NIS2</Link>
            <Link href="/regulations" className="chip" style={{ cursor: "pointer" }}>DORA</Link>
            <Link href="/regulations" className="chip" style={{ cursor: "pointer" }}>Browse all 912 ▾</Link>
          </div>
        </div>
      </section>

      {/* ── YOUR MATCHES — two-column layout ── */}
      <section className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>
          Your matches · 14 regulations · 23 providers · 6 guides
        </div>

        <div
          className="grid"
          style={{ gridTemplateColumns: "1.6fr 1fr", gap: 40, alignItems: "start" }}
        >
          <div>
            {/* Regulations that apply */}
            <div className="section-head">
              <div><h2 className="h2">Regulations that apply</h2></div>
              <Link href="/regulations" className="action">See all 14 →</Link>
            </div>
            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <RegCard
                code="EU-AIA-24"
                title="EU AI Act"
                juris="European Union"
                effective="02 Aug 2026"
                status="active"
                providers={12}
                topics={["Hiring AI", "High-risk"]}
                summary="Annex III classifies hiring AI as high-risk. Conformity assessment, bias monitoring, post-market monitoring required."
                slug="eu-ai-act"
              />
              <RegCard
                code="US-NYC-144"
                title="NYC Local Law 144"
                juris="US · New York"
                effective="05 Jul 2023"
                status="active"
                providers={9}
                topics={["Hiring AI", "Bias audit"]}
                summary="Annual independent bias audit + candidate notice for automated employment decision tools used in NYC."
                slug="nyc-local-law-144"
              />
              <RegCard
                code="US-CO-205"
                title="Colorado AI Act"
                juris="US · Colorado"
                effective="01 Feb 2026"
                status="pending"
                providers={7}
                topics={["Algorithmic hiring"]}
                summary="Developers & deployers of 'high-risk' AI owe reasonable care to prevent algorithmic discrimination."
                slug="colorado-ai-act"
              />
              <RegCard
                code="US-IL-AIVIA"
                title="Illinois AI Video Interview Act"
                juris="US · Illinois"
                effective="01 Jan 2020"
                status="active"
                providers={4}
                topics={["Hiring AI", "Consent"]}
                summary="Consent + deletion requirements for AI-analysed video job interviews in Illinois."
                slug="illinois-ai-video-interview-act"
              />
            </div>

            {/* Relevant guides from The Ledger */}
            <div className="section-head" style={{ marginTop: 40 }}>
              <div>
                <h2 className="h2">
                  Relevant guides from{" "}
                  <em className="serif" style={{ color: "var(--accent)" }}>The Ledger</em>
                </h2>
              </div>
              <Link href="/blog" className="action">More →</Link>
            </div>
            <div className="col" style={{ gap: 12 }}>
              {[
                {
                  kind: "Explainer",
                  title: "Hiring AI compliance 2026 — the starter kit",
                  desc: "Every law that touches automated employment tools, one walkthrough.",
                  time: "11 min",
                },
                {
                  kind: "Q&A",
                  title: "\"The NYC-144 bias audit, walked step-by-step\"",
                  desc: "Interview with Harbor Compliance on what a real audit looks like.",
                  time: "8 min",
                },
              ].map((a) => (
                <Link key={a.title} href="/blog" className="card" style={{ padding: 18, display: "block", cursor: "pointer" }}>
                  <div className="between items-center">
                    <div style={{ flex: 1 }}>
                      <div className="eyebrow" style={{ marginBottom: 4, color: "var(--accent)" }}>▸ {a.kind}</div>
                      <h4 className="h4" style={{ marginBottom: 4 }}>{a.title}</h4>
                      <div className="small">{a.desc}</div>
                    </div>
                    <div className="mono xs faint" style={{ marginLeft: 20 }}>{a.time}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right column: Providers who can help */}
          <aside>
            <div className="section-head" style={{ alignItems: "flex-start", paddingBottom: 12 }}>
              <div><h2 className="h3">Providers who can help</h2></div>
              <Link href="/directory" className="action">All 23 →</Link>
            </div>

            <div className="col" style={{ gap: 16 }}>
              <ProviderCard
                name="Harbor Compliance"
                type="Advisory"
                hq="Boston"
                featured
                blurb="Multi-jurisdiction rollouts — US + EU hiring AI compliance is our bread and butter."
                regs={["EU AI Act", "NYC-144", "Colorado AI", "+38"]}
                slug="babl-ai"
              />
              <ProviderCard
                name="Marque Legal"
                type="Legal"
                hq="Paris"
                blurb="EU-side legal counsel on high-risk AI and cross-border deployments."
                regs={["EU AI Act", "GDPR", "DSA"]}
                slug="credo-ai"
              />
              <ProviderCard
                name="Aegis AI"
                type="Software"
                hq="Toronto"
                blurb="Bias-audit platform purpose-built for NYC-144 and Colorado AI."
                regs={["NYC-144", "Colorado AI", "AIDA"]}
                slug="orcaa"
              />
            </div>

            {/* RFP callout */}
            <div className="card card-feature" style={{ marginTop: 20, padding: 20 }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Can&apos;t find the right fit?</div>
              <h4 className="h3">Post an RFP.</h4>
              <p className="small" style={{ marginBottom: 16 }}>
                Describe your need once. Get 3–5 quotes in 48 hours from relevant providers.
              </p>
              <Link href="/join" className="btn btn-accent w-full" style={{ textAlign: "center" }}>Post an RFP →</Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── THREE WAYS IN ── */}
      <section
        style={{
          background: "var(--paper-2)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Or browse the index</div>
          <h2 className="h1" style={{ marginBottom: 32 }}>Three ways in.</h2>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {[
              {
                icon: "book",
                title: "By regulation",
                desc: "The complete catalog, 912 entries strong. Searchable, filterable, by code or title.",
                action: "Open catalog",
                href: "/regulations",
              },
              {
                icon: "globe",
                title: "By jurisdiction",
                desc: "63 jurisdictions tracked — from EU-level regulation to US state AI laws.",
                action: "Browse regions",
                href: "/regulations",
              },
              {
                icon: "building",
                title: "By provider",
                desc: "314 verified firms — software, advisory, legal, audit.",
                action: "Open directory",
                href: "/directory",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="card"
                style={{ padding: 28, cursor: "pointer", display: "block" }}
              >
                <div style={{ color: "var(--accent)", marginBottom: 12 }}>
                  <Icon name={item.icon} />
                </div>
                <h3 className="h3" style={{ marginBottom: 8 }}>{item.title}</h3>
                <p className="small" style={{ marginBottom: 16 }}>{item.desc}</p>
                <div
                  className="mono xs"
                  style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink)" }}
                >
                  {item.action} <Icon name="arrow" size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE LEDGER — editorial strip ── */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="section-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>From the newsroom</div>
            <h2 className="h1">
              <em className="serif" style={{ color: "var(--accent)" }}>The Ledger.</em>
            </h2>
            <p className="lede soft">A daily feed + deep explainers. Free to read, paid digest optional.</p>
          </div>
          <Link href="/blog" className="action" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Read the Ledger <Icon name="arrow" size={14} />
          </Link>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "2fr 1fr 1fr", gap: 32 }}>
          <Link href="/blog" style={{ textDecoration: "none", display: "block", cursor: "pointer" }}>
            <article>
              <div
                style={{
                  height: 300,
                  marginBottom: 16,
                  background: "linear-gradient(135deg, rgba(14,19,48,0.04), rgba(14,19,48,0.02)), repeating-linear-gradient(45deg, transparent 0 10px, rgba(14,19,48,0.05) 10px 11px)",
                  border: "1px solid var(--line)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--ink-faint)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                lead illustration
              </div>
              <div className="eyebrow" style={{ marginBottom: 8, color: "var(--accent)" }}>{"\u25b8"} Lead story</div>
              <h3 className="h1" style={{ fontSize: 36, marginBottom: 12 }}>
                The GPAI Code of Practice: what foundation-model providers must do now.
              </h3>
              <p className="lede soft">
                Four months to align. A clause-by-clause read-through of the Code published this week.
              </p>
              <div className="mono xs faint" style={{ marginTop: 12 }}>By R. Almeida · 6 min · Apr 14</div>
            </article>
          </Link>

          <div className="col" style={{ gap: 20 }}>
            {[
              { kind: "Brief", title: "Colorado AI: the readiness window opens", time: "3 min" },
              { kind: "Q&A", title: "\"We've run 31 GPAI audits — here's what trips teams up\"", time: "11 min" },
              { kind: "Analysis", title: "UK AI Safety Bill Draft 3 — scope narrows", time: "7 min" },
            ].map((a) => (
              <Link
                key={a.title}
                href="/blog"
                style={{ textDecoration: "none", display: "block", borderTop: "1px solid var(--line)", paddingTop: 16, cursor: "pointer" }}
              >
                <div className="eyebrow" style={{ marginBottom: 4, color: "var(--accent)" }}>{"\u25b8"} {a.kind}</div>
                <h4 className="h3" style={{ fontSize: 20, marginBottom: 4 }}>{a.title}</h4>
                <div className="mono xs faint">{a.time} read</div>
              </Link>
            ))}
          </div>

          <aside>
            <div
              className="card"
              style={{
                padding: 24,
                background: "var(--ink)",
                color: "var(--paper)",
                borderColor: "var(--ink)",
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 12, color: "rgba(251,251,253,0.6)" }}>
                Newsletter
              </div>
              <h3 className="h2 serif" style={{ color: "var(--paper)", marginBottom: 8 }}>
                Weekly digest.
              </h3>
              <p className="small" style={{ marginBottom: 16, color: "rgba(251,251,253,0.75)" }}>
                Every regulation that shifted, annotated. 5-minute read. 9,200 subscribers.
              </p>
              <div className="col" style={{ gap: 8 }}>
                <NewsletterForm source="homepage" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── FOR PROVIDERS — dark CTA ── */}
      <section style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div
            className="grid"
            style={{ gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}
          >
            <div>
              <div className="eyebrow" style={{ marginBottom: 12, color: "rgba(251,251,253,0.6)" }}>
                For providers
              </div>
              <h2 className="h1" style={{ color: "var(--paper)", marginBottom: 16 }}>
                Meet buyers at the moment they&apos;re searching.
              </h2>
              <p
                className="lede"
                style={{ color: "rgba(251,251,253,0.7)" }}
              >
                Free to list. Pay only to be Featured. 3,000+ monthly searches · 9,200 subscribers · every listing verified.
              </p>
              <div className="flex" style={{ gap: 12, marginTop: 24 }}>
                <Link href="/join" className="btn btn-accent btn-lg">List your firm</Link>
                <Link
                  href="/join"
                  className="btn btn-lg"
                  style={{
                    background: "transparent",
                    color: "var(--paper)",
                    borderColor: "rgba(251,251,253,0.3)",
                  }}
                >
                  Claim existing
                </Link>
              </div>
            </div>

            <div>
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { n: "912", l: "regulations indexed" },
                  { n: "63", l: "jurisdictions" },
                  { n: "314", l: "verified providers" },
                  { n: "9.2k", l: "newsletter subs" },
                ].map((stat) => (
                  <div
                    key={stat.l}
                    style={{
                      padding: 24,
                      border: "1px solid rgba(251,251,253,0.15)",
                      borderRadius: 6,
                    }}
                  >
                    <div
                      className="serif"
                      style={{ fontSize: 48, fontWeight: 500, color: "var(--paper)", lineHeight: 1 }}
                    >
                      {stat.n}
                    </div>
                    <div
                      className="mono xs"
                      style={{
                        marginTop: 8,
                        color: "rgba(251,251,253,0.6)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {stat.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
