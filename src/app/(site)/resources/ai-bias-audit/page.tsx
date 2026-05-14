import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { SITE_URL } from "@/lib/brand";
import { regulationArticleSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "AI Bias Audit: Complete Guide, Methodology & Free Checklist 2026",
  description:
    "Learn how to conduct an AI bias audit: methodologies, legal requirements (NYC LL 144, CO AI Act, EU AI Act), and how to find qualified auditors.",
  alternates: { canonical: `${SITE_URL}/resources/ai-bias-audit` },
};

const CHECKLIST_SECTIONS = [
  {
    phase: "Phase 1",
    title: "Data Audit",
    items: [
      "Inventoried all training datasets and their sources",
      "Documented data collection methods and any known sampling biases",
      "Verified demographic representation across all protected categories (race, sex, age, disability, national origin)",
      "Checked for proxy variables that could encode protected characteristics",
      "Assessed data quality: completeness, accuracy, and recency by subgroup",
      "Documented data lineage and any preprocessing transformations",
      "Reviewed historical outcome data for evidence of prior discrimination",
    ],
  },
  {
    phase: "Phase 2",
    title: "Model Testing & Disparate Impact Analysis",
    items: [
      "Defined the primary outcome metric and success criteria",
      "Calculated selection rates for each protected group (four-fifths rule threshold: < 0.8)",
      "Ran statistical significance tests on outcome disparities by protected class",
      "Tested model performance metrics (accuracy, false positive rate, false negative rate) separately per group",
      "Applied counterfactual fairness testing: changed protected attributes, compared outcomes",
      "Stress-tested model with adversarial inputs targeting protected characteristics",
      "Documented all fairness metrics with numerical results and confidence intervals",
    ],
  },
  {
    phase: "Phase 3",
    title: "Documentation Review",
    items: [
      "Reviewed model cards, data sheets, and system documentation for completeness",
      "Verified that intended use cases and limitations are clearly documented",
      "Checked that known failure modes are disclosed to deployers",
      "Confirmed human oversight mechanisms are documented and operational",
      "Reviewed consumer disclosure language for accuracy and comprehensibility",
      "Verified vendor contracts include AI governance representations (if third-party system)",
      "Documented any gaps between actual system behavior and published specifications",
    ],
  },
  {
    phase: "Phase 4",
    title: "Remediation Recommendations",
    items: [
      "Prioritized disparities by magnitude, affected population size, and legal risk",
      "Evaluated resampling or reweighting of training data to correct imbalances",
      "Assessed algorithmic fairness interventions (pre-processing, in-processing, post-processing)",
      "Defined acceptable residual risk thresholds with business and legal sign-off",
      "Documented remediation timeline with responsible owners",
      "Planned re-audit schedule following any model retraining or significant update",
    ],
  },
  {
    phase: "Phase 5",
    title: "Ongoing Monitoring",
    items: [
      "Implemented production monitoring for demographic outcome distributions",
      "Set alert thresholds for statistically significant disparities in live outputs",
      "Scheduled periodic re-audits (minimum annual, or on significant model change)",
      "Established process for employees or consumers to report suspected bias",
      "Created incident response process for confirmed discrimination findings",
      "Documented monitoring methodology for regulatory record-keeping",
    ],
  },
];

