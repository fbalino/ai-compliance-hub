import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { RegulationsFilterClient, type RegulationItem } from "@/components/regulations/RegulationsFilterClient";
import { getAllRegulations, type RegulationFrontmatter } from "@/lib/regulations";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "AI Regulations Tracker — All AI Compliance Laws (2025)",
  description:
    "Comprehensive tracker of AI regulations worldwide: EU AI Act, Colorado AI Act, NYC Local Law 144, California AB 2013, Illinois AIVIRA, and more. Updated regularly.",
  alternates: {
    canonical: `${SITE_URL}/regulations`,
  },
};

function mapStatus(status: RegulationFrontmatter["status"]): RegulationItem["status"] | null {
  switch (status) {
    case "enforced": return "active";
    case "enacted": return "pending";
    case "draft": return "proposed";
    case "rescinded": return null;
  }
}

export default async function RegulationsPage() {
  const allRegulationData = await getAllRegulations();

  const allRegulations: RegulationItem[] = [];
  for (const reg of allRegulationData) {
    const uiStatus = mapStatus(reg.frontmatter.status);
    if (uiStatus === null) continue;

    allRegulations.push({
      slug: reg.slug,
      name: reg.frontmatter.name,
      shortName: reg.frontmatter.shortName,
      jurisdiction: reg.frontmatter.jurisdiction,
      status: uiStatus,
      effectiveDate: reg.frontmatter.effectiveDate ?? "TBD",
      maxPenalty: reg.frontmatter.maxPenalty,
      summary: reg.frontmatter.description,
    });
  }

  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Regulations", url: "/regulations" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="page-banner">
        <div className="container" style={{ padding: 0 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Regulations" }]} />
          <h1 className="h1">Catalog — {allRegulations.length} regulations</h1>
          <p className="lede" style={{ maxWidth: 640, marginTop: 8 }}>
            Track every major AI compliance law — enforcement dates, penalties, and what your business needs to do.
          </p>
        </div>
      </div>

      <RegulationsFilterClient regulations={allRegulations} />
    </>
  );
}
