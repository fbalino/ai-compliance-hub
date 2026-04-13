import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { getGlossaryTerm, getAllGlossarySlugs } from "@/lib/glossary";

// ISR: glossary pages revalidate at build (static content)
export const revalidate = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

interface Props {
  params: Promise<{ term: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllGlossarySlugs();
  return slugs.map((term) => ({ term }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term } = await params;
  const entry = await getGlossaryTerm(term);
  if (!entry) return {};

  const title = `${entry.frontmatter.term} — AI Compliance Glossary`;
  const description = entry.frontmatter.definition.slice(0, 155);

  return {
    title,
    description,
    openGraph: { title, description },
    alternates: { canonical: `${SITE_URL}/glossary/${term}` },
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term } = await params;
  const entry = await getGlossaryTerm(term);
  if (!entry) notFound();

  const { frontmatter, Content } = entry;

  const schemas = [
    breadcrumbListSchema([
      { name: "Home", url: "/" },
      { name: "Glossary", url: "/glossary" },
      { name: frontmatter.term, url: `/glossary/${term}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: frontmatter.term,
      description: frontmatter.definition,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "AI Compliance Glossary",
        url: `${SITE_URL}/glossary`,
      },
    },
  ];

  return (
    <>
      <script {...jsonLdScriptProps(schemas)} />

      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Glossary", href: "/glossary" },
              { label: frontmatter.term },
            ]}
          />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900">
            {frontmatter.term}
          </h1>
          <p className="mt-2 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            {frontmatter.definition}
          </p>
          {frontmatter.aliases && frontmatter.aliases.length > 0 && (
            <p className="mt-2 text-sm text-neutral-500">
              Also known as:{" "}
              {frontmatter.aliases.map((a, i) => (
                <span key={a}>
                  <em>{a}</em>
                  {i < frontmatter.aliases!.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Extended definition / body */}
            {Content && (
              <div className="prose-compliance">
                <Content />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-4">
            {/* Related regulations */}
            {frontmatter.relatedRegulations && frontmatter.relatedRegulations.length > 0 && (
              <Card>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                  Related Regulations
                </h3>
                <ul className="space-y-2">
                  {frontmatter.relatedRegulations.map((reg) => (
                    <li key={reg.slug}>
                      <Link
                        href={`/regulations/${reg.slug}`}
                        className="text-sm font-medium text-neutral-700 hover:text-brand-700 transition-colors"
                      >
                        {reg.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Related terms */}
            {frontmatter.relatedTerms && frontmatter.relatedTerms.length > 0 && (
              <Card>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                  Related Terms
                </h3>
                <ul className="space-y-2">
                  {frontmatter.relatedTerms.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/glossary/${t.slug}`}
                        className="text-sm font-medium text-neutral-700 hover:text-brand-700 transition-colors"
                      >
                        {t.term}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Checker CTA */}
            <Card>
              <p className="text-sm text-neutral-600 mb-3">
                See how this applies to your business.
              </p>
              <Link
                href="/checker"
                className="block w-full rounded-md bg-brand-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-800 transition-colors"
              >
                Free Compliance Check
              </Link>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
