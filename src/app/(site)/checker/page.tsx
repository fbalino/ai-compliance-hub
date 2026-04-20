import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { CheckerClient } from "./CheckerClient";
import { SITE_URL } from "@/lib/brand";


export const metadata: Metadata = {
  title: "Free AI Compliance Checker — Which AI Laws Apply to You?",
  description:
    "Answer 4 questions to find out which AI regulations apply to your business — EU AI Act, Colorado AI Act, NYC Local Law 144, and more. Free, instant results.",
  alternates: { canonical: `${SITE_URL}/checker` },
};

export default async function CheckerPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const description = params.q?.trim() || undefined;

  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Compliance Checker", url: "/checker" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="page-banner">
        <div className="container-narrow">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compliance Checker" }]} />
          <div style={{ marginTop: 14 }}>
            <span className="chip chip-sage" style={{ marginBottom: 12 }}>Free · No account required · Instant results</span>
            <h1 className="h1">
              {description
                ? "Analyzing your situation…"
                : "Which AI laws apply to your business?"}
            </h1>
            <p className="lede" style={{ marginTop: 8 }}>
              {description
                ? `"${description.length > 120 ? description.slice(0, 120) + "…" : description}"`
                : "Answer 4 short questions about your organization and AI use. We'll map them to the regulations that matter — and tell you exactly what you need to do."}
            </p>
          </div>
        </div>
      </div>

      <div className="container-narrow" style={{ padding: "var(--s-8) var(--s-7)" }}>
        <CheckerClient description={description} />
      </div>
    </>
  );
}
