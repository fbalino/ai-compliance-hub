import { db } from "@/db";
import { providers, providerCategories } from "@/db/schema";
import { SITE_URL } from "@/lib/brand";

// ISR: revalidate every 24 hours (provider listings update)
export const revalidate = 86400;

export async function GET() {
  // Fetch provider and category slugs from DB
  const [providerRows, categoryRows] = await Promise.all([
    db.select({ slug: providers.slug }).from(providers),
    db.select({ slug: providerCategories.slug }).from(providerCategories),
  ]);

  const paths = [
    "/providers",
    "/providers/categories",
    ...categoryRows.map((c) => `/providers/categories/${c.slug}`),
    ...providerRows.map((p) => `/providers/${p.slug}`),
  ];

  const urls = paths
    .map(
      (path) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === "/providers" ? "0.8" : path === "/providers/categories" ? "0.7" : path.includes("/categories/") ? "0.7" : "0.6"}</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
