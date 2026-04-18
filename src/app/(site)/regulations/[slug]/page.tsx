import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  breadcrumbListSchema,
  regulationArticleSchema,
  jsonLdScriptProps,
} from "@/lib/jsonld";
import { getRegulationBySlug, getAllRegulationSlugs } from "@/lib/regulations";
import { NewsletterForm } from "@/components/NewsletterForm";

export const revalidate = 86400;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllRegulationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const reg = await getRegulationBySlug(slug);
  if (!reg) return {};

  const title = `${reg.frontmatter.name}: Compliance Guide (${new Date().getFullYear()})`;
  const description = reg.frontmatter.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/regulations/${slug}`,
      publishedTime: reg.frontmatter.publishedAt,
      modifiedTime: reg.frontmatter.updatedAt,
    },
    alternates: {
      canonical: `${SITE_URL}/regulations/${slug}`,
    },
  };
}

function StatusDot({ status }: { status: string }) {
  return (
    <span className="chip" style={{ fontSize: 11, padding: "2px 8px" }}>
      <span className={`dot dot-${status === "enforced" ? "active" : status === "enacted" ? "pending" : "proposed"}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

interface TimelineMilestone { date: string; label: string; reached: boolean }
interface PenaltyTier { tier: string; amount: string; scope: string }
interface MatchedProvider { name: string; type: string; hq: string; slug: string }
interface LedgerArticle { kind: string; title: string }

