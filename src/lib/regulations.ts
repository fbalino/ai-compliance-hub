import type { ComponentType } from "react";
import { type FaqItem } from "@/lib/jsonld";

export interface RegulationFrontmatter {
  name: string;
  shortName?: string;
  description: string;
  jurisdiction: string;
  status: "draft" | "enacted" | "enforced" | "rescinded";
  effectiveDate?: string;
  enforcementDate?: string;
  maxPenalty?: string;
  publishedAt?: string;
  updatedAt?: string;
  toc?: Array<{ id: string; label: string }>;
  relatedRegulations?: Array<{ slug: string; name: string }>;
  faqs?: FaqItem[];
}

export interface RegulationData {
  slug: string;
  frontmatter: RegulationFrontmatter;
  Content: ComponentType;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MdxModule = { default: ComponentType; frontmatter: any };

// Dynamic import of MDX files from the content/regulations directory.
// Next.js / Turbopack resolves these at build time via static analysis.
const REGULATION_MODULES: Record<string, () => Promise<MdxModule>> = {
  "colorado-ai-act": () =>
    import("content/regulations/colorado-ai-act.mdx") as Promise<MdxModule>,
  "eu-ai-act": () =>
    import("content/regulations/eu-ai-act.mdx") as Promise<MdxModule>,
  "nyc-local-law-144": () =>
    import("content/regulations/nyc-local-law-144.mdx") as Promise<MdxModule>,
  "california-ab-2013": () =>
    import("content/regulations/california-ab-2013.mdx") as Promise<MdxModule>,
  "illinois-ai-video-interview-act": () =>
    import("content/regulations/illinois-ai-video-interview-act.mdx") as Promise<MdxModule>,
  "texas-hb-1709": () =>
    import("content/regulations/texas-hb-1709.mdx") as Promise<MdxModule>,
  "virginia-hb-2094": () =>
    import("content/regulations/virginia-hb-2094.mdx") as Promise<MdxModule>,
  "nis2-directive": () =>
    import("content/regulations/nis2-directive.mdx") as Promise<MdxModule>,
  "dora": () =>
    import("content/regulations/dora.mdx") as Promise<MdxModule>,
  "illinois-bipa": () =>
    import("content/regulations/illinois-bipa.mdx") as Promise<MdxModule>,
  "gdpr": () =>
    import("content/regulations/gdpr.mdx") as Promise<MdxModule>,
  "texas-cubi": () =>
    import("content/regulations/texas-cubi.mdx") as Promise<MdxModule>,
  "nist-ai-rmf": () =>
    import("content/regulations/nist-ai-rmf.mdx") as Promise<MdxModule>,
  "iso-42001": () =>
    import("content/regulations/iso-42001.mdx") as Promise<MdxModule>,
  "ccpa-admt": () =>
    import("content/regulations/ccpa-admt.mdx") as Promise<MdxModule>,
};

export async function getAllRegulationSlugs(): Promise<string[]> {
  return Object.keys(REGULATION_MODULES);
}

export async function getAllRegulations(): Promise<RegulationData[]> {
  const entries = Object.entries(REGULATION_MODULES);
  const results: RegulationData[] = [];
  for (const [slug, loader] of entries) {
    try {
      const mod = await loader();
      results.push({
        slug,
        frontmatter: mod.frontmatter as RegulationFrontmatter,
        Content: mod.default,
      });
    } catch {
      // skip broken modules
    }
  }
  return results;
}

export async function getRegulationBySlug(
  slug: string
): Promise<RegulationData | null> {
  const loader = REGULATION_MODULES[slug];
  if (!loader) return null;

  try {
    const mod = await loader();
    return {
      slug,
      frontmatter: mod.frontmatter as RegulationFrontmatter,
      Content: mod.default,
    };
  } catch {
    return null;
  }
}
