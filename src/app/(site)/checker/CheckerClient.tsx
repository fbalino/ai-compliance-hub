"use client";

import { useState } from "react";
import Link from "next/link";

// --- Types ---

interface Question {
  id: string;
  text: string;
  subtext?: string;
  options: Array<{ value: string; label: string; hint?: string }>;
  multi?: boolean;
}

interface RegResult {
  slug: string;
  name: string;
  jurisdiction: string;
  status: "enforced" | "enacted";
  effectiveDate: string;
  reason: string;
  urgency: "high" | "medium" | "low";
  actions: string[];
}

// --- Questions ---

const QUESTIONS: Question[] = [
  {
    id: "operations",
    text: "Where does your organization operate or have customers?",
    subtext: "Select all that apply.",
    multi: true,
    options: [
      { value: "eu", label: "European Union", hint: "Any EU member state" },
      { value: "us_ny", label: "New York City", hint: "Employees or applicants in NYC" },
      { value: "us_co", label: "Colorado", hint: "Consumers or employees in Colorado" },
      { value: "us_ca", label: "California", hint: "Employees or consumers in California" },
      { value: "us_il", label: "Illinois", hint: "Employees in Illinois" },
      { value: "other", label: "Other / Not listed", hint: "Other US states or countries" },
    ],
  },
  {
    id: "ai_uses",
    text: "Which AI applications does your organization use or deploy?",
    subtext: "Select all that apply.",
    multi: true,
    options: [
      { value: "hiring", label: "Hiring or promotion decisions", hint: "Screening, ranking, or scoring candidates" },
      { value: "credit", label: "Credit or insurance scoring", hint: "Lending, underwriting, or pricing" },
      { value: "healthcare", label: "Medical or clinical AI", hint: "Diagnostics, triage, treatment recommendations" },
      { value: "content_gen", label: "Generative AI systems", hint: "LLMs, image generators, code assistants" },
      { value: "biometric", label: "Biometric identification", hint: "Face recognition, emotion analysis" },
      { value: "infrastructure", label: "Critical infrastructure", hint: "Energy, transport, water, financial services" },
      { value: "none", label: "None of the above", hint: "We don't deploy AI in these areas" },
    ],
  },
  {
    id: "org_size",
    text: "How large is your organization?",
    options: [
      { value: "solo", label: "Solo / Freelancer", hint: "Just me" },
      { value: "small", label: "Small business", hint: "2–49 employees" },
      { value: "mid", label: "Mid-size company", hint: "50–999 employees" },
      { value: "large", label: "Large enterprise", hint: "1,000+ employees" },
    ],
  },
  {
    id: "ai_role",
    text: "What is your organization's role with AI systems?",
    options: [
      { value: "developer", label: "We develop AI systems", hint: "We build or train AI models" },
      { value: "deployer", label: "We deploy / use AI systems", hint: "We use third-party AI in our products or operations" },
      { value: "both", label: "Both — we build and deploy", hint: "We build AI that we also use ourselves" },
      { value: "neither", label: "Neither — we're evaluating", hint: "We don't currently use or build AI" },
    ],
  },
];

// --- Result engine ---