const FAQ_ITEMS = [
  {
    question: "What is an AI bias audit?",
    answer:
      "An AI bias audit is a systematic evaluation of an AI system to identify whether it produces discriminatory outcomes across protected demographic groups such as race, sex, age, disability status, or national origin. The audit examines training data, model outputs, and real-world decision patterns using statistical tests including disparate impact analysis and counterfactual fairness testing. Audits are conducted by independent third parties and result in a written report with remediation recommendations.",
  },
  {
    question: "Is AI bias testing legally required?",
    answer:
      "Yes, in several jurisdictions. NYC Local Law 144 requires annual independent bias audits for automated employment decision tools used in New York City hiring and promotion decisions, with results publicly posted. The Colorado AI Act (effective June 30, 2026) requires deployers of high-risk AI systems to conduct algorithmic discrimination risk assessments. The EU AI Act mandates conformity assessments including bias testing for high-risk AI systems in employment, credit, education, healthcare, and law enforcement. Federal EEOC guidance also applies existing anti-discrimination law to AI hiring tools regardless of jurisdiction.",
  },
  {
    question: "How much does an AI bias audit cost?",
    answer:
      "AI bias audit costs range from $5,000 to $150,000+ depending on scope. A focused audit of a single hiring tool with known documentation typically costs $8,000–$25,000. A comprehensive audit of a complex model across multiple decision contexts, with limited documentation, can reach $50,000–$150,000. Ongoing monitoring contracts typically run $3,000–$15,000 per year. Factors that increase cost: limited training data access, undocumented systems, multiple protected classes, and large affected populations requiring statistical power.",
  },
];

const schema = regulationArticleSchema({
  headline: "AI Bias Audit: Complete Guide, Methodology & Free Checklist 2026",
  description:
    "Learn how to conduct an AI bias audit: methodologies, legal requirements (NYC LL 144, CO AI Act, EU AI Act), and how to find qualified auditors.",
  url: `${SITE_URL}/resources/ai-bias-audit`,
  datePublished: "2026-05-14",
  dateModified: "2026-05-14",
  faqs: FAQ_ITEMS,
});

