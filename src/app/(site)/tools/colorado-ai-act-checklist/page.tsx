import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/brand";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Colorado AI Act Compliance Checklist — Free Printable | Regulome.io",
  description:
    "Free printable Colorado AI Act (SB 24-205) compliance checklist. January 1, 2027 deadline (amended by SB 26-189). Covers all deployer and developer obligations for high-risk AI systems.",
  alternates: { canonical: `${SITE_URL}/tools/colorado-ai-act-checklist` },
};

const SECTIONS = [
  {
    title: "Step 1: Determine If You Are Covered",
    deadline: "Now",
    items: [
      "Identified all AI systems your organization deploys or develops",
      "Determined which systems make or substantially assist 'consequential decisions' affecting Colorado residents",
      "Confirmed whether you are a deployer, developer, or both under SB 24-205",
      "Mapped consequential decision categories: employment, credit, education, housing, healthcare, insurance, legal services",
      "Documented your determination (covered / not covered) with supporting rationale",
    ],
  },
  {
    title: "Step 2: Classify High-Risk AI Systems",
    deadline: "Now",
    items: [
      "Created a complete inventory of all AI systems used in covered consequential decisions",
      "Classified each system as high-risk or not, with documented rationale",
      "Identified whether each system was developed in-house or procured from a vendor",
      "For vendor systems: reviewed vendor contracts for AI governance representations",
      "Assigned a business owner accountable for each high-risk AI system",
    ],
  },
  {
    title: "Step 3: Complete Impact Assessments",
    deadline: "Before January 1, 2027 for existing systems",
    items: [
      "Initiated impact assessments for all high-risk AI systems currently deployed",
      "Documented the AI system's intended purpose and deployment context",
      "Identified the population affected, including Colorado consumer demographic breakdown",
      "Assessed potential for algorithmic discrimination across all protected characteristics",
      "Documented known and reasonably foreseeable risks of algorithmic discrimination",
      "Described data used to train, test, and validate each system",
      "Documented mitigation measures implemented to reduce discrimination risk",
      "Obtained sign-off from accountable business owner on residual risk acceptance",
      "Retained completed impact assessments as permanent compliance records",
    ],
  },
  {
    title: "Step 4: Implement Risk Management Program",
    deadline: "Before January 1, 2027",
    items: [
      "Adopted written AI risk management policy approved by leadership",
      "Designated responsible individual or function with AI governance authority",
      "Implemented human oversight mechanism for all high-risk AI decisions affecting Colorado consumers",
      "Established process for consumers to appeal AI-assisted decisions",
      "Created incident response process for AI failures or discrimination complaints",
      "Implemented vendor due diligence requirements for third-party AI systems",
      "Established process for periodic review and update of impact assessments",
    ],
  },
  {
    title: "Step 5: Consumer Notice and Disclosure",
    deadline: "Before January 1, 2027",
    items: [
      "Implemented notice to Colorado consumers when a high-risk AI system was used in a consequential decision",
      "Notice includes description of the AI system and its role in the decision",
      "Notice includes contact information for questions and appeals",
      "Notice mechanism tested end-to-end for each covered AI system",
      "For employment AI: notice provided before or when the AI system is used in the hiring/promotion process",
    ],
  },
  {
    title: "Step 6: Developer Obligations (if applicable)",
    deadline: "Before January 1, 2027",
    items: [
      "Published disclosure of known limitations and risks of the AI system",
      "Provided deployers with information needed to complete their impact assessments",
      "Documented known risks of algorithmic discrimination and how they are mitigated",
      "Maintained records of training data, testing methodology, and validation results",
      "Established process to notify deployers of significant updates or newly discovered risks",
    ],
  },
  {
    title: "Step 7: Ongoing Compliance",
    deadline: "Recurring",
    items: [
      "Scheduled annual review of all impact assessments",
      "Implemented production monitoring for demographic outcome distributions",
      "Established process to trigger impact assessment review when significant changes occur",
      "Added Colorado AI Act compliance to new AI system procurement checklist",
      "Trained relevant staff on Colorado AI Act obligations and consumer rights",
      "Established recordkeeping retention policy (retain compliance records for at least 3 years)",
    ],
  },
];

export default function ColoradoAIActChecklistPage() {
  const totalItems = SECTIONS.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="print:block hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-8 py-3 text-sm text-gray-500">
        Colorado AI Act Checklist — regulome.io/tools/colorado-ai-act-checklist
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 print:py-6 print:px-0">
        {/* Nav */}
        <div className="print:hidden mb-8">
          <Link href="/blog/colorado-ai-act-60-day-checklist" className="text-sm text-blue-600 hover:underline">
            ← Read the full Colorado AI Act guide
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400">Free Download · Regulome.io</span>
            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded font-medium">Deadline: January 1, 2027</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Colorado AI Act Compliance Checklist
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            {totalItems} items across 7 steps covering all deployer and developer obligations under
            Colorado SB 24-205. Use this before the January 1, 2027 enforcement date.
          </p>
        </div>

        {/* Warning bar */}
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-900">
            <strong>January 1, 2027:</strong> Colorado SB 24-205 takes effect. The Colorado Attorney General
            must issue a 60-day cure notice before formal enforcement — but documented compliance efforts
            are required before the deadline, not after. Penalties reach <strong>$20,000 per violation
            per consumer</strong>.
          </p>
        </div>

        {/* Print / CTA buttons */}
        <div className="print:hidden mb-10 flex gap-3">
          <PrintButton />
          <Link
            href="/blog/colorado-ai-act-60-day-checklist"
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:border-gray-400 transition-colors"
          >
            Read the full guide
          </Link>
        </div>

        {/* Checklist */}
        <div className="space-y-10 print:space-y-8">
          {SECTIONS.map((section, si) => (
            <div key={si} className="break-inside-avoid">
              <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-900">{section.title}</h2>
                <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">
                  {section.deadline} · {section.items.length} items
                </span>
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

        {/* Footer CTA */}
        <div className="print:hidden mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Track Colorado AI Act readiness across your AI portfolio</h3>
          <p className="text-sm text-gray-600 mb-4">
            Regulome.io maps these requirements to each of your AI systems, tracks completion with
            evidence attachments, and alerts you to the January 1, 2027 deadline against your current status.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Start free at Regulome.io
          </Link>
        </div>

        <div className="hidden print:block mt-8 pt-4 border-t border-gray-200 text-xs text-gray-400 text-center">
          regulome.io/tools/colorado-ai-act-checklist · Colorado SB 24-205 (amended by SB 26-189) · Enforcement: January 1, 2027
        </div>
      </div>
    </div>
  );
}