function computeResults(answers: Record<string, string | string[]>): RegResult[] {
  const ops = (answers.operations as string[]) ?? [];
  const uses = (answers.ai_uses as string[]) ?? [];
  const role = (answers.ai_role as string) ?? "";

  const results: RegResult[] = [];

  // EU AI Act
  if (ops.includes("eu")) {
    const isHighRisk =
      uses.includes("hiring") ||
      uses.includes("credit") ||
      uses.includes("healthcare") ||
      uses.includes("infrastructure") ||
      uses.includes("biometric");
    const isDeveloper = role === "developer" || role === "both";
    const isDeployer = role === "deployer" || role === "both";

    if (uses.includes("biometric")) {
      results.push({
        slug: "eu-ai-act",
        name: "EU AI Act",
        jurisdiction: "European Union",
        status: "enforced",
        effectiveDate: "August 2026 (high-risk rules)",
        reason:
          "Biometric identification systems are prohibited or heavily restricted under EU AI Act. Facial recognition in public spaces is banned for most use cases.",
        urgency: "high",
        actions: [
          "Conduct a legal analysis of whether your biometric AI is permitted",
          "Classify your system under EU AI Act risk tiers",
          "Prepare to register in the EU AI Act database if high-risk",
          "Consult EU legal counsel immediately",
        ],
      });
    } else if (isHighRisk) {
      results.push({
        slug: "eu-ai-act",
        name: "EU AI Act",
        jurisdiction: "European Union",
        status: "enforced",
        effectiveDate: "August 2026 (high-risk rules)",
        reason: `High-risk AI systems (${[
          uses.includes("hiring") && "hiring",
          uses.includes("credit") && "credit scoring",
          uses.includes("healthcare") && "healthcare",
          uses.includes("infrastructure") && "critical infrastructure",
        ]
          .filter(Boolean)
          .join(", ")}) face strict obligations under the EU AI Act.`,
        urgency: "high",
        actions: [
          isDeveloper
            ? "Implement a conformity assessment and prepare technical documentation"
            : "Obtain conformity documentation from your AI vendor",
          "Build a risk management system per EU AI Act requirements",
          "Implement human oversight mechanisms",
          "Register in the EU AI Act database before deployment",
          isDeployer
            ? "Ensure your vendor has CE marking / EU Declaration of Conformity"
            : "Affix CE marking after completing conformity assessment",
        ],
      });
    } else if (uses.includes("content_gen")) {
      results.push({
        slug: "eu-ai-act",
        name: "EU AI Act",
        jurisdiction: "European Union",
        status: "enacted",
        effectiveDate: "August 2025 (GPAI rules)",
        reason:
          "General-purpose AI (GPAI) model obligations under the EU AI Act apply if you develop or deploy foundation models / LLMs in the EU.",
        urgency: "medium",
        actions: [
          role === "developer" || role === "both"
            ? "Prepare technical documentation for your GPAI model"
            : "Request GPAI transparency information from your AI provider",
          "Review content watermarking / AI disclosure requirements",
          "Train your team on EU AI Act GPAI obligations",
        ],
      });
    } else {
      results.push({
        slug: "eu-ai-act",
        name: "EU AI Act",
        jurisdiction: "European Union",
        status: "enforced",
        effectiveDate: "August 2026",
        reason:
          "Your EU operations are subject to EU AI Act obligations. Your specific AI uses may fall under limited-risk or minimal-risk tiers, but transparency requirements may still apply.",
        urgency: "low",
        actions: [
          "Classify your AI systems under EU AI Act risk tiers",
          "Implement required transparency disclosures for AI interactions",
          "Establish an AI policy and register relevant systems",
        ],
      });
    }
  }

  // NYC Local Law 144
  if (ops.includes("us_ny") && uses.includes("hiring")) {
    results.push({
      slug: "nyc-local-law-144",
      name: "NYC Local Law 144",
      jurisdiction: "US · New York City",
      status: "enforced",
      effectiveDate: "In effect since July 5, 2023",
      reason:
        "You use AI-assisted tools for hiring or promotion decisions and have employees or applicants in New York City — this triggers NYC LL 144 obligations.",
      urgency: "high",
      actions: [
        "Commission a third-party bias audit from an accredited auditor",
        "Post the bias audit summary on your careers page",
        "Add LL 144 disclosure notices to job postings",
        "Repeat the audit annually",
        "Notify NYC-based candidates that an AEDT is used in their evaluation",
      ],
    });
  }

  // Colorado AI Act
  if (ops.includes("us_co") && uses.some((u) => ["hiring", "credit", "healthcare"].includes(u))) {
    results.push({
      slug: "colorado-ai-act",
      name: "Colorado AI Act",
      jurisdiction: "US · Colorado",
      status: "enacted",
      effectiveDate: "June 30, 2026",
      reason:
        "You deploy high-risk AI affecting Colorado consumers in a covered use case (employment, credit, or healthcare). Colorado SB 24-205 requires reasonable care to prevent algorithmic discrimination.",
      urgency: "medium",
      actions: [
        "Conduct an AI impact assessment for your high-risk systems",
        "Implement a risk management program for AI systems",
        "Prepare consumer notification and opt-out mechanisms",
        "Document how your AI system was developed and tested for bias",
        "Prepare to submit annual impact assessment reports",
      ],
    });
  }

  // California AB 2013
  if (
    ops.includes("us_ca") &&
    uses.includes("content_gen") &&
    (role === "developer" || role === "both")
  ) {
    results.push({
      slug: "california-ab-2013",
      name: "California AB 2013",
      jurisdiction: "US · California",
      status: "enacted",
      effectiveDate: "January 1, 2026",
      reason:
        "You develop generative AI systems and have California operations. AB 2013 requires training data transparency reports for covered generative AI systems.",
      urgency: "medium",
      actions: [
        "Determine if your generative AI system meets the compute threshold (~$50M or 10^23 FLOPs)",
        "Document your training data sources, including third-party data licenses",
        "Prepare and publish a training data transparency report on your website",
        "Establish a process to update reports annually",
      ],
    });
  }

  // Illinois AIVIRA
  if (ops.includes("us_il") && uses.includes("hiring")) {
    results.push({
      slug: "illinois-ai-video-interview-act",
      name: "Illinois AI Video Interview Act",
      jurisdiction: "US · Illinois",
      status: "enforced",
      effectiveDate: "In effect since January 1, 2020",
      reason:
        "You use AI to analyze video interviews for hiring and have employees or applicants in Illinois.",
      urgency: "high",
      actions: [
        "Notify candidates before the interview that AI will analyze their video",
        "Obtain candidate consent before AI video analysis",
        "Explain what characteristics the AI evaluates",
        "Limit sharing video data with third parties",
        "Delete candidate videos within 30 days of a written request",
      ],
    });
  }

  // No applicable regulations
  if (results.length === 0) {
    return [];
  }

  // Sort by urgency
  const urgencyOrder = { high: 0, medium: 1, low: 2 };
  return results.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
}

