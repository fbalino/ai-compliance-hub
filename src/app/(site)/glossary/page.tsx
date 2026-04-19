import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { getAllGlossaryEntries } from "@/lib/glossary";

export const revalidate = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "AI Compliance Glossary — Key Terms Defined",
  description:
    "Plain-language definitions of key AI compliance terms: bias audit, high-risk AI system, algorithmic discrimination, GPAI model, and more. Mapped to real regulations.",
  alternates: {
    canonical: `${SITE_URL}/glossary`,
  },
};

export default async function GlossaryIndexPage() {
  const entries = await getAllGlossaryEntries();

  const groups: Record<string, typeof entries> = {};
  for (const entry of entries) {
    const letter = entry.frontmatter.term[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(entry);
  }
  const letters = Object.keys(groups).sort();

  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Glossary", url: "/glossary" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="page-banner">
        <div className="container" style={{ maxWidth: 1000, padding: 0 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Glossary" }]} />
          <h1 className="h1">AI Compliance Glossary</h1>
          <p className="lede" style={{ marginTop: 8 }}>
            Plain-language definitions of key AI compliance and regulatory terms, mapped to the laws that use them.
          </p>

          <div className="flex" style={{ marginTop: 24, flexWrap: "wrap", gap: 4 }} aria-label="Jump to letter">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                style={{
                  display: "flex", width: 32, height: 32, alignItems: "center", justifyContent: "center",
                  borderRadius: 6, fontSize: 14, fontWeight: 600, color: "var(--accent)",
                }}
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1000, padding: "var(--s-8) var(--s-7)" }}>
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`} style={{ marginBottom: 40 }}>
            <div className="eyebrow" style={{ borderBottom: "1px solid var(--line)", paddingBottom: 8, marginBottom: 16 }}>
              {letter}
            </div>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {groups[letter].map((entry) => (
                <Link key={entry.slug} href={`/glossary/${entry.slug}`} style={{ textDecoration: "none" }}>
                  <article className="card" style={{ height: "100%" }}>
                    <div className="h4">{entry.frontmatter.term}</div>
                    <p className="small" style={{
                      marginTop: 4, lineHeight: 1.5, color: "var(--ink-2)",
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>
                      {entry.frontmatter.definition}
                    </p>
                    {entry.frontmatter.relatedRegulations && entry.frontmatter.relatedRegulations.length > 0 && (
                      <div className="tag-strip" style={{ marginTop: 8 }}>
                        {entry.frontmatter.relatedRegulations.slice(0, 2).map((reg) => (
                          <span key={reg.slug} className="chip" style={{ fontSize: 11 }}>{reg.name}</span>
                        ))}
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div className="card" style={{ padding: "var(--s-6)", background: "var(--paper-inverse)", color: "var(--ink-inverse)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="h4" style={{ color: "var(--ink-inverse)" }}>See how these terms apply to your business</div>
            <span className="small" style={{ display: "block", marginTop: 4, color: "var(--ink-inverse-soft)" }}>
              Use our free compliance checker to find out which AI regulations affect your company.
            </span>
          </div>
          <Link href="/checker" className="btn btn-accent">Free Compliance Check</Link>
        </div>
      </div>
    </>
  );
}
