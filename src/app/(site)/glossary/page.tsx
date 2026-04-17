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

      <div className="rg-page-head">
        <div className="rg-container" style={{ maxWidth: 1000 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Glossary" }]} />
          <h1>AI Compliance Glossary</h1>
          <p className="rg-page-desc">
            Plain-language definitions of key AI compliance and regulatory terms, mapped to the laws that use them.
          </p>

          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 4 }} aria-label="Jump to letter">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                style={{
                  display: "flex", width: 32, height: 32, alignItems: "center", justifyContent: "center",
                  borderRadius: 6, fontSize: 14, fontWeight: 600, color: "var(--rg-primary-deep)",
                }}
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="rg-page-body">
        <div className="rg-container" style={{ maxWidth: 1000 }}>
          {letters.map((letter) => (
            <section key={letter} id={`letter-${letter}`} style={{ marginBottom: 40 }}>
              <div className="rg-kicker" style={{ borderBottom: "1px solid var(--rg-border)", paddingBottom: 8, marginBottom: 16 }}>
                {letter}
              </div>
              <div className="rg-scard-grid">
                {groups[letter].map((entry) => (
                  <Link key={entry.slug} href={`/glossary/${entry.slug}`} className="rg-scard-link">
                    <div className="rg-scard" style={{ height: "100%" }}>
                      <h3>{entry.frontmatter.term}</h3>
                      <p style={{
                        marginTop: 4, fontSize: 14, color: "var(--rg-ink-dim)", lineHeight: 1.5,
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {entry.frontmatter.definition}
                      </p>
                      {entry.frontmatter.relatedRegulations && entry.frontmatter.relatedRegulations.length > 0 && (
                        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {entry.frontmatter.relatedRegulations.slice(0, 2).map((reg) => (
                            <span key={reg.slug} className="rg-tag">{reg.name}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <div className="rg-cta-banner">
            <div style={{ flex: 1 }}>
              <strong>See how these terms apply to your business</strong>
              <span style={{ display: "block", marginTop: 6 }}>
                Use our free compliance checker to find out which AI regulations affect your company and what you need to do.
              </span>
            </div>
            <Link href="/checker" className="rg-btn rg-btn-primary">Free Compliance Check</Link>
          </div>
        </div>
      </div>
    </>
  );
}
