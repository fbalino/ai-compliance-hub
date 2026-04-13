import type { ComponentType } from "react";

export interface GlossaryFrontmatter {
  term: string;
  definition: string;
  aliases?: string[];
  relatedRegulations?: Array<{ slug: string; name: string }>;
  relatedTerms?: Array<{ slug: string; term: string }>;
  publishedAt?: string;
  updatedAt?: string;
}

export interface GlossaryEntry {
  slug: string;
  frontmatter: GlossaryFrontmatter;
  Content: ComponentType;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MdxModule = { default: ComponentType; frontmatter: any };

// Registry of glossary MDX files.
const GLOSSARY_MODULES: Record<string, () => Promise<MdxModule>> = {
  "algorithmic-discrimination": () =>
    import("content/glossary/algorithmic-discrimination.mdx") as Promise<MdxModule>,
  "high-risk-ai-system": () =>
    import("content/glossary/high-risk-ai-system.mdx") as Promise<MdxModule>,
  "conformity-assessment": () =>
    import("content/glossary/conformity-assessment.mdx") as Promise<MdxModule>,
  "impact-assessment": () =>
    import("content/glossary/impact-assessment.mdx") as Promise<MdxModule>,
  "bias-audit": () =>
    import("content/glossary/bias-audit.mdx") as Promise<MdxModule>,
};

export async function getAllGlossarySlugs(): Promise<string[]> {
  return Object.keys(GLOSSARY_MODULES);
}

export async function getGlossaryTerm(
  slug: string
): Promise<GlossaryEntry | null> {
  const loader = GLOSSARY_MODULES[slug];
  if (!loader) return null;

  try {
    const mod = await loader();
    return {
      slug,
      frontmatter: mod.frontmatter as GlossaryFrontmatter,
      Content: mod.default,
    };
  } catch {
    return null;
  }
}
