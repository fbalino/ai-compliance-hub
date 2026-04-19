"use client";

import { useState, useCallback } from "react";
import { Search as SearchIcon, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  contactName: string;
  contactEmail: string;
  companyName: string;
  companySize: string;
  industry: string;
  description: string;
  regulations: string[];
  serviceTypes: string[];
  jurisdictions: string[];
  timeline: string;
  budget: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

// ─── Static data ──────────────────────────────────────────────────────────────

const ALL_REGULATIONS = [
  "EU AI Act",
  "GDPR",
  "NIS2",
  "DORA",
  "ISO 42001",
  "ISO 27001",
  "SOC 2 Type II",
  "HIPAA",
  "CCPA / CPRA",
  "FCA AI Guidelines",
  "UK AI Regulation",
  "NYC Local Law 144",
  "Colorado AI Act",
  "Illinois BIPA",
  "Singapore FEAT Principles",
  "NIST AI RMF",
  "PCI DSS",
];

const SERVICE_OPTIONS = [
  { value: "advisory", label: "Advisory" },
  { value: "software", label: "Software" },
  { value: "audit", label: "Audit" },
  { value: "legal", label: "Legal" },
  { value: "training", label: "Training" },
];

const JURISDICTION_OPTIONS = [
  { value: "US", label: "US" },
  { value: "EU", label: "EU" },
  { value: "UK", label: "UK" },
  { value: "Global", label: "Global" },
];

const COMPANY_SIZE_OPTIONS = [
  { value: "1-50", label: "1–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-1000", label: "201–1,000 employees" },
  { value: "1000+", label: "1,000+ employees" },
];

const TIMELINE_OPTIONS = [
  { value: "urgent", label: "Urgent (ASAP)" },
  { value: "1-3 months", label: "1–3 months" },
  { value: "3-6 months", label: "3–6 months" },
  { value: "flexible", label: "Flexible" },
];

const BUDGET_OPTIONS = [
  { value: "under-5k", label: "Under $5k" },
  { value: "5k-25k", label: "$5k–$25k" },
  { value: "25k-100k", label: "$25k–$100k" },
  { value: "100k+", label: "$100k+" },
  { value: "unsure", label: "Unsure" },
];

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.contactName.trim()) errors.contactName = "Name is required";
  if (!data.contactEmail.trim()) {
    errors.contactEmail = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail)) {
    errors.contactEmail = "Enter a valid email";
  }
  if (!data.companyName.trim()) errors.companyName = "Company name is required";
  if (!data.description.trim())
    errors.description = "Please describe your compliance need";
  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <span
      className="mono xs"
      style={{ color: "var(--error, #c0392b)", marginTop: 4, display: "block" }}
    >
      {msg}
    </span>
  );
}

