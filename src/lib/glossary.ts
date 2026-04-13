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
  "automated-decision-making": () =>
    import("content/glossary/automated-decision-making.mdx") as Promise<MdxModule>,
  "gpai-model": () =>
    import("content/glossary/gpai-model.mdx") as Promise<MdxModule>,
  "risk-management-system": () =>
    import("content/glossary/risk-management-system.mdx") as Promise<MdxModule>,
  "systemic-risk": () =>
    import("content/glossary/systemic-risk.mdx") as Promise<MdxModule>,
  "training-data-transparency": () =>
    import("content/glossary/training-data-transparency.mdx") as Promise<MdxModule>,
  "prohibited-ai-practices": () =>
    import("content/glossary/prohibited-ai-practices.mdx") as Promise<MdxModule>,
  "ai-governance": () =>
    import("content/glossary/ai-governance.mdx") as Promise<MdxModule>,
  "fundamental-rights-impact-assessment": () =>
    import("content/glossary/fundamental-rights-impact-assessment.mdx") as Promise<MdxModule>,
  "adverse-impact": () =>
    import("content/glossary/adverse-impact.mdx") as Promise<MdxModule>,
  "ce-marking": () =>
    import("content/glossary/ce-marking.mdx") as Promise<MdxModule>,
  "explainability": () =>
    import("content/glossary/explainability.mdx") as Promise<MdxModule>,
  "red-teaming": () =>
    import("content/glossary/red-teaming.mdx") as Promise<MdxModule>,
  "post-market-monitoring": () =>
    import("content/glossary/post-market-monitoring.mdx") as Promise<MdxModule>,
  "ai-deployer": () =>
    import("content/glossary/ai-deployer.mdx") as Promise<MdxModule>,
  "ai-sandbox": () =>
    import("content/glossary/ai-sandbox.mdx") as Promise<MdxModule>,
  "consequential-decision": () =>
    import("content/glossary/consequential-decision.mdx") as Promise<MdxModule>,
  "ai-literacy": () =>
    import("content/glossary/ai-literacy.mdx") as Promise<MdxModule>,
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
