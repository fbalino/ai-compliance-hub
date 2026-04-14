"use client";

import { useState, FormEvent } from "react";
import posthog from "posthog-js";

type Source = "homepage" | "blog" | "newsletter_page";
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
      <p className={`text-sm font-semibold text-green-400 ${className ?? ""}`}>
        You&apos;re subscribed! Check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={`flex flex-col sm:flex-row ${isHero ? "gap-3" : "gap-2"}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@company.com"
          className={
            isHero
              ? "flex-1 rounded-xl border border-brand-700 bg-brand-800/60 px-4 py-3 text-sm text-white placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
              : "flex-1 rounded-lg border border-brand-700 bg-brand-800 px-4 py-2.5 text-sm text-white placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
          }
          aria-label="Your email address"
          disabled={state === "submitting"}
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className={
            isHero
              ? "shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-900 hover:bg-brand-50 transition-colors shadow-sm disabled:opacity-60"
              : "shrink-0 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-brand-900 hover:bg-brand-50 transition-colors disabled:opacity-60"
          }
        >
          {state === "submitting" ? "Subscribing\u2026" : isHero ? "Subscribe Free" : "Subscribe"}
        </button>
      </div>
      {state === "error" && (
        <p className="mt-2 text-xs text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
