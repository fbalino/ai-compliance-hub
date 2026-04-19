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
interface LedgerArticle { kind: string; title: string; slug?: string }
interface SourceDocument { label: string; url: string }

const REG_EXTRAS: Record<string, {
  timeline?: TimelineMilestone[];
  penalties?: PenaltyTier[];
  providers?: MatchedProvider[];
  articles?: LedgerArticle[];
  sources?: SourceDocument[];
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
      { kind: "Explainer", title: "The GPAI Code of Practice finally drops", slug: "eu-ai-act-gpai-code-of-practice" },
      { kind: "Analysis", title: "The high-risk list, annotated", slug: "eu-ai-act-high-risk-list-annotated" },
      { kind: "Comparison", title: "AI Act vs UK Safety Bill: overlap mapped", slug: "eu-ai-act-vs-uk-ai-safety-bill" },
    ],
    sources: [
      { label: "Consolidated text (EUR-Lex)", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" },
      { label: "Annex III \u2014 high-risk list", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#anx_III" },
      { label: "GPAI Code of Practice", url: "https://digital-strategy.ec.europa.eu/en/library/general-purpose-ai-code-practice" },
    ],
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
      { kind: "Brief", title: "Colorado AI: the readiness window opens", slug: "colorado-ai-readiness-window" },
      { kind: "Explainer", title: "Impact assessment under SB 24-205, step by step", slug: "colorado-ai-act-impact-assessment" },
    ],
    sources: [
      { label: "SB 24-205 full text (Colorado Legislature)", url: "https://leg.colorado.gov/bills/sb24-205" },
      { label: "Attorney General guidance", url: "https://coag.gov/resources/colorado-artificial-intelligence-act/" },
    ],
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
      { kind: "Q&A", title: "The NYC-144 bias audit, walked step-by-step", slug: "nyc-ll-144-bias-audit-walkthrough" },
    ],
    sources: [
      { label: "Local Law 144 (NYC Council)", url: "https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page" },
      { label: "DCWP Final Rules", url: "https://rules.cityofnewyork.us/rule/automated-employment-decision-tools-background/" },
    ],
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
      { kind: "Brief", title: "California AB 2013: training data disclosure requirements", slug: "california-ab-2013-training-data" },
    ],
    sources: [
      { label: "AB 2013 full text (California Legislature)", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013" },
    ],
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
      { kind: "Explainer", title: "AIVIRA obligations for employers: the practical guide", slug: "illinois-aivira-employer-guide" },
    ],
    sources: [
      { label: "HB 2557 (Illinois Legislature)", url: "https://www.ilga.gov/legislation/publicacts/101/PDF/101-0260.pdf" },
    ],
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
      { kind: "Analysis", title: "BIPA class actions in 2025", slug: "illinois-bipa-class-actions-2025" },
      { kind: "Explainer", title: "The biometric patchwork, mapped", slug: "biometric-privacy-law-patchwork" },
    ],
    sources: [
      { label: "740 ILCS 14 (Illinois Legislature)", url: "https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004" },
      { label: "Cothron v. White Castle (2023)", url: "https://courts.illinois.gov/Opinions/SupremeCourt/2023/129200.pdf" },
    ],
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
      { kind: "Comparison", title: "GDPR vs EU AI Act: where the rules overlap", slug: "gdpr-vs-eu-ai-act" },
      { kind: "Analysis", title: "Clearview AI fines across Europe", slug: "clearview-ai-gdpr-fines" },
    ],
    sources: [
      { label: "Regulation (EU) 2016/679 (EUR-Lex)", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679" },
      { label: "EDPB Guidelines on Automated Decision-Making", url: "https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-automated-individual-decision-making-and-profiling_en" },
    ],
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
      { kind: "Analysis", title: "Texas AG vs Meta: the $1.4B biometric settlement", slug: "texas-ag-meta-biometric-settlement" },
      { kind: "Comparison", title: "BIPA vs CUBI: two biometric laws, two enforcement models", slug: "bipa-vs-cubi-comparison" },
    ],
    sources: [
      { label: "Texas Business & Commerce Code Chapter 503", url: "https://statutes.capitol.texas.gov/Docs/BC/htm/BC.503.htm" },
      { label: "TX AG v. Meta Platforms (2022)", url: "https://www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-sues-meta-its-illegal-capture-and-use-biometric-data-tens-millions" },
    ],
  },
  "nist-ai-rmf": {
    timeline: [
      { date: "Jan 2023", label: "AI RMF 1.0 published", reached: true },
      { date: "Oct 2023", label: "EO 14110 issued", reached: true },
      { date: "Mar 2024", label: "OMB M-24-10", reached: true },
      { date: "Jul 2024", label: "GenAI Profile", reached: true },
      { date: "Jun 2026", label: "Colorado safe harbor", reached: false },
    ],
    penalties: [
      { tier: "Framework", amount: "Voluntary", scope: "no direct penalties" },
      { tier: "Colorado safe harbor", amount: "$20,000", scope: "per violation without alignment" },
    ],
    providers: [
      { name: "Credo AI", type: "Software", hq: "San Francisco", slug: "credo-ai" },
      { name: "Holistic AI", type: "Governance", hq: "London / New York", slug: "holistic-ai" },
      { name: "BABL AI", type: "Audit", hq: "New York", slug: "babl-ai" },
    ],
    articles: [
      { kind: "Comparison", title: "NIST AI RMF vs ISO 42001: which framework fits?", slug: "nist-ai-rmf-vs-iso-42001" },
      { kind: "Explainer", title: "The four core functions, walked step-by-step", slug: "nist-ai-rmf-four-functions-explained" },
      { kind: "Brief", title: "Colorado safe harbor and what NIST alignment means in practice", slug: "nist-ai-rmf-colorado-safe-harbor" },
    ],
    sources: [
      { label: "NIST AI 100-1 (AI RMF 1.0)", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" },
      { label: "NIST AI 600-1 (Generative AI Profile)", url: "https://airc.nist.gov/Docs/1" },
      { label: "NIST AI RMF Playbook", url: "https://airc.nist.gov/AI_RMF_Playbook" },
      { label: "Executive Order 14110", url: "https://www.federalregister.gov/documents/2023/11/01/2023-24283/safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence" },
    ],
  },
  "iso-42001": {
    timeline: [
      { date: "Dec 2023", label: "Standard published", reached: true },
      { date: "Q1 2024", label: "First audits available", reached: true },
      { date: "Jun 2024", label: "First certificates issued", reached: true },
      { date: "Aug 2025", label: "EU AI Act GPAI applies", reached: false },
      { date: "Aug 2026", label: "EU AI Act main obligations", reached: false },
    ],
    penalties: [
      { tier: "Standard", amount: "Voluntary", scope: "no direct penalties" },
      { tier: "Non-conformance", amount: "Certificate loss", scope: "withdrawal after failed surveillance" },
    ],
    providers: [
      { name: "Credo AI", type: "Software", hq: "San Francisco", slug: "credo-ai" },
      { name: "Holistic AI", type: "Governance", hq: "London / New York", slug: "holistic-ai" },
      { name: "BABL AI", type: "Audit", hq: "New York", slug: "babl-ai" },
    ],
    articles: [
      { kind: "Comparison", title: "NIST AI RMF vs ISO 42001: which framework fits?", slug: "nist-ai-rmf-vs-iso-42001" },
      { kind: "Explainer", title: "ISO 42001 certification: what to expect from the audit", slug: "iso-42001-certification-guide" },
      { kind: "Brief", title: "How ISO 42001 aligns with the EU AI Act", slug: "iso-42001-eu-ai-act-alignment" },
    ],
    sources: [
      { label: "ISO/IEC 42001:2023 (ISO)", url: "https://www.iso.org/standard/81230.html" },
      { label: "ISO/IEC 23894:2023 (AI risk management)", url: "https://www.iso.org/standard/77304.html" },
      { label: "ISO/IEC 42006 (certification body requirements)", url: "https://www.iso.org/standard/44546.html" },
      { label: "EU AI Act harmonization roadmap", url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" },
    ],
  },
  "ccpa-admt": {
    timeline: [
      { date: "Jun 2018", label: "CCPA signed", reached: true },
      { date: "Nov 2020", label: "CPRA passed", reached: true },
      { date: "Jul 2025", label: "ADMT rules adopted", reached: true },
      { date: "Sep 2025", label: "OAL approved", reached: true },
      { date: "Jan 2026", label: "General rules effective", reached: true },
      { date: "Apr 2027", label: "ADMT obligations", reached: false },
    ],
    penalties: [
      { tier: "Unintentional", amount: "$2,500", scope: "per violation" },
      { tier: "Intentional", amount: "$7,500", scope: "per violation" },
      { tier: "Involving minors", amount: "$7,500", scope: "per violation" },
    ],
    providers: [
      { name: "Credo AI", type: "Software", hq: "San Francisco", slug: "credo-ai" },
      { name: "OneTrust", type: "Software", hq: "Atlanta", slug: "onetrust-ai" },
      { name: "Holistic AI", type: "Governance", hq: "London / New York", slug: "holistic-ai" },
    ],
    articles: [
      { kind: "Explainer", title: "CCPA ADMT: what the final rules mean for AI teams", slug: "ccpa-admt-ai-teams" },
      { kind: "Comparison", title: "CCPA ADMT vs NYC LL 144: two models for automated decision regulation", slug: "ccpa-admt-vs-nyc-ll-144" },
      { kind: "Brief", title: "The human-in-the-loop test under California's ADMT rules", slug: "ccpa-admt-human-in-the-loop" },
    ],
    sources: [
      { label: "CCPA (Cal. Civ. Code §1798.100 et seq.)", url: "https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?division=3.&part=4.&lawCode=CIV&title=1.81.5" },
      { label: "CPRA ballot initiative (2020)", url: "https://vig.cdn.sos.ca.gov/2020/general/pdf/topl-prop24.pdf" },
      { label: "CPPA ADMT Final Regulations (2025)", url: "https://cppa.ca.gov/regulations/admt.html" },
      { label: "CPPA Board Meeting Materials \u2014 ADMT Rulemaking", url: "https://cppa.ca.gov/meetings/materials/" },
    ],
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
                  <a key={src.label} href={src.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div className="card flex between items-center" style={{ padding: 14 }}>
                      <span className="flex items-center" style={{ gap: 12 }}>
                        <FileText className="h-4 w-4" style={{ color: "var(--ink-soft)" }} aria-hidden="true" />
                        <span className="small">{src.label}</span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--ink-soft)" }} aria-hidden="true" />
                    </div>
                  </a>
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
                  <Link key={a.title} href={a.slug ? `/blog/${a.slug}` : "/blog"} style={{ textDecoration: "none" }}>
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
            <Link href="/rfp" className="btn btn-accent btn-sm w-full" style={{ textAlign: "center" }}>Post RFP &rarr;</Link>
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
