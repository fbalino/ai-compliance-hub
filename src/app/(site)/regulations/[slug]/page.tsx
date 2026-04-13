import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge, regulationStatusVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  breadcrumbListSchema,
  regulationArticleSchema,
  jsonLdScriptProps,
} from "@/lib/jsonld";
import { getRegulationBySlug, getAllRegulationSlugs } from "@/lib/regulations";

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

  const title = `${reg.frontmatter.name} — Complete Compliance Guide`;
  const description = reg.frontmatter.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/regulations/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/regulations/${slug}`,
    },
  };
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

      {/* Page header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Regulations", href: "/regulations" },
              { label: frontmatter.name },
            ]}
          />
          <div className="mt-4 flex flex-wrap items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="default">{frontmatter.jurisdiction}</Badge>
                <Badge variant={regulationStatusVariant(frontmatter.status)}>
                  {frontmatter.status.charAt(0).toUpperCase() +
                    frontmatter.status.slice(1)}
                </Badge>
                {frontmatter.shortName && (
                  <span className="text-xs text-neutral-400 font-mono">
                    {frontmatter.shortName}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                {frontmatter.name}
              </h1>
              <p className="mt-2 text-neutral-600 leading-relaxed">
                {frontmatter.description}
              </p>
            </div>
            <Link
              href="/checker"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-800 transition-colors shadow-sm"
            >
              Check My Compliance
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Quick facts */}
            <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {frontmatter.effectiveDate && (
                <FactCard label="Effective Date" value={frontmatter.effectiveDate} />
              )}
              {frontmatter.enforcementDate && (
                <FactCard label="Enforcement" value={frontmatter.enforcementDate} />
              )}
              {frontmatter.maxPenalty && (
                <FactCard label="Max Penalty" value={frontmatter.maxPenalty} />
              )}
              {frontmatter.jurisdiction && (
                <FactCard label="Jurisdiction" value={frontmatter.jurisdiction} />
              )}
            </div>

            {/* MDX body */}
            <div className="prose-compliance">
              <Content />
            </div>

            {/* Related providers CTA */}
            <div className="mt-12 rounded-xl border border-brand-200 bg-brand-50 p-6">
              <h2 className="text-lg font-semibold text-brand-900">
                Need help complying with {frontmatter.name}?
              </h2>
              <p className="mt-1.5 text-sm text-brand-700">
                Browse verified consultants, auditors, and software platforms that specialize in this regulation.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/directory?regulation=${slug}`}
                  className="inline-flex items-center gap-1.5 rounded-md bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800 transition-colors"
                >
                  Find Providers
                </Link>
                <Link
                  href="/checker"
                  className="inline-flex items-center gap-1.5 rounded-md border border-brand-300 bg-white px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50 transition-colors"
                >
                  Check My Compliance
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-5">
            {/* Table of contents */}
            {frontmatter.toc && frontmatter.toc.length > 0 && (
              <Card>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                  On This Page
                </h3>
                <nav>
                  <ul className="space-y-1.5">
                    {frontmatter.toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-sm text-neutral-600 hover:text-brand-700 transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Card>
            )}

            {/* Related regulations */}
            {frontmatter.relatedRegulations &&
              frontmatter.relatedRegulations.length > 0 && (
                <Card>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                    Related Regulations
                  </h3>
                  <ul className="space-y-2">
                    {frontmatter.relatedRegulations.map((rel) => (
                      <li key={rel.slug}>
                        <Link
                          href={`/regulations/${rel.slug}`}
                          className="text-sm font-medium text-neutral-700 hover:text-brand-700 transition-colors"
                        >
                          {rel.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

            {/* Last updated */}
            {frontmatter.updatedAt && (
              <p className="text-xs text-neutral-400">
                Last updated:{" "}
                {new Date(frontmatter.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
      <dt className="text-xs font-medium text-neutral-400">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-neutral-900">{value}</dd>
    </div>
  );
}
