"use client";

import { useState, FormEvent } from "react";
import posthog from "posthog-js";

type Source = "homepage" | "blog" | "newsletter_page" | "regulation_page" | "checker_results";
type Variant = "default" | "hero";

interface NewsletterFormProps {
  source: Source;
  variant?: Variant;
  className?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export function NewsletterForm({ source, variant = "default", className }: NewsletterFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      posthog.capture("newsletter_subscribed", { source });
      setState("success");
    } catch {
      setState("error");
    }
  }

  const isHero = variant === "hero";

  if (state === "success") {
    return (
      <p
        className={className}
        style={{
          fontSize: 13.5,
          fontWeight: 600,
          color: "var(--rg-green)",
          padding: "10px 0",
        }}
      >
        You&apos;re subscribed! Check your inbox.
      </p>
    );
  }

  if (isHero) {
    return (
      <form onSubmit={handleSubmit} className={className}>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@company.com"
            className="flex-1 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Your email address"
            disabled={state === "submitting"}
          />
          <button
            type="submit"
            disabled={state === "submitting"}
            className="rg-btn rg-btn-on-dark rg-btn-lg"
          >
            {state === "submitting" ? "Subscribing\u2026" : "Subscribe Free"}
          </button>
        </div>
        {state === "error" && (
          <p className="mt-2 text-xs" style={{ color: "#fca5a5" }}>
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@company.com"
          className="rg-input"
          style={{ flex: "1 1 200px" }}
          aria-label="Your email address"
          disabled={state === "submitting"}
        />
        <button type="submit" disabled={state === "submitting"} className="rg-btn rg-btn-primary">
          {state === "submitting" ? "Subscribing\u2026" : "Subscribe"} <span className="rg-arrow">→</span>
        </button>
      </div>
      {state === "error" && (
        <p style={{ marginTop: 8, fontSize: 12, color: "var(--rg-red)" }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
