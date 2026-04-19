"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import posthog from "posthog-js";

interface RequestQuoteFormProps {
  providerSlug: string;
  providerServices: string[];
}

const SERVICE_LABELS: Record<string, string> = {
  "bias-audit": "Bias Audit",
  "governance-consulting": "Governance Consulting",
  legal: "Legal Advisory",
  software: "Compliance Software",
  training: "Training & Education",
  "risk-assessment": "Risk Assessment",
  "policy-development": "Policy Development",
  "technical-review": "Technical Review",
};

function formatService(svc: string): string {
  return SERVICE_LABELS[svc] ?? svc.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

type FormState = "idle" | "submitting" | "success" | "error";

export function RequestQuoteForm({ providerSlug, providerServices }: RequestQuoteFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const company = (data.get("company") as string)?.trim();
    const serviceType = (data.get("serviceType") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email";
    if (!company) newErrors.company = "Company is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setState("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerSlug,
          name,
          email,
          company,
          serviceType: serviceType || undefined,
          message: message || undefined,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      posthog.capture("rfq_submitted", {
        provider_slug: providerSlug,
        service_type: serviceType || undefined,
      });
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
        <svg
          className="mx-auto mb-2 h-8 w-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-sm font-semibold text-green-800">Request sent!</p>
        <p className="mt-1 text-xs text-green-700">
          The provider will contact you within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      {/* Name */}
      <div>
        <label htmlFor="rfq-name" className="block text-xs font-medium text-ink-2 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="rfq-name"
          name="name"
          type="text"
          autoComplete="name"
          className={[
            "w-full rounded-md border px-3 py-2 text-sm text-ink placeholder-ink-faint",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
            errors.name ? "border-red-400 bg-red-50" : "border-line bg-paper",
          ].join(" ")}
          placeholder="Jane Smith"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="rfq-email" className="block text-xs font-medium text-ink-2 mb-1">
          Work Email <span className="text-red-500">*</span>
        </label>
        <input
          id="rfq-email"
          name="email"
          type="email"
          autoComplete="email"
          className={[
            "w-full rounded-md border px-3 py-2 text-sm text-ink placeholder-ink-faint",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
            errors.email ? "border-red-400 bg-red-50" : "border-line bg-paper",
          ].join(" ")}
          placeholder="jane@company.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="rfq-company" className="block text-xs font-medium text-ink-2 mb-1">
          Company <span className="text-red-500">*</span>
        </label>
        <input
          id="rfq-company"
          name="company"
          type="text"
          autoComplete="organization"
          className={[
            "w-full rounded-md border px-3 py-2 text-sm text-ink placeholder-ink-faint",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
            errors.company ? "border-red-400 bg-red-50" : "border-line bg-paper",
          ].join(" ")}
          placeholder="Acme Corp"
        />
        {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company}</p>}
      </div>

      {/* Service */}
      {providerServices.length > 0 && (
        <div>
          <label htmlFor="rfq-service" className="block text-xs font-medium text-ink-2 mb-1">
            Service needed
          </label>
          <select
            id="rfq-service"
            name="serviceType"
            className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="">Select a service…</option>
            {providerServices.map((svc) => (
              <option key={svc} value={svc}>
                {formatService(svc)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="rfq-message" className="block text-xs font-medium text-ink-2 mb-1">
          Message
        </label>
        <textarea
          id="rfq-message"
          name="message"
          rows={3}
          className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          placeholder="Describe your compliance project…"
        />
      </div>

      {state === "error" && (
        <p className="text-xs text-red-600">Something went wrong. Please try again.</p>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Sending…" : "Request Quote"}
      </Button>
    </form>
  );
}
