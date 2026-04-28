import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { HeroSearch } from "@/components/home/HeroSearch";
import { NewsletterForm } from "@/components/NewsletterForm";
import { BlogCover } from "@/components/blog/BlogCover";
import { db } from "@/db";
import { providers, providerRegulations } from "@/db/schema";
import { count, eq, inArray } from "drizzle-orm";
import { getAllRegulationSlugs, getAllRegulations } from "@/lib/regulations";
import Anthropic from "@anthropic-ai/sdk";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Find what you need to comply with",
  description:
    "Search the register of AI regulations — or describe your situation in plain English and let us route you to the right regulations and providers.",
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
            <span className="feature-flag">Featured</span>
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

const BLOG_COUNT = 11;

async function matchRegulationsWithClaude(
  description: string,
  availableSlugs: string[],
  regCatalog: Array<{ slug: string; name: string; jurisdiction: string; description: string }>,
): Promise<string[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return [];

  const catalog = regCatalog
    .map((r) => `- ${r.slug}: ${r.name} [${r.jurisdiction}] — ${r.description}`)
    .join("\n");

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      system: `You match business descriptions to applicable AI regulations. STRICT RULES:
1. JURISDICTION FIRST: Only return regulations from jurisdictions where the described entity operates. A German company = EU regulations only, unless they explicitly mention US operations.
2. US state laws (Illinois, Colorado, NYC, Virginia, Texas, California) apply ONLY if the entity mentions that specific state or "US" broadly.
3. Be conservative: if unsure about a jurisdiction, exclude the regulation.
4. Return ONLY slugs from the provided catalog. Return at most 4.
Respond with a JSON array of slug strings only. No explanation.`,
      messages: [
        {
          role: "user",
          content: `Business description: "${description}"

Available regulations:
${catalog}

Return JSON array of applicable regulation slugs (max 4):`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") return [];
    const text = content.text.trim().replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    const slugs = JSON.parse(text) as string[];
    if (!Array.isArray(slugs)) return [];
    return slugs.filter((s) => availableSlugs.includes(s)).slice(0, 6);
  } catch {
    return [];
  }
}

function displayStatus(status: string): string {
  if (status === "enforced") return "active";
  if (status === "enacted") return "pending";
  return status;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ route?: string }>;
}) {
  const params = await searchParams;
  const routeQuery = params.route ?? "";
  const isRouted = routeQuery.trim().length > 0;

  const [[providerResult], regSlugs] = await Promise.all([
    db.select({ value: count() }).from(providers),
    getAllRegulationSlugs(),
  ]);
  const providerCount = providerResult?.value ?? 0;
  const regCount = regSlugs.length;

  let matchedRegs: Array<{
    slug: string; code: string; title: string; juris: string;
    status: string; effective: string; summary: string; providers: number;
  }> = [];
  let matchedProviders: Array<{
    slug: string; name: string; type: string; hq: string;
    blurb: string; regs: string[]; featured: boolean;
  }> = [];

  if (isRouted) {
    const allRegs = await getAllRegulations();
    const regCatalog = allRegs.map((r) => ({
      slug: r.slug,
      name: r.frontmatter.name,
      jurisdiction: r.frontmatter.jurisdiction,
      description: r.frontmatter.description,
    }));

    const matchedSlugs = await matchRegulationsWithClaude(
      routeQuery,
      regSlugs,
      regCatalog,
    );

    const regMap = new Map(allRegs.map((r) => [r.slug, r]));
    const scored = matchedSlugs
      .map((slug) => {
        const r = regMap.get(slug);
        if (!r) return null;
        return {
          slug,
          code: r.frontmatter.shortName ?? slug,
          title: r.frontmatter.name,
          juris: r.frontmatter.jurisdiction,
          status: displayStatus(r.frontmatter.status),
          effective: r.frontmatter.effectiveDate ?? "",
          summary: r.frontmatter.description,
        };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);

    if (matchedSlugs.length > 0) {
      const [provCountRows, provRows] = await Promise.all([
        db
          .select({
            regulationSlug: providerRegulations.regulationSlug,
            cnt: count(),
          })
          .from(providerRegulations)
          .where(inArray(providerRegulations.regulationSlug, matchedSlugs))
          .groupBy(providerRegulations.regulationSlug),
        db
          .select({
            id: providers.id,
            slug: providers.slug,
            name: providers.name,
            category: providers.category,
            tagline: providers.tagline,
            headquarters: providers.headquarters,
            tier: providers.tier,
            regulationSlug: providerRegulations.regulationSlug,
          })
          .from(providers)
          .innerJoin(
            providerRegulations,
            eq(providers.id, providerRegulations.providerId),
          )
          .where(inArray(providerRegulations.regulationSlug, matchedSlugs)),
      ]);

      const provCountMap = Object.fromEntries(
        provCountRows.map((r) => [r.regulationSlug, r.cnt]),
      );

      matchedRegs = scored.map((r) => ({
        ...r,
        providers: provCountMap[r.slug] ?? 0,
      }));

      const provMap = new Map<
        string,
        { slug: string; name: string; type: string; hq: string; blurb: string; regs: string[]; featured: boolean }
      >();
      for (const row of provRows) {
        if (!provMap.has(row.id)) {
          provMap.set(row.id, {
            slug: row.slug,
            name: row.name,
            type: row.category ?? "Provider",
            hq: row.headquarters ?? "",
            blurb: row.tagline ?? "",
            regs: [],
            featured: row.tier === "featured",
          });
        }
        provMap.get(row.id)!.regs.push(row.regulationSlug);
      }
      matchedProviders = Array.from(provMap.values())
        .sort((a, b) => b.regs.length - a.regs.length)
        .slice(0, 6);
    } else {
      matchedRegs = [];
      matchedProviders = [];
    }
  }

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
            Search the register of {regCount} regulations — or describe your situation in plain English and let us route you.
          </p>

          <div
            className="v4-rise v4-d2"
            style={{ maxWidth: 760, margin: "32px auto 0" }}
          >
            <HeroSearch regCount={regCount} providerCount={providerCount} defaultDescription={routeQuery || undefined} />
          </div>

          <div
            className="flex v4-rise v4-d3"
            style={{ gap: 12, marginTop: 32, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}
          >
            <span className="xs faint">Or start with:</span>
            <Link href="/regulations/eu-ai-act" className="chip" style={{ cursor: "pointer" }}>🇪🇺 EU AI Act</Link>
            <Link href="/regulations/colorado-ai-act" className="chip" style={{ cursor: "pointer" }}>🇺🇸 Colorado AI</Link>
            <Link href="/regulations/nyc-local-law-144" className="chip" style={{ cursor: "pointer" }}>NYC LL 144</Link>
            <Link href="/regulations/california-ab-2013" className="chip" style={{ cursor: "pointer" }}>CA AB 2013</Link>
            <Link href="/regulations" className="chip" style={{ cursor: "pointer" }}>Browse all {regCount} ▾</Link>
          </div>
        </div>
      </section>

      {/* ── YOUR MATCHES — two-column layout ── */}
      <section id="matches" className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>
          {isRouted
            ? `Matched results · ${matchedRegs.length} regulations · ${matchedProviders.length} providers`
            : `Your matches · ${regCount} regulations · ${providerCount} providers · ${BLOG_COUNT} guides`}
        </div>

        {isRouted && (
          <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/" className="btn btn-sm btn-ghost">← Show all</Link>
            <span className="small soft">
              Showing results for: &ldquo;{routeQuery}&rdquo;
            </span>
          </div>
        )}

        <div className="grid grid-main-aside" style={{ gap: 40 }}>
          <div>
            {isRouted ? (
              <>
                <div className="section-head">
                  <div><h2 className="h2">Matched regulations</h2></div>
                  <Link href="/regulations" className="action">See all {regCount} →</Link>
                </div>
                <div className="grid grid-2col" style={{ gap: 16 }}>
                  {matchedRegs.length === 0 ? (
                    <div style={{ gridColumn: "1 / -1", padding: 24, textAlign: "center" }}>
                      <p className="small soft">No regulations matched your description.</p>
                      <Link href="/regulations" className="action" style={{ marginTop: 8, display: "inline-block" }}>Browse all {regCount} regulations →</Link>
                    </div>
                  ) : (
                    matchedRegs.map((r) => (
                      <RegCard
                        key={r.slug}
                        code={r.code}
                        title={r.title}
                        juris={r.juris}
                        status={r.status}
                        effective={r.effective}
                        providers={r.providers}
                        topics={[]}
                        summary={r.summary}
                        slug={r.slug}
                      />
                    ))
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="section-head">
                  <div><h2 className="h2">Featured regulations</h2></div>
                  <Link href="/regulations" className="action">See all {regCount} →</Link>
                </div>
                <div className="grid grid-2col" style={{ gap: 16 }}>
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
                    effective="30 Jun 2026"
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
              </>
            )}

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
                  kind: "Guide",
                  title: "Colorado AI Act 60-Day Compliance Checklist",
                  desc: "Step-by-step checklist to get compliant before the June 30, 2026 deadline.",
                  time: "10 min",
                  slug: "colorado-ai-act-60-day-checklist",
                },
                {
                  kind: "Guide",
                  title: "How to Commission a Bias Audit: Step-by-Step",
                  desc: "How to find an auditor, what the process looks like, and how to post results.",
                  time: "14 min",
                  slug: "bias-audit-guide",
                },
              ].map((a) => (
                <Link key={a.title} href={`/blog/${a.slug}`} className="card" style={{ padding: 18, display: "block", cursor: "pointer" }}>
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

          {/* Right column: Top providers / matched providers */}
          <aside>
            {isRouted ? (
              <>
                <div className="section-head" style={{ alignItems: "flex-start", paddingBottom: 12 }}>
                  <div><h2 className="h3">Providers who can help</h2></div>
                  <Link href="/directory" className="action">All {providerCount} →</Link>
                </div>
                <div className="col" style={{ gap: 16 }}>
                  {matchedProviders.length === 0 ? (
                    <div style={{ padding: 24, textAlign: "center" }}>
                      <p className="small soft">No providers matched. Try broadening your description.</p>
                      <Link href="/directory" className="action" style={{ marginTop: 8, display: "inline-block" }}>Browse all providers →</Link>
                    </div>
                  ) : (
                    matchedProviders.map((p) => (
                      <ProviderCard
                        key={p.slug}
                        name={p.name}
                        type={p.type}
                        hq={p.hq}
                        blurb={p.blurb}
                        regs={p.regs}
                        featured={p.featured}
                        slug={p.slug}
                      />
                    ))
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="section-head" style={{ alignItems: "flex-start", paddingBottom: 12 }}>
                  <div><h2 className="h3">Top providers</h2></div>
                  <Link href="/directory" className="action">All {providerCount} →</Link>
                </div>
                <div className="col" style={{ gap: 16 }}>
                  <ProviderCard
                    name="BABL AI"
                    type="Audit"
                    hq="New York, NY"
                    featured
                    blurb="Independent bias audits compliant with NYC LL 144 and emerging US laws."
                    regs={["NYC LL 144", "Colorado AI", "EEOC"]}
                    slug="babl-ai"
                  />
                  <ProviderCard
                    name="Credo AI"
                    type="Software"
                    hq="San Francisco, CA"
                    blurb="AI governance platform for responsible AI development and deployment."
                    regs={["EU AI Act", "NIST AI RMF", "ISO 42001"]}
                    slug="credo-ai"
                  />
                  <ProviderCard
                    name="ORCAA"
                    type="Audit"
                    hq="New York, NY"
                    blurb="Algorithm accountability audit firm founded by prominent AI ethics researchers."
                    regs={["NYC LL 144", "Fair Housing", "Colorado AI"]}
                    slug="orcaa"
                  />
                </div>
              </>
            )}

            {/* RFP callout */}
            <div className="card card-feature" style={{ marginTop: 20, padding: 20 }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Can&apos;t find the right fit?</div>
              <h4 className="h3">Post an RFP.</h4>
              <p className="small" style={{ marginBottom: 16 }}>
                Describe your need once. Get 3–5 quotes in 48 hours from relevant providers.
              </p>
              <Link href="/rfp" className="btn btn-accent w-full" style={{ textAlign: "center" }}>Post an RFP →</Link>
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
          <div className="grid grid-3col" style={{ gap: 24 }}>
            {[
              {
                icon: "book",
                title: "By regulation",
                desc: `The complete catalog — ${regCount} entries. Searchable, filterable, by code or title.`,
                action: "Open catalog",
                href: "/regulations",
              },
              {
                icon: "globe",
                title: "By jurisdiction",
                desc: "EU-level regulation to US state AI laws — browse by region.",
                action: "Browse jurisdictions",
                href: "/jurisdictions",
              },
              {
                icon: "building",
                title: "By provider",
                desc: `${providerCount} firms — software, advisory, legal, audit.`,
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

        <div className="grid grid-ledger" style={{ gap: 32 }}>
          <Link href="/blog/eu-ai-act-gpai-obligations" style={{ textDecoration: "none", display: "block", cursor: "pointer" }}>
            <article>
              <div
                style={{
                  height: 300,
                  marginBottom: 16,
                  border: "1px solid var(--line)",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <BlogCover
                  slug="eu-ai-act-gpai-obligations"
                  category="Regulation Analysis"
                  title="EU AI Act GPAI Rules: What Foundation Model Developers Must Do"
                  variant="lead"
                />
              </div>
              <div className="eyebrow" style={{ marginBottom: 8, color: "var(--accent)" }}>{"\u25b8"} Lead story</div>
              <h3 className="h1" style={{ fontSize: 36, marginBottom: 12 }}>
                EU AI Act GPAI Rules: What Foundation Model Developers Must Do
              </h3>
              <p className="lede soft">
                The general-purpose AI model provisions are now in effect. Here&apos;s what developers and deployers need to know.
              </p>
              <div className="mono xs faint" style={{ marginTop: 12 }}>11 min · Apr 5</div>
            </article>
          </Link>

          <div className="col" style={{ gap: 20 }}>
            {[
              { kind: "Guide", title: "How to Prepare for the Colorado AI Act Before June 2026", time: "8 min", slug: "how-to-prepare-for-colorado-ai-act-june-2026" },
              { kind: "Guide", title: "NIST AI RMF Explained: A Compliance Team's Field Guide", time: "9 min", slug: "nist-ai-rmf-explainer-for-compliance-teams" },
              { kind: "Update", title: "NYC LL 144 Enforcement: First Fines Issued", time: "6 min", slug: "nyc-ll-144-enforcement-update" },
            ].map((a) => (
              <Link
                key={a.title}
                href={`/blog/${a.slug}`}
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
                background: "var(--paper-inverse)",
                color: "var(--ink-inverse)",
                borderColor: "var(--paper-inverse)",
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 12, color: "var(--ink-inverse-soft)" }}>
                Newsletter
              </div>
              <h3 className="h2 serif" style={{ color: "var(--ink-inverse)", marginBottom: 8 }}>
                Weekly digest.
              </h3>
              <p className="small" style={{ marginBottom: 16, color: "var(--ink-inverse-soft)" }}>
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
      <section style={{ background: "var(--paper-inverse)", color: "var(--ink-inverse)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div
            className="grid grid-providers-cta"
            style={{ gap: 64 }}
          >
            <div>
              <div className="eyebrow" style={{ marginBottom: 12, color: "var(--ink-inverse-soft)" }}>
                For providers
              </div>
              <h2 className="h1" style={{ color: "var(--ink-inverse)", marginBottom: 16 }}>
                Meet buyers at the moment they&apos;re searching.
              </h2>
              <p
                className="lede"
                style={{ color: "var(--ink-inverse-soft)" }}
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
                    color: "var(--ink-inverse)",
                    borderColor: "var(--line-inverse)",
                  }}
                >
                  Claim existing
                </Link>
              </div>
            </div>

            <div>
              <div className="grid grid-2col" style={{ gap: 16 }}>
                {[
                  { n: String(regCount), l: "regulations indexed" },
                  { n: String(BLOG_COUNT), l: "compliance guides" },
                  { n: String(providerCount), l: "listed providers" },
                  { n: "Free", l: "to list your firm" },
                ].map((stat) => (
                  <div
                    key={stat.l}
                    style={{
                      padding: 24,
                      border: "1px solid var(--line-inverse)",
                      borderRadius: 6,
                    }}
                  >
                    <div
                      className="serif"
                      style={{ fontSize: 48, fontWeight: 500, color: "var(--ink-inverse)", lineHeight: 1 }}
                    >
                      {stat.n}
                    </div>
                    <div
                      className="mono xs"
                      style={{
                        marginTop: 8,
                        color: "var(--ink-inverse-soft)",
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
