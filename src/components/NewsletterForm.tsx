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
          color: "var(--sage)",
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
        <div className="flex" style={{ gap: 10, flexWrap: "wrap" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@company.com"
            className="input"
            style={{
              flex: "1 1 200px",
              background: "var(--line-inverse)",
              border: "1px solid var(--ink-inverse-soft)",
              color: "var(--ink-inverse)",
              borderRadius: 999,
            }}
            aria-label="Your email address"
            disabled={state === "submitting"}
          />
          <button
            type="submit"
            disabled={state === "submitting"}
            className="btn btn-accent"
          >
            {state === "submitting" ? "Subscribing\u2026" : "Subscribe Free"}
          </button>
        </div>
        {state === "error" && (
          <p className="xs" style={{ marginTop: 8, color: "var(--stone)" }}>
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex" style={{ gap: 8, flexWrap: "wrap" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@company.com"
          className="input"
          style={{ flex: "1 1 200px" }}
          aria-label="Your email address"
          disabled={state === "submitting"}
        />
        <button type="submit" disabled={state === "submitting"} className="btn btn-primary">
          {state === "submitting" ? "Subscribing\u2026" : "Subscribe"} →
        </button>
      </div>
      {state === "error" && (
        <p className="xs" style={{ marginTop: 8, color: "var(--stone)" }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
