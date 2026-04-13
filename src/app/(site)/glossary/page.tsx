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

  // Group by first letter for alphabetical nav
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

      {/* Page header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Glossary" }]}
          />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900">
            AI Compliance Glossary
          </h1>
          <p className="mt-2 text-lg text-neutral-600 max-w-2xl">
            Plain-language definitions of key AI compliance and regulatory terms, mapped to the laws that use them.
          </p>

          {/* Alphabet quick-nav */}
          <div className="mt-6 flex flex-wrap gap-1.5" aria-label="Jump to letter">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold text-brand-700 hover:bg-brand-50 hover:text-brand-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 border-b border-neutral-200 pb-2 mb-4">
              {letter}
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {groups[letter].map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={`/glossary/${entry.slug}`}
                    className="group flex flex-col rounded-lg border border-neutral-200 bg-white p-4 hover:border-brand-300 hover:shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
                  >
                    <span className="font-semibold text-neutral-900 group-hover:text-brand-800 transition-colors">
                      {entry.frontmatter.term}
                    </span>
                    <span className="mt-1 text-sm text-neutral-500 leading-snug line-clamp-2">
                      {entry.frontmatter.definition}
                    </span>
                    {entry.frontmatter.relatedRegulations &&
                      entry.frontmatter.relatedRegulations.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {entry.frontmatter.relatedRegulations
                            .slice(0, 2)
                            .map((reg) => (
                              <span
                                key={reg.slug}
                                className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700"
                              >
                                {reg.name}
                              </span>
                            ))}
                        </div>
                      )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* CTA */}
        <section className="rounded-xl bg-brand-50 border border-brand-100 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-brand-900">
              See how these terms apply to your business
            </h2>
            <p className="mt-1.5 text-sm text-brand-700">
              Use our free compliance checker to find out which AI regulations affect your company and what you need to do.
            </p>
          </div>
          <Link
            href="/checker"
            className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            Free Compliance Check
          </Link>
        </section>
      </div>
    </>
  );
}
