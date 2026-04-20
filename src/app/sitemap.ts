import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

const BLOG_SLUGS = [
  "colorado-ai-act-60-day-checklist",
  "how-to-prepare-for-colorado-ai-act-june-2026",
  "virginia-hb-2094-what-businesses-need-to-know",
  "request-for-quote-ai-bias-audit-what-to-expect",
  "nist-ai-rmf-explainer-for-compliance-teams",
  "colorado-ai-act-2026-deadline",
  "eu-ai-act-gpai-obligations",
  "nyc-ll-144-enforcement-update",
  "bias-audit-guide",
  "texas-ai-regulation-2026",
  "ai-governance-program-guide",
];

const COMPARE_SLUGS = [
  "colorado-vs-eu-ai-act",
  "us-state-ai-laws",
  "ai-regulation-by-industry",
  "compliance-frameworks-nist-vs-iso-42001",
];

const LAST_MODIFIED = new Date("2026-04-14");

// Root sitemap covers static pages not covered by segment-level sitemaps.
export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: LAST_MODIFIED, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/regulations`, lastModified: LAST_MODIFIED, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/checker`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/checker/pro-report`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/directory`, lastModified: LAST_MODIFIED, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/glossary`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/compare`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/rfp`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/newsletter`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.2 },
  ];

  const blog: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const compare: MetadataRoute.Sitemap = COMPARE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/compare/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...core, ...blog, ...compare];
}
