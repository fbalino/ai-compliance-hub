import type { Metadata } from "next";
import { db } from "@/db";
import { providers, providerCategories, providerServices } from "@/db/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { DirectorySearchClient, type ProviderSearchItem } from "@/components/directory/DirectorySearchClient";
import { SITE_URL } from "@/lib/brand";

export const revalidate = 3600;


export const metadata: Metadata = {
  title: "AI Compliance Provider Directory — Find Auditors, Lawyers & Software",
  description:
    "Find verified AI compliance experts: bias auditors, governance consultants, legal counsel, and compliance software platforms. Searchable directory with specialization filters.",
  alternates: {
    canonical: `${SITE_URL}/providers`,
  },
};

async function getDirectoryData() {
  const [allProviders, allCategories, allServices] = await Promise.all([
    db.select().from(providers).orderBy(providers.name),
    db.select().from(providerCategories).orderBy(providerCategories.label),
    db.select().from(providerServices),
  ]);

  const servicesByProvider: Record<string, string[]> = {};
  for (const svc of allServices) {
    if (!servicesByProvider[svc.providerId]) {
      servicesByProvider[svc.providerId] = [];
    }
    servicesByProvider[svc.providerId].push(svc.serviceType);
  }

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

  return { searchItems, categoryOptions, totalCount: allProviders.length };
}

export default async function DirectoryPage() {
  const { searchItems, categoryOptions, totalCount } = await getDirectoryData();

  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Provider Directory", url: "/providers" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="page-banner">
        <div className="container" style={{ padding: 0 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Provider Directory" }]} />
          <h1 className="h1">{totalCount} vetted providers.</h1>
          <p className="lede" style={{ maxWidth: 540, marginTop: 8 }}>
            Verified auditors, consultants, lawyers, and software platforms specializing in AI regulatory compliance.
          </p>
        </div>
      </div>

      <div className="container sidebar-layout">
        <DirectorySearchClient providers={searchItems} categories={categoryOptions} />
      </div>
    </>
  );
}
