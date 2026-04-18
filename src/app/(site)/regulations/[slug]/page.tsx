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

function StatusDot({ status }: { status: string }) {
  return (
    <span className="chip" style={{ fontSize: 11, padding: "2px 8px" }}>
      <span className={`dot dot-${status === "enforced" ? "active" : status === "enacted" ? "pending" : "proposed"}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
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

      <section className="container" style={{ padding: "var(--s-10) var(--s-7)", display: "grid", gridTemplateColumns: "1.55fr 380px", gap: 56 }}>
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

          {/* MDX content */}
          <div className="prose-compliance">
            <Content />
          </div>

          {/* Newsletter */}
          <div className="card card-tint" style={{ marginTop: 40, padding: "var(--s-6)" }}>
            <div className="h4" style={{ marginBottom: 4 }}>Stay ahead of AI compliance changes</div>
            <p className="small" style={{ marginBottom: 12 }}>Get weekly regulation updates, enforcement news, and compliance deadlines — free.</p>
            <NewsletterForm source="regulation_page" className="max-w-sm" />
          </div>

          {/* Provider CTA */}
          <div className="card card-tint" style={{ marginTop: 16, padding: "var(--s-6)" }}>
            <div className="h3" style={{ marginBottom: 4 }}>Need help complying with {frontmatter.name}?</div>
            <p className="small" style={{ marginBottom: 16 }}>Browse verified consultants, auditors, and software platforms that specialize in this regulation.</p>
            <div className="flex" style={{ gap: 8 }}>
              <Link href={`/directory?regulation=${slug}`} className="btn btn-accent">Find Providers</Link>
              <Link href="/checker" className="btn btn-ghost">Check My Compliance</Link>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside style={{ position: "sticky", top: 60, alignSelf: "start" }}>
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

          <div className="card" style={{ padding: 16, background: "var(--paper-2)" }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Can&rsquo;t find a fit?</div>
            <p className="small" style={{ marginBottom: 12 }}>Post an RFP — get 3–5 quotes in 48h.</p>
            <Link href="/directory" className="btn btn-accent btn-sm w-full">Browse Providers →</Link>
          </div>

          <div style={{ paddingTop: 16 }}>
            <Link href="/compare" className="flex items-center" style={{ gap: 6, fontSize: 13, fontWeight: 600, fontFamily: "var(--mono)", letterSpacing: "0.04em", color: "var(--accent)" }}>
              Compare regulations →
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
