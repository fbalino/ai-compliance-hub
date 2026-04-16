import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { providers, providerCategories, providerServices } from "@/db/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { CategoryIcon } from "@/lib/category-icons";
import { DirectorySearchClient, type ProviderSearchItem } from "@/components/directory/DirectorySearchClient";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "AI Compliance Provider Directory — Find Auditors, Lawyers & Software",
  description:
    "Find verified AI compliance experts: bias auditors, governance consultants, legal counsel, and compliance software platforms. Searchable directory with specialization filters.",
  alternates: {
    canonical: `${SITE_URL}/directory`,
  },
};

async function getDirectoryData() {
  const [allProviders, allCategories, allServices] = await Promise.all([
    db.select().from(providers).orderBy(providers.name),
    db.select().from(providerCategories).orderBy(providerCategories.label),
    db.select().from(providerServices),
  ]);

  // Build a map from providerId → service types
  const servicesByProvider: Record<string, string[]> = {};
  for (const svc of allServices) {
    if (!servicesByProvider[svc.providerId]) {
      servicesByProvider[svc.providerId] = [];
    }
    servicesByProvider[svc.providerId].push(svc.serviceType);
  }

  // Build category lookup
  const categoryMap: Record<string, { label: string; icon: string }> = {};
  for (const cat of allCategories) {
    categoryMap[cat.slug] = { label: cat.label, icon: cat.icon };
  }

  const searchItems: ProviderSearchItem[] = allProviders.map((p) => {
    const cat = p.category ? categoryMap[p.category] : null;
    return {
      slug: p.slug,
      name: p.name,
      category: p.category ?? "",
      categoryLabel: cat?.label ?? p.category ?? "",
      categoryIcon: cat?.icon ?? "",
      tagline: p.tagline ?? (p.description ? p.description.slice(0, 140) + "…" : ""),
      isVerified: p.isVerified ?? false,
      jurisdictions: (p.jurisdictions as string[] | null) ?? [],
      specializations: servicesByProvider[p.id] ?? [],
    };
  });

  const categoryOptions = allCategories.map((c) => ({
    slug: c.slug,
    label: c.label,
    icon: c.icon,
  }));

  // Compute counts per category for the category cards
  const countByCategory: Record<string, number> = {};
  for (const p of allProviders) {
    if (p.category) {
      countByCategory[p.category] = (countByCategory[p.category] ?? 0) + 1;
    }
  }

  return { searchItems, categoryOptions, countByCategory, totalCount: allProviders.length };
}

export default async function DirectoryPage() {
  const { searchItems, categoryOptions, countByCategory, totalCount } = await getDirectoryData();

  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Provider Directory", url: "/directory" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Provider Directory" }]}
          />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                AI Compliance Provider Directory
              </h1>
              <p className="mt-2 text-lg text-neutral-600 max-w-2xl">
                Verified auditors, consultants, lawyers, and software platforms specializing in AI regulatory compliance.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:items-end gap-1.5">
              <span className="text-2xl font-bold text-neutral-900">{totalCount}+</span>
              <span className="text-sm text-neutral-500">providers listed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">

        {/* Search + filter bar */}
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-4">
            Search Providers
          </h2>
          <DirectorySearchClient
            providers={searchItems}
            categories={categoryOptions}
          />
        </section>

        {/* Browse by category */}
        <section>
          <h2 className="text-lg font-bold text-neutral-900 mb-5">
            Browse by Specialization
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryOptions.map((cat) => {
              const count = countByCategory[cat.slug] ?? 0;
              // Find category details from the full category list
              return (
                <Link
                  key={cat.slug}
                  href={`/directory/categories/${cat.slug}`}
                  className="group block"
                >
                  <Card hover className="h-full group-hover:border-brand-300 transition-all">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                        <CategoryIcon name={cat.icon} className="h-5 w-5" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-neutral-900 group-hover:text-brand-800 transition-colors">
                            {cat.label}
                          </h3>
                          <span className="shrink-0 text-xs font-medium text-neutral-500">
                            {count} provider{count !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA — list your business */}
        <section className="rounded-xl border border-brand-200 bg-brand-50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-900">
                Are you a compliance provider?
              </h2>
              <p className="mt-1.5 text-sm text-brand-700 max-w-xl">
                List your firm in our directory and reach businesses actively looking for AI compliance help.
                Featured listings include verified badges, lead routing, and analytics dashboards.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-brand-700">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Starting at $99/month — featured placement in relevant categories
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Lead routing from compliance checker results
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Verified badge after vetting
                </li>
              </ul>
            </div>
            <div className="shrink-0">
              <a
                href="mailto:providers@aicompliancehub.com"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800 transition-colors shadow-sm"
              >
                Get Listed
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