function RegulationChipSelector({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = ALL_REGULATIONS.filter(
    (r) =>
      !selected.includes(r) && r.toLowerCase().includes(query.toLowerCase()),
  );

  const add = (reg: string) => {
    onChange([...selected, reg]);
    setQuery("");
  };

  const remove = (reg: string) => {
    onChange(selected.filter((r) => r !== reg));
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="search" style={{ marginBottom: 12 }}>
        <SearchIcon
          className="h-3.5 w-3.5"
          style={{ color: "var(--ink-soft)", flexShrink: 0 }}
          aria-hidden
        />
        <input
          placeholder="Search regulations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            border: 0,
            background: "transparent",
            outline: "none",
            font: "inherit",
            color: "var(--ink)",
          }}
        />
      </div>

      {selected.length > 0 && (
        <div className="tag-strip" style={{ marginBottom: 12 }}>
          {selected.map((r) => (
            <button
              key={r}
              className="chip"
              style={{
                background: "var(--paper-inverse)",
                color: "var(--ink-inverse)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
              onClick={() => remove(r)}
              type="button"
              aria-label={`Remove ${r}`}
            >
              {r} <X className="h-3 w-3" aria-hidden />
            </button>
          ))}
        </div>
      )}

      {query && filtered.length > 0 && (
        <div
          className="col"
          style={{ gap: 4, maxHeight: 200, overflowY: "auto" }}
        >
          {filtered.slice(0, 8).map((r) => (
            <button
              key={r}
              type="button"
              className="btn btn-ghost"
              style={{
                textAlign: "left",
                justifyContent: "flex-start",
                padding: "6px 10px",
                fontSize: 13,
              }}
              onClick={() => add(r)}
            >
              + {r}
            </button>
          ))}
        </div>
      )}

      {!query && (
        <div className="tag-strip">
          {ALL_REGULATIONS.filter((r) => !selected.includes(r))
            .slice(0, 10)
            .map((r) => (
              <button
                key={r}
                type="button"
                className="chip"
                onClick={() => add(r)}
              >
                + {r}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ email }: { email: string }) {
  return (
    <div
      className="card"
      style={{
        padding: 40,
        textAlign: "center",
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
      <h2
        style={{
          fontFamily: "var(--serif)",
          fontSize: 28,
          fontWeight: 500,
          marginBottom: 12,
        }}
      >
        RFP submitted
      </h2>
      <p style={{ color: "var(--ink-2)", fontSize: 15, marginBottom: 20 }}>
        We received your request and will match you with relevant providers.
        You'll hear from us at <strong>{email}</strong> within 2 business days.
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const EMPTY: FormData = {
  contactName: "",
  contactEmail: "",
  companyName: "",
  companySize: "",
  industry: "",
  description: "",
  regulations: [],
  serviceTypes: [],
  jurisdictions: [],
  timeline: "",
  budget: "",
};

export function RfpForm() {
  const [formData, setFormData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const patch = useCallback((update: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...update }));
    const keys = Object.keys(update) as (keyof FormData)[];
    setErrors((prev) => {
      const next = { ...prev };
      keys.forEach((k) => delete next[k]);
      return next;
    });
  }, []);

  const toggleArrayValue = (
    field: "serviceTypes" | "jurisdictions",
    value: string,
  ) => {
    const current = formData[field];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    patch({ [field]: next });
  };

  const handleSubmit = async () => {
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/rfp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          companyName: formData.companyName,
          companySize: formData.companySize || undefined,
          industry: formData.industry || undefined,
          description: formData.description,
          regulationSlugs:
            formData.regulations.length > 0
              ? formData.regulations
              : undefined,
          serviceTypes:
            formData.serviceTypes.length > 0
              ? formData.serviceTypes
              : undefined,
          jurisdictions:
            formData.jurisdictions.length > 0
              ? formData.jurisdictions
              : undefined,
          timeline: formData.timeline || undefined,
          budget: formData.budget || undefined,
        }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(json.error ?? "Submission failed");
      }
      setDone(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Unexpected error — please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return <SuccessScreen email={formData.contactEmail} />;
  }

  return (
    <div className="col" style={{ gap: 32, maxWidth: 700 }}>
      {/* Contact info */}
      <div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Contact information
        </div>
        <div className="col" style={{ gap: 12 }}>
          <div className="grid grid-2col" style={{ gap: 12 }}>
            <div className="col" style={{ gap: 4 }}>
              <input
                className="input"
                placeholder="Your name *"
                value={formData.contactName}
                onChange={(e) => patch({ contactName: e.target.value })}
              />
              <FieldError msg={errors.contactName} />
            </div>
            <div className="col" style={{ gap: 4 }}>
              <input
                className="input"
                placeholder="Work email *"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => patch({ contactEmail: e.target.value })}
              />
              <FieldError msg={errors.contactEmail} />
            </div>
          </div>
          <div className="col" style={{ gap: 4 }}>
            <input
              className="input"
              placeholder="Company name *"
              value={formData.companyName}
              onChange={(e) => patch({ companyName: e.target.value })}
            />
            <FieldError msg={errors.companyName} />
          </div>
          <div className="grid grid-2col" style={{ gap: 12 }}>
            <select
              className="input"
              value={formData.companySize}
              onChange={(e) => patch({ companySize: e.target.value })}
            >
              <option value="">Company size</option>
              {COMPANY_SIZE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <input
              className="input"
              placeholder="Industry"
              value={formData.industry}
              onChange={(e) => patch({ industry: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Compliance need */}
      <div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Compliance need
        </div>
        <div className="col" style={{ gap: 4 }}>
          <textarea
            className="input"
            rows={4}
            placeholder="Describe your AI compliance need — what you're building, what regulations apply, what help you need *"
            value={formData.description}
            onChange={(e) => patch({ description: e.target.value })}
          />
          <FieldError msg={errors.description} />
        </div>
      </div>

      {/* Regulations */}
      <div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Relevant regulations
        </div>
        <p
          className="small"
          style={{ color: "var(--ink-2)", marginTop: -4, marginBottom: 12 }}
        >
          Select any regulations that apply to your project.
        </p>
        <RegulationChipSelector
          selected={formData.regulations}
          onChange={(regulations) => patch({ regulations })}
        />
      </div>

      {/* Service types */}
      <div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Service types needed
        </div>
        <div className="flex" style={{ gap: 16, flexWrap: "wrap" }}>
          {SERVICE_OPTIONS.map((svc) => (
            <label
              key={svc.value}
              className="flex items-center small"
              style={{
                gap: 8,
                cursor: "pointer",
                fontWeight: formData.serviceTypes.includes(svc.value)
                  ? 600
                  : 400,
              }}
            >
              <input
                type="checkbox"
                checked={formData.serviceTypes.includes(svc.value)}
                onChange={() => toggleArrayValue("serviceTypes", svc.value)}
              />
              {svc.label}
            </label>
          ))}
        </div>
      </div>

      {/* Jurisdictions */}
      <div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Jurisdictions
        </div>
        <div className="flex" style={{ gap: 16, flexWrap: "wrap" }}>
          {JURISDICTION_OPTIONS.map((j) => (
            <label
              key={j.value}
              className="flex items-center small"
              style={{
                gap: 8,
                cursor: "pointer",
                fontWeight: formData.jurisdictions.includes(j.value)
                  ? 600
                  : 400,
              }}
            >
              <input
                type="checkbox"
                checked={formData.jurisdictions.includes(j.value)}
                onChange={() => toggleArrayValue("jurisdictions", j.value)}
              />
              {j.label}
            </label>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Timeline
        </div>
        <div className="flex" style={{ gap: 16, flexWrap: "wrap" }}>
          {TIMELINE_OPTIONS.map((t) => (
            <label
              key={t.value}
              className="flex items-center small"
              style={{
                gap: 8,
                cursor: "pointer",
                fontWeight: formData.timeline === t.value ? 600 : 400,
              }}
            >
              <input
                type="radio"
                name="timeline"
                value={t.value}
                checked={formData.timeline === t.value}
                onChange={() => patch({ timeline: t.value })}
              />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Budget range
        </div>
        <div className="flex" style={{ gap: 16, flexWrap: "wrap" }}>
          {BUDGET_OPTIONS.map((b) => (
            <label
              key={b.value}
              className="flex items-center small"
              style={{
                gap: 8,
                cursor: "pointer",
                fontWeight: formData.budget === b.value ? 600 : 400,
              }}
            >
              <input
                type="radio"
                name="budget"
                value={b.value}
                checked={formData.budget === b.value}
                onChange={() => patch({ budget: b.value })}
              />
              {b.label}
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      {submitError && (
        <div
          style={{
            padding: "10px 14px",
            background: "var(--error-bg, #fef2f2)",
            borderRadius: 6,
            color: "var(--error, #c0392b)",
            fontSize: 13,
          }}
        >
          {submitError}
        </div>
      )}

      <button
        className="btn btn-primary btn-lg"
        type="button"
        disabled={submitting}
        onClick={handleSubmit}
      >
        {submitting ? "Submitting..." : "Submit RFP"}
      </button>

      <div className="mono xs" style={{ color: "var(--ink-soft)" }}>
        Free to submit. We'll match you with relevant providers within 2
        business days.
      </div>
    </div>
  );
}
