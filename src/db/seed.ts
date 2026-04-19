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
  regulations,
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
    icon: "microscope",
    description:
      "Firms that conduct algorithmic bias and fairness audits required by NYC LL 144, Colorado AI Act, and other laws.",
    longDescription:
      "Bias auditors assess AI systems for discriminatory outcomes across protected classes. NYC Local Law 144 requires annual third-party bias audits for hiring tools. The Colorado AI Act and other laws have similar requirements. These firms conduct statistical testing, disparate impact analysis, and produce the audit summaries required by law.",
    regulations: ["NYC LL 144", "Colorado AI Act", "EU AI Act"],
  },
  {
    slug: "governance-consulting",
    label: "Governance Consulting",
    icon: "building2",
    description:
      "Consultants who build AI governance programs, risk management frameworks, and compliance policies.",
    longDescription:
      "AI governance consultants help organizations build the policies, procedures, and oversight structures needed to comply with AI regulations. They align internal practices with NIST AI RMF, ISO 42001, and regulatory requirements. Engagements typically include risk register development, policy drafting, and board-level governance program design.",
    regulations: ["EU AI Act", "NIST AI RMF", "ISO 42001"],
  },
  {
    slug: "legal",
    label: "Legal & Compliance",
    icon: "scale",
    description:
      "Law firms and legal consultants specializing in AI regulatory compliance and risk assessment.",
    longDescription:
      "AI law specialists advise on regulatory interpretation, compliance strategy, and risk mitigation. They draft AI use policies, review vendor contracts for compliance risk, provide privileged legal assessments, and represent clients in enforcement actions. Essential for navigating ambiguous requirements and multi-jurisdictional obligations.",
    regulations: ["EU AI Act", "Colorado AI Act", "State Laws"],
  },
  {
    slug: "compliance-software",
    label: "Compliance Software",
    icon: "monitor",
    description:
      "SaaS platforms for AI risk assessment, documentation, policy management, and audit trails.",
    longDescription:
      "AI compliance platforms provide the tooling for continuous compliance monitoring, documentation generation, and audit trail management. Features typically include model risk cards, impact assessment workflows, policy libraries, and evidence collection for regulatory audits. Designed for organizations deploying multiple AI systems at scale.",
    regulations: ["EU AI Act", "ISO 42001", "NIST AI RMF"],
  },
  {
    slug: "training",
    label: "Training & Education",
    icon: "bookopen",
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

  // ── Bias Audit additions ────────────────────────────────────────────────────
  {
    slug: "arthur-ai",
    name: "Arthur AI",
    category: "bias-audit",
    tagline: "Enterprise AI observability, bias monitoring, and fairness testing platform.",
    description:
      "Arthur AI provides enterprise-grade AI observability and model monitoring, including real-time bias detection, drift monitoring, and fairness testing. Their platform supports production ML models with continuous fairness metrics and explainability reports required for regulatory audits.",
    websiteUrl: "https://arthur.ai",
    foundedYear: 2018,
    headquarters: "New York, NY",
    employeeCountRange: "50–200",
    tier: "premium",
    isVerified: true,
    jurisdictions: ["US", "EU"],
    serviceTypes: ["Bias Monitoring", "Model Observability", "Fairness Testing", "Explainability"],
    regulationSlugs: ["nyc-ll-144", "colorado-ai-act", "eu-ai-act", "nist-ai-rmf"],
    industries: ["Financial Services", "Healthcare", "HR Technology", "Insurance"],
  },
  {
    slug: "weights-biases",
    name: "Weights & Biases",
    category: "bias-audit",
    tagline: "MLOps platform with built-in model evaluation, bias tracking, and governance tools.",
    description:
      "Weights & Biases (W&B) is a leading MLOps platform used by enterprise data science teams to track experiments, evaluate model quality, and maintain audit trails. Their model evaluation and bias tracking capabilities support compliance with AI governance frameworks and regulatory requirements for documentation and monitoring.",
    websiteUrl: "https://wandb.ai",
    foundedYear: 2018,
    headquarters: "San Francisco, CA",
    employeeCountRange: "201–500",
    tier: "free",
    isVerified: false,
    jurisdictions: ["US", "EU", "Global"],
    serviceTypes: ["MLOps", "Model Evaluation", "Bias Tracking", "Experiment Tracking"],
    regulationSlugs: ["eu-ai-act", "nist-ai-rmf", "iso-42001"],
    industries: ["Technology", "Healthcare", "Financial Services", "Research"],
  },
  {
    slug: "monitaur",
    name: "Monitaur",
    category: "bias-audit",
    tagline: "Machine learning governance and model audit trail platform for regulated industries.",
    description:
      "Monitaur specializes in machine learning governance and model audit trails for regulated industries. Their platform creates immutable records of model decisions, enabling organizations to demonstrate compliance during regulatory examinations. Particularly strong in insurance and financial services AI governance.",
    websiteUrl: "https://monitaur.ai",
    foundedYear: 2019,
    headquarters: "Minneapolis, MN",
    employeeCountRange: "10–49",
    tier: "premium",
    isVerified: true,
    jurisdictions: ["US"],
    serviceTypes: ["ML Governance", "Model Audit Trails", "Regulatory Examination Readiness"],
    regulationSlugs: ["nist-ai-rmf", "sr-11-7", "colorado-ai-act"],
    industries: ["Insurance", "Financial Services", "Healthcare"],
  },

  // ── Governance Consulting additions ────────────────────────────────────────
  {
    slug: "deloitte-ai-trust",
    name: "Deloitte — AI Trust",
    category: "governance-consulting",
    tagline: "Enterprise AI governance, ethics, and regulatory compliance advisory from a Big Four firm.",
    description:
      "Deloitte's AI Trust practice provides enterprise-scale AI governance, ethics, and regulatory compliance advisory services. They help global organizations build AI risk management frameworks aligned with the EU AI Act, NIST AI RMF, and ISO 42001, including board-level governance program design and third-party AI vendor risk assessments.",
    websiteUrl: "https://deloitte.com",
    headquarters: "Global (US HQ: New York, NY)",
    employeeCountRange: "500+",
    tier: "enterprise",
    isVerified: true,
    jurisdictions: ["US", "EU", "UK", "Global"],
    serviceTypes: ["AI Governance Strategy", "Risk Management", "Regulatory Compliance", "Board Advisory"],
    regulationSlugs: ["eu-ai-act", "nist-ai-rmf", "iso-42001", "colorado-ai-act"],
    industries: ["Financial Services", "Healthcare", "Government", "Manufacturing", "Technology"],
  },
  {
    slug: "bcg-x-ai",
    name: "BCG X — AI Ethics & Governance",
    category: "governance-consulting",
    tagline: "Responsible AI strategy and governance program design from BCG's tech build and design unit.",
    description:
      "BCG X, the tech build and design unit of Boston Consulting Group, offers responsible AI strategy and governance program design services. Their team helps organizations develop ethical AI frameworks, conduct algorithmic impact assessments, and build the operating models required to govern AI at enterprise scale.",
    websiteUrl: "https://bcg.com/x",
    headquarters: "Global (US HQ: Boston, MA)",
    employeeCountRange: "500+",
    tier: "enterprise",
    isVerified: true,
    jurisdictions: ["US", "EU", "UK", "Global"],
    serviceTypes: ["Responsible AI Strategy", "AI Ethics Framework", "Impact Assessments", "Operating Model Design"],
    regulationSlugs: ["eu-ai-act", "nist-ai-rmf", "iso-42001", "oecd-ai-principles"],
    industries: ["Financial Services", "Healthcare", "Retail", "Government", "Technology"],
  },
  {
    slug: "kpmg-ai-risk",
    name: "KPMG — AI Risk Advisory",
    category: "governance-consulting",
    tagline: "AI risk management, governance assurance, and regulatory readiness from a Big Four firm.",
    description:
      "KPMG's AI Risk Advisory practice helps organizations assess and manage risks from AI deployment, including regulatory compliance, model risk, and third-party AI vendor risks. Their team combines risk management expertise with deep regulatory knowledge to help clients meet EU AI Act, NIST, and sector-specific AI requirements.",
    websiteUrl: "https://kpmg.com",
    headquarters: "Global (US HQ: New York, NY)",
    employeeCountRange: "500+",
    tier: "enterprise",
    isVerified: true,
    jurisdictions: ["US", "EU", "UK", "Global"],
    serviceTypes: ["AI Risk Management", "Governance Assurance", "Regulatory Readiness", "Vendor Risk"],
    regulationSlugs: ["eu-ai-act", "nist-ai-rmf", "iso-42001", "sr-11-7"],
    industries: ["Financial Services", "Healthcare", "Government", "Insurance", "Technology"],
  },

  // ── Legal additions ─────────────────────────────────────────────────────────
  {
    slug: "covington-burling-ai",
    name: "Covington & Burling — AI",
    category: "legal",
    tagline: "Leading AI regulatory counsel, policy strategy, and cross-border compliance advice.",
    description:
      "Covington & Burling is a leading law firm for AI regulatory matters, with a dedicated AI practice advising technology companies and enterprises on US and international AI laws. Their team provides regulatory interpretation, policy strategy, transactional AI contract advice, and defense in AI-related enforcement actions.",
    websiteUrl: "https://cov.com",
    foundedYear: 1919,
    headquarters: "Washington, DC / San Francisco / Brussels",
    tier: "premium",
    isVerified: true,
    jurisdictions: ["US", "EU", "UK", "Global"],
    serviceTypes: ["AI Regulatory Counsel", "Policy Strategy", "Contract Advice", "Enforcement Defense"],
    regulationSlugs: ["eu-ai-act", "colorado-ai-act", "california-ai-laws", "federal-ai-guidance"],
    industries: ["Technology", "Healthcare", "Financial Services", "Media"],
  },
  {
    slug: "perkins-coie-ai",
    name: "Perkins Coie — AI Practice",
    category: "legal",
    tagline: "Comprehensive AI legal services from privacy, employment, to product liability.",
    description:
      "Perkins Coie's AI practice provides comprehensive legal services covering the full lifecycle of AI deployment — from privacy and data governance to employment law, product liability, and regulatory compliance. They advise technology companies and enterprises deploying AI on multi-jurisdictional risk management.",
    websiteUrl: "https://perkinscoie.com",
    headquarters: "Seattle, WA / San Francisco / Washington, DC",
    tier: "free",
    isVerified: false,
    jurisdictions: ["US"],
    serviceTypes: ["AI Privacy Law", "Employment AI Law", "Product Liability", "Regulatory Compliance"],
    regulationSlugs: ["eu-ai-act", "colorado-ai-act", "nyc-ll-144", "california-ai-laws", "gdpr"],
    industries: ["Technology", "Healthcare", "Financial Services", "Retail"],
  },
  {
    slug: "sidley-austin-ai",
    name: "Sidley Austin — AI & Data",
    category: "legal",
    tagline: "Global AI regulatory compliance, data governance, and enforcement defense.",
    description:
      "Sidley Austin's AI and Data practice advises global enterprises on AI regulatory compliance, data governance, and enforcement defense. Their team has deep expertise in financial services AI regulation, healthcare AI requirements, and cross-border AI compliance strategy for multinational organizations.",
    websiteUrl: "https://sidley.com",
    headquarters: "Chicago, IL / New York / Washington, DC / London",
    tier: "free",
    isVerified: false,
    jurisdictions: ["US", "EU", "UK", "Global"],
    serviceTypes: ["AI Regulatory Compliance", "Data Governance", "Financial Services AI Law", "Enforcement Defense"],
    regulationSlugs: ["eu-ai-act", "colorado-ai-act", "sr-11-7", "gdpr", "california-ai-laws"],
    industries: ["Financial Services", "Healthcare", "Technology", "Insurance"],
  },

  // ── Compliance Software additions ───────────────────────────────────────────
  {
    slug: "onetrust-ai",
    name: "OneTrust — AI Governance",
    category: "compliance-software",
    tagline: "AI governance and privacy management platform for enterprise trust and compliance.",
    description:
      "OneTrust's AI Governance module extends their leading privacy and compliance platform to cover AI-specific risks. The platform provides AI system inventory management, risk assessments, policy enforcement, and documentation workflows aligned with EU AI Act, ISO 42001, and NIST AI RMF requirements.",
    websiteUrl: "https://onetrust.com",
    foundedYear: 2016,
    headquarters: "Atlanta, GA",
    employeeCountRange: "500+",
    tier: "premium",
    isVerified: true,
    jurisdictions: ["US", "EU", "UK", "Global"],
    serviceTypes: ["AI Governance Platform", "Risk Assessment Automation", "Policy Management", "AI Inventory"],
    regulationSlugs: ["eu-ai-act", "iso-42001", "nist-ai-rmf", "gdpr", "colorado-ai-act"],
    industries: ["Technology", "Financial Services", "Healthcare", "Retail", "Enterprise"],
  },
  {
    slug: "drata-ai",
    name: "Drata — AI Compliance",
    category: "compliance-software",
    tagline: "Continuous compliance automation platform with AI governance framework support.",
    description:
      "Drata is a continuous compliance automation platform that extends to AI governance frameworks including ISO 42001 and NIST AI RMF. The platform automates evidence collection, monitors controls in real time, and generates audit-ready reports, significantly reducing the manual burden of AI compliance programs.",
    websiteUrl: "https://drata.com",
    foundedYear: 2020,
    headquarters: "San Diego, CA",
    employeeCountRange: "201–500",
    tier: "free",
    isVerified: false,
    jurisdictions: ["US", "EU"],
    serviceTypes: ["Compliance Automation", "ISO 42001", "SOC 2", "Continuous Monitoring"],
    regulationSlugs: ["iso-42001", "nist-ai-rmf", "eu-ai-act"],
    industries: ["Technology", "SaaS", "Financial Services", "Healthcare"],
  },
  {
    slug: "logicgate-ai",
    name: "LogicGate — AI Risk",
    category: "compliance-software",
    tagline: "GRC platform with configurable AI risk management and compliance workflows.",
    description:
      "LogicGate's Risk Cloud platform provides configurable GRC workflows for AI risk management and compliance. Organizations can build custom AI risk assessment workflows, track model inventories, document AI system controls, and generate evidence for regulatory audits — all within a no-code workflow platform.",
    websiteUrl: "https://logicgate.com",
    foundedYear: 2015,
    headquarters: "Chicago, IL",
    employeeCountRange: "201–500",
    tier: "premium",
    isVerified: false,
    jurisdictions: ["US", "EU"],
    serviceTypes: ["GRC Platform", "AI Risk Workflows", "Model Inventory", "Compliance Documentation"],
    regulationSlugs: ["nist-ai-rmf", "iso-42001", "eu-ai-act", "sr-11-7"],
    industries: ["Financial Services", "Insurance", "Healthcare", "Technology"],
  },

  // ── Training additions ──────────────────────────────────────────────────────
  {
    slug: "ai-for-good",
    name: "AI for Good Foundation",
    category: "training",
    tagline: "Responsible AI training and capacity-building programs for organizations worldwide.",
    description:
      "The AI for Good Foundation offers responsible AI training and capacity-building programs for organizations deploying AI for social good and commercial use. Their programs cover AI ethics principles, bias identification, responsible deployment practices, and governance frameworks for technical and non-technical audiences.",
    websiteUrl: "https://aiforgood.itu.int",
    headquarters: "Geneva, Switzerland",
    tier: "free",
    isVerified: false,
    jurisdictions: ["EU", "Global"],
    serviceTypes: ["Responsible AI Training", "Capacity Building", "Ethics Education", "Governance Workshops"],
    regulationSlugs: ["eu-ai-act", "oecd-ai-principles", "un-ai-governance"],
    industries: ["Government", "Non-profit", "Technology", "Healthcare", "Education"],
  },
  {
    slug: "ieee-ai-ethics-training",
    name: "IEEE — AI Ethics Education",
    category: "training",
    tagline: "IEEE standards-aligned AI ethics training and certification for engineers and technologists.",
    description:
      "IEEE offers AI ethics training, certification programs, and educational resources aligned with their Ethically Aligned Design standards. Programs target engineers, data scientists, and product teams, covering AI safety, transparency, accountability, and the technical implementation of ethical AI practices.",
    websiteUrl: "https://ieee.org",
    headquarters: "Piscataway, NJ",
    tier: "free",
    isVerified: true,
    jurisdictions: ["US", "EU", "Global"],
    serviceTypes: ["AI Ethics Certification", "Engineering Training", "Technical Standards Education"],
    regulationSlugs: ["eu-ai-act", "nist-ai-rmf", "ieee-ethically-aligned-design"],
    industries: ["Technology", "Engineering", "Research", "Manufacturing"],
  },
  {
    slug: "mit-sloan-ai-compliance",
    name: "MIT Sloan — AI Strategy & Governance",
    category: "training",
    tagline: "Executive education on AI strategy, governance, and regulatory compliance from MIT.",
    description:
      "MIT Sloan Executive Education offers programs on AI strategy, governance, and regulatory compliance for senior leaders and executives. Courses cover building AI governance programs, managing AI risk, understanding global AI regulation, and leading responsible AI transformation within organizations.",
    websiteUrl: "https://executive.mit.edu",
    headquarters: "Cambridge, MA",
    tier: "premium",
    isVerified: true,
    jurisdictions: ["US", "Global"],
    serviceTypes: ["Executive Education", "AI Strategy", "Leadership Training", "Governance Programs"],
    regulationSlugs: ["eu-ai-act", "nist-ai-rmf", "oecd-ai-principles"],
    industries: ["Financial Services", "Healthcare", "Technology", "Government", "Manufacturing"],
  },
  {
    slug: "coursera-ai-governance",
    name: "Coursera — AI Governance Courses",
    category: "training",
    tagline: "Online AI governance, ethics, and compliance courses from leading universities.",
    description:
      "Coursera offers a curated catalog of AI governance, ethics, and compliance courses from leading universities including Stanford, DeepLearning.AI, and University of Michigan. Courses range from AI ethics foundations to regulatory compliance deep-dives, providing scalable training for entire compliance and engineering teams.",
    websiteUrl: "https://coursera.org",
    headquarters: "Mountain View, CA",
    tier: "free",
    isVerified: false,
    jurisdictions: ["US", "EU", "Global"],
    serviceTypes: ["Online Courses", "AI Ethics", "Compliance Training", "Team Learning"],
    regulationSlugs: ["eu-ai-act", "nist-ai-rmf", "oecd-ai-principles"],
    industries: ["Technology", "Healthcare", "Financial Services", "Education", "Enterprise"],
  },
];

