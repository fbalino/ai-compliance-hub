import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

const BLOG_SLUGS = [
  // Colorado AI Act cluster
  "colorado-ai-act-60-day-checklist",
  "how-to-prepare-for-colorado-ai-act-june-2026",
  "colorado-ai-act-2026-deadline",
  "colorado-ai-act-impact-assessment",
  "colorado-ai-readiness-window",
  // EU AI Act cluster
  "eu-ai-act-gpai-obligations",
  "eu-ai-act-gpai-code-of-practice",
  "eu-ai-act-high-risk-list-annotated",
  "eu-ai-act-vs-uk-ai-safety-bill",
  "gdpr-vs-eu-ai-act",
  // NYC LL 144 cluster
  "nyc-ll-144-enforcement-update",
  "nyc-ll-144-bias-audit-walkthrough",
  // Virginia / Texas / California
  "virginia-hb-2094-what-businesses-need-to-know",
  "texas-ai-regulation-2026",
  "texas-ag-meta-biometric-settlement",
  "california-ab-2013-training-data",
  // Illinois / biometric
  "illinois-aivira-employer-guide",
  "illinois-bipa-class-actions-2025",
  "biometric-privacy-law-patchwork",
  "bipa-vs-cubi-comparison",
  // GDPR / Clearview
  "clearview-ai-gdpr-fines",
  // NIST AI RMF cluster
  "nist-ai-rmf-explainer-for-compliance-teams",
  "nist-ai-rmf-vs-iso-42001",
  "nist-ai-rmf-four-functions-explained",
  "nist-ai-rmf-colorado-safe-harbor",
  // ISO 42001 cluster
  "iso-42001-certification-guide",
  "iso-42001-eu-ai-act-alignment",
  // CCPA ADMT cluster
  "ccpa-admt-ai-teams",
  "ccpa-admt-vs-nyc-ll-144",
  "ccpa-admt-human-in-the-loop",
  // Bias audit / RFP
  "bias-audit-guide",
  "request-for-quote-ai-bias-audit-what-to-expect",
  // Governance & hiring
  "ai-governance-program-guide",
  "hiring-ai-compliance-2026-starter-kit",
];

const COMPARE_SLUGS = [
  "colorado-vs-eu-ai-act",
  "us-state-ai-laws",
  "ai-regulation-by-industry",
  "compliance-frameworks-nist-vs-iso-42001",
];

const LAST_MODIFIED = new Date("2026-05-01");

// Root sitemap covers static pages not covered by segment-level sitemaps.
export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: LAST_MODIFIED, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/regulations`, lastModified: LAST_MODIFIED, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/checker`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/checker/pro-report`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/providers`, lastModified: LAST_MODIFIED, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/glossary`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/compare`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/rfp`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/join`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.6 },
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
