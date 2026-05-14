import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/brand";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "ISO 42001 Checklist — Free Printable PDF | Regulome.io",
  description:
    "Download the free ISO 42001 checklist covering all 48 requirements across 7 phases. Print-ready format for AI management system certification preparation.",
  alternates: { canonical: `${SITE_URL}/tools/iso-42001-checklist` },
};

const PHASES = [
  {
    clause: "Clause 4",
    title: "Context of the Organization",
    items: [
      "Identified and documented internal and external issues relevant to AI activities",
      "Assessed how issues affect the AIMS's ability to achieve intended outcomes",
      "Identified all interested parties and their AI-related requirements",
      "Determined which interested party requirements the AIMS will address",
      "Defined and documented the scope of the AIMS",
      "Established, implemented, and maintained the AIMS per standard requirements",
    ],
  },
  {
    clause: "Clause 5",
    title: "Leadership",
    items: [
      "Top management demonstrated leadership by establishing AI policy and directing resources",
      "Top management promoted a culture of responsible AI use",
      "AI policy established, documented, and communicated internally",
      "AI policy available to interested parties as appropriate",
      "AIMS roles, responsibilities, and authorities assigned and communicated",
      "Responsible individual/function assigned for AIMS performance reporting to top management",
    ],
  },
  {
    clause: "Clause 6",
    title: "Planning",
    items: [
      "Process established to identify risks and opportunities related to the AIMS",
      "AI risk assessment conducted identifying risks to individuals and society",
      "AI risk assessment criteria (likelihood, impact, thresholds) defined and documented",
      "AI risk assessment results documented and retained",
      "AI risk treatment plan documented with selected controls and justifications",
      "Risk owners accepted residual risks following treatment",
      "AI objectives established at relevant functions and levels, measurable and monitored",
      "Plans to achieve AI objectives include responsible parties, timelines, evaluation methods",
      "Changes to the AIMS carried out in a planned manner",
    ],
  },
  {
    clause: "Clause 7",
    title: "Support",
    items: [
      "Resources required for AIMS determined and provided",
      "Persons have necessary competence (education, training, or experience)",
      "Competence requirements documented; training actions recorded",
      "Persons aware of AI policy, their contribution, and implications of nonconformity",
      "Internal and external communications relevant to the AIMS planned",
      "Documented information required by the standard exists and is controlled",
      "New documented information identified with appropriate metadata",
      "Documented information controlled for access, storage, version control, and retention",
    ],
  },
  {
    clause: "Clause 8",
    title: "Operations",
    items: [
      "Operational processes planned, implemented, controlled, and reviewed",
      "AI impact assessment process established and documented",
      "AI impact assessments conducted before deployment and when significant changes occur",
      "Impact assessment results and treatment decisions retained",
      "AI system lifecycle management process covers full lifecycle",
      "AI system objectives, intended use, and foreseeable misuse documented",
      "Data management processes address quality, provenance, and governance for AI data",
      "Processes exist to identify and address data bias before and during deployment",
      "Processes address AI use as deployer and developer (where both apply)",
      "Third-party and supply chain AI risks assessed; contracts address AI governance",
      "Criteria exist for responsible disclosure of AI system information to affected parties",
    ],
  },
  {
    clause: "Clause 9",
    title: "Performance Evaluation",
    items: [
      "Methods for monitoring, measurement, analysis, and evaluation defined",
      "Monitoring and measurement results documented and retained",
      "AI system performance evaluated at planned intervals",
      "Internal audits conducted at planned intervals",
      "Internal audit program exists with scope, frequency, methods, and responsibilities",
      "Internal audit results reported to management and retained",
      "Management reviews conducted at planned intervals",
      "Management review inputs include audit results, risks, objectives, and improvement opportunities",
      "Management review outputs (decisions, actions) retained",
    ],
  },
  {
    clause: "Clause 10",
    title: "Improvement",
    items: [
      "Opportunities for improvement identified and acted upon",
      "Nonconformities identified, documented, root-caused, corrected, and evaluated",
      "Corrective actions appropriate to the effects of nonconformities",
      "Results of corrective actions retained",
      "Organization continually improves AIMS suitability, adequacy, and effectiveness",
    ],
  },
];

export default function ISO42001ChecklistPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Print header */}
      <div className="print:block hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-8 py-3 text-sm text-gray-500">
        ISO 42001 Checklist — regulome.io/tools/iso-42001-checklist
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 print:py-6 print:px-0">
        {/* Nav — hidden in print */}
        <div className="print:hidden mb-8">
          <Link href="/blog/iso-42001-checklist" className="text-sm text-blue-600 hover:underline">
            ← Read the full ISO 42001 guide
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10 print:mb-8">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
            Free Download · Regulome.io
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            ISO 42001 Certification Checklist
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            48 requirements across 7 phases. Use this checklist to assess your readiness before a
            Stage 1 or Stage 2 certification audit.
          </p>
        </div>

        {/* Print button — hidden in print */}
        <div className="print:hidden mb-10 flex gap-3">
          <PrintButton />
          <Link
            href="/blog/iso-42001-checklist"
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:border-gray-400 transition-colors"
          >
            Read the full guide
          </Link>
        </div>

        {/* Checklist */}
        <div className="space-y-10 print:space-y-8">
          {PHASES.map((phase) => (
            <div key={phase.clause} className="break-inside-avoid">
              <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-gray-200">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                  {phase.clause}
                </span>
                <h2 className="text-lg font-semibold text-gray-900">{phase.title}</h2>
                <span className="ml-auto text-xs text-gray-400">{phase.items.length} items</span>
              </div>
              <ul className="space-y-2">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 border border-gray-300 rounded-sm print:border-gray-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Annex A reminder */}
        <div className="mt-12 p-5 bg-amber-50 border border-amber-200 rounded print:mt-8">
          <h3 className="font-semibold text-amber-900 mb-1">Annex A — Statement of Applicability</h3>
          <p className="text-sm text-amber-800">
            ISO 42001 includes 38 additional Annex A controls covering transparency, human oversight,
            incident management, and data governance. Your certification body will require a Statement
            of Applicability declaring which controls apply and why any are excluded. This checklist
            covers the mandatory clauses (4–10) only.
          </p>
        </div>

        {/* Footer CTA — hidden in print */}
        <div className="print:hidden mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Track ISO 42001 readiness with your team</h3>
          <p className="text-sm text-gray-600 mb-4">
            Regulome.io maps these requirements to your specific AI systems, tracks completion by
            owner, and connects ISO 42001 obligations to parallel EU AI Act and Colorado AI Act
            requirements.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Start free at Regulome.io
          </Link>
        </div>

        {/* Print footer */}
        <div className="hidden print:block mt-8 pt-4 border-t border-gray-200 text-xs text-gray-400 text-center">
          regulome.io/tools/iso-42001-checklist · ISO/IEC 42001:2023 · Last updated May 2026
        </div>
      </div>
    </div>
  );
}
