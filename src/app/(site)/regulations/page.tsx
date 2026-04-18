import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { RegulationsFilterClient, type RegulationItem } from "@/components/regulations/RegulationsFilterClient";

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

const REGULATIONS: RegulationItem[] = [
  {
    slug: "eu-ai-act",
    code: "EU-AIA-24",
    name: "EU AI Act",
    shortName: "EU 2024/1689",
    jurisdiction: "European Union",
    status: "active",
    effectiveDate: "02 Aug 2026",
    maxPenalty: "€35M or 7% global revenue",
    summary:
      "A comprehensive risk-based framework governing AI systems in the EU, with strict requirements for high-risk applications and outright bans on unacceptable-risk AI.",
    topics: ["Generative AI", "High-risk", "GPAI"],
    providers: 12,
  },
  {
    slug: "colorado-ai-act",
    code: "US-CO-205",
    name: "Colorado AI Act",
    shortName: "CO SB 24-205",
    jurisdiction: "US · Colorado",
    status: "pending",
    effectiveDate: "30 Jun 2026",
    maxPenalty: "CCPA enforcement",
    summary:
      "The first US state comprehensive AI law. Requires deployers of high-risk AI systems to use reasonable care to protect consumers from known risks of algorithmic discrimination.",
    topics: ["Hiring", "Housing"],
    providers: 7,
  },
  {
    slug: "nyc-local-law-144",
    code: "NYC-144",
    name: "NYC Local Law 144",
    shortName: "NYC LL 144",
    jurisdiction: "US · New York City",
    status: "active",
    effectiveDate: "05 Jul 2023",
    maxPenalty: "$1,500 per violation per day",
    summary:
      "Requires employers using automated employment decision tools (AEDTs) in hiring or promotion decisions to conduct annual bias audits and post results publicly.",
    topics: ["Employment", "Bias audit"],
    providers: 9,
  },
  {
    slug: "california-ab-2013",
    code: "CA-AB-2013",
    name: "California AB 2013",
    shortName: "CA AB 2013",
    jurisdiction: "US · California",
    status: "pending",
    effectiveDate: "01 Jan 2026",
    maxPenalty: "Civil penalty",
    summary:
      "Requires developers of generative AI systems trained on data exceeding certain compute thresholds to publish detailed training data transparency reports.",
    topics: ["AI Transparency"],
    providers: 4,
  },
  {
    slug: "illinois-ai-video-interview-act",
    code: "IL-AIVIRA",
    name: "Illinois AI Video Interview Act",
    shortName: "IL AIVIRA",
    jurisdiction: "US · Illinois",
    status: "active",
    effectiveDate: "01 Jan 2020",
    maxPenalty: "Civil damages",
    summary:
      "Requires employers using AI to analyze video interviews to notify candidates, obtain consent, explain how the AI is used, and limit sharing of video data.",
    topics: ["Employment"],
    providers: 5,
  },
  {
    slug: "virginia-hb-2094",
    code: "VA-HB-2094",
    name: "Virginia HB 2094",
    shortName: "VA HB 2094",
    jurisdiction: "US · Virginia",
    status: "pending",
    effectiveDate: "01 Jul 2026",
    maxPenalty: "$7,500 per violation",
    summary:
      "Virginia's legislation governing automated decision systems used in consequential decisions. Requires impact assessments, consumer notifications, and opt-out rights.",
    topics: ["ADS", "Consumer protection"],
    providers: 3,
  },
];

const UPCOMING: RegulationItem[] = [
  {
    slug: null,
    code: "EU-GPAI",
    name: "EU AI Act — GPAI Rules",
    jurisdiction: "European Union",
    status: "pending",
    effectiveDate: "Aug 2025",
    summary: "General-purpose AI model obligations including capability evaluations and incident reporting for systemic-risk models.",
    topics: ["GPAI", "Systemic risk"],
    isUpcoming: true,
  },
  {
    slug: "texas-hb-1709",
    code: "TX-HB-1709",
    name: "Texas Responsible AI Governance Act",
    jurisdiction: "US · Texas",
    status: "proposed",
    effectiveDate: "TBD",
    summary: "Proposed AI regulation modeled on the Colorado AI Act, covering high-risk AI system obligations for Texas businesses.",
    topics: ["High-risk AI"],
    isUpcoming: true,
  },
];

export default function RegulationsPage() {
  const allRegulations = [...REGULATIONS, ...UPCOMING];

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
