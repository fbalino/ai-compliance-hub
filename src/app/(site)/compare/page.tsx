import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = false;

export const metadata: Metadata = {
  title: "AI Regulation Comparisons — Side-by-Side Analysis",
  description:
    "Side-by-side comparisons of major AI regulations — EU AI Act vs Colorado AI Act, US state AI laws, and more. Understand how different frameworks overlap and differ.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com"}/compare` },
};

const COMPARISONS = [
  {
    href: "/compare/colorado-vs-eu-ai-act",
    title: "Colorado AI Act vs. EU AI Act",
    description: "The first major US state AI law compared to the world\u2019s most comprehensive AI regulation framework. Scope, obligations, penalties, and compliance approaches side-by-side.",
    tags: ["Colorado AI Act", "EU AI Act", "Risk-based", "High-risk AI"],
  },
  {
    href: "/compare/us-state-ai-laws",
    title: "US State AI Laws Compared",
    description: "Colorado, New York City, Illinois, and California \u2014 how do the four most significant US AI compliance laws compare on scope, obligations, and enforcement?",
    tags: ["Colorado", "NYC LL 144", "Illinois AIVIRA", "California AB 2013"],
  },
  {
    href: "/compare/ai-regulation-by-industry",
    title: "AI Regulation by Industry",
    description: "Which AI laws apply to your industry? Healthcare, HR/recruiting, fintech, and insurance across the EU AI Act, NYC LL 144, Colorado AI Act, and Illinois AIVIRA.",
    tags: ["Healthcare", "HR / Recruiting", "Fintech", "Insurance"],
  },
  {
    href: "/compare/compliance-frameworks-nist-vs-iso-42001",
    title: "NIST AI RMF vs. ISO/IEC 42001",
    description: "The two leading AI governance frameworks compared side-by-side. Coverage, certification, cost, timeline, and which AI regulations each one satisfies.",
    tags: ["NIST AI RMF", "ISO 42001", "Certification", "Governance"],
  },
];

export default function ComparePage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Comparisons", url: "/compare" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="rg-page-head">
        <div className="rg-container" style={{ maxWidth: 1000 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Comparisons" }]} />
          <h1>AI Regulation Comparisons</h1>
          <p className="rg-page-desc">
            Understand how different AI compliance frameworks overlap, differ, and interact &mdash; so you can plan a unified compliance strategy.
          </p>
        </div>
      </div>

      <div className="rg-page-body">
        <div className="rg-container" style={{ maxWidth: 1000 }}>
          <div className="rg-scard-grid">
            {COMPARISONS.map((comp) => (
              <Link key={comp.href} href={comp.href} className="rg-scard-link">
                <div className="rg-scard" style={{ height: "100%" }}>
                  <h3>{comp.title}</h3>
                  <p style={{ marginBottom: 14 }}>{comp.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {comp.tags.map((tag) => (
                      <span key={tag} className="rg-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
