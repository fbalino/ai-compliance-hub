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

      <div className="rg-page-head">
        <div className="rg-container" style={{ maxWidth: 1000 }}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Glossary", href: "/glossary" },
              { label: frontmatter.term },
            ]}
          />
          <h1>{frontmatter.term}</h1>
          <p className="rg-page-desc">{frontmatter.definition}</p>
          {frontmatter.aliases && frontmatter.aliases.length > 0 && (
            <p style={{ marginTop: 8, fontSize: 13, color: "var(--rg-ink-dim)" }}>
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

      <div className="rg-page-body">
        <div className="rg-container" style={{ maxWidth: 1000 }}>
          <div className="rg-2col">
            <div className="rg-2col-main">
              {Content && (
                <div className="prose-compliance">
                  <Content />
                </div>
              )}
            </div>

            <aside className="rg-2col-side">
              {frontmatter.relatedRegulations && frontmatter.relatedRegulations.length > 0 && (
                <div className="rg-scard">
                  <h4>Related Regulations</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {frontmatter.relatedRegulations.map((reg) => (
                      <li key={reg.slug}>
                        <Link href={`/regulations/${reg.slug}`} style={{ fontSize: 14, fontWeight: 500, color: "var(--rg-ink)" }}>
                          {reg.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {frontmatter.relatedTerms && frontmatter.relatedTerms.length > 0 && (
                <div className="rg-scard">
                  <h4>Related Terms</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {frontmatter.relatedTerms.map((t) => (
                      <li key={t.slug}>
                        <Link href={`/glossary/${t.slug}`} style={{ fontSize: 14, fontWeight: 500, color: "var(--rg-ink)" }}>
                          {t.term}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rg-scard">
                <p style={{ marginBottom: 12 }}>See how this applies to your business.</p>
                <Link href="/checker" className="rg-btn rg-btn-primary" style={{ width: "100%", textAlign: "center" }}>
                  Free Compliance Check
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
