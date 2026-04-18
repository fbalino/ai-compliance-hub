import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { getGlossaryTerm, getAllGlossarySlugs } from "@/lib/glossary";

export const revalidate = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

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

      <div className="page-banner">
        <div className="container" style={{ maxWidth: 1000, padding: 0 }}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Glossary", href: "/glossary" },
              { label: frontmatter.term },
            ]}
          />
          <h1 className="h1">{frontmatter.term}</h1>
          <p className="lede" style={{ marginTop: 8 }}>{frontmatter.definition}</p>
          {frontmatter.aliases && frontmatter.aliases.length > 0 && (
            <p className="xs" style={{ marginTop: 8 }}>
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

      <section className="container grid-article-sidebar" style={{ maxWidth: 1000, gap: 56 }}>
        <article>
          {Content && (
            <div className="prose-compliance">
              <Content />
            </div>
          )}
        </article>

        <aside style={{ position: "sticky", top: 60, alignSelf: "start" }}>
          {frontmatter.relatedRegulations && frontmatter.relatedRegulations.length > 0 && (
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Related regulations</div>
              <div className="col" style={{ gap: 8 }}>
                {frontmatter.relatedRegulations.map((reg) => (
                  <Link key={reg.slug} href={`/regulations/${reg.slug}`} className="small" style={{ fontWeight: 500, color: "var(--ink)" }}>
                    {reg.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {frontmatter.relatedTerms && frontmatter.relatedTerms.length > 0 && (
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Related terms</div>
              <div className="col" style={{ gap: 8 }}>
                {frontmatter.relatedTerms.map((t) => (
                  <Link key={t.slug} href={`/glossary/${t.slug}`} className="small" style={{ fontWeight: 500, color: "var(--ink)" }}>
                    {t.term}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="card" style={{ padding: 16, background: "var(--paper-2)" }}>
            <p className="small" style={{ marginBottom: 12 }}>See how this applies to your business.</p>
            <Link href="/checker" className="btn btn-accent btn-sm w-full">
              Free Compliance Check
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
