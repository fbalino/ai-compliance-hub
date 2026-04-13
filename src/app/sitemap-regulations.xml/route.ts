import { getAllRegulationSlugs } from "@/lib/regulations";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

// ISR: revalidate every 24 hours
export const revalidate = 86400;

export async function GET() {
  const slugs = await getAllRegulationSlugs();

  const urls = slugs
    .map(
      (slug) => `
  <url>
    <loc>${SITE_URL}/regulations/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
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
