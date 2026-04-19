import { db } from "@/db";
import { providers, providerCategories } from "@/db/schema";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com").trim();

// ISR: revalidate every 24 hours (provider listings update)
export const revalidate = 86400;

export async function GET() {
  // Fetch provider and category slugs from DB
  const [providerRows, categoryRows] = await Promise.all([
    db.select({ slug: providers.slug }).from(providers),
    db.select({ slug: providerCategories.slug }).from(providerCategories),
  ]);

  const paths = [
    "/directory",
    "/directory/categories",
    ...categoryRows.map((c) => `/directory/categories/${c.slug}`),
    ...providerRows.map((p) => `/directory/providers/${p.slug}`),
  ];

  const urls = paths
    .map(
      (path) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === "/directory" ? "0.8" : path === "/directory/categories" ? "0.7" : path.includes("/categories/") ? "0.7" : "0.6"}</priority>
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
