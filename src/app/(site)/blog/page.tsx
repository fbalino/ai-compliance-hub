import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "fs";
import { join } from "path";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { NewsletterForm } from "@/components/NewsletterForm";
import { BlogFilterClient } from "@/components/blog/BlogFilterClient";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "AI Compliance Blog — Regulation Updates & Compliance Guides",
  description:
    "Stay current on AI regulation: enforcement updates, compliance how-to guides, analysis of new laws, and expert commentary. Weekly updates.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

const CATEGORIES = [
  "Enforcement Updates",
  "Compliance Guides",
  "Regulation Analysis",
  "Industry News",
];

const POSTS = [
  {
    slug: "hiring-ai-compliance-2026-starter-kit",
    title: "Hiring AI Compliance in 2026: The Complete Starter Kit",
    excerpt: "Which roles to hire first, what skills actually matter, realistic salary ranges, and interview questions that separate genuine AI compliance expertise from resume inflation.",
    category: "Compliance Guides",
    date: "2026-04-18",
    readTime: "14 min read",
    tags: ["Hiring", "AI Compliance Team", "2026"],
  },
  {
    slug: "colorado-ai-act-60-day-checklist",
    title: "Colorado AI Act 60-Day Compliance Checklist (SB 24-205)",
    excerpt: "75 days until enforcement. Use this step-by-step checklist to get your business compliant with the Colorado AI Act before the June 30, 2026 deadline.",
    category: "Compliance Guides",
    date: "2026-04-16",
    readTime: "10 min read",
    tags: ["Colorado AI Act", "Checklist", "June 2026"],
  },
  {
    slug: "how-to-prepare-for-colorado-ai-act-june-2026",
    title: "How to Prepare for the Colorado AI Act Before June 30, 2026",
    excerpt: "A practical 5-step preparation guide for Colorado deployers: what triggers compliance, impact assessments, consumer notification, and vendor due diligence.",
    category: "Compliance Guides",
    date: "2026-04-14",
    readTime: "8 min read",
    tags: ["Colorado AI Act", "Preparation", "June 2026"],
  },
  {
    slug: "virginia-hb-2094-what-businesses-need-to-know",
    title: "Virginia HB 2094: What Businesses Need to Know Before July 2026",
    excerpt: "Virginia\u2019s new AI law takes effect July 1, 2026. Here\u2019s who it covers, how it compares to Colorado, and what you need to do now.",
    category: "Regulation Analysis",
    date: "2026-04-12",
    readTime: "6 min read",
    tags: ["Virginia HB 2094", "State Laws", "July 2026"],
  },
  {
    slug: "request-for-quote-ai-bias-audit-what-to-expect",
    title: "What to Expect When You Request an AI Bias Audit",
    excerpt: "A practical walkthrough of the RFQ process for an AI bias audit: what auditors assess, typical timelines and costs, and the right questions to ask.",
    category: "Compliance Guides",
    date: "2026-04-09",
    readTime: "7 min read",
    tags: ["Bias Audit", "RFQ", "Vendors"],
  },
  {
    slug: "nist-ai-rmf-explainer-for-compliance-teams",
    title: "NIST AI RMF Explained: A Compliance Team\u2019s Field Guide",
    excerpt: "What the NIST AI Risk Management Framework is, how its four core functions work, and how it maps to the EU AI Act and Colorado requirements.",
    category: "Compliance Guides",
    date: "2026-04-07",
    readTime: "9 min read",
    tags: ["NIST AI RMF", "Frameworks", "Risk Management"],
  },
  {
    slug: "colorado-ai-act-2026-deadline",
    title: "Colorado AI Act Takes Effect June 30, 2026 \u2014 What You Need to Do Now",
    excerpt: "With six months until the Colorado AI Act\u2019s effective date, here\u2019s a practical compliance checklist for businesses using high-risk AI systems in Colorado.",
    category: "Compliance Guides",
    date: "2026-04-10",
    readTime: "8 min read",
    tags: ["Colorado AI Act", "Deadline", "Action Required"],
  },
  {
    slug: "eu-ai-act-gpai-obligations",
    title: "EU AI Act GPAI Rules: What Foundation Model Developers Must Do Now",
    excerpt: "The general-purpose AI (GPAI) model provisions of the EU AI Act are now in effect. Here\u2019s what developers and deployers of foundation models need to know.",
    category: "Regulation Analysis",
    date: "2026-04-05",
    readTime: "11 min read",
    tags: ["EU AI Act", "GPAI", "Foundation Models"],
  },
  {
    slug: "nyc-ll-144-enforcement-update",
    title: "NYC LL 144 Enforcement: First Fines Issued \u2014 What Happened and What It Means",
    excerpt: "New York City has begun enforcing Local Law 144. We break down the first enforcement actions, the amounts fined, and what employers need to fix immediately.",
    category: "Enforcement Updates",
    date: "2026-03-28",
    readTime: "6 min read",
    tags: ["NYC LL 144", "Enforcement", "Employers"],
  },
  {
    slug: "bias-audit-guide",
    title: "How to Commission a Bias Audit: A Step-by-Step Guide for Employers",
    excerpt: "If you use AI tools for hiring in New York City or Colorado, you need a bias audit. Here\u2019s exactly how to find an auditor, what the process looks like, and how to post results.",
    category: "Compliance Guides",
    date: "2026-03-20",
    readTime: "14 min read",
    tags: ["Bias Audit", "NYC LL 144", "Hiring AI"],
  },
  {
    slug: "texas-ai-regulation-2026",
    title: "Texas AI Bill HB 1709 Update: What It Would Mean for US Businesses",
    excerpt: "Texas is moving toward its own AI regulation modeled on Colorado. Here\u2019s what the bill proposes, where it stands, and how to prepare if you operate in Texas.",
    category: "Industry News",
    date: "2026-03-14",
    readTime: "7 min read",
    tags: ["Texas", "State Laws", "Upcoming"],
  },
  {
    slug: "ai-governance-program-guide",
    title: "Building an AI Governance Program: The Practical Guide for Mid-Size Companies",
    excerpt: "You don\u2019t need a team of 10 to build an effective AI governance program. This guide covers the essentials: policy, inventory, risk assessment, and documentation.",
    category: "Compliance Guides",
    date: "2026-03-07",
    readTime: "16 min read",
    tags: ["AI Governance", "NIST AI RMF", "Policy"],
  },
  {
    slug: "ccpa-admt-ai-teams",
    title: "CCPA ADMT Final Rules: What AI Teams Need to Know",
    excerpt: "California\u2019s Automated Decision-Making Technology rules are now in force. Here\u2019s what they require, who they cover, and what your AI team must do to comply.",
    category: "Regulation Analysis",
    date: "2026-03-10",
    readTime: "8 min read",
    tags: ["CCPA", "ADMT", "California", "Automated Decisions"],
  },
  {
    slug: "ccpa-admt-vs-nyc-ll-144",
    title: "CCPA ADMT vs. NYC LL 144: Two Models for Automated Decision Regulation",
    excerpt: "California and New York City both regulate automated decisions, but with fundamentally different approaches. Side-by-side comparison for employers operating in both.",
    category: "Comparison",
    date: "2026-03-14",
    readTime: "7 min read",
    tags: ["CCPA ADMT", "NYC LL 144", "Automated Decisions", "Comparison"],
  },
  {
    slug: "ccpa-admt-human-in-the-loop",
    title: "The Human-in-the-Loop Test Under California\u2019s ADMT Rules",
    excerpt: "California\u2019s ADMT rules require meaningful human oversight for certain automated decisions. Here\u2019s what \u201cmeaningful\u201d actually means and how to build a compliant review process.",
    category: "Compliance Guides",
    date: "2026-03-18",
    readTime: "6 min read",
    tags: ["CCPA ADMT", "Human Oversight", "California"],
  },
  {
    slug: "nist-ai-rmf-colorado-safe-harbor",
    title: "Colorado AI Act Safe Harbor: What NIST AI RMF Alignment Actually Means",
    excerpt: "Colorado offers a safe harbor to businesses that align with NIST AI RMF. Here\u2019s what that requires in practice and how to document it for enforcement.",
    category: "Compliance Guides",
    date: "2026-03-01",
    readTime: "7 min read",
    tags: ["Colorado AI Act", "NIST AI RMF", "Safe Harbor"],
  },
  {
    slug: "nist-ai-rmf-four-functions-explained",
    title: "The Four Core Functions of NIST AI RMF, Walked Step-by-Step",
    excerpt: "GOVERN, MAP, MEASURE, MANAGE \u2014 what each function actually requires in practice and how to implement them in your AI governance program.",
    category: "Compliance Guides",
    date: "2026-02-21",
    readTime: "10 min read",
    tags: ["NIST AI RMF", "Governance", "Risk Management"],
  },
  {
    slug: "nist-ai-rmf-vs-iso-42001",
    title: "NIST AI RMF vs. ISO 42001: Which Framework Fits Your Organization?",
    excerpt: "Both are legitimate AI governance frameworks \u2014 but they serve different purposes. Here\u2019s how to choose, and when you might need both.",
    category: "Compliance Guides",
    date: "2026-02-10",
    readTime: "7 min read",
    tags: ["NIST AI RMF", "ISO 42001", "Frameworks", "Governance"],
  },
  {
    slug: "iso-42001-certification-guide",
    title: "ISO 42001 Certification: What to Expect from the Audit",
    excerpt: "ISO 42001 is the first certifiable AI management system standard. Here\u2019s what the audit process looks like, what auditors check, and how to prepare.",
    category: "Compliance Guides",
    date: "2026-02-15",
    readTime: "8 min read",
    tags: ["ISO 42001", "Certification", "AI Governance", "Audit"],
  },
  {
    slug: "iso-42001-eu-ai-act-alignment",
    title: "How ISO 42001 Aligns with the EU AI Act",
    excerpt: "ISO 42001 is a candidate harmonized standard for the EU AI Act. Here\u2019s how they map to each other and what certification means for EU conformity.",
    category: "Regulation Analysis",
    date: "2026-02-18",
    readTime: "6 min read",
    tags: ["ISO 42001", "EU AI Act", "Harmonized Standard"],
  },
  {
    slug: "eu-ai-act-gpai-code-of-practice",
    title: "The EU AI Act GPAI Code of Practice Finally Drops",
    excerpt: "The EU AI Office published the GPAI Code of Practice. Here\u2019s what it requires for Tier 1 and Tier 2 GPAI providers and what foundation model developers must do.",
    category: "Regulation Analysis",
    date: "2026-02-28",
    readTime: "9 min read",
    tags: ["EU AI Act", "GPAI", "Foundation Models"],
  },
  {
    slug: "eu-ai-act-high-risk-list-annotated",
    title: "The EU AI Act High-Risk AI System List, Annotated",
    excerpt: "Every Annex III high-risk AI category explained with practical examples of what\u2019s in scope and what\u2019s not \u2014 for compliance teams who need to classify their systems.",
    category: "Regulation Analysis",
    date: "2026-02-14",
    readTime: "11 min read",
    tags: ["EU AI Act", "High-Risk AI", "Annex III"],
  },
  {
    slug: "eu-ai-act-vs-uk-ai-safety-bill",
    title: "EU AI Act vs. UK AI Safety Bill: Where the Rules Overlap",
    excerpt: "The EU went comprehensive. The UK went principles-based. Here\u2019s how the two approaches compare for companies operating in both markets.",
    category: "Comparison",
    date: "2026-02-07",
    readTime: "8 min read",
    tags: ["EU AI Act", "UK AI", "Regulatory Comparison"],
  },
  {
    slug: "gdpr-vs-eu-ai-act",
    title: "GDPR vs. EU AI Act: Where the Rules Overlap",
    excerpt: "Both apply to most AI systems in the EU. Here\u2019s how they interact, where they duplicate obligations, and how to satisfy both simultaneously.",
    category: "Regulation Analysis",
    date: "2026-01-19",
    readTime: "9 min read",
    tags: ["GDPR", "EU AI Act", "Comparison", "Europe"],
  },
  {
    slug: "clearview-ai-gdpr-fines",
    title: "Clearview AI GDPR Fines Across Europe: What the Enforcement Pattern Tells Us",
    excerpt: "Clearview AI faced enforcement actions totaling hundreds of millions in fines. Here\u2019s what the cases reveal about how regulators treat AI and biometric data.",
    category: "Enforcement Updates",
    date: "2026-01-08",
    readTime: "6 min read",
    tags: ["GDPR", "Clearview AI", "Biometrics", "Enforcement"],
  },
  {
    slug: "colorado-ai-act-impact-assessment",
    title: "Impact Assessment Under Colorado SB 24-205: A Step-by-Step Guide",
    excerpt: "Colorado\u2019s AI Act requires impact assessments before deploying high-risk AI. Here\u2019s exactly what to cover and how to document it for enforcement.",
    category: "Compliance Guides",
    date: "2026-03-25",
    readTime: "10 min read",
    tags: ["Colorado AI Act", "Impact Assessment", "SB 24-205"],
  },
  {
    slug: "colorado-ai-readiness-window",
    title: "Colorado AI Act: The Readiness Window Opens",
    excerpt: "Enforcement begins June 30, 2026. Here\u2019s where organizations stand, what readiness actually means, and what to do this month.",
    category: "Industry News",
    date: "2026-01-15",
    readTime: "5 min read",
    tags: ["Colorado AI Act", "Enforcement", "June 2026"],
  },
  {
    slug: "nyc-ll-144-bias-audit-walkthrough",
    title: "The NYC Local Law 144 Bias Audit, Walked Step-by-Step",
    excerpt: "From finding an auditor to publishing results \u2014 here\u2019s exactly how the NYC LL 144 annual bias audit process works for employers using AI in hiring.",
    category: "Compliance Guides",
    date: "2026-02-01",
    readTime: "8 min read",
    tags: ["NYC LL 144", "Bias Audit", "Hiring AI"],
  },
  {
    slug: "california-ab-2013-training-data",
    title: "California AB 2013: Training Data Disclosure Requirements",
    excerpt: "California\u2019s AB 2013 requires GenAI providers to post training data documentation. Here\u2019s who it covers, what must be disclosed, and what to do now.",
    category: "Regulation Analysis",
    date: "2026-01-22",
    readTime: "6 min read",
    tags: ["California", "AB 2013", "Training Data", "Generative AI"],
  },
  {
    slug: "illinois-aivira-employer-guide",
    title: "AIVIRA Obligations for Employers: The Practical Guide",
    excerpt: "Illinois\u2019 AI Video Interview Act has been in force since 2020 and class action risk has grown. Here\u2019s exactly what employers must do before using AI to evaluate video interviews.",
    category: "Compliance Guides",
    date: "2026-01-28",
    readTime: "7 min read",
    tags: ["Illinois", "AIVIRA", "Video Interviews", "Hiring AI"],
  },
  {
    slug: "illinois-bipa-class-actions-2025",
    title: "BIPA Class Actions in 2025: What Employers Need to Know",
    excerpt: "Illinois BIPA litigation generated billions in settlements. Here\u2019s the state of play after the Cothron ruling and what employers must do to limit exposure.",
    category: "Enforcement Updates",
    date: "2026-01-10",
    readTime: "7 min read",
    tags: ["Illinois", "BIPA", "Class Actions", "Biometrics"],
  },
  {
    slug: "biometric-privacy-law-patchwork",
    title: "The Biometric Privacy Law Patchwork, Mapped",
    excerpt: "Illinois BIPA is the most litigated biometric law, but it\u2019s not alone. Here\u2019s every state biometric privacy law \u2014 requirements, enforcement, and compliance risk.",
    category: "Regulation Analysis",
    date: "2026-01-05",
    readTime: "8 min read",
    tags: ["Biometrics", "BIPA", "State Laws", "Privacy"],
  },
  {
    slug: "texas-ag-meta-biometric-settlement",
    title: "Texas AG vs. Meta: The $1.4B Biometric Settlement Explained",
    excerpt: "The largest privacy settlement in US history. Here\u2019s what Texas proved, what Meta did, and what it means for companies using facial recognition.",
    category: "Enforcement Updates",
    date: "2026-01-12",
    readTime: "7 min read",
    tags: ["Texas CUBI", "Meta", "Biometrics", "Enforcement"],
  },
  {
    slug: "bipa-vs-cubi-comparison",
    title: "BIPA vs. CUBI: Two Biometric Laws, Two Very Different Enforcement Models",
    excerpt: "Illinois and Texas both restrict biometric data but use completely different enforcement models. Side-by-side comparison for companies operating in both states.",
    category: "Comparison",
    date: "2026-01-14",
    readTime: "6 min read",
    tags: ["BIPA", "Texas CUBI", "Biometrics", "Comparison"],
  },
];