// --- Component ---

export function CheckerClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);

  const question = QUESTIONS[step];
  const currentAnswer = answers[question?.id];

  function selectOption(questionId: string, value: string, multi: boolean) {
    if (multi) {
      const current = (answers[questionId] as string[]) ?? [];
      if (value === "none") {
        setAnswers((a) => ({ ...a, [questionId]: current.includes("none") ? [] : ["none"] }));
        return;
      }
      const withoutNone = current.filter((v) => v !== "none");
      if (withoutNone.includes(value)) {
        setAnswers((a) => ({ ...a, [questionId]: withoutNone.filter((v) => v !== value) }));
      } else {
        setAnswers((a) => ({ ...a, [questionId]: [...withoutNone, value] }));
      }
    } else {
      setAnswers((a) => ({ ...a, [questionId]: value }));
    }
  }

  function isSelected(questionId: string, value: string, multi: boolean): boolean {
    if (multi) {
      return ((answers[questionId] as string[]) ?? []).includes(value);
    }
    return answers[questionId] === value;
  }

  function canAdvance(): boolean {
    const ans = answers[question?.id];
    if (!ans) return false;
    if (question?.multi) return (ans as string[]).length > 0;
    return typeof ans === "string" && ans.length > 0;
  }

  function next() {
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setShowResults(true);
    }
  }

  function back() {
    if (showResults) {
      setShowResults(false);
    } else if (step > 0) {
      setStep((s) => s - 1);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  }

  if (showResults) {
    const results = computeResults(answers);
    return <Results results={results} onReset={reset} onBack={back} />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-neutral-500 mb-2">
          <span>Question {step + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}% complete</span>
        </div>
        <div className="h-2 w-full rounded-full bg-neutral-200">
          <div
            className="h-2 rounded-full bg-brand-700 transition-all duration-300"
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={QUESTIONS.length}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-neutral-900">{question.text}</h2>
        {question.subtext && (
          <p className="mt-1.5 text-sm text-neutral-500">{question.subtext}</p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2.5 mb-8">
        {question.options.map((opt) => {
          const selected = isSelected(question.id, opt.value, !!question.multi);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => selectOption(question.id, opt.value, !!question.multi)}
              className={`w-full flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                selected
                  ? "border-brand-600 bg-brand-50 shadow-sm"
                  : "border-neutral-200 bg-white hover:border-brand-300 hover:bg-neutral-50"
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-${question.multi ? "md" : "full"} border-2 transition-colors ${
                  selected
                    ? "border-brand-600 bg-brand-600"
                    : "border-neutral-300"
                }`}
              >
                {selected && (
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <div>
                <span className={`font-medium ${selected ? "text-brand-900" : "text-neutral-800"}`}>
                  {opt.label}
                </span>
                {opt.hint && (
                  <span className={`block text-sm ${selected ? "text-brand-700" : "text-neutral-500"}`}>
                    {opt.hint}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canAdvance()}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {step === QUESTIONS.length - 1 ? "See My Results" : "Next →"}
        </button>
      </div>
    </div>
  );
}

// --- Results component ---

const urgencyConfig = {
  high: {
    label: "Applies Now",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  medium: {
    label: "Coming Soon",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  low: {
    label: "Review Recommended",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
};

function Results({
  results,
  onReset,
  onBack,
}: {
  results: RegResult[];
  onReset: () => void;
  onBack: () => void;
}) {
  if (results.length === 0) {
    return (
      <div className="mx-auto max-w-2xl text-center py-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Low Regulatory Exposure</h2>
        <p className="mt-3 text-neutral-600 leading-relaxed max-w-md mx-auto">
          Based on your answers, no specific AI regulations currently appear to apply to your organization. This may change as you adopt AI or as new laws are enacted.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/regulations"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Browse All Regulations
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors"
          >
            Start Over
          </button>
        </div>
        <p className="mt-6 text-xs text-neutral-400">
          Not legal advice. This tool is for informational purposes only. Consult a qualified attorney for compliance decisions.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
            {results.length} regulation{results.length > 1 ? "s" : ""} likely apply
          </span>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Your Compliance Results</h2>
        <p className="mt-1.5 text-neutral-600">
          Based on your answers, here are the AI regulations your organization needs to address.
        </p>
      </div>

      <div className="space-y-5">
        {results.map((reg) => {
          const cfg = urgencyConfig[reg.urgency];
          return (
            <div
              key={reg.slug}
              className={`rounded-xl border ${cfg.border} ${cfg.bg} p-5`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${cfg.color}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                    <span className="text-xs text-neutral-400">{reg.jurisdiction}</span>
                  </div>
                  <h3 className="font-bold text-neutral-900">{reg.name}</h3>
                  <p className="text-xs text-neutral-500">{reg.effectiveDate}</p>
                </div>
                <Link
                  href={`/regulations/${reg.slug}`}
                  className="shrink-0 text-xs font-medium text-brand-700 hover:text-brand-900 transition-colors whitespace-nowrap"
                >
                  Read guide →
                </Link>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                {reg.reason}
              </p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Required Actions
                </p>
                <ul className="space-y-1.5">
                  {reg.actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-400 shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next steps */}
      <div className="mt-8 rounded-xl bg-white border border-neutral-200 p-5">
        <h3 className="font-bold text-neutral-900 mb-1">Need help with compliance?</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Browse verified auditors, consultants, and software platforms that specialize in these regulations.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/directory"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800 transition-colors"
          >
            Find Providers
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Start Over
          </button>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            ← Edit Answers
          </button>
        </div>
      </div>

      <p className="mt-5 text-xs text-neutral-400 leading-relaxed">
        <strong>Not legal advice.</strong> This tool is for informational purposes only and does not constitute legal, compliance, or professional advice. Regulations change frequently. Always consult a qualified attorney or compliance professional before making compliance decisions.
      </p>
    </div>
  );
}
