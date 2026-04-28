"use client";

import { useState, useRef, useCallback } from "react";
import { Search as SearchIcon, Star, Check, Upload, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Plan = "basic" | "featured" | "";

interface FormData {
  // Step 1
  companyName: string;
  website: string;
  headquarters: string;
  foundedYear: string;
  pitch: string;
  contactName: string;
  contactEmail: string;
  // Step 2
  regulations: string[];
  // Step 3
  services: string[];
  files: File[];
  // Step 4
  plan: Plan;
}

type StepErrors = Partial<Record<keyof FormData, string>>;

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

const SERVICE_OPTIONS: { value: string; label: string }[] = [
  { value: "advisory", label: "Advisory" },
  { value: "software", label: "Software" },
  { value: "audit", label: "Audit" },
  { value: "legal", label: "Legal" },
  { value: "training", label: "Training" },
];

const BASIC_FEATURES = [
  "Standard listing",
  "Appears on matched regulation pages",
  "Profile + contact form",
  "Ranked after Featured",
];

const FEATURED_FEATURES = [
  "★ Featured badge",
  "Top slot on 5 regulation pages",
  "Homepage featured row",
  "RFP priority",
  "Ledger Q&A interview",
  "Analytics dashboard",
];

const STEPS = ["About", "Regulations", "Proof", "Plan"];

// ─── Validation ───────────────────────────────────────────────────────────────

function validateStep(step: number, data: FormData): StepErrors {
  const errors: StepErrors = {};
  if (step === 0) {
    if (!data.companyName.trim()) errors.companyName = "Company name is required";
    if (!data.website.trim()) {
      errors.website = "Website is required";
    } else {
      try {
        const url = new URL(
          data.website.startsWith("http") ? data.website : `https://${data.website}`
        );
        if (!url.hostname.includes(".")) errors.website = "Enter a valid URL";
      } catch {
        errors.website = "Enter a valid URL";
      }
    }
    if (!data.headquarters.trim()) errors.headquarters = "HQ country is required";
    if (!data.contactName.trim()) errors.contactName = "Contact name is required";
    if (!data.contactEmail.trim()) {
      errors.contactEmail = "Contact email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail)) {
      errors.contactEmail = "Enter a valid email";
    }
    if (!data.pitch.trim()) errors.pitch = "Pitch is required";
  }
  if (step === 1) {
    if (data.regulations.length === 0)
      errors.regulations = "Select at least one regulation";
  }
  if (step === 2) {
    if (data.services.length === 0)
      errors.services = "Select at least one service type";
  }
  if (step === 3) {
    if (!data.plan) errors.plan = "Select a plan to continue";
  }
  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <span className="mono xs" style={{ color: "var(--error, #c0392b)", marginTop: 4, display: "block" }}>
      {msg}
    </span>
  );
}

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex" style={{ gap: 8, marginBottom: 32, alignItems: "center", flexWrap: "wrap" }}>
      {STEPS.map((label, i) => {
        const isActive = i === currentStep;
        const isDone = i < currentStep;
        return (
          <div key={label} className="flex items-center" style={{ gap: 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                background: isActive ? "var(--paper-inverse)" : isDone ? "var(--ink-soft)" : "transparent",
                color: isActive || isDone ? "var(--ink-inverse)" : "var(--ink-soft)",
                border: "1px solid",
                borderColor: isActive ? "var(--paper-inverse)" : isDone ? "var(--ink-soft)" : "var(--border, #e2e8f0)",
                transition: "all 0.15s ease",
              }}
            >
              {isDone ? <Check className="h-3 w-3" aria-hidden /> : null}
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                {i + 1}. {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className="mono xs" style={{ color: "var(--ink-soft)" }}>—</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step components ──────────────────────────────────────────────────────────

function StepAbout({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: StepErrors;
  onChange: (patch: Partial<FormData>) => void;
}) {
  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="eyebrow" style={{ marginBottom: 4 }}>§ Organisation</div>

      <div className="col" style={{ gap: 4 }}>
        <input
          className="input"
          placeholder="Company name *"
          value={data.companyName}
          onChange={(e) => onChange({ companyName: e.target.value })}
        />
        <FieldError msg={errors.companyName} />
      </div>

      <div className="col" style={{ gap: 4 }}>
        <input
          className="input"
          placeholder="Website *"
          type="url"
          value={data.website}
          onChange={(e) => onChange({ website: e.target.value })}
        />
        <FieldError msg={errors.website} />
      </div>

      <div className="grid grid-2col" style={{ gap: 12 }}>
        <div className="col" style={{ gap: 4 }}>
          <input
            className="input"
            placeholder="HQ country *"
            value={data.headquarters}
            onChange={(e) => onChange({ headquarters: e.target.value })}
          />
          <FieldError msg={errors.headquarters} />
        </div>
        <input
          className="input"
          placeholder="Founded year"
          type="number"
          min={1900}
          max={new Date().getFullYear()}
          value={data.foundedYear}
          onChange={(e) => onChange({ foundedYear: e.target.value })}
        />
      </div>

      <div className="col" style={{ gap: 4 }}>
        <textarea
          className="input"
          rows={3}
          placeholder="One-paragraph pitch (shown on profile & cards) *"
          value={data.pitch}
          onChange={(e) => onChange({ pitch: e.target.value })}
        />
        <FieldError msg={errors.pitch} />
      </div>

      <div className="eyebrow" style={{ marginTop: 8, marginBottom: 4 }}>§ Contact</div>

      <div className="grid grid-2col" style={{ gap: 12 }}>
        <div className="col" style={{ gap: 4 }}>
          <input
            className="input"
            placeholder="Your name *"
            value={data.contactName}
            onChange={(e) => onChange({ contactName: e.target.value })}
          />
          <FieldError msg={errors.contactName} />
        </div>
        <div className="col" style={{ gap: 4 }}>
          <input
            className="input"
            placeholder="Work email *"
            type="email"
            value={data.contactEmail}
            onChange={(e) => onChange({ contactEmail: e.target.value })}
          />
          <FieldError msg={errors.contactEmail} />
        </div>
      </div>
    </div>
  );
}

function StepRegulations({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: StepErrors;
  onChange: (patch: Partial<FormData>) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = ALL_REGULATIONS.filter(
    (r) =>
      !data.regulations.includes(r) &&
      r.toLowerCase().includes(query.toLowerCase())
  );

  const add = (reg: string) => {
    onChange({ regulations: [...data.regulations, reg] });
    setQuery("");
  };

  const remove = (reg: string) => {
    onChange({ regulations: data.regulations.filter((r) => r !== reg) });
  };

  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="eyebrow" style={{ marginBottom: 4 }}>§ Regulations you help with</div>
      <p className="small" style={{ color: "var(--ink-2)", marginTop: -8 }}>
        Select the regulations your practice covers. These drive your matches in the directory.
      </p>

      <div className="card" style={{ padding: 16 }}>
        <div className="search" style={{ marginBottom: 12 }}>
          <SearchIcon className="h-3.5 w-3.5" style={{ color: "var(--ink-soft)", flexShrink: 0 }} aria-hidden />
          <input
            placeholder="Search regulations…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, border: 0, background: "transparent", outline: "none", font: "inherit", color: "var(--ink)" }}
          />
        </div>

        {data.regulations.length > 0 && (
          <div className="tag-strip" style={{ marginBottom: 12 }}>
            {data.regulations.map((r) => (
              <button
                key={r}
                className="chip"
                style={{ background: "var(--paper-inverse)", color: "var(--ink-inverse)", display: "flex", alignItems: "center", gap: 4 }}
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
          <div className="col" style={{ gap: 4, maxHeight: 200, overflowY: "auto" }}>
            {filtered.slice(0, 8).map((r) => (
              <button
                key={r}
                type="button"
                className="btn btn-ghost"
                style={{ textAlign: "left", justifyContent: "flex-start", padding: "6px 10px", fontSize: 13 }}
                onClick={() => add(r)}
              >
                + {r}
              </button>
            ))}
          </div>
        )}

        {!query && (
          <div className="tag-strip">
            {ALL_REGULATIONS.filter((r) => !data.regulations.includes(r))
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

      <FieldError msg={errors.regulations} />
    </div>
  );
}

function StepProof({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: StepErrors;
  onChange: (patch: Partial<FormData>) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleService = (value: string) => {
    const next = data.services.includes(value)
      ? data.services.filter((s) => s !== value)
      : [...data.services, value];
    onChange({ services: next });
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files ?? []);
    const combined = [
      ...data.files,
      ...incoming.filter((f) => !data.files.some((ex) => ex.name === f.name)),
    ].slice(0, 5);
    onChange({ files: combined });
    if (fileRef.current) fileRef.current.value = "";
  };

  const removeFile = (name: string) => {
    onChange({ files: data.files.filter((f) => f.name !== name) });
  };

  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="eyebrow" style={{ marginBottom: 4 }}>§ Service types</div>
      <div className="flex" style={{ gap: 16, flexWrap: "wrap" }}>
        {SERVICE_OPTIONS.map((svc) => (
          <label
            key={svc.value}
            className="flex items-center small"
            style={{ gap: 8, cursor: "pointer", fontWeight: data.services.includes(svc.value) ? 600 : 400 }}
          >
            <input
              type="checkbox"
              checked={data.services.includes(svc.value)}
              onChange={() => toggleService(svc.value)}
            />
            {svc.label}
          </label>
        ))}
      </div>
      <FieldError msg={errors.services} />

      <div className="eyebrow" style={{ marginTop: 8, marginBottom: 4 }}>§ Case studies &amp; logos</div>
      <p className="small" style={{ color: "var(--ink-2)", marginTop: -8 }}>
        Optional — upload 2–3 case studies or client logos (PDF, PNG, JPG up to 5 MB each).
      </p>

      <div
        className="card"
        style={{ padding: 20, borderStyle: "dashed", textAlign: "center", cursor: "pointer" }}
        onClick={() => fileRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <Upload className="h-5 w-5" style={{ color: "var(--ink-soft)", margin: "0 auto 8px" }} aria-hidden />
        <div className="small" style={{ marginBottom: 8, color: "var(--ink-2)" }}>
          {data.files.length === 0 ? "Click to choose files" : `${data.files.length} file(s) selected`}
        </div>
        <button className="btn btn-ghost btn-sm" type="button" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}>
          Choose files
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg"
          style={{ display: "none" }}
          onChange={handleFiles}
        />
      </div>

      {data.files.length > 0 && (
        <div className="col" style={{ gap: 6 }}>
          {data.files.map((f) => (
            <div
              key={f.name}
              className="flex items-center"
              style={{
                gap: 8,
                padding: "8px 12px",
                background: "var(--surface, #f8fafc)",
                borderRadius: 6,
                fontSize: 13,
                border: "1px solid var(--border, #e2e8f0)",
              }}
            >
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
              <span className="mono xs" style={{ color: "var(--ink-soft)", flexShrink: 0 }}>
                {(f.size / 1024).toFixed(0)} KB
              </span>
              <button
                type="button"
                onClick={() => removeFile(f.name)}
                aria-label={`Remove ${f.name}`}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)", padding: 2 }}
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StepPlan({
  data,
  errors,
  onChange,
  submitting,
  onSubmit,
}: {
  data: FormData;
  errors: StepErrors;
  onChange: (patch: Partial<FormData>) => void;
  submitting: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="col" style={{ gap: 24 }}>
      <div className="eyebrow" style={{ marginBottom: 4 }}>§ Choose your plan</div>
      <FieldError msg={errors.plan} />

      <div className="grid grid-2col" style={{ gap: 16 }}>
        {/* Basic */}
        <div
          className="card"
          style={{
            outline: data.plan === "basic" ? "2px solid var(--ink)" : "none",
            cursor: "pointer",
            transition: "outline 0.1s",
          }}
          onClick={() => onChange({ plan: "basic" })}
          role="radio"
          aria-checked={data.plan === "basic"}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onChange({ plan: "basic" })}
        >
          <div className="eyebrow" style={{ marginBottom: 8 }}>Plan · Basic</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 500 }}>Free</div>
          <ul className="col" style={{ gap: 8, marginTop: 12, paddingLeft: 18, fontSize: 14 }}>
            {BASIC_FEATURES.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <button
            className={`btn w-full ${data.plan === "basic" ? "btn-primary" : ""}`}
            style={{ marginTop: 20 }}
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange({ plan: "basic" }); }}
          >
            {data.plan === "basic" ? <><Check className="h-3.5 w-3.5" aria-hidden /> Selected</> : "Select Basic"}
          </button>
        </div>

        {/* Featured */}
        <div
          className="card card-feature"
          style={{
            outline: data.plan === "featured" ? "2px solid var(--accent)" : "none",
            cursor: "pointer",
            transition: "outline 0.1s",
          }}
          onClick={() => onChange({ plan: "featured" })}
          role="radio"
          aria-checked={data.plan === "featured"}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onChange({ plan: "featured" })}
        >
          <div className="feature-flag" style={{ marginBottom: 8 }}>Featured</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 500, color: "var(--accent)" }}>
            $490<span style={{ fontSize: 16, color: "var(--ink-soft)" }}>/mo</span>
          </div>
          <ul className="col" style={{ gap: 8, marginTop: 12, paddingLeft: 18, fontSize: 14 }}>
            {FEATURED_FEATURES.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <button
            className={`btn w-full ${data.plan === "featured" ? "btn-accent" : "btn-accent"}`}
            style={{ marginTop: 20 }}
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange({ plan: "featured" }); }}
          >
            {data.plan === "featured" ? <><Check className="h-3.5 w-3.5" aria-hidden /> Selected</> : "Go Featured →"}
          </button>
        </div>
      </div>

      {data.plan === "featured" && (
        <div className="card" style={{ padding: 12, background: "var(--surface, #f8fafc)", fontSize: 13, color: "var(--ink-2)" }}>
          <strong>Featured billing:</strong> After submission our team will contact you at <em>{data.contactEmail}</em> to set up your subscription.
        </div>
      )}

      <button
        className="btn btn-primary btn-lg"
        style={{ marginTop: 8 }}
        type="button"
        disabled={submitting || !data.plan}
        onClick={onSubmit}
      >
        {submitting ? "Submitting…" : "Submit for review →"}
      </button>

      <div className="mono xs" style={{ color: "var(--ink-soft)" }}>
        We review all submissions within 3 business days.
      </div>
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ plan, email }: { plan: Plan; email: string }) {
  return (
    <div className="card" style={{ padding: 40, textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 500, marginBottom: 12 }}>
        You're in the queue
      </h2>
      <p style={{ color: "var(--ink-2)", fontSize: 15, marginBottom: 20 }}>
        We received your registration and will review it within 3 business days. We'll contact you at <strong>{email}</strong>.
      </p>
      {plan === "featured" && (
        <p style={{ color: "var(--ink-2)", fontSize: 14, padding: "12px 16px", background: "var(--surface, #f8fafc)", borderRadius: 8 }}>
          Our team will reach out separately to set up your Featured subscription.
        </p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const EMPTY: FormData = {
  companyName: "",
  website: "",
  headquarters: "",
  foundedYear: "",
  pitch: "",
  contactName: "",
  contactEmail: "",
  regulations: [],
  services: [],
  files: [],
  plan: "",
};

export function JoinForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const patch = useCallback((update: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...update }));
    // Clear errors for updated fields
    const keys = Object.keys(update) as (keyof FormData)[];
    setErrors((prev) => {
      const next = { ...prev };
      keys.forEach((k) => delete next[k]);
      return next;
    });
  }, []);

  const goNext = () => {
    const errs = validateStep(step, formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    const errs = validateStep(3, formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    try {
      const body = new FormData();
      body.append("companyName", formData.companyName);
      body.append("website", formData.website);
      body.append("headquarters", formData.headquarters);
      body.append("foundedYear", formData.foundedYear);
      body.append("pitch", formData.pitch);
      body.append("contactName", formData.contactName);
      body.append("contactEmail", formData.contactEmail);
      body.append("regulations", JSON.stringify(formData.regulations));
      body.append("services", JSON.stringify(formData.services));
      body.append("plan", formData.plan);
      formData.files.forEach((f) => body.append("files", f));

      const res = await fetch("/api/register", { method: "POST", body });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error ?? "Submission failed");
      }
      setDone(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unexpected error — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return <SuccessScreen plan={formData.plan} email={formData.contactEmail} />;
  }

  return (
    <div className="grid-article-sidebar" style={{ gap: 56 }}>
      <div>
        <StepIndicator currentStep={step} />

        {step === 0 && <StepAbout data={formData} errors={errors} onChange={patch} />}
        {step === 1 && <StepRegulations data={formData} errors={errors} onChange={patch} />}
        {step === 2 && <StepProof data={formData} errors={errors} onChange={patch} />}
        {step === 3 && (
          <StepPlan
            data={formData}
            errors={errors}
            onChange={patch}
            submitting={submitting}
            onSubmit={handleSubmit}
          />
        )}

        {submitError && (
          <div style={{ marginTop: 16, padding: "10px 14px", background: "var(--error-bg, #fef2f2)", borderRadius: 6, color: "var(--error, #c0392b)", fontSize: 13 }}>
            {submitError}
          </div>
        )}

        {/* Nav buttons (not shown on final step — StepPlan has its own submit) */}
        {step < 3 && (
          <div className="flex items-center" style={{ gap: 12, marginTop: 32 }}>
            {step > 0 && (
              <button className="btn btn-ghost" type="button" onClick={goBack}>
                ← Back
              </button>
            )}
            <button className="btn btn-primary btn-lg" type="button" onClick={goNext}>
              {step === 2 ? "Choose plan →" : "Next →"}
            </button>
          </div>
        )}

        {step === 3 && step > 0 && (
          <button className="btn btn-ghost" type="button" onClick={goBack} style={{ marginTop: 12 }}>
            ← Back
          </button>
        )}
      </div>

      {/* Static sidebar */}
      <aside>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Plan · Basic</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 500 }}>Free</div>
          <ul className="col" style={{ gap: 8, marginTop: 12, paddingLeft: 18, fontSize: 14 }}>
            {BASIC_FEATURES.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <div className="card card-feature">
          <div className="feature-flag" style={{ marginBottom: 8 }}>Featured</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 500, color: "var(--accent)" }}>
            $490<span style={{ fontSize: 16, color: "var(--ink-soft)" }}>/mo</span>
          </div>
          <ul className="col" style={{ gap: 8, marginTop: 12, paddingLeft: 18, fontSize: 14 }}>
            {FEATURED_FEATURES.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <div className="mono xs" style={{ textAlign: "center", marginTop: 16, color: "var(--ink-soft)" }}>
          We review all submissions within 3 business days.
        </div>
      </aside>
    </div>
  );
}
