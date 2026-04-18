import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { providers, providerCategories, providerServices } from "@/db/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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
      tagline: p.tagline ?? (p.description ? p.description.slice(0, 140) + "\u2026" : ""),
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

      <div className="page-banner">
        <div className="container" style={{ padding: 0 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Provider Directory" }]} />
          <div className="flex between" style={{ flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 className="h1">{totalCount} vetted providers</h1>
              <p className="lede" style={{ maxWidth: 540, marginTop: 8 }}>
                Verified auditors, consultants, lawyers, and software platforms specializing in AI regulatory compliance.
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div className="serif" style={{ fontSize: 32, color: "var(--ink)" }}>{totalCount}+</div>
              <div className="xs">providers listed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "var(--s-8) var(--s-7)" }}>

        <div style={{ marginBottom: 40 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Search Providers</div>
          <DirectorySearchClient providers={searchItems} categories={categoryOptions} />
        </div>

        <div style={{ marginBottom: 40 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Browse by Specialization</div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {categoryOptions.map((cat) => {
              const count = countByCategory[cat.slug] ?? 0;
              return (
                <Link key={cat.slug} href={`/directory/categories/${cat.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ height: "100%", padding: 16, cursor: "pointer" }}>
                    <div className="flex items-center" style={{ gap: 12 }}>
                      <span style={{
                        display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 6, flexShrink: 0,
                        background: "var(--accent-soft)", color: "var(--accent)",
                      }}>
                        <CategoryIcon name={cat.icon} className="h-5 w-5" />
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="h5">{cat.label}</div>
                        <div className="mono xs" style={{ color: "var(--accent)", marginTop: 2 }}>{count}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="card" style={{ padding: "var(--s-7)", background: "var(--ink)", color: "var(--paper)" }}>
          <div className="flex between" style={{ flexWrap: "wrap", gap: 24 }}>
            <div style={{ maxWidth: 560 }}>
              <div className="h3" style={{ color: "var(--paper)" }}>Are you a compliance provider?</div>
              <p className="small" style={{ color: "rgba(247,244,236,0.7)", marginTop: 8 }}>
                List your firm in our directory and reach businesses actively looking for AI compliance help.
                Featured listings include verified badges, lead routing, and analytics dashboards.
              </p>
              <div className="col" style={{ gap: 6, marginTop: 12 }}>
                {["Starting at $99/month — featured placement", "Lead routing from compliance checker results", "Verified badge after vetting"].map((item) => (
                  <span key={item} className="flex items-center xs" style={{ gap: 8, color: "rgba(247,244,236,0.7)" }}>
                    <span style={{ color: "var(--gold)" }}>✓</span> {item}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/newsletter" className="btn btn-accent" style={{ flexShrink: 0 }}>
              Get Listed →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
