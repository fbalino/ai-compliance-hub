import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { providers, providerCategories, providerServices } from "@/db/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { DirectorySearchClient, type ProviderSearchItem } from "@/components/directory/DirectorySearchClient";
import { SidebarToggle } from "@/components/directory/SidebarToggle";
import { CategoryIcon } from "@/lib/category-icons";

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

const SERVICE_TYPES = ["Software", "Advisory", "Legal counsel", "Audit"];
const REGIONS = ["EU", "UK", "US", "APAC", "LATAM"];

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

  return { searchItems, categoryOptions, totalCount: allProviders.length };
}

export default async function DirectoryPage() {
  const { searchItems, categoryOptions, totalCount } = await getDirectoryData();

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
          <h1 className="h1">{totalCount} vetted providers.</h1>
          <p className="lede" style={{ maxWidth: 540, marginTop: 8 }}>
            Verified auditors, consultants, lawyers, and software platforms specializing in AI regulatory compliance.
          </p>
        </div>
      </div>

      <div className="container sidebar-layout">

        {/* Left sidebar filters */}
        <SidebarToggle>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Filters</div>

          <div style={{ marginBottom: 24 }}>
            <div className="h5" style={{ marginBottom: 8 }}>Service</div>
            {SERVICE_TYPES.map((svc) => (
              <label key={svc} className="flex items-center small" style={{ gap: 8, padding: "6px 0" }}>
                <input type="checkbox" />
                <span>{svc}</span>
              </label>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <div className="h5" style={{ marginBottom: 8 }}>Region</div>
            {REGIONS.map((region) => (
              <label key={region} className="flex items-center small" style={{ gap: 8, padding: "6px 0" }}>
                <input type="checkbox" />
                <span>{region}</span>
              </label>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <div className="h5" style={{ marginBottom: 8 }}>Specialization</div>
            <div className="col" style={{ gap: 4 }}>
              {categoryOptions.map((cat) => (
                <Link key={cat.slug} href={`/directory/categories/${cat.slug}`} className="small flex items-center" style={{ gap: 8, padding: "6px 0", color: "var(--ink-2)", textDecoration: "none" }}>
                  <CategoryIcon name={cat.icon} className="h-4 w-4" />
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </SidebarToggle>

        {/* Main content */}
        <div>
          <div className="between" style={{ marginBottom: 20 }}>
            <div className="eyebrow">Sorted: Featured &middot; then coverage</div>
          </div>

          <DirectorySearchClient providers={searchItems} categories={categoryOptions} />

          {/* Provider CTA */}
          <div className="card" style={{ marginTop: 40, padding: "var(--s-7)", background: "var(--ink)", color: "var(--paper)" }}>
            <div className="flex between" style={{ flexWrap: "wrap", gap: 24 }}>
              <div style={{ maxWidth: 560 }}>
                <div className="h3" style={{ color: "var(--paper)" }}>Are you a compliance provider?</div>
                <p className="small" style={{ color: "rgba(247,244,236,0.7)", marginTop: 8 }}>
                  List your firm in our directory. Free for verified providers. Featured listings include priority placement, lead routing, and analytics.
                </p>
              </div>
              <Link href="/join" className="btn btn-accent" style={{ flexShrink: 0 }}>
                Get Listed &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
