import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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

function statusPill(status: string) {
  if (status === "enforced") return "rg-pill-status rg-pill-applies";
  if (status === "enacted") return "rg-pill-status rg-pill-action";
  if (status === "draft") return "rg-pill-status rg-pill-watch";
  return "rg-pill-status rg-pill-watch";
}

export default async function RegulationPage({ params }: Props) {
  const { slug } = await params;
  const reg = await getRegulationBySlug(slug);
  if (!reg) notFound();

  const { frontmatter, Content } = reg;

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

      <div className="rg-page-head">
        <div className="rg-container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Regulations", href: "/regulations" },
              { label: frontmatter.name },
            ]}
          />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="rg-meta-row">
                <span className="rg-tag">{frontmatter.jurisdiction}</span>
                <span className={statusPill(frontmatter.status)}>
                  {frontmatter.status.charAt(0).toUpperCase() + frontmatter.status.slice(1)}
                </span>
                {frontmatter.shortName && (
                  <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--rg-ink-dim)" }}>
                    {frontmatter.shortName}
                  </span>
                )}
              </div>
              <h1>{frontmatter.name}</h1>
              <p className="rg-page-desc">{frontmatter.description}</p>
              {frontmatter.updatedAt && (
                <p style={{ marginTop: 8, fontSize: 12, color: "var(--rg-ink-dim)" }}>
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
            <Link href="/checker" className="rg-btn rg-btn-primary" style={{ flexShrink: 0 }}>
              Check My Compliance <span className="rg-arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="rg-page-body">
        <div className="rg-container">
          <div className="rg-2col">
            <article className="rg-2col-main">
              <div className="rg-fact-grid">
                {frontmatter.effectiveDate && (
                  <dl className="rg-fact">
                    <dt>Effective Date</dt>
                    <dd>{frontmatter.effectiveDate}</dd>
                  </dl>
                )}
                {frontmatter.enforcementDate && (
                  <dl className="rg-fact">
                    <dt>Enforcement</dt>
                    <dd>{frontmatter.enforcementDate}</dd>
                  </dl>
                )}
                {frontmatter.maxPenalty && (
                  <dl className="rg-fact">
                    <dt>Max Penalty</dt>
                    <dd>{frontmatter.maxPenalty}</dd>
                  </dl>
                )}
                {frontmatter.jurisdiction && (
                  <dl className="rg-fact">
                    <dt>Jurisdiction</dt>
                    <dd>{frontmatter.jurisdiction}</dd>
                  </dl>
                )}
              </div>

              <div className="prose-compliance">
                <Content />
              </div>

              <div className="rg-inline-nl" style={{ marginTop: 40 }}>
                <h3>Stay ahead of AI compliance changes</h3>
                <p>Get weekly regulation updates, enforcement news, and compliance deadlines &mdash; free.</p>
                <NewsletterForm source="regulation_page" className="max-w-sm" />
              </div>

              <div className="rg-cta-banner" style={{ marginTop: 20 }}>
                <h2>Need help complying with {frontmatter.name}?</h2>
                <p>Browse verified consultants, auditors, and software platforms that specialize in this regulation.</p>
                <div className="rg-cta-actions">
                  <Link href={`/directory?regulation=${slug}`} className="rg-btn rg-btn-primary">Find Providers</Link>
                  <Link href="/checker" className="rg-btn rg-btn-outline">Check My Compliance</Link>
                </div>
              </div>
            </article>

            <aside className="rg-2col-side">
              {frontmatter.toc && frontmatter.toc.length > 0 && (
                <div className="rg-scard">
                  <h4>On This Page</h4>
                  <nav aria-label="Table of contents">
                    <ul>
                      {frontmatter.toc.map((item) => (
                        <li key={item.id}>
                          <a href={`#${item.id}`}>{item.label}</a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}

              {frontmatter.relatedRegulations &&
                frontmatter.relatedRegulations.length > 0 && (
                  <div className="rg-scard">
                    <h4>Related Regulations</h4>
                    <ul>
                      {frontmatter.relatedRegulations.map((rel) => (
                        <li key={rel.slug}>
                          <Link href={`/regulations/${rel.slug}`}>{rel.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              <div style={{ paddingTop: 8 }}>
                <Link href="/compare" style={{ fontSize: 13, fontWeight: 600, color: "var(--rg-primary)", textDecoration: "none" }}>
                  Compare regulations &rarr;
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
