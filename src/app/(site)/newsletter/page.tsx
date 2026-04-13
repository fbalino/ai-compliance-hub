import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "AI Compliance Newsletter — Weekly Regulation Updates",
  description:
    "Subscribe to our free weekly newsletter covering new AI laws, enforcement actions, compliance deadlines, and expert guides. Stay ahead of AI regulation.",
  alternates: {
    canonical: `${SITE_URL}/newsletter`,
  },
};

const WHAT_TO_EXPECT = [
  {
    icon: "📋",
    title: "Regulation Roundup",
    description: "New laws, proposed rules, and regulatory guidance from the US and EU — summarized in plain English.",
  },
  {
    icon: "⚖️",
    title: "Enforcement Watch",
    description: "Fines, investigations, and enforcement actions as they happen. Know what regulators are actually going after.",
  },
  {
    icon: "📅",
    title: "Deadline Calendar",
    description: "Upcoming compliance deadlines you can't miss — 90-day, 30-day, and 7-day alerts.",
  },
  {
    icon: "🛠",
    title: "Compliance How-To",
    description: "Practical guides, templates, and step-by-step instructions from our compliance team.",
  },
];

export default function NewsletterPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Newsletter", url: "/newsletter" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Newsletter" }]}
          />
        </div>
      </div>

      {/* Hero */}
      <div className="bg-brand-900 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-700">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Stay ahead of AI regulation
          </h1>
          <p className="mt-4 text-brand-200 leading-relaxed">
            The AI compliance landscape changes weekly. Our free newsletter distills what matters — enforcement actions, new laws, compliance deadlines — so you don&apos;t have to track it all yourself.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-brand-300">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Weekly, every Monday
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Unsubscribe anytime
            </span>
          </div>

          {/* Subscribe form */}
          <form
            action="/api/subscribe"
            method="POST"
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="flex-1 rounded-xl border border-brand-700 bg-brand-800/60 px-4 py-3 text-sm text-white placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
              aria-label="Your email address"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-900 hover:bg-brand-50 transition-colors shadow-sm"
            >
              Subscribe Free
            </button>
          </form>
          <p className="mt-3 text-xs text-brand-400">
            Join compliance and legal professionals at companies navigating AI regulation.
          </p>
        </div>
      </div>

      {/* What to expect */}
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-neutral-900 text-center mb-8">
          What you&apos;ll get every week
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {WHAT_TO_EXPECT.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5"
            >
              <span className="text-2xl shrink-0" role="img" aria-label={item.title}>
                {item.icon}
              </span>
              <div>
                <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
