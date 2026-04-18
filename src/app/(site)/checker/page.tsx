import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { CheckerClient } from "./CheckerClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "Free AI Compliance Checker — Which AI Laws Apply to You?",
  description:
    "Answer 4 questions to find out which AI regulations apply to your business — EU AI Act, Colorado AI Act, NYC Local Law 144, and more. Free, instant results.",
  alternates: { canonical: `${SITE_URL}/checker` },
};

export default function CheckerPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Compliance Checker", url: "/checker" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="rg-page-head">
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compliance Checker" }]} />
          <div style={{ marginTop: 14 }}>
            <span className="rg-pill-status rg-pill-clear" style={{ marginBottom: 12 }}>Free &middot; No account required &middot; Instant results</span>
            <h1>Which AI laws apply to your business?</h1>
            <p className="rg-page-desc">
              Answer 4 short questions about your organization and AI use. We&apos;ll map them to the regulations that matter &mdash; and tell you exactly what you need to do.
            </p>
          </div>
        </div>
      </div>

      <div className="rg-page-body">
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
          <CheckerClient />
        </div>
      </div>
    </>
  );
}
