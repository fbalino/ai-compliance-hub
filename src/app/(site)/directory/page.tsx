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

      <div className="rg-page-head">
        <div className="rg-container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Provider Directory" }]} />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h1>AI Compliance Provider Directory</h1>
              <p className="rg-page-desc">
                Verified auditors, consultants, lawyers, and software platforms specializing in AI regulatory compliance.
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "var(--rg-ink)", letterSpacing: "-0.6px" }}>{totalCount}+</div>
              <div style={{ fontSize: 13, color: "var(--rg-ink-dim)", fontWeight: 500 }}>providers listed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rg-page-body">
        <div className="rg-container">

          <div className="rg-page-section">
            <div className="rg-kicker">Search Providers</div>
            <DirectorySearchClient providers={searchItems} categories={categoryOptions} />
          </div>

          <div className="rg-page-section">
            <div className="rg-kicker">Browse by Specialization</div>
            <div className="rg-scard-grid-3">
              {categoryOptions.map((cat) => {
                const count = countByCategory[cat.slug] ?? 0;
                return (
                  <Link key={cat.slug} href={`/directory/categories/${cat.slug}`} className="rg-scard-link">
                    <div className="rg-scard" style={{ height: "100%" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <span style={{
                          display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                          background: "var(--rg-primary-faint)", color: "var(--rg-primary-deep)",
                        }}>
                          <CategoryIcon name={cat.icon} className="h-5 w-5" />
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                            <h3 style={{ marginBottom: 0 }}>{cat.label}</h3>
                            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", fontWeight: 500, color: "var(--rg-ink-dim)", flexShrink: 0 }}>
                              {count}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rg-cta-banner">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h2>Are you a compliance provider?</h2>
                <p>
                  List your firm in our directory and reach businesses actively looking for AI compliance help.
                  Featured listings include verified badges, lead routing, and analytics dashboards.
                </p>
                <ul style={{ marginTop: 12, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                  <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--rg-primary-deep)" }}>
                    <span style={{ color: "var(--rg-primary)" }}>&check;</span> Starting at $99/month &mdash; featured placement
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--rg-primary-deep)" }}>
                    <span style={{ color: "var(--rg-primary)" }}>&check;</span> Lead routing from compliance checker results
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--rg-primary-deep)" }}>
                    <span style={{ color: "var(--rg-primary)" }}>&check;</span> Verified badge after vetting
                  </li>
                </ul>
              </div>
              <a href="mailto:providers@aicompliancehub.com" className="rg-btn rg-btn-primary" style={{ flexShrink: 0 }}>
                Get Listed <span className="rg-arrow">&rarr;</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
