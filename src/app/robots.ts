import type { MetadataRoute } from "next";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com").trim();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/checker/pro-report/success",
          "/_next/",
        ],
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap-regulations.xml`,
      `${SITE_URL}/sitemap-glossary.xml`,
      `${SITE_URL}/sitemap-directory.xml`,
      `${SITE_URL}/sitemap.xml`,
    ],
  };
}