const REG_EXTRAS: Record<string, {
  timeline?: TimelineMilestone[];
  penalties?: PenaltyTier[];
  providers?: MatchedProvider[];
  articles?: LedgerArticle[];
  sources?: string[];
}> = {
  "eu-ai-act": {
    timeline: [
      { date: "Aug 2024", label: "Entry into force", reached: true },
      { date: "Feb 2025", label: "Prohibitions apply", reached: true },
      { date: "Aug 2025", label: "GPAI obligations", reached: false },
      { date: "Aug 2026", label: "Main obligations", reached: false },
      { date: "Aug 2027", label: "Full enforcement", reached: false },
    ],
    penalties: [
      { tier: "Tier 1", amount: "\u20ac35M / 7%", scope: "global turnover \u00b7 prohibited practices" },
      { tier: "Tier 2", amount: "\u20ac15M / 3%", scope: "high-risk violations" },
      { tier: "Tier 3", amount: "\u20ac7.5M / 1.5%", scope: "incorrect information" },
    ],
    providers: [
      { name: "Credo AI", type: "Software", hq: "San Francisco", slug: "credo-ai" },
      { name: "BABL AI", type: "Audit", hq: "New York", slug: "babl-ai" },
      { name: "ORCAA", type: "Audit", hq: "New York", slug: "orcaa" },
    ],
    articles: [
      { kind: "Explainer", title: "The GPAI Code of Practice finally drops" },
      { kind: "Analysis", title: "The high-risk list, annotated" },
      { kind: "Comparison", title: "AI Act vs UK Safety Bill: overlap mapped" },
    ],
    sources: ["Consolidated text (EUR-Lex)", "Annex III \u2014 high-risk list", "GPAI Code of Practice"],
  },
  "colorado-ai-act": {
    timeline: [
      { date: "May 2024", label: "Signed into law", reached: true },
      { date: "Jan 2025", label: "Guidance published", reached: true },
      { date: "Jun 2026", label: "Enforcement begins", reached: false },
    ],
    penalties: [
      { tier: "Per violation", amount: "$20,000", scope: "each violation \u00b7 AG enforcement only" },
    ],
    providers: [
      { name: "Credo AI", type: "Software", hq: "San Francisco", slug: "credo-ai" },
      { name: "Fairly AI", type: "Software", hq: "Toronto", slug: "fairly-ai" },
    ],
    articles: [
      { kind: "Brief", title: "Colorado AI: the readiness window opens" },
      { kind: "Explainer", title: "Impact assessment under SB 24-205, step by step" },
    ],
    sources: ["SB 24-205 full text (Colorado Legislature)", "Attorney General guidance"],
  },
  "nyc-local-law-144": {
    timeline: [
      { date: "Dec 2021", label: "Signed into law", reached: true },
      { date: "Jul 2023", label: "Enforcement begins", reached: true },
    ],
    penalties: [
      { tier: "Per violation", amount: "$1,500/day", scope: "per violation per day" },
    ],
    providers: [
      { name: "BABL AI", type: "Audit", hq: "New York", slug: "babl-ai" },
      { name: "ORCAA", type: "Audit", hq: "New York", slug: "orcaa" },
    ],
    articles: [
      { kind: "Q&A", title: "The NYC-144 bias audit, walked step-by-step" },
    ],
    sources: ["Local Law 144 (NYC Council)", "DCWP Final Rules"],
  },
  "california-ab-2013": {
    timeline: [
      { date: "Sep 2024", label: "Signed", reached: true },
      { date: "Jan 2026", label: "Effective", reached: false },
    ],
    penalties: [
      { tier: "Enforcement", amount: "Actual damages", scope: "injunctive relief + private action" },
    ],
    providers: [
      { name: "Credo AI", type: "Software", hq: "San Francisco", slug: "credo-ai" },
    ],
    articles: [
      { kind: "Brief", title: "California AB 2013: training data disclosure requirements" },
    ],
    sources: ["AB 2013 full text (California Legislature)"],
  },
  "illinois-ai-video-interview-act": {
    timeline: [
      { date: "Aug 2019", label: "Signed", reached: true },
      { date: "Jan 2020", label: "Effective", reached: true },
    ],
    penalties: [
      { tier: "Enforcement", amount: "Actual damages", scope: "private right of action" },
    ],
    providers: [
      { name: "BABL AI", type: "Audit", hq: "New York", slug: "babl-ai" },
    ],
    articles: [
      { kind: "Explainer", title: "AIVIRA obligations for employers: the practical guide" },
    ],
    sources: ["HB 2557 (Illinois Legislature)"],
  },
  "illinois-bipa": {
    timeline: [
      { date: "Oct 2008", label: "Enacted", reached: true },
      { date: "Oct 2008", label: "Effective", reached: true },
      { date: "Jan 2023", label: "Cothron ruling", reached: true },
    ],
    penalties: [
      { tier: "Negligent", amount: "$1,000", scope: "per violation" },
      { tier: "Intentional", amount: "$5,000", scope: "per violation" },
    ],
    providers: [
      { name: "Holistic AI", type: "Governance", hq: "London / New York", slug: "holistic-ai" },
      { name: "OneTrust", type: "Software", hq: "Atlanta", slug: "onetrust-ai" },
    ],
    articles: [
      { kind: "Analysis", title: "BIPA class actions in 2025" },
      { kind: "Explainer", title: "The biometric patchwork, mapped" },
    ],
    sources: ["740 ILCS 14 (Illinois Legislature)", "Cothron v. White Castle (2023)"],
  },
  "gdpr": {
    timeline: [
      { date: "Apr 2016", label: "Adopted", reached: true },
      { date: "May 2018", label: "Enforceable", reached: true },
    ],
    penalties: [
      { tier: "Lower tier", amount: "\u20ac10M / 2%", scope: "controller/processor obligations" },
      { tier: "Upper tier", amount: "\u20ac20M / 4%", scope: "principles, rights, transfers" },
    ],
    providers: [
      { name: "OneTrust", type: "Software", hq: "Atlanta", slug: "onetrust-ai" },
      { name: "Fieldfisher", type: "Legal", hq: "London / Brussels", slug: "fieldfisher-ai" },
    ],
    articles: [
      { kind: "Comparison", title: "GDPR vs EU AI Act: where the rules overlap" },
      { kind: "Analysis", title: "Clearview AI fines across Europe" },
    ],
    sources: ["Regulation (EU) 2016/679 (EUR-Lex)", "EDPB Guidelines on Automated Decision-Making"],
  },
  "texas-cubi": {
    timeline: [
      { date: "Jun 2009", label: "Enacted", reached: true },
      { date: "Sep 2009", label: "Effective", reached: true },
      { date: "Feb 2022", label: "Meta lawsuit filed", reached: true },
      { date: "Jul 2024", label: "Meta settlement", reached: true },
    ],
    penalties: [
      { tier: "Per violation", amount: "$25,000", scope: "AG enforcement only" },
    ],
    providers: [
      { name: "Holistic AI", type: "Governance", hq: "London / New York", slug: "holistic-ai" },
      { name: "OneTrust", type: "Software", hq: "Atlanta", slug: "onetrust-ai" },
    ],
    articles: [
      { kind: "Analysis", title: "Texas AG vs Meta: the $1.4B biometric settlement" },
      { kind: "Comparison", title: "BIPA vs CUBI: two biometric laws, two enforcement models" },
    ],
    sources: ["Texas Business & Commerce Code Chapter 503", "TX AG v. Meta Platforms (2022)"],
  },
};