// ── Regulation seed data ──────────────────────────────────────────────────────

const REGULATIONS = [
  {
    slug: "eu-ai-act",
    name: "EU AI Act",
    jurisdiction: "European Union",
    status: "enforced",
    effectiveDate: "2024-08-01",
    enforcementDate: "2026-08-01",
    maxPenalty: "€35 million or 7% of global turnover",
    summary:
      "The EU's comprehensive risk-based framework governing AI systems, with strict requirements for high-risk applications and prohibitions on unacceptable-risk AI.",
  },
  {
    slug: "nyc-local-law-144",
    name: "NYC Local Law 144",
    jurisdiction: "US · New York City",
    status: "enforced",
    effectiveDate: "2023-07-05",
    enforcementDate: "2023-07-05",
    maxPenalty: "$1,500 per violation per day",
    summary:
      "Requires employers using automated employment decision tools (AEDTs) for hiring or promotion decisions affecting NYC employees to conduct annual independent bias audits and publicly disclose results.",
  },
  {
    slug: "colorado-ai-act",
    name: "Colorado AI Act (SB 24-205)",
    jurisdiction: "US · Colorado",
    status: "enacted",
    effectiveDate: "2026-06-30",
    enforcementDate: "2026-06-30",
    maxPenalty: "$20,000 per violation",
    summary:
      "Requires deployers of high-risk AI systems to use reasonable care to protect consumers from known risks of algorithmic discrimination.",
  },
  {
    slug: "california-ab-2013",
    name: "California AB 2013",
    jurisdiction: "US · California",
    status: "enacted",
    effectiveDate: "2026-01-01",
    enforcementDate: "2026-01-01",
    maxPenalty: "Civil action for injunctive relief + actual damages",
    summary:
      "Requires developers of covered generative AI systems to publish training data transparency reports on their websites.",
  },
  {
    slug: "illinois-ai-video-interview-act",
    name: "Illinois AI Video Interview Act",
    jurisdiction: "US · Illinois",
    status: "enforced",
    effectiveDate: "2020-01-01",
    enforcementDate: "2020-01-01",
    maxPenalty: "Injunctive relief + actual damages",
    summary:
      "Requires consent and disclosure when AI is used to analyze video interviews for hiring decisions involving Illinois applicants.",
  },
  {
    slug: "texas-hb-1709",
    name: "Texas Responsible AI Governance Act (HB 1709)",
    jurisdiction: "US · Texas",
    status: "draft",
    effectiveDate: null,
    enforcementDate: null,
    maxPenalty: "DTPA civil penalties (up to $10,000 per violation)",
    summary:
      "Proposed Texas law establishing governance requirements for deployers of high-risk AI systems affecting consequential decisions.",
  },
  {
    slug: "virginia-hb-2094",
    name: "Virginia HB 2094",
    jurisdiction: "US · Virginia",
    status: "enacted",
    effectiveDate: "2026-07-01",
    enforcementDate: null,
    maxPenalty: "$7,500 per violation",
    summary:
      "Requires impact assessments, consumer notifications, and opt-out rights for automated decision systems affecting Virginia residents.",
  },
  {
    slug: "dora",
    name: "DORA — Digital Operational Resilience Act",
    jurisdiction: "European Union",
    status: "enforced",
    effectiveDate: "2023-01-16",
    enforcementDate: "2025-01-17",
    maxPenalty: "Up to 2% of total annual worldwide turnover",
    summary:
      "EU regulation establishing uniform requirements for digital operational resilience of financial entities, including ICT risk management and third-party oversight.",
  },
  {
    slug: "nis2-directive",
    name: "NIS2 Directive",
    jurisdiction: "European Union",
    status: "enforced",
    effectiveDate: "2023-01-16",
    enforcementDate: "2024-10-17",
    maxPenalty: "€10 million or 2% of global turnover (essential); €7 million or 1.4% (important)",
    summary:
      "EU directive strengthening cybersecurity obligations for essential and important entities across critical sectors, including risk management and incident reporting.",
  },
  {
    slug: "illinois-bipa",
    name: "Illinois Biometric Information Privacy Act",
    jurisdiction: "US · Illinois",
    status: "enforced",
    effectiveDate: "2008-10-03",
    enforcementDate: "2008-10-03",
    maxPenalty: "$5,000 per intentional/reckless violation",
    summary:
      "Illinois law regulating the collection, use, storage, and destruction of biometric identifiers and information, with a private right of action that has driven over $4 billion in class action settlements.",
  },
  {
    slug: "gdpr",
    name: "General Data Protection Regulation (GDPR)",
    jurisdiction: "European Union",
    status: "enforced",
    effectiveDate: "2018-05-25",
    enforcementDate: "2018-05-25",
    maxPenalty: "€20 million or 4% of global annual turnover",
    summary:
      "The EU's comprehensive data protection framework governing the processing of personal data, including biometric and AI-processed data, with extraterritorial reach and significant penalties.",
  },
  {
    slug: "texas-cubi",
    name: "Texas Capture or Use of Biometric Identifier Act",
    jurisdiction: "US · Texas",
    status: "enforced",
    effectiveDate: "2009-09-01",
    enforcementDate: "2009-09-01",
    maxPenalty: "$25,000 per violation (AG enforcement)",
    summary:
      "Texas law regulating the capture, use, storage, and destruction of biometric identifiers including retina scans, voiceprints, and face geometry records, enforced by the Texas Attorney General.",
  },
  {
    slug: "ccpa-admt",
    name: "CCPA Automated Decision-Making Technology Regulations",
    jurisdiction: "US · California",
    status: "enacted",
    effectiveDate: "2025-09-22",
    enforcementDate: "2027-04-01",
    maxPenalty: "$7,500 per violation (intentional or involving minors)",
    summary:
      "California's CCPA ADMT regulations give consumers the right to opt out of automated decision-making technology used for significant decisions — with mandatory pre-use notices, risk assessments, and appeal rights.",
  },
  {
    slug: "nist-ai-rmf",
    name: "NIST AI Risk Management Framework",
    jurisdiction: "US · Federal",
    status: "enforced",
    effectiveDate: "2023-01-26",
    enforcementDate: null,
    maxPenalty: "N/A — voluntary framework",
    summary:
      "NIST AI RMF 1.0 provides a voluntary, flexible approach for organizations to manage AI risks — widely referenced by US and international AI regulations as the baseline governance standard.",
  },
  {
    slug: "iso-42001",
    name: "ISO/IEC 42001",
    jurisdiction: "International",
    status: "enforced",
    effectiveDate: "2023-12-18",
    enforcementDate: null,
    maxPenalty: "N/A — voluntary standard; loss of certification for non-conformance",
    summary:
      "The world's first international standard for AI management systems, providing a certifiable framework for establishing, implementing, and improving AI governance programs.",
  },
];

// ── Main seed function ─────────────────────────────────────────────────────────

async function seed() {
  console.log("Seeding database...\n");

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
    console.log(`  + ${cat.label}`);
  }

  // 2. Upsert regulations
  console.log("\nSeeding regulations...");
  for (const reg of REGULATIONS) {
    await db
      .insert(regulations)
      .values({
        slug: reg.slug,
        name: reg.name,
        jurisdiction: reg.jurisdiction,
        status: reg.status,
        effectiveDate: reg.effectiveDate,
        enforcementDate: reg.enforcementDate,
        maxPenalty: reg.maxPenalty,
        summary: reg.summary,
      })
      .onConflictDoUpdate({
        target: regulations.slug,
        set: {
          name: reg.name,
          jurisdiction: reg.jurisdiction,
          status: reg.status,
          effectiveDate: reg.effectiveDate,
          enforcementDate: reg.enforcementDate,
          maxPenalty: reg.maxPenalty,
          summary: reg.summary,
        },
      });
    console.log(`  + ${reg.name}`);
  }

  // 3. Upsert providers and their relations
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

    console.log(`  + ${p.name}`);
  }

  console.log("\nSeed complete.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
