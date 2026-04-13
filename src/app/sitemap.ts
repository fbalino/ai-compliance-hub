import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

// Root sitemap covers static pages not covered by segment-level sitemaps.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-04-13"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/regulations`,
      lastModified: new Date("2026-04-13"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/glossary`,
      lastModified: new Date("2026-04-13"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/directory`,
      lastModified: new Date("2026-04-13"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified: new Date("2026-04-13"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/checker`,
      lastModified: new Date("2026-04-13"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
