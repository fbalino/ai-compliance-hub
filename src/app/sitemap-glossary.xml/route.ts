import { getAllGlossarySlugs } from "@/lib/glossary";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

// ISR: revalidate at build (glossary is relatively static)
export const revalidate = false;

export async function GET() {
  const slugs = await getAllGlossarySlugs();

  const urls = slugs
    .map(
      (slug) => `
  <url>
    <loc>${SITE_URL}/glossary/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
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
