import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { CheckerClient } from "./CheckerClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "Free AI Compliance Checker — Which AI Laws Apply to You?",
  description:
    "Answer 4 questions to find out which AI regulations apply to your business — EU AI Act, Colorado AI Act, NYC Local Law 144, and more. Free, instant results.",
  alternates: {
    canonical: `${SITE_URL}/checker`,
  },
};

export default function CheckerPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Compliance Checker", url: "/checker" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Compliance Checker" }]}
          />
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 mb-3">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Free · No account required · Instant results
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              Which AI laws apply to your business?
            </h1>
            <p className="mt-2 text-neutral-600 leading-relaxed max-w-xl">
              Answer 4 short questions about your organization and AI use. We&apos;ll map them to the regulations that matter — and tell you exactly what you need to do.
            </p>
          </div>
        </div>
      </div>

      {/* Checker */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <CheckerClient />
      </div>
    </>
  );
}
