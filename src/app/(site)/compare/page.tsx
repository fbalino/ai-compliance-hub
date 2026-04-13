import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = false;

export const metadata: Metadata = {
  title: "AI Regulation Comparisons — Side-by-Side Analysis",
  description:
    "Side-by-side comparisons of major AI regulations — EU AI Act vs Colorado AI Act, US state AI laws, and more. Understand how different frameworks overlap and differ.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com"}/compare`,
  },
};

const COMPARISONS = [
  {
    href: "/compare/colorado-vs-eu-ai-act",
    title: "Colorado AI Act vs. EU AI Act",
    description:
      "The first major US state AI law compared to the world's most comprehensive AI regulation framework. Scope, obligations, penalties, and compliance approaches side-by-side.",
    tags: ["Colorado AI Act", "EU AI Act", "Risk-based", "High-risk AI"],
  },
  {
    href: "/compare/us-state-ai-laws",
    title: "US State AI Laws Compared",
    description:
      "Colorado, New York City, Illinois, and California — how do the four most significant US AI compliance laws compare on scope, obligations, and enforcement?",
    tags: ["Colorado", "NYC LL 144", "Illinois AIVIRA", "California AB 2013"],
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

      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Comparisons" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900">
            AI Regulation Comparisons
          </h1>
          <p className="mt-2 text-lg text-neutral-600 max-w-2xl">
            Understand how different AI compliance frameworks overlap, differ, and interact — so you can plan a unified compliance strategy.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {COMPARISONS.map((comp) => (
            <Link key={comp.href} href={comp.href} className="group block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700">
              <Card hover className="h-full group-hover:border-brand-300 transition-all">
                <h2 className="font-semibold text-neutral-900 group-hover:text-brand-800 transition-colors mb-2">
                  {comp.title}
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  {comp.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {comp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
