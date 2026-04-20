import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

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
