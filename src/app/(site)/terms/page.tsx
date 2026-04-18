import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "AI Compliance Hub terms of service — rules for using our website and tools.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="page-banner">
        <div className="container-narrow">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
          <h1 className="h1">Terms of Service</h1>
          <p className="xs" style={{ marginTop: 8 }}>Last updated: April 13, 2026</p>
        </div>
      </div>

      <div className="container-narrow" style={{ padding: "var(--s-8) var(--s-7)" }}>
        <div className="prose-compliance">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using AI Compliance Hub (&ldquo;the Service&rdquo;), you agree to these Terms of Service. If you do not agree, do not use the Service.</p>
          <h2>2. Not Legal Advice</h2>
          <p><strong>The content on this website — including regulation guides, the compliance checker, glossary definitions, provider listings, and blog posts — is for informational purposes only and does not constitute legal advice.</strong></p>
          <p>AI regulation is complex and changes frequently. The information provided may be incomplete, out of date, or not applicable to your specific situation. Always consult a qualified attorney or compliance professional before making compliance decisions. We are not responsible for any actions taken or not taken based on the content of this website.</p>
          <h2>3. Provider Directory</h2>
          <p>Provider listings in our directory are provided for informational purposes. We do not endorse, warrant, or guarantee the services of any listed provider. We conduct basic verification for providers with a &ldquo;Verified&rdquo; badge, but this is not a guarantee of quality or fitness for your needs. You are responsible for conducting your own due diligence before engaging any provider.</p>
          <h2>4. Compliance Checker</h2>
          <p>The compliance checker tool provides general, automated guidance based on the answers you provide. Results are not tailored legal advice and may not reflect the current state of the law in your jurisdiction. The tool covers a subset of AI regulations and may not identify all obligations applicable to your organization.</p>
          <h2>5. Intellectual Property</h2>
          <p>The content on this website — including regulation guides, blog posts, and glossary entries — is owned by AI Compliance Hub. You may share content with attribution. You may not reproduce content for commercial purposes without written permission.</p>
          <h2>6. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, AI Compliance Hub and its operators are not liable for any damages arising from your use of this website or reliance on its content, including but not limited to direct, indirect, incidental, or consequential damages.</p>
          <h2>7. Changes to Terms</h2>
          <p>We may update these terms periodically. Continued use of the Service after changes constitutes acceptance of the updated terms.</p>
          <h2>8. Contact</h2>
          <p>Questions about these terms? Contact us at{" "}<a href="mailto:legal@aicompliancehub.com">legal@aicompliancehub.com</a>.</p>
        </div>
      </div>
    </>
  );
}