export default async function RegulationPage({ params }: Props) {
  const { slug } = await params;
  const reg = await getRegulationBySlug(slug);
  if (!reg) notFound();

  const { frontmatter, Content } = reg;
  const extras = REG_EXTRAS[slug] ?? {};

  const pageUrl = `${SITE_URL}/regulations/${slug}`;
  const today = new Date().toISOString();

  const schemas = [
    breadcrumbListSchema([
      { name: "Home", url: "/" },
      { name: "Regulations", url: "/regulations" },
      { name: frontmatter.name, url: `/regulations/${slug}` },
    ]),
    regulationArticleSchema({
      headline: `${frontmatter.name}: Complete Compliance Guide`,
      description: frontmatter.description,
      url: pageUrl,
      datePublished: frontmatter.publishedAt ?? today,
      dateModified: frontmatter.updatedAt ?? today,
      faqs: frontmatter.faqs,
    }),
  ];

  return (
    <>
      <script {...jsonLdScriptProps(schemas)} />

      <div className="page-banner">
        <div className="container" style={{ padding: 0 }}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Regulations", href: "/regulations" },
              { label: frontmatter.name },
            ]}
          />
          <div className="flex items-center" style={{ gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
            {frontmatter.shortName && (
              <span className="chip chip-code">{frontmatter.shortName}</span>
            )}
            <StatusDot status={frontmatter.status} />
            <span className="chip">{frontmatter.jurisdiction}</span>
          </div>
          <h1 className="display" style={{ fontSize: "clamp(40px, 5vw, 72px)" }}>{frontmatter.name}.</h1>
          <p className="lede" style={{ maxWidth: 680, marginTop: 8 }}>{frontmatter.description}</p>
          {frontmatter.updatedAt && (
            <p className="xs" style={{ marginTop: 12 }}>
              Last updated:{" "}
              <time dateTime={frontmatter.updatedAt}>
                {new Date(frontmatter.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
          )}
        </div>
      </div>

      <section className="container grid-article-sidebar" style={{ gap: 56 }}>
        <article>
          {/* Fact grid */}
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 32 }}>
            {frontmatter.effectiveDate && (
              <div className="card">
                <div className="eyebrow" style={{ marginBottom: 4 }}>Effective</div>
                <div className="h4">{frontmatter.effectiveDate}</div>
              </div>
            )}
            {frontmatter.enforcementDate && (
              <div className="card">
                <div className="eyebrow" style={{ marginBottom: 4 }}>Enforcement</div>
                <div className="h4">{frontmatter.enforcementDate}</div>
              </div>
            )}
            {frontmatter.maxPenalty && (
              <div className="card">
                <div className="eyebrow" style={{ marginBottom: 4 }}>Max Penalty</div>
                <div className="h3 serif" style={{ color: "var(--accent)" }}>{frontmatter.maxPenalty}</div>
              </div>
            )}
            {frontmatter.jurisdiction && (
              <div className="card">
                <div className="eyebrow" style={{ marginBottom: 4 }}>Jurisdiction</div>
                <div className="h4">{frontmatter.jurisdiction}</div>
              </div>
            )}
          </div>

          {/* Timeline */}
          {extras.timeline && extras.timeline.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>&sect; Timeline</div>
              <div className="card card-tint" style={{ padding: 20 }}>
                <div className="flex between mono xs" style={{ marginBottom: 12 }}>
                  {extras.timeline.map((m) => (
                    <span key={m.date}>{m.date}</span>
                  ))}
                </div>
                <div style={{ height: 6, background: "var(--line)", borderRadius: "var(--radius-sm)", position: "relative" }}>
                  {(() => {
                    const reachedCount = extras.timeline!.filter((m) => m.reached).length;
                    const pct = Math.round((reachedCount / extras.timeline!.length) * 100);
                    return (
                      <>
                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: "var(--accent)", borderRadius: "var(--radius-sm)" }} />
                        <span style={{ position: "absolute", left: `${pct}%`, top: -4, width: 14, height: 14, borderRadius: "50%", background: "var(--paper)", border: "2px solid var(--accent)" }} />
                      </>
                    );
                  })()}
                </div>
                <div className="flex between xs" style={{ marginTop: 12 }}>
                  {extras.timeline.map((m) => (
                    <span key={m.date} style={m.reached ? {} : { color: "var(--ink-soft)" }}>
                      {m.reached ? m.label : m.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MDX content */}
          <div className="prose-compliance">
            <Content />
          </div>

          {/* Penalties */}
          {extras.penalties && extras.penalties.length > 1 && (
            <div style={{ marginTop: 32 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>&sect; Penalties</div>
              <div className="grid" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(180px, 1fr))`, gap: 12 }}>
                {extras.penalties.map((p) => (
                  <div key={p.tier} className="card">
                    <div className="eyebrow" style={{ marginBottom: 4 }}>{p.tier}</div>
                    <div className="h3 serif" style={{ color: "var(--accent)" }}>{p.amount}</div>
                    <div className="xs" style={{ marginTop: 4, color: "var(--ink-2)" }}>{p.scope}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Source documents */}
          {extras.sources && extras.sources.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>&sect; Source documents</div>
              <div className="col" style={{ gap: 8 }}>
                {extras.sources.map((src) => (
                  <div key={src} className="card flex between items-center" style={{ padding: 14 }}>
                    <span className="flex items-center" style={{ gap: 12 }}>
                      <FileText className="h-4 w-4" style={{ color: "var(--ink-soft)" }} aria-hidden="true" />
                      <span className="small">{src}</span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--ink-soft)" }} aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Also in The Ledger */}
          {extras.articles && extras.articles.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>&sect; Also in The Ledger</div>
              <div className="col" style={{ gap: 8 }}>
                {extras.articles.map((a) => (
                  <Link key={a.title} href="/blog" style={{ textDecoration: "none" }}>
                    <div className="card" style={{ padding: 14 }}>
                      <div className="eyebrow" style={{ marginBottom: 4, color: "var(--accent)" }}>{"\u25b8"} {a.kind}</div>
                      <div className="h4">{a.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter */}
          <div className="card card-tint" style={{ marginTop: 32, padding: "var(--s-6)" }}>
            <div className="h4" style={{ marginBottom: 4 }}>Stay ahead of AI compliance changes</div>
            <p className="small" style={{ marginBottom: 12 }}>Get weekly regulation updates, enforcement news, and compliance deadlines — free.</p>
            <NewsletterForm source="regulation_page" className="max-w-sm" />
          </div>
        </article>

        {/* Sidebar */}
        <aside style={{ position: "sticky", top: 60, alignSelf: "start" }}>
          {/* Matched providers */}
          {extras.providers && extras.providers.length > 0 && (
            <>
              <div className="card card-feature" style={{ padding: 20, marginBottom: 16 }}>
                <div className="between" style={{ marginBottom: 12 }}>
                  <div className="eyebrow">{extras.providers.length} provider{extras.providers.length !== 1 ? "s" : ""}</div>
                  <span className="feature-flag">{"\u2605"} Featured</span>
                </div>
                <Link href={`/directory/providers/${extras.providers[0].slug}`} style={{ textDecoration: "none" }}>
                  <div className="flex items-center" style={{ gap: 12, marginBottom: 12 }}>
                    <div className="avatar avatar-sq" style={{ width: 48, height: 48, fontSize: 18 }}>{extras.providers[0].name[0]}</div>
                    <div>
                      <div className="h4">{extras.providers[0].name}</div>
                      <div className="xs">{extras.providers[0].type} &middot; {extras.providers[0].hq}</div>
                    </div>
                  </div>
                </Link>
                <div className="col" style={{ gap: 8 }}>
                  <Link href={`/directory/providers/${extras.providers[0].slug}`} className="btn btn-accent w-full" style={{ textAlign: "center" }}>
                    Contact {extras.providers[0].name} &rarr;
                  </Link>
                  <Link href={`/directory/providers/${extras.providers[0].slug}`} className="btn btn-ghost w-full" style={{ textAlign: "center" }}>
                    View profile
                  </Link>
                </div>
              </div>
              <div className="card" style={{ marginBottom: 16 }}>
                <div className="eyebrow" style={{ marginBottom: 12 }}>All {extras.providers.length} providers</div>
                {extras.providers.map((prov) => (
                  <Link key={prov.slug} href={`/directory/providers/${prov.slug}`} style={{ textDecoration: "none" }}>
                    <div className="flex items-center" style={{ gap: 12, padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
                      <div className="avatar avatar-sq" style={{ width: 32, height: 32, fontSize: 13 }}>{prov.name[0]}</div>
                      <span className="small" style={{ flex: 1 }}>{prov.name}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--ink-soft)" }} aria-hidden="true" />
                    </div>
                  </Link>
                ))}
                <Link href="/directory" className="btn btn-ghost btn-sm w-full" style={{ marginTop: 12, textAlign: "center" }}>
                  Browse all providers
                </Link>
              </div>
            </>
          )}

          {/* Table of contents */}
          {frontmatter.toc && frontmatter.toc.length > 0 && (
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>On this page</div>
              <nav aria-label="Table of contents">
                <div className="col" style={{ gap: 8 }}>
                  {frontmatter.toc.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="small" style={{ color: "var(--ink-2)", textDecoration: "none" }}>
                      {item.label}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          )}

          {/* Related regulations */}
          {frontmatter.relatedRegulations && frontmatter.relatedRegulations.length > 0 && (
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Related regulations</div>
              <div className="tag-strip">
                {frontmatter.relatedRegulations.map((rel) => (
                  <Link key={rel.slug} href={`/regulations/${rel.slug}`} className="chip" style={{ cursor: "pointer" }}>
                    {rel.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* RFP card */}
          <div className="card" style={{ padding: 16, background: "var(--paper-2)" }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Can&rsquo;t find a fit?</div>
            <p className="small" style={{ marginBottom: 12 }}>Post an RFP &mdash; get 3&ndash;5 quotes in 48h.</p>
            <Link href="/join" className="btn btn-accent btn-sm w-full" style={{ textAlign: "center" }}>Post RFP &rarr;</Link>
          </div>

          <div style={{ paddingTop: 16 }}>
            <Link href="/compare" className="flex items-center" style={{ gap: 6, fontSize: 13, fontWeight: 600, fontFamily: "var(--mono)", letterSpacing: "0.04em", color: "var(--accent)" }}>
              Compare regulations &rarr;
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