export default function BlogPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  const postsWithImages = POSTS.map((post) => ({
    ...post,
    hasImage: existsSync(join(process.cwd(), "public", "images", "blog", `${post.slug}.jpg`)),
  }));

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="page-banner">
        <div className="container" style={{ maxWidth: 1000, padding: 0 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h1 className="h1">AI Compliance Blog</h1>
              <p className="lede" style={{ marginTop: 8 }}>
                Enforcement updates, compliance how-to guides, and analysis of new AI laws. Updated weekly.
              </p>
            </div>
            <Link href="/newsletter" className="btn btn-ghost" style={{ flexShrink: 0 }}>
              <svg style={{ width: 16, height: 16, marginRight: 6 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Subscribe for updates
            </Link>
          </div>

        </div>
      </div>

      <div className="container" style={{ maxWidth: 1000, padding: "0 var(--s-7) var(--s-8)" }}>
        <BlogFilterClient categories={CATEGORIES} posts={postsWithImages} />
        {/* Newsletter CTA */}
        <div className="card" style={{ marginTop: 48, textAlign: "center", padding: "var(--s-6)", background: "var(--paper-inverse)", color: "var(--ink-inverse)" }}>
          <h2 className="h3" style={{ color: "var(--ink-inverse)" }}>Never miss a regulation update</h2>
          <p className="small" style={{ maxWidth: 420, margin: "8px auto 0", color: "var(--ink-inverse-soft)" }}>
            Weekly digest of new AI laws, enforcement actions, and compliance deadlines. Free. No spam.
          </p>
          <NewsletterForm source="blog" className="mt-5 max-w-sm mx-auto" />
        </div>
      </div>
    </>
  );
}
