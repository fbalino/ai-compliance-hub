import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  body: string;
  relatedRegulations?: Array<{ slug: string; name: string }>;
}

const POSTS: Record<string, BlogPost> = {
  "colorado-ai-act-2026-deadline": {
    slug: "colorado-ai-act-2026-deadline",
    title: "Colorado AI Act Takes Effect June 30, 2026 — What You Need to Do Now",
    excerpt:
      "With months until the Colorado AI Act's effective date, here's a practical compliance checklist for businesses using high-risk AI systems in Colorado.",
    category: "Compliance Guides",
    date: "2026-04-10",
    readTime: "8 min read",
    tags: ["Colorado AI Act", "Deadline", "Action Required"],
    relatedRegulations: [
      { slug: "colorado-ai-act", name: "Colorado AI Act" },
      { slug: "eu-ai-act", name: "EU AI Act" },
    ],
    body: `
Colorado SB 24-205 — the Colorado Artificial Intelligence Act — takes effect on **June 30, 2026**. If your business uses high-risk AI systems that make consequential decisions about Colorado consumers, you have a compliance obligation.

## Who Does This Affect?

The Colorado AI Act applies to **deployers** of high-risk AI systems that make or assist in making consequential decisions about Colorado residents in these categories:

- **Employment**: Hiring, promotion, termination, compensation
- **Credit**: Lending, financing, or lease decisions
- **Education**: Admissions, financial aid, academic evaluations
- **Healthcare**: Diagnosis, treatment recommendations, medication
- **Housing**: Applications or pricing
- **Insurance**: Applications, pricing, or claims
- **Legal Services**: Legal representation or referrals

A "high-risk AI system" is one that makes, or is a substantial factor in making, a consequential decision.

## What You Must Do

### 1. Conduct an Impact Assessment

Before deploying any high-risk AI system, you must complete an **impact assessment** that documents:

- The intended purpose and reasonably foreseeable uses
- Benefits of the system
- Known and reasonably foreseeable risks of algorithmic discrimination
- How the system was evaluated for discrimination
- Transparency and explainability measures
- How human oversight is implemented
- How training data was collected and used

Impact assessments must be updated annually and when there are material changes to the system.

### 2. Implement a Risk Management Program

You need a program to manage the risk of algorithmic discrimination, including:

- Policies and procedures for high-risk AI governance
- Vendor/developer due diligence processes
- Monitoring for discriminatory outcomes in production
- Employee training on AI use policies

### 3. Notify Consumers

When a high-risk AI system is used to make a consequential decision, you must:

- Notify the consumer that AI was used
- Provide a plain-language explanation of how the AI contributed to the decision
- Offer a way for consumers to opt out of the AI system
- If the decision is adverse, explain what factors led to it

### 4. Annual Reports

Deployers must submit an annual report to the Colorado AG summarizing:
- High-risk AI systems deployed
- Impact assessments conducted
- Discrimination risks identified and mitigated

## What's NOT Required

- You don't need to use a specific AI framework or obtain certification
- Small businesses may qualify for scaled-down obligations
- AI systems used solely for internal operations (not making consumer-facing consequential decisions) are not covered

## Immediate Action Checklist

☐ Inventory all AI systems that make consequential decisions affecting Colorado residents
☐ Classify which are "high-risk" under the law's categories
☐ Assign ownership for each high-risk system
☐ Begin impact assessments for each covered system
☐ Engage legal counsel familiar with Colorado AI Act
☐ Review contracts with AI vendors — ensure they provide needed documentation
☐ Draft consumer notification language
☐ Design opt-out mechanism

## Resources

- [Full text of Colorado SB 24-205](https://leg.colorado.gov/bills/sb24-205)
- [Colorado AI Act compliance guide](/regulations/colorado-ai-act)
- [Find an AI governance consultant](/directory/categories/governance-consulting)
- [Free compliance checker — does this law apply to you?](/checker)
    `,
  },
  "eu-ai-act-gpai-obligations": {
    slug: "eu-ai-act-gpai-obligations",
    title: "EU AI Act GPAI Rules: What Foundation Model Developers Must Do by August 2025",
    excerpt:
      "The general-purpose AI (GPAI) model provisions of the EU AI Act are now in effect. Here's what developers and deployers of foundation models need to know.",
    category: "Regulation Analysis",
    date: "2026-04-05",
    readTime: "11 min read",
    tags: ["EU AI Act", "GPAI", "Foundation Models"],
    relatedRegulations: [{ slug: "eu-ai-act", name: "EU AI Act" }],
    body: `
The EU AI Act's provisions for **general-purpose AI (GPAI) models** took effect in August 2025. If you develop, fine-tune, or deploy foundation models / large language models in the EU, here's what you're obligated to do.

## What Is a GPAI Model Under the EU AI Act?

A GPAI model is an AI model trained on large amounts of data, designed for **general competence**, and capable of being used in a wide range of downstream tasks. This includes:

- Large language models (GPT, Claude, Llama, Gemini, etc.)
- Multimodal foundation models
- Code generation models
- Diffusion models for images/video

If you train or fine-tune such a model and make it available in the EU (including through an API), you are a **GPAI model provider** subject to these rules.

## Obligations for All GPAI Providers

### 1. Technical Documentation

You must prepare and maintain technical documentation covering:

- Architecture, training approach, and objectives
- Computational resources used (training compute in FLOPs)
- Training data types, sources, and filtering
- Model evaluation results, including on standardized benchmarks
- Known limitations and risks

### 2. Copyright Compliance Summary

Provide a summary of your training data that is sufficiently detailed for copyright right holders to understand whether their content was included.

### 3. AI-Generated Content Marking

If your model produces synthetic content (text, images, audio, video), you must implement machine-readable watermarking or similar technology so that AI-generated content can be detected.

### 4. Information to Downstream Providers

If you provide your model to other businesses that integrate it into their products, you must give them enough information to comply with their own obligations under the Act.

## Additional Obligations for Systemic-Risk GPAI Models

Models trained using more than **10^25 FLOPs** (or classified by the Commission as systemic risk) face additional obligations:

- **Adversarial testing / red teaming** — before and after major updates
- **Incident reporting** — report serious incidents to the European AI Office within 30 days
- **Cybersecurity measures** — protect model weights and training infrastructure
- **Energy reporting** — report energy consumption during training and inference

As of 2025, models likely in this category include GPT-4 class models and above. The EU AI Office will publish guidance on classification.

## Obligations for GPAI Deployers

If you deploy someone else's GPAI model in a product:

- Ensure your vendor has provided required documentation
- Maintain records of which GPAI models your product uses
- Implement AI-disclosure requirements for users (if your product generates synthetic content)
- Register as a deployer if your application is high-risk under the Act

## Timeline

| Date | Milestone |
|---|---|
| August 2024 | EU AI Act enters into force |
| February 2025 | Prohibited AI practices enforceable |
| August 2025 | GPAI model rules enforceable |
| August 2026 | High-risk AI system rules enforceable |

## Resources

- [Full EU AI Act compliance guide](/regulations/eu-ai-act)
- [Find EU AI Act legal counsel](/directory/categories/legal)
- [Free compliance checker](/checker)
    `,
  },
  "nyc-ll-144-enforcement-update": {
    slug: "nyc-ll-144-enforcement-update",
    title: "NYC LL 144 Enforcement: First Fines Issued — What Happened and What It Means",
    excerpt:
      "New York City has begun enforcing Local Law 144. We break down the first enforcement actions and what employers need to fix immediately.",
    category: "Enforcement Updates",
    date: "2026-03-28",
    readTime: "6 min read",
    tags: ["NYC LL 144", "Enforcement", "Employers"],
    relatedRegulations: [{ slug: "nyc-local-law-144", name: "NYC Local Law 144" }],
    body: `
New York City's Department of Consumer and Worker Protection (DCWP) has begun enforcement of Local Law 144, issuing the first fines to employers who failed to conduct required bias audits of their AI hiring tools.

## What the Enforcement Actions Covered

The initial enforcement actions targeted employers who:

1. **Used AI hiring tools without conducting a bias audit** — The law requires an annual third-party bias audit of any automated employment decision tool (AEDT) used for NYC-based hiring or promotion decisions.

2. **Failed to post bias audit results** — Results must be publicly available on the employer's website or in the job posting, before the AEDT is used.

3. **Did not provide required candidate notices** — Employers must notify candidates that an AEDT is being used in their application process, along with what it evaluates.

## What the Fines Were

NYC LL 144 provides for fines of up to **$1,500 per violation per day** for willful violations. Initial fines were in the range of $500–$1,500 per violation, with penalties accumulating for each day the violation continued.

## The Three Common Mistakes

### Mistake 1: Assuming the vendor's compliance covers you

Many employers believed that because their ATS or recruiting software vendor had conducted a bias audit, they were covered. They are not. **The deployer — the employer — is responsible for compliance**, not the vendor. You need a separate bias audit of the AEDT as it is used in your hiring process.

### Mistake 2: Not knowing what counts as an AEDT

An AEDT is any computational process that uses machine learning, statistical modeling, data analytics, or AI to assist or replace discretionary decision-making in employment. This includes:
- Resume screening AI
- Video interview analysis tools
- Candidate scoring and ranking systems
- Skills assessment AI

### Mistake 3: Buried or inaccessible audit results

The law requires audit results to be "publicly available" — not buried in a PDF on an obscure careers page sub-page. Results must be easy to find and include the required data fields.

## What You Need to Fix Now

1. **Identify all AEDTs** you use for NYC candidates or employees
2. **Commission a bias audit** from a qualified third-party auditor
3. **Post audit results** prominently on your careers page or in job postings
4. **Add candidate notices** to all job applications for NYC roles
5. **Set a recurring reminder** — audits must be repeated annually

## Resources

- [Full NYC LL 144 compliance guide](/regulations/nyc-local-law-144)
- [Find a bias audit firm](/directory/categories/bias-audit)
- [Check if LL 144 applies to you](/checker)
    `,
  },
  "bias-audit-guide": {
    slug: "bias-audit-guide",
    title: "How to Commission a Bias Audit: A Step-by-Step Guide for Employers",
    excerpt:
      "If you use AI tools for hiring in NYC or Colorado, you need a bias audit. Here's exactly how to find an auditor, what the process looks like, and how to post results.",
    category: "Compliance Guides",
    date: "2026-03-20",
    readTime: "14 min read",
    tags: ["Bias Audit", "NYC LL 144", "Hiring AI"],
    relatedRegulations: [
      { slug: "nyc-local-law-144", name: "NYC Local Law 144" },
      { slug: "colorado-ai-act", name: "Colorado AI Act" },
    ],
    body: `
If you use AI tools in your hiring process and have employees or applicants in New York City, you need a bias audit. Here's the complete guide.

## Step 1: Identify What Needs Auditing

Make a list of every AI tool used in your hiring or promotion process:

- Resume screening software
- Video interview analysis tools (Hirevue, Spark Hire with AI features, etc.)
- Candidate scoring or ranking tools
- Skills assessment platforms with AI scoring
- ATS systems that use AI to filter applications

**For NYC LL 144**, any of these that make or assist in making decisions about NYC-based roles must be audited.

## Step 2: Find a Qualified Auditor

The law requires a **third-party bias auditor** — an independent entity that conducts a bias audit and is not your software vendor.

What to look for in an auditor:
- Experience auditing employment AI specifically
- Knowledge of NYC LL 144 requirements
- Ability to produce the required audit summary format
- Statistical methodology experience (disparate impact analysis)

[Browse bias auditors in our directory →](/directory/categories/bias-audit)

## Step 3: Provide the Auditor with Required Data

Your auditor will need:

- Historical decision data from your AEDT (12 months recommended)
- Demographic data on candidates (or methodology for collecting it)
- Documentation of what the AEDT evaluates and outputs
- Your current use policies for the tool

**Data collection challenge**: Many employers don't have voluntary demographic data from candidates. Auditors have developed methodologies to handle this, including using geographic or surname-based demographic estimation (Bayesian Improved Surname Geocoding / BISG) when direct data isn't available.

## Step 4: Review the Audit Results

The audit will produce:

- **Selection rates** by sex, race/ethnicity, and intersectional categories
- **Impact ratios** comparing selection rates across groups
- Whether any group falls below the 80% threshold (4/5ths rule)
- Summary of methodology used

Review results carefully. If disparate impact is found, you'll need to decide whether to continue using the tool, modify it, or stop using it.

## Step 5: Post the Required Summary

Once you have the audit, you must post a summary that includes:

- **Distribution date** of the bias audit
- **Summary of results** including selection rates and impact ratios by category
- **Data used** in the audit

Post it:
- On your careers page (publicly visible, not behind a login)
- In any job postings where the AEDT is used

The summary must be posted **before** you use the AEDT.

## Step 6: Add Candidate Notices

Add a notice to all job postings or application materials stating:

- That an automated employment decision tool is used
- What the AEDT evaluates (e.g., video interview analysis, resume screening)
- That candidates may request an alternative selection process (if offered)

## Step 7: Set Your Annual Audit Calendar

Bias audits must be repeated **at least annually** and whenever there is a material change to the AEDT.

Set a calendar reminder 60 days before your audit anniversary to:
1. Contact your auditor to begin the new audit
2. Collect updated decision data
3. Update your public posting with new results before the anniversary date

## Resources

- [NYC LL 144 full compliance guide](/regulations/nyc-local-law-144)
- [Find bias auditors in our directory](/directory/categories/bias-audit)
- [Check compliance checker — does LL 144 apply to you?](/checker)
    `,
  },
  "texas-ai-regulation-2026": {
    slug: "texas-ai-regulation-2026",
    title: "Texas AI Bill HB 1709 Update: What It Would Mean for US Businesses",
    excerpt:
      "Texas is moving toward its own AI regulation modeled on Colorado. Here's what the bill proposes, where it stands, and how to prepare.",
    category: "Industry News",
    date: "2026-03-14",
    readTime: "7 min read",
    tags: ["Texas", "State Laws", "Upcoming"],
    relatedRegulations: [{ slug: "colorado-ai-act", name: "Colorado AI Act" }],
    body: `
Texas HB 1709, the Texas Responsible AI Governance Act, has cleared committee and is under active consideration in the Texas Legislature. Here's what it would require and how to prepare.

## What HB 1709 Proposes

HB 1709 is closely modeled on the Colorado AI Act (SB 24-205). It would require deployers of high-risk AI systems to:

1. **Implement risk management programs** for AI systems making consequential decisions
2. **Conduct impact assessments** before deploying high-risk AI
3. **Notify consumers** when AI is used in consequential decisions
4. **Offer opt-out mechanisms** from AI decision-making

### Key Differences from Colorado

- **Enforcement**: Texas proposes AG enforcement with civil penalties, similar to DTPA framework
- **SMB exemption**: Smaller exemption thresholds for small businesses
- **Annual reporting**: Requires reporting to the Texas AG rather than a state agency

## Who Would Be Covered

High-risk AI use cases covered by HB 1709:

- Employment decisions (hiring, promotion, termination)
- Credit and lending
- Education admissions and evaluation
- Healthcare (diagnosis, treatment)
- Housing (rental and purchase)
- Insurance

## Current Status

The bill passed the House Technology & Innovation Committee and is scheduled for a full House vote. Observers expect it to pass the House. The Senate version (SB 2378) has been assigned to committee.

If signed into law, implementation would likely begin 18–24 months after signing.

## How to Prepare Now

Even if the bill doesn't pass this session, Texas is likely to pass AI legislation in the near term. Companies operating in Texas should:

1. **Run your Colorado AI Act compliance program now** — Texas is substantially similar, so compliance with Colorado largely prepares you for Texas
2. **Inventory AI systems** used in Texas operations that make consequential decisions
3. **Engage Texas legal counsel** familiar with state AI regulatory trends
4. **Monitor the bill** — sign up for our newsletter for updates

## The Bigger Picture: US AI Law Fragmentation

With Colorado already enacted and Texas, Virginia, Connecticut, and Illinois considering similar bills, US businesses face a patchwork of state AI laws. The pattern is clear: Colorado was first, and others are following the same framework.

The practical implication: **build your AI compliance program around the Colorado model now**, and you'll be largely ready for what's coming from other states.

## Resources

- [Colorado AI Act compliance guide](/regulations/colorado-ai-act)
- [Free compliance checker — does Colorado AI Act apply to you now?](/checker)
- [Find AI governance consultants](/directory/categories/governance-consulting)
    `,
  },
  "ai-governance-program-guide": {
    slug: "ai-governance-program-guide",
    title: "Building an AI Governance Program: The Practical Guide for Mid-Size Companies",
    excerpt:
      "You don't need a team of 10 to build an effective AI governance program. This guide covers the essentials: policy, inventory, risk assessment, and documentation.",
    category: "Compliance Guides",
    date: "2026-03-07",
    readTime: "16 min read",
    tags: ["AI Governance", "NIST AI RMF", "Policy"],
    relatedRegulations: [
      { slug: "eu-ai-act", name: "EU AI Act" },
      { slug: "colorado-ai-act", name: "Colorado AI Act" },
    ],
    body: `
Most AI governance guides are written for Fortune 500 companies with dedicated AI ethics teams. This one is for mid-size companies (50–1,000 employees) that use AI in their products or operations and need a real program — not just a policy document that nobody reads.

## What an AI Governance Program Is (and Isn't)

An AI governance program is the set of policies, processes, and controls that ensure your organization uses AI responsibly and in compliance with applicable laws.

It is **not**:
- A one-time audit
- A policy document filed and forgotten
- Something only your legal team handles

It **is**:
- An ongoing operational function
- Cross-functional (involves legal, engineering, HR, and business teams)
- Proportional to your AI risk exposure

## Step 1: Build Your AI Inventory

You cannot govern what you haven't catalogued. Start by inventorying every AI system your organization uses or deploys:

**For each system, document:**
- What it does (description)
- Who uses it (internal / external / both)
- What decisions it influences or makes
- Who is affected (employees / customers / applicants)
- What data it uses
- Who owns it (internal team or vendor)
- Which regulations apply to it

Use a spreadsheet to start. Upgrade to a governance platform when the inventory gets complex.

## Step 2: Classify Your AI Systems by Risk

Group your AI systems into risk tiers:

| Tier | Criteria | Examples |
|---|---|---|
| High | Makes consequential decisions about individuals | Hiring AI, credit scoring, healthcare diagnostics |
| Medium | Influences decisions but has human review | Customer segmentation, content recommendation |
| Low | Internal tools, limited impact | Internal search, document summarization |

High-risk systems need impact assessments, monitoring, and audit trails. Low-risk systems need basic documentation.

## Step 3: Assign Ownership

Every high and medium risk AI system needs an **owner** — a person responsible for that system's governance compliance. This is usually the product manager or business unit head using the system.

AI owners are responsible for:
- Keeping documentation current
- Ensuring periodic reviews happen
- Escalating when the system changes materially

## Step 4: Write Your AI Policy

Your AI policy should be 2–5 pages, not 50. Cover:

1. **Scope** — what systems and decisions are covered
2. **Prohibited uses** — what AI cannot be used for (e.g., facial recognition without consent)
3. **Approval process** — how new AI tools get evaluated before adoption
4. **Vendor due diligence** — what you require from AI vendors
5. **Consumer-facing AI** — disclosure and opt-out requirements
6. **Incident response** — how to handle an AI-related failure or harm
7. **Review cadence** — how often the policy and AI inventory are reviewed

## Step 5: Conduct Impact Assessments for High-Risk Systems

For each high-risk AI system, document:

- **Purpose**: What problem does this solve?
- **Inputs**: What data does it use?
- **Outputs**: What does it produce?
- **Decision**: How does its output affect people?
- **Bias risk**: How was it tested for discriminatory outcomes?
- **Human oversight**: What human review exists before the decision is final?
- **Mitigation**: What controls reduce discrimination risk?
- **Opt-out**: Can affected individuals opt out?

Update impact assessments annually or when the system changes.

## Step 6: Set Up Monitoring

High-risk AI systems need ongoing monitoring for:

- **Drift**: Is the model's accuracy declining?
- **Disparate impact**: Are outcomes skewed across demographic groups?
- **Errors**: Are there anomalous outputs?

Set up quarterly reviews with metrics dashboards for each high-risk system.

## Step 7: Train Your Team

Train these groups differently:

- **All staff**: AI literacy basics, what AI is used for, how to report concerns
- **AI users**: How to use AI tools responsibly, what the outputs mean and their limits
- **AI owners**: Governance obligations, how to conduct reviews, escalation paths
- **Leadership**: Regulatory risk landscape, board-level governance

EU AI Act requires AI literacy training for relevant staff — so document it.

## What This Costs

A basic program for a mid-size company should cost:

- Staff time: 0.25 FTE of a compliance/legal person ongoing + quarterly reviews from AI owners
- Technology: $0–$500/month (spreadsheet to start, governance SaaS if you have 10+ AI systems)
- External: $5K–$15K if you engage a consultant to set up the program initially

## Resources

- [Find AI governance consultants](/directory/categories/governance-consulting)
- [Find compliance software platforms](/directory/categories/compliance-software)
- [EU AI Act compliance guide](/regulations/eu-ai-act)
- [Colorado AI Act compliance guide](/regulations/colorado-ai-act)
    `,
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Naive markdown-to-HTML: handles headings, bold, lists, links, tables, hr, code
function renderMarkdown(text: string): string {
  const lines = text.trim().split("\n");
  const html: string[] = [];
  let inList = false;
  let inTable = false;
  let tableHeader = false;

  function closeList() {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  }

  function closeTable() {
    if (inTable) {
      html.push("</tbody></table>");
      inTable = false;
      tableHeader = false;
    }
  }

  function processInline(s: string): string {
    // Bold
    s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Links [text](url)
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-700 hover:text-brand-900 underline">$1</a>');
    // Code
    s = s.replace(/`([^`]+)`/g, '<code class="bg-neutral-100 rounded px-1 text-sm font-mono">$1</code>');
    return s;
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Horizontal rule
    if (trimmed === "---") {
      closeList();
      closeTable();
      html.push('<hr class="my-6 border-neutral-200" />');
      continue;
    }

    // Headings
    if (trimmed.startsWith("## ")) {
      closeList();
      closeTable();
      html.push(`<h2 class="text-xl font-bold text-neutral-900 mt-8 mb-3">${processInline(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith("### ")) {
      closeList();
      closeTable();
      html.push(`<h3 class="text-lg font-semibold text-neutral-900 mt-6 mb-2">${processInline(trimmed.slice(4))}</h3>`);
      continue;
    }

    // Table row
    if (trimmed.startsWith("|")) {
      const cells = trimmed.split("|").filter(Boolean).map((c) => c.trim());
      if (cells.every((c) => /^[-:]+$/.test(c))) {
        // Separator row — skip
        tableHeader = false;
        continue;
      }
      if (!inTable) {
        inTable = true;
        tableHeader = true;
        html.push('<div class="overflow-x-auto my-6"><table class="w-full text-sm border-collapse">');
        html.push("<thead>");
      }
      if (tableHeader) {
        html.push(
          "<tr>" +
            cells.map((c) => `<th class="border border-neutral-200 bg-neutral-50 px-3 py-2 text-left font-semibold text-neutral-900">${processInline(c)}</th>`).join("") +
            "</tr>"
        );
        html.push("</thead><tbody>");
        tableHeader = false;
      } else {
        html.push(
          "<tr>" +
            cells.map((c) => `<td class="border border-neutral-200 px-3 py-2 text-neutral-700">${processInline(c)}</td>`).join("") +
            "</tr>"
        );
      }
      continue;
    }

    closeTable();

    // Checkbox list items
    if (trimmed.startsWith("☐ ") || trimmed.startsWith("☑ ")) {
      if (!inList) {
        html.push('<ul class="my-4 space-y-2">');
        inList = true;
      }
      const checked = trimmed.startsWith("☑");
      html.push(
        `<li class="flex items-start gap-2 text-neutral-700"><span class="mt-1 text-${checked ? "green" : "neutral"}-500">${checked ? "☑" : "☐"}</span><span>${processInline(trimmed.slice(2))}</span></li>`
      );
      continue;
    }

    // Bullet list items
    if (trimmed.startsWith("- ")) {
      if (!inList) {
        html.push('<ul class="my-4 space-y-2 list-disc list-inside">');
        inList = true;
      }
      html.push(`<li class="text-neutral-700">${processInline(trimmed.slice(2))}</li>`);
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      if (!inList) {
        html.push('<ol class="my-4 space-y-2 list-decimal list-inside">');
        inList = true;
      }
      html.push(`<li class="text-neutral-700">${processInline(trimmed.replace(/^\d+\.\s/, ""))}</li>`);
      continue;
    }

    closeList();

    // Empty line
    if (!trimmed) continue;

    // Paragraph
    html.push(`<p class="text-neutral-700 leading-relaxed my-3">${processInline(trimmed)}</p>`);
  }

  closeList();
  closeTable();

  return html.join("\n");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.category },
            ]}
          />
          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex rounded-full bg-neutral-100 px-3 py-0.5 text-xs font-medium text-neutral-600">
                {post.category}
              </span>
              <span className="text-xs text-neutral-500">{post.readTime}</span>
              <time dateTime={post.date} className="text-xs text-neutral-500">
                {formatDate(post.date)}
              </time>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
              {post.title}
            </h1>
            <p className="mt-3 text-neutral-600 leading-relaxed">{post.excerpt}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div
          className="prose-compliance"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
        />

        {/* Related regulations */}
        {post.relatedRegulations && post.relatedRegulations.length > 0 && (
          <div className="mt-10 rounded-xl bg-brand-50 border border-brand-100 p-5">
            <h3 className="font-bold text-brand-900 mb-3">Related Regulations</h3>
            <div className="flex flex-wrap gap-3">
              {post.relatedRegulations.map((reg) => (
                <Link
                  key={reg.slug}
                  href={`/regulations/${reg.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-300 bg-white px-3 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-50 transition-colors"
                >
                  {reg.name} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full bg-neutral-100 px-3 py-0.5 text-xs font-medium text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-5 text-center">
          <p className="font-semibold text-neutral-900 mb-1">
            Not sure which AI laws apply to your business?
          </p>
          <p className="text-sm text-neutral-600 mb-4">
            Use our free compliance checker — answer 4 questions, get instant results.
          </p>
          <Link
            href="/checker"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors"
          >
            Check My Compliance
          </Link>
        </div>

        {/* Back to blog */}
        <div className="mt-6">
          <Link
            href="/blog"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ← Back to blog
          </Link>
        </div>

        <p className="mt-8 text-xs text-neutral-500 leading-relaxed">
          Not legal advice. This article is for informational purposes only. Always consult a qualified attorney for compliance decisions.
        </p>
      </div>
    </>
  );
}
