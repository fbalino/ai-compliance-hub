import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AI Compliance Hub privacy policy — how we collect, use, and protect your data.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-neutral-500">Last updated: April 13, 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="prose prose-neutral max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly (such as your email address when subscribing to our newsletter), information collected automatically (such as usage data via PostHog analytics), and information you submit through our compliance checker tool.
          </p>
          <p>
            The compliance checker tool collects answers you provide about your business. These answers are processed locally in your browser and are not stored on our servers unless you explicitly request a saved report.
          </p>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To send our newsletter and compliance updates (with your consent)</li>
            <li>To improve our website and tools through anonymous usage analytics</li>
            <li>To respond to your inquiries</li>
            <li>To match businesses with relevant compliance providers (future feature, with consent)</li>
          </ul>

          <h2>3. Analytics</h2>
          <p>
            We use PostHog for product analytics. PostHog collects anonymous usage data including page views, click patterns, and feature usage. We do not use this data to identify individual users. You can opt out of analytics tracking by using a browser extension that blocks tracking scripts.
          </p>

          <h2>4. Email Newsletter</h2>
          <p>
            If you subscribe to our newsletter, we store your email address to send you weekly compliance updates. You can unsubscribe at any time by clicking the unsubscribe link in any email. We do not sell or share your email address with third parties.
          </p>

          <h2>5. Cookies</h2>
          <p>
            We use essential cookies required for the website to function and analytics cookies (PostHog) to understand usage patterns. We do not use advertising or tracking cookies.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            Newsletter subscriber email addresses are retained until you unsubscribe. Analytics data is retained for 12 months. We delete data on request.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct, delete, or export your personal data. To exercise these rights, contact us at{" "}
            <a href="mailto:privacy@aicompliancehub.com">privacy@aicompliancehub.com</a>.
          </p>

          <h2>8. Not Legal Advice</h2>
          <p>
            The content on this website, including regulation guides, the compliance checker, and glossary entries, is for informational purposes only and does not constitute legal advice. Always consult a qualified attorney for compliance decisions.
          </p>

          <h2>9. Contact</h2>
          <p>
            For privacy-related questions, contact us at{" "}
            <a href="mailto:privacy@aicompliancehub.com">privacy@aicompliancehub.com</a>.
          </p>
        </div>
      </div>
    </>
  );
}
