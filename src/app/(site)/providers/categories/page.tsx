import type { Metadata } from "next";
import Link from "next/link";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { providerCategories, providers } from "@/db/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { CategoryIcon } from "@/lib/category-icons";
import { SITE_URL } from "@/lib/brand";

export const revalidate = 3600;


export const metadata: Metadata = {
  title: "Provider Categories — AI Compliance Directory",
  description:
    "Browse AI compliance provider categories: bias auditors, governance consultants, legal counsel, compliance software, and training providers.",
  alternates: {
    canonical: `${SITE_URL}/providers/categories`,
  },
};

async function getCategoriesWithCounts() {
  const allCategories = await db
    .select()
    .from(providerCategories)
    .orderBy(providerCategories.label);

  const counts = await db
    .select({
      category: providers.category,
      count: sql<number>`count(*)::int`,
    })
    .from(providers)
    .groupBy(providers.category);

  const countMap: Record<string, number> = {};
  for (const row of counts) {
    if (row.category) countMap[row.category] = row.count;
  }

  return allCategories.map((cat) => ({
    ...cat,
    providerCount: countMap[cat.slug] ?? 0,
  }));
}

export default async function CategoriesIndexPage() {
  const categories = await getCategoriesWithCounts();

  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Provider Directory", url: "/providers" },
    { name: "Categories", url: "/providers/categories" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="page-banner">
        <div className="container" style={{ maxWidth: 1000, padding: 0 }}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Provider Directory", href: "/providers" },
              { label: "Categories" },
            ]}
          />
          <h1 className="h1">Provider Categories</h1>
          <p className="lede" style={{ maxWidth: 540, marginTop: 8 }}>
            Browse compliance providers by specialization — from bias auditors to legal counsel.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1000, padding: "var(--s-8) var(--s-7)" }}>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/providers/categories/${cat.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article className="card" style={{ height: "100%" }}>
                <div
                  className="flex items-center"
                  style={{ gap: 12, marginBottom: 12 }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                      borderRadius: 6,
                      background: "var(--accent-soft)",
                      color: "var(--accent)",
                    }}
                  >
                    <CategoryIcon name={cat.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="h4">{cat.label}</div>
                    <div className="xs" style={{ color: "var(--ink-2)" }}>
                      {cat.providerCount}{" "}
                      {cat.providerCount === 1 ? "provider" : "providers"}
                    </div>
                  </div>
                </div>
                <p
                  className="small"
                  style={{ lineHeight: 1.5, color: "var(--ink-2)" }}
                >
                  {cat.description}
                </p>
              </article>
            </Link>
          ))}
        </div>

        <div
          className="card"
          style={{
            marginTop: 40,
            padding: "var(--s-6)",
            background: "var(--paper-inverse)",
            color: "var(--ink-inverse)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div className="h4" style={{ color: "var(--ink-inverse)" }}>
              Don&#39;t see your specialization?
            </div>
            <span
              className="small"
              style={{
                color: "var(--ink-inverse-soft)",
                display: "block",
                marginTop: 4,
              }}
            >
              We&#39;re expanding our directory. Get listed and reach businesses
              looking for your expertise.
            </span>
          </div>
          <Link href="/join" className="btn btn-accent">
            Apply to List
          </Link>
        </div>
      </div>
    </>
  );
}
