/**
 * Seed script — populate provider_categories and providers tables
 * Run: npx tsx src/db/seed.ts
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  providerCategories,
  providers,
  providerServices,
  providerRegulations,
  providerIndustries,
} from "./schema";
import { eq } from "drizzle-orm";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

// ── Category data ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    slug: "bias-audit",
    label: "Bias Auditors",
    icon: "🔬",
    description:
      "Firms that conduct algorithmic bias and fairness audits required by NYC LL 144, Colorado AI Act, and other laws.",
    longDescription:
      "Bias auditors assess AI systems for discriminatory outcomes across protected classes. NYC Local Law 144 requires annual third-party bias audits for hiring tools. The Colorado AI Act and other laws have similar requirements. These firms conduct statistical testing, disparate impact analysis, and produce the audit summaries required by law.",
    regulations: ["NYC LL 144", "Colorado AI Act", "EU AI Act"],
  },
  {
    slug: "governance-consulting",
    label: "Governance Consulting",
    icon: "🏛",
    description:
      "Consultants who build AI governance programs, risk management frameworks, and compliance policies.",
    longDescription:
      "AI governance consultants help organizations build the policies, procedures, and oversight structures needed to comply with AI regulations. They align internal practices with NIST AI RMF, ISO 42001, and regulatory requirements. Engagements typically include risk register development, policy drafting, and board-level governance program design.",
    regulations: ["EU AI Act", "NIST AI RMF", "ISO 42001"],
  },
  {
    slug: "legal",
    label: "Legal & Compliance",
    icon: "⚖️",
    description:
      "Law firms and legal consultants specializing in AI regulatory compliance and risk assessment.",
    longDescription:
      "AI law specialists advise on regulatory interpretation, compliance strategy, and risk mitigation. They draft AI use policies, review vendor contracts for compliance risk, provide privileged legal assessments, and represent clients in enforcement actions. Essential for navigating ambiguous requirements and multi-jurisdictional obligations.",
    regulations: ["EU AI Act", "Colorado AI Act", "State Laws"],
  },
  {
    slug: "compliance-software",
    label: "Compliance Software",
    icon: "💻",
    description:
      "SaaS platforms for AI risk assessment, documentation, policy management, and audit trails.",
    longDescription:
      "AI compliance platforms provide the tooling for continuous compliance monitoring, documentation generation, and audit trail management. Features typically include model risk cards, impact assessment workflows, policy libraries, and evidence collection for regulatory audits. Designed for organizations deploying multiple AI systems at scale.",
    regulations: ["EU AI Act", "ISO 42001", "NIST AI RMF"],
  },
  {
    slug: "training",
    label: "Training & Education",
    icon: "📚",
    description:
      "AI literacy, compliance training, and certification programs for teams and executives.",
    longDescription:
      "AI compliance training providers offer courses, certifications, and custom programs for legal, compliance, engineering, and executive teams. The EU AI Act explicitly requires AI literacy training for staff deploying high-risk AI systems. Programs range from awareness training to technical deep-dives on bias testing methodology.",
    regulations: ["EU AI Act", "General Compliance"],
  },
];

// ── Provider seed data ─────────────────────────────────────────────────────────

interface ProviderSeed {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  websiteUrl?: string;
  foundedYear?: number;
  headquarters?: string;
  employeeCountRange?: string;
  tier: "free" | "premium" | "enterprise";
  isVerified: boolean;
  jurisdictions: string[];
  serviceTypes: string[];
  regulationSlugs: string[];
  industries: string[];
}

const PROVIDERS: ProviderSeed[] = [
  {
    slug: "holistic-ai",
    name: "Holistic AI",
    category: "bias-audit",
    tagline: "AI governance, assurance, and compliance for enterprise teams.",
    description:
      "Holistic AI is a global AI governance, assurance, and compliance platform. They provide enterprises with tools and services to audit, monitor, and mitigate AI risks across EU AI Act, NYC Local Law 144, NIST AI RMF, and other frameworks. Services span algorithmic bias audits, risk assessments, technical documentation, and ongoing compliance monitoring.",
    websiteUrl: "https://holisticai.com",
    foundedYear: 2018,
    headquarters: "London, UK / New York, US",
    employeeCountRange: "50–200",
    tier: "premium",
    isVerified: true,
    jurisdictions: ["US", "EU", "UK"],
    serviceTypes: ["Bias Audits", "Risk Assessment", "Compliance Software", "EU AI Act Advisory"],
    regulationSlugs: ["eu-ai-act", "nyc-ll-144", "nist-ai-rmf", "colorado-ai-act"],
    industries: ["Financial Services", "Healthcare", "HR Technology", "Retail"],
  },
  {
    slug: "babl-ai",
    name: "BABL AI",
    category: "bias-audit",
    tagline: "Independent bias audits compliant with NYC LL 144 and emerging US laws.",
    description:
      "BABL AI is an independent auditing firm specializing in algorithmic bias and fairness audits for automated employment decision tools. They are one of the leading auditors for NYC Local Law 144 compliance and have audited hundreds of hiring AI systems across industries. Their audits produce the publicly-postable summaries required by law.",
    websiteUrl: "https://bablai.com",
    foundedYear: 2021,
    headquarters: "New York, NY",
    employeeCountRange: "10–49",
    tier: "premium",
    isVerified: true,
    jurisdictions: ["US"],
    serviceTypes: ["Bias Audits", "NYC LL 144 Compliance", "Algorithmic Audits"],
    regulationSlugs: ["nyc-ll-144", "colorado-ai-act", "eeoc-guidelines"],
    industries: ["HR Technology", "Financial Services", "Healthcare", "Enterprise"],
  },
  {
    slug: "orcaa",
    name: "ORCAA",
    category: "bias-audit",
    tagline: "Algorithm accountability audit firm founded by prominent AI ethics researchers.",
    description:
      "ORCAA (O'Neil Risk Consulting and Algorithmic Auditing) is an algorithm accountability auditing firm founded by Cathy O'Neil, author of 'Weapons of Math Destruction'. They conduct independent audits of algorithmic systems for bias, fairness, and transparency, with deep expertise in hiring, lending, and recidivism algorithms.",
    websiteUrl: "https://orcaarisk.com",
    foundedYear: 2017,
    headquarters: "New York, NY",
    employeeCountRange: "10–49",
    tier: "premium",
    isVerified: true,
    jurisdictions: ["US"],
    serviceTypes: ["Algorithmic Audits", "Bias Analysis", "Fair Housing", "NYC LL 144"],
    regulationSlugs: ["nyc-ll-144", "fair-housing-act", "ecoa", "colorado-ai-act"],
    industries: ["Financial Services", "HR Technology", "Criminal Justice", "Insurance"],
  },
  {
    slug: "credo-ai",
    name: "Credo AI",
    category: "compliance-software",
    tagline: "AI governance platform for responsible AI development and deployment.",
    description:
      "Credo AI is an AI governance platform that helps enterprises build responsible AI programs at scale. The platform provides a centralized system for AI policy management, risk assessments, model cards, compliance tracking across EU AI Act and other frameworks, and evidence collection for audits.",
    websiteUrl: "https://credo.ai",
    foundedYear: 2020,
    headquarters: "San Francisco, CA",
    employeeCountRange: "50–200",
    tier: "premium",
    isVerified: true,
    jurisdictions: ["US", "EU"],
    serviceTypes: ["AI Governance Platform", "Policy Management", "Risk Assessment", "Compliance Tracking"],
    regulationSlugs: ["eu-ai-act", "nist-ai-rmf", "iso-42001", "colorado-ai-act"],
    industries: ["Financial Services", "Healthcare", "Technology", "Enterprise"],
  },
  {
    slug: "fairly-ai",
    name: "Fairly AI",
    category: "compliance-software",
    tagline: "AI compliance automation platform for financial services and healthcare.",
    description:
      "Fairly AI is an AI compliance automation platform designed for financial services and healthcare organizations. It automates the evidence collection, documentation, and monitoring required for ongoing AI compliance, with pre-built workflows for model risk management and regulatory examination readiness.",
    websiteUrl: "https://fairly.ai",
    headquarters: "Toronto, Canada / New York, US",
    employeeCountRange: "10–49",
    tier: "free",
    isVerified: false,
    jurisdictions: ["US", "EU"],
    serviceTypes: ["Compliance Automation", "Model Risk Management", "Audit Readiness"],
    regulationSlugs: ["eu-ai-act", "sr-11-7", "nist-ai-rmf"],
    industries: ["Financial Services", "Healthcare", "Insurance"],
  },
  {
    slug: "aletheia-ai",
    name: "AletheiAI",
    category: "governance-consulting",
    tagline: "Enterprise AI governance strategy and NIST AI RMF implementation.",
    description:
      "AletheiAI provides enterprise AI governance strategy and NIST AI RMF implementation services. Their consultants help organizations design and deploy AI governance programs, including risk registers, policy frameworks, board-level oversight structures, and vendor due diligence protocols.",
    headquarters: "Washington, DC",
    tier: "premium",
    isVerified: true,
    jurisdictions: ["US", "EU"],
    serviceTypes: ["AI Governance Strategy", "NIST AI RMF", "Policy Development", "Board Advisory"],
    regulationSlugs: ["nist-ai-rmf", "eu-ai-act", "iso-42001", "colorado-ai-act"],
    industries: ["Government", "Defense", "Financial Services", "Healthcare"],
  },
  {
    slug: "responsible-ai-institute",
    name: "Responsible AI Institute",
    category: "governance-consulting",
    tagline: "AI governance certifications and consulting for enterprise and government.",
    description:
      "The Responsible AI Institute (RAI Institute) provides AI governance certifications and consulting for enterprise and government organizations. Their RAI Certification program evaluates AI systems against a comprehensive framework covering fairness, explainability, accountability, and security.",
    websiteUrl: "https://responsible.ai",
    foundedYear: 2019,
    headquarters: "Austin, TX",
    employeeCountRange: "10–49",
    tier: "premium",
    isVerified: true,
    jurisdictions: ["US", "EU"],
    serviceTypes: ["AI Certification", "Governance Consulting", "Risk Assessment"],
    regulationSlugs: ["nist-ai-rmf", "eu-ai-act", "iso-42001"],
    industries: ["Technology", "Healthcare", "Financial Services", "Government"],
  },
  {
    slug: "impartial-ai",
    name: "Impartial AI",
    category: "bias-audit",
    tagline: "Automated bias detection and annual audit reports for hiring tools.",
    description:
      "Impartial AI provides automated bias detection and annual audit reports specifically designed for NYC Local Law 144 compliance. Their platform streamlines the auditing process for employers using AI hiring tools, producing compliant audit summaries ready for public posting.",
    tier: "free",
    isVerified: false,
    jurisdictions: ["US"],
    serviceTypes: ["NYC LL 144 Audits", "Bias Detection", "Hiring AI Compliance"],
    regulationSlugs: ["nyc-ll-144"],
    industries: ["HR Technology", "Staffing", "Enterprise"],
  },
  {
    slug: "ai-policy-lab",
    name: "AI Policy Lab",
    category: "governance-consulting",
    tagline: "Strategic AI policy consulting for enterprises navigating global regulations.",
    description:
      "AI Policy Lab provides strategic AI policy consulting for enterprises navigating global AI regulatory frameworks. Their advisors specialize in multi-jurisdictional compliance strategies, regulatory advocacy, and preparing organizations for emerging AI laws before they take effect.",
    tier: "free",
    isVerified: false,
    jurisdictions: ["US", "EU", "UK"],
    serviceTypes: ["Policy Development", "Regulatory Strategy", "Multi-jurisdictional Compliance"],
    regulationSlugs: ["eu-ai-act", "colorado-ai-act", "uk-ai-regulations", "singapore-ai-governance"],
    industries: ["Technology", "Financial Services", "Healthcare", "Retail"],
  },
  {
    slug: "fieldfisher-ai",
    name: "Fieldfisher — AI Practice",
    category: "legal",
    tagline: "EU AI Act compliance counsel and cross-border AI regulatory advice.",
    description:
      "Fieldfisher's AI practice group provides EU AI Act compliance counsel and cross-border AI regulatory advice for technology companies and enterprises deploying AI in Europe. Services include AI system classification, conformity assessment support, contractual compliance, and AI liability analysis.",
    websiteUrl: "https://fieldfisher.com",
    foundedYear: 1980,
    headquarters: "London / Brussels / Munich",
    tier: "free",
    isVerified: true,
    jurisdictions: ["EU", "UK"],
    serviceTypes: ["EU AI Act Counsel", "GDPR Intersection", "Product Liability", "Regulatory Advice"],
    regulationSlugs: ["eu-ai-act", "gdpr", "eu-product-liability-directive"],
    industries: ["Technology", "Financial Services", "Healthcare", "Manufacturing"],
  },
  {
    slug: "wiley-ai-law",
    name: "Wiley Rein — AI & Tech",
    category: "legal",
    tagline: "US AI regulatory compliance, government contracting, and policy advocacy.",
    description:
      "Wiley Rein's AI and Technology practice advises US companies on AI regulatory compliance, government contracting requirements, and policy advocacy. Their team monitors US federal agency AI guidance and state-level AI legislation to keep clients ahead of compliance obligations.",
    websiteUrl: "https://wiley.law",
    headquarters: "Washington, DC",
    tier: "free",
    isVerified: false,
    jurisdictions: ["US"],
    serviceTypes: ["US AI Regulatory", "Government Contracting", "Policy Advocacy", "State AI Laws"],
    regulationSlugs: ["colorado-ai-act", "nyc-ll-144", "california-ab-2013", "federal-ai-guidance"],
    industries: ["Government Contracting", "Technology", "Healthcare", "Financial Services"],
  },
  {
    slug: "venable-ai",
    name: "Venable LLP — AI Group",
    category: "legal",
    tagline: "AI regulatory risk assessment, contract review, and enforcement defense.",
    description:
      "Venable LLP's AI group provides AI regulatory risk assessment, contract review, and enforcement defense for technology companies and their enterprise customers. Their team advises on FTC AI-related enforcement risk and prepares clients for state-level AI law obligations.",
    websiteUrl: "https://venable.com",
    headquarters: "Washington, DC / New York",
    tier: "free",
    isVerified: false,
    jurisdictions: ["US"],
    serviceTypes: ["Risk Assessment", "Contract Review", "FTC Defense", "State AI Law Compliance"],
    regulationSlugs: ["ftc-guidelines", "colorado-ai-act", "nyc-ll-144", "california-ai-laws"],
    industries: ["Technology", "Retail", "Financial Services", "Healthcare"],
  },
  {
    slug: "vanta-ai",
    name: "Vanta — AI Compliance",
    category: "compliance-software",
    tagline: "Automated AI compliance evidence collection and audit readiness.",
    description:
      "Vanta's AI compliance module extends their automated compliance platform to cover AI-specific frameworks including ISO 42001 and emerging AI regulations. The platform automates evidence collection, monitors AI system controls, and generates audit-ready reports.",
    websiteUrl: "https://vanta.com",
    headquarters: "San Francisco, CA",
    tier: "free",
    isVerified: false,
    jurisdictions: ["US", "EU"],
    serviceTypes: ["Compliance Automation", "Audit Readiness", "SOC 2", "ISO 42001"],
    regulationSlugs: ["iso-42001", "nist-ai-rmf", "eu-ai-act"],
    industries: ["Technology", "SaaS", "Financial Services", "Healthcare"],
  },
  {
    slug: "ai-governance-professional",
    name: "AI Governance Professional (AIGP)",
    category: "training",
    tagline: "The leading certification program for AI governance practitioners worldwide.",
    description:
      "The IAPP's AI Governance Professional (AIGP) credential is the leading certification program for AI governance practitioners. It covers global AI regulations, ethics frameworks, governance program design, and practical compliance skills. Holders are recognized across industries as qualified AI governance professionals.",
    websiteUrl: "https://iapp.org/certify/aigp/",
    foundedYear: 2023,
    headquarters: "Portsmouth, NH (IAPP)",
    tier: "free",
    isVerified: true,
    jurisdictions: ["US", "EU", "Global"],
    serviceTypes: ["AI Governance Certification", "Training", "Professional Development"],
    regulationSlugs: ["eu-ai-act", "nist-ai-rmf", "iso-42001", "oecd-ai-principles"],
    industries: ["Legal", "Compliance", "Technology", "Financial Services", "Healthcare"],
  },
  {
    slug: "isaca-ai-audit",
    name: "ISACA — AI Audit Training",
    category: "training",
    tagline: "AI auditing frameworks and certification for IT audit and risk professionals.",
    description:
      "ISACA offers AI auditing frameworks, training programs, and certifications for IT audit and risk professionals. Their courses cover AI risk assessment methodologies, audit program design, and how to apply COBIT and NIST frameworks to AI system governance.",
    websiteUrl: "https://isaca.org",
    headquarters: "Schaumburg, IL",
    tier: "free",
    isVerified: true,
    jurisdictions: ["US", "EU", "Global"],
    serviceTypes: ["AI Audit Training", "Risk Management Certification", "IT Governance"],
    regulationSlugs: ["nist-ai-rmf", "iso-42001", "cobit"],
    industries: ["Audit", "IT Governance", "Financial Services", "Government"],
  },
];

// ── Main seed function ─────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Seeding database...\n");

  // 1. Upsert categories
  console.log("Seeding provider categories...");
  for (const cat of CATEGORIES) {
    await db
      .insert(providerCategories)
      .values(cat)
      .onConflictDoUpdate({
        target: providerCategories.slug,
        set: {
          label: cat.label,
          icon: cat.icon,
          description: cat.description,
          longDescription: cat.longDescription,
          regulations: cat.regulations,
        },
      });
    console.log(`  ✓ ${cat.label}`);
  }

  // 2. Upsert providers and their relations
  console.log("\nSeeding providers...");
  for (const p of PROVIDERS) {
    // Upsert provider
    const [inserted] = await db
      .insert(providers)
      .values({
        slug: p.slug,
        name: p.name,
        category: p.category,
        tagline: p.tagline,
        description: p.description,
        websiteUrl: p.websiteUrl,
        foundedYear: p.foundedYear,
        headquarters: p.headquarters,
        employeeCountRange: p.employeeCountRange,
        jurisdictions: p.jurisdictions,
        tier: p.tier,
        isVerified: p.isVerified,
      })
      .onConflictDoUpdate({
        target: providers.slug,
        set: {
          name: p.name,
          category: p.category,
          tagline: p.tagline,
          description: p.description,
          websiteUrl: p.websiteUrl ?? null,
          foundedYear: p.foundedYear ?? null,
          headquarters: p.headquarters ?? null,
          employeeCountRange: p.employeeCountRange ?? null,
          jurisdictions: p.jurisdictions,
          tier: p.tier,
          isVerified: p.isVerified,
        },
      })
      .returning({ id: providers.id });

    const providerId = inserted.id;

    // Clear and re-insert services
    await db.delete(providerServices).where(eq(providerServices.providerId, providerId));
    if (p.serviceTypes.length > 0) {
      await db.insert(providerServices).values(
        p.serviceTypes.map((serviceType) => ({ providerId, serviceType }))
      );
    }

    // Clear and re-insert regulations
    await db.delete(providerRegulations).where(eq(providerRegulations.providerId, providerId));
    if (p.regulationSlugs.length > 0) {
      await db.insert(providerRegulations).values(
        p.regulationSlugs.map((regulationSlug) => ({ providerId, regulationSlug }))
      );
    }

    // Clear and re-insert industries
    await db.delete(providerIndustries).where(eq(providerIndustries.providerId, providerId));
    if (p.industries.length > 0) {
      await db.insert(providerIndustries).values(
        p.industries.map((industry) => ({ providerId, industry }))
      );
    }

    console.log(`  ✓ ${p.name}`);
  }

  console.log("\n✅ Seed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
