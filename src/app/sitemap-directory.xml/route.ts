const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

// ISR: revalidate every 24 hours (as provider listings update)
export const revalidate = 86400;

// Placeholder: will be populated from DB once Neon provider table is live.
const DIRECTORY_PATHS = [
  "/directory",
  "/directory/categories/bias-audit",
  "/directory/categories/governance-consulting",
  "/directory/categories/legal",
  "/directory/categories/compliance-software",
  "/directory/categories/training",
];

export async function GET() {
  const urls = DIRECTORY_PATHS.map(
    (path) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join("");

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