export default function AIBiasAuditPage() {
  const totalItems = CHECKLIST_SECTIONS.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <>
      <script {...jsonLdScriptProps(schema)} />

      <div className="min-h-screen bg-white">
        {/* Print header */}
        <div className="print:block hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-8 py-3 text-sm text-gray-500">
          AI Bias Audit Checklist — regulome.io/resources/ai-bias-audit
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 print:py-6 print:px-0">
          {/* Breadcrumb */}
          <nav className="print:hidden mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">AI Bias Audit</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="inline-block text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
              Compliance Guide · Regulome.io · Updated May 2026
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              AI Bias Audit: Complete Guide, Methodology & Free Checklist 2026
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              Everything compliance officers and legal teams need to understand AI bias audits —
              what they are, which laws require them, how to conduct one, and how to find a
              qualified auditor.
            </p>
          </div>

          {/* Quick navigation */}
          <div className="print:hidden mb-10 p-5 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">On this page</p>
            <ol className="space-y-1.5 text-sm">
              <li><a href="#what-is" className="text-blue-600 hover:underline">1. What is an AI Bias Audit?</a></li>
              <li><a href="#legal-landscape" className="text-blue-600 hover:underline">2. Legal Landscape: Laws That Require Bias Audits</a></li>
              <li><a href="#when-you-need-one" className="text-blue-600 hover:underline">3. When You Need One</a></li>
              <li><a href="#methodology" className="text-blue-600 hover:underline">4. AI Bias Audit Methodology</a></li>
              <li><a href="#how-to-choose" className="text-blue-600 hover:underline">5. How to Choose an Auditor</a></li>
              <li><a href="#checklist" className="text-blue-600 hover:underline">6. Free AI Bias Audit Checklist ({totalItems} items)</a></li>
              <li><a href="#faq" className="text-blue-600 hover:underline">7. Frequently Asked Questions</a></li>
            </ol>
          </div>

          {/* ── Section 1: What is an AI Bias Audit ── */}
          <section id="what-is" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an AI Bias Audit?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              An <strong>AI bias audit</strong> is a structured, independent evaluation of an artificial
              intelligence system to determine whether its outputs produce disparate — and potentially
              discriminatory — outcomes across protected demographic groups. Those groups typically include
              race, sex, age, disability status, national origin, and in some jurisdictions sexual
              orientation or religion.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Unlike an internal quality review, a bias audit is conducted by a qualified third party with
              no commercial stake in the system's continued deployment. The auditor examines the AI system
              at three levels: the training data used to build the model, the statistical outputs of the
              model under controlled testing conditions, and — where accessible — real-world decision
              records to identify disparities that emerge after deployment.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The core analytical tool in most AI bias audits is <strong>disparate impact analysis</strong>,
              borrowed from employment discrimination law. Under the four-fifths rule codified in EEOC
              guidance, a selection rate for any protected group that falls below 80% of the highest group's
              rate signals potential adverse impact requiring explanation or remedy. Modern bias audits
              extend beyond this single metric to include false positive rate parity, calibration across
              groups, and counterfactual fairness — testing whether changing only a protected attribute
              (while holding all other factors constant) materially changes outcomes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Bias audits matter because AI systems can encode and amplify discrimination without any
              discriminatory intent. A résumé screening model trained on historical hiring data
              inherits whatever biases existed in past hiring decisions. A credit scoring algorithm that
              uses zip code as a feature may replicate the effects of redlining. Identifying and
              quantifying these disparities — and documenting steps taken to address them — is now both
              a legal obligation in multiple jurisdictions and a defensible risk management practice.
            </p>
          </section>

          {/* ── Section 2: Legal Landscape ── */}
          <section id="legal-landscape" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Landscape: Laws That Require Bias Audits</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              AI bias auditing has moved from a voluntary best practice to a legal requirement across
              several jurisdictions in 2025–2026. Here is the current compliance landscape.
            </p>

            <div className="space-y-6">
              <div className="p-5 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  NYC Local Law 144 — Automated Employment Decision Tools
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Effective January 1, 2023 and enforced since 2025,{" "}
                  <a
                    href="https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=4344524&GUID=B051915D-A9AC-451E-81F8-6E4B48E38EEE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    NYC Local Law 144
                  </a>{" "}
                  requires employers and employment agencies operating in New York City to commission an
                  annual independent bias audit before using any automated employment decision tool (AEDT)
                  in hiring or promotion decisions affecting NYC residents. The audit results — including
                  the selection rate and impact ratio for each race/ethnicity and sex category — must be
                  publicly posted on the employer's website. Employers must also notify candidates when
                  an AEDT was used in their evaluation. Penalties reach $1,500 per violation per day.
                </p>
                <p className="text-xs text-gray-500">
                  Law text:{" "}
                  <a
                    href="https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=4344524&GUID=B051915D-A9AC-451E-81F8-6E4B48E38EEE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    NYC Administrative Code § 20-871
                  </a>
                </p>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Colorado AI Act (SB 24-205) — Algorithmic Discrimination Prohibitions
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Taking effect{" "}
                  <strong>June 30, 2026</strong>,{" "}
                  <a
                    href="https://leg.colorado.gov/bills/sb24-205"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Colorado SB 24-205
                  </a>{" "}
                  requires deployers of high-risk AI systems to use reasonable care to protect
                  consumers from algorithmic discrimination. That obligation includes conducting and
                  documenting an impact assessment before deploying a high-risk AI system and
                  annually thereafter. The impact assessment must address the AI system's potential for
                  discrimination, the data used, and mitigation measures. Covered consequential
                  decisions include employment, credit, education, housing, healthcare, and legal
                  services affecting Colorado consumers.
                </p>
                <p className="text-xs text-gray-500">
                  See also:{" "}
                  <Link href="/blog/colorado-ai-act-60-day-checklist" className="text-blue-600 hover:underline">
                    Colorado AI Act compliance checklist
                  </Link>
                </p>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  EU AI Act — High-Risk AI System Requirements
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Under the{" "}
                  <a
                    href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    EU AI Act (Regulation 2024/1689)
                  </a>
                  , high-risk AI systems — including those used in employment, credit scoring, education,
                  and biometric identification — must undergo a conformity assessment before market
                  placement. That assessment requires testing for bias and discrimination risks,
                  technical robustness validation, and ongoing post-market monitoring. Providers of
                  general-purpose AI models with systemic risk face additional adversarial testing
                  requirements. Obligations for high-risk providers are already in force for systems
                  placing on the market from August 2026.
                </p>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  EEOC Guidance — AI and Employment Discrimination
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  The EEOC's 2023 guidance clarifies that existing federal anti-discrimination law —
                  Title VII, the Age Discrimination in Employment Act, and the ADA — applies fully to
                  AI-assisted hiring tools. Employers using AI screening tools that produce disparate
                  impact on protected groups can face disparate impact liability regardless of intent
                  and regardless of whether the AI was developed in-house or purchased from a vendor.
                  Conducting a bias audit creates a documented record of good-faith compliance efforts
                  that is relevant in enforcement proceedings.
                </p>
              </div>
            </div>
          </section>

          {/* ── Section 3: When You Need One ── */}
          <section id="when-you-need-one" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When You Need an AI Bias Audit</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              Not every AI system requires a formal third-party bias audit today — but the list of
              triggering situations is growing quickly. You likely need an AI bias audit if any of the
              following applies:
            </p>
            <ul className="space-y-3 mb-5">
              {[
                {
                  trigger: "Hiring or promotion tools used in New York City",
                  detail:
                    "NYC LL 144 requires annual third-party bias audits before any AEDT is used in NYC hiring or promotion decisions. No exceptions for small employers.",
                },
                {
                  trigger: "High-risk AI in Colorado",
                  detail:
                    "Any AI system making or substantially assisting consequential decisions affecting Colorado consumers — including employment, credit, housing, and healthcare — requires an impact assessment before June 30, 2026.",
                },
                {
                  trigger: "Lending or credit scoring AI",
                  detail:
                    "The Equal Credit Opportunity Act prohibits discriminatory credit decisions. AI credit models with disparate impact across race, sex, or national origin create ECOA and FCRA exposure.",
                },
                {
                  trigger: "Healthcare benefits or clinical AI",
                  detail:
                    "AI systems that influence coverage determinations, care recommendations, or resource allocation face scrutiny under Section 1557 of the ACA and state insurance regulations.",
                },
                {
                  trigger: "EU AI Act obligations",
                  detail:
                    "Any high-risk AI system deployed in the EU — or any AI provider selling into the EU market — must complete conformity assessment including bias testing before market placement.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.trigger}</p>
                    <p className="text-gray-600 text-sm mt-1">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Even where no specific law currently mandates a bias audit, proactive auditing is standard
              risk management practice for any AI system involved in consequential decisions. Early
              detection of bias disparities is dramatically cheaper than defending discrimination claims
              after deployment.
            </p>
          </section>

          {/* ── Section 4: Methodology ── */}
          <section id="methodology" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Bias Audit Methodology</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              A rigorous AI bias audit follows a five-phase methodology. Each phase builds on the
              previous, and the full audit results in a written report with quantified findings,
              identified disparities, and prioritized remediation recommendations.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Phase 1: Data Audit
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  The audit begins with the training data — because a model is only as fair as the data
                  it learned from. Auditors examine the composition of training datasets for demographic
                  representation gaps, historical bias encoded in outcome labels, proxy variables that
                  can substitute for protected characteristics (zip code for race; name for national
                  origin), and data quality disparities across groups.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A thorough data audit also traces data lineage: where the data came from, what
                  transformations were applied, and whether any preprocessing steps could have
                  introduced or amplified bias. Auditors look for missing data patterns that correlate
                  with protected group membership — sparse data on minority groups is itself a risk
                  factor for biased outputs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Phase 2: Model Testing — Disparate Impact Analysis
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  The statistical testing phase is the core of the audit. Auditors run the AI system
                  on a test population with known demographic attributes and measure outcomes across
                  protected groups. Standard metrics include:
                </p>
                <ul className="space-y-2 mb-3 ml-5">
                  {[
                    "Selection rate by protected group (four-fifths rule threshold: < 0.8 signals adverse impact)",
                    "False positive rate parity: are false positives distributed equally across groups?",
                    "False negative rate parity: who is incorrectly rejected at higher rates?",
                    "Calibration: do confidence scores mean the same thing across groups?",
                    "Counterfactual fairness: does changing only a protected attribute change the outcome?",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  NYC LL 144 specifies that bias audits must calculate the selection rate and impact
                  ratio for race/ethnicity and sex categories using the four-fifths rule. The Colorado
                  AI Act requires assessing "known and reasonably foreseeable risks of algorithmic
                  discrimination" across all protected characteristics. EU AI Act conformity assessments
                  require technical robustness testing for the relevant high-risk categories.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Phase 3: Documentation Review
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Independent auditors review all system documentation: model cards, data sheets,
                  intended use specifications, known limitations disclosures, and consumer-facing
                  notices. The documentation review assesses whether the system's actual behavior
                  matches its stated purpose — a common gap when models drift after deployment or
                  when vendors' documentation fails to capture real-world usage contexts.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  For third-party AI systems, the auditor examines vendor contracts to determine
                  whether the deployer has received the information needed to complete its own
                  compliance obligations. Under the Colorado AI Act, developers must provide deployers
                  with documentation of known limitations and discrimination risks.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Phase 4: Remediation Recommendations
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  The audit report identifies disparities and recommends remediation options ranked by
                  feasibility and expected impact. Common remediation pathways include:
                </p>
                <ul className="space-y-2 mb-3 ml-5">
                  {[
                    "Data resampling or reweighting to correct demographic imbalances in training data",
                    "Threshold adjustment: applying different decision cutoffs per group to equalize outcomes",
                    "Feature removal or transformation: eliminating or transforming proxy variables",
                    "Model retraining with fairness-aware objectives (in-processing interventions)",
                    "Post-processing calibration: adjusting model outputs after scoring",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  There is no single fairness criterion that satisfies all possible objectives
                  simultaneously — this is a mathematical impossibility known as the impossibility
                  theorem of fairness. Qualified auditors help organizations understand the explicit
                  trade-offs and document the policy justification for the chosen approach.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Phase 5: Ongoing Monitoring
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  A point-in-time audit is necessary but not sufficient. AI systems can develop new
                  bias disparities after deployment as the input distribution shifts, the affected
                  population changes, or the model is retrained. Ongoing monitoring is the fifth phase
                  of a complete bias audit program.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  NYC LL 144 mandates annual bias audits for AEDTs — not one-time compliance. The
                  Colorado AI Act requires periodic review of impact assessments, and auditors
                  recommend re-assessment whenever a model is significantly updated. Production
                  monitoring systems should track demographic outcome distributions in real time and
                  trigger alerts when statistically significant disparities emerge.
                </p>
              </div>
            </div>
          </section>

          {/* ── Section 5: How to Choose an Auditor ── */}
          <section id="how-to-choose" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Choose an AI Bias Auditor</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              Not all bias audit firms are equal, and the NYC LL 144 requirement for an "independent"
              auditor is not satisfied by a vendor reviewing their own system. Here is what to evaluate
              when selecting an auditor:
            </p>

            <div className="grid gap-4">
              {[
                {
                  criterion: "Independence",
                  detail:
                    "The auditor must have no financial relationship with the AI system developer that could compromise objectivity. NYC LL 144 explicitly excludes the developer from serving as the independent auditor.",
                },
                {
                  criterion: "Technical methodology",
                  detail:
                    "Ask for the auditor's statistical methodology document. It should specify which fairness metrics they calculate, how they handle intersectional analysis, and how they test for counterfactual fairness.",
                },
                {
                  criterion: "Regulatory expertise",
                  detail:
                    "The auditor should understand the specific requirements of the jurisdiction(s) relevant to your system — NYC LL 144 has different output requirements than EU AI Act conformity assessment.",
                },
                {
                  criterion: "Sectoral experience",
                  detail:
                    "Bias testing for a credit scoring model requires different expertise than auditing a hiring screener or a healthcare risk tool. Look for auditors with demonstrated experience in your sector.",
                },
                {
                  criterion: "Remediation support",
                  detail:
                    "The best auditors do not just identify problems — they offer technical guidance on feasible remediation options and can support post-remediation validation testing.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.criterion}</p>
                    <p className="text-gray-600 text-sm mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-lg print:hidden">
              <p className="text-sm text-blue-900 font-medium mb-1">
                Find Verified AI Bias Auditors on Regulome
              </p>
              <p className="text-sm text-blue-800 mb-3">
                Regulome&apos;s provider marketplace lists qualified AI bias audit firms with verified
                specializations, jurisdictional coverage, and client reviews.
              </p>
              <Link
                href="/providers"
                className="inline-block px-4 py-2 bg-blue-700 text-white rounded text-sm font-medium hover:bg-blue-800 transition-colors"
              >
                Browse Bias Audit Providers →
              </Link>
            </div>
          </section>

          {/* ── Section 6: Checklist ── */}
          <section id="checklist" className="mb-12">
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Free AI Bias Audit Checklist
              </h2>
              <span className="text-sm text-gray-500">{totalItems} items across 5 phases</span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6 print:hidden">
              Use this checklist to prepare for an AI bias audit, scope an RFP for an auditor, or
              verify that an auditor&apos;s proposed methodology covers all required phases. It covers the
              five-phase methodology described above and aligns with NYC LL 144, Colorado AI Act, and
              EU AI Act requirements.
            </p>

            <div className="print:hidden mb-6 flex gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Print / Save as PDF
              </button>
              <Link
                href="/rfp"
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:border-gray-400 transition-colors"
              >
                Get Auditor Quotes →
              </Link>
            </div>

            <div className="space-y-10 print:space-y-8">
              {CHECKLIST_SECTIONS.map((section) => (
                <div key={section.phase} className="break-inside-avoid">
                  <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-gray-200">
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                      {section.phase}
                    </span>
                    <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
                    <span className="ml-auto text-xs text-gray-400">{section.items.length} items</span>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 border border-gray-300 rounded-sm print:border-gray-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── Section 7: FAQ ── */}
          <section id="faq" className="mb-12 print:hidden">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {FAQ_ITEMS.map((faq, i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className="mb-12 print:hidden">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  href: "/blog/ai-compliance-checklist",
                  label: "AI Compliance Checklist 2026",
                  description: "Full compliance checklist covering inventory, risk classification, bias audits, and documentation.",
                },
                {
                  href: "/tools/iso-42001-checklist",
                  label: "ISO 42001 Certification Checklist",
                  description: "48-item checklist covering all 7 phases of ISO 42001 certification readiness.",
                },
                {
                  href: "/blog/bias-audit-guide",
                  label: "Bias Audit Guide",
                  description: "Deep-dive guide to bias audit procurement, methodology selection, and remediation.",
                },
                {
                  href: "/rfp",
                  label: "Request Quotes from AI Auditors",
                  description: "Get competitive quotes from verified AI bias audit firms through Regulome.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors block"
                >
                  <p className="font-medium text-gray-900 text-sm mb-1">{link.label}</p>
                  <p className="text-gray-500 text-xs">{link.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Main CTA */}
          <div className="print:hidden p-6 bg-gray-900 text-white rounded-xl">
            <h2 className="text-xl font-bold mb-2">Find Qualified AI Bias Auditors on Regulome</h2>
            <p className="text-gray-300 text-sm mb-5 max-w-2xl">
              Regulome&apos;s marketplace connects compliance teams with verified AI bias audit firms
              specializing in NYC LL 144, Colorado AI Act, and EU AI Act requirements. Compare
              specializations, jurisdictional coverage, and get competitive quotes — all in one place.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/providers"
                className="px-5 py-2.5 bg-white text-gray-900 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Browse AI Bias Auditors
              </Link>
              <Link
                href="/rfp"
                className="px-5 py-2.5 border border-gray-600 text-white rounded text-sm font-medium hover:border-gray-400 transition-colors"
              >
                Request Quotes
              </Link>
            </div>
          </div>

          {/* Print footer */}
          <div className="hidden print:block mt-8 pt-4 border-t border-gray-200 text-xs text-gray-400 text-center">
            regulome.io/resources/ai-bias-audit · AI Bias Audit Guide & Checklist · Updated May 2026
          </div>
        </div>
      </div>
    </>
  );
}
