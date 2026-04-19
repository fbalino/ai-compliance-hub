import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { RfpForm } from "./RfpForm";

export const revalidate = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "Post an RFP — Request for Proposal | AI Compliance Hub",
  description:
    "Submit a Request for Proposal and get matched with top AI compliance providers. Describe your needs, timeline, and budget — we'll connect you with the right experts.",
  alternates: { canonical: `${SITE_URL}/rfp` },
  openGraph: {
    title: "Post an RFP — Find AI Compliance Providers",
    description:
      "Describe your compliance needs and get matched with vetted providers. Free to submit.",
    type: "website",
    url: `${SITE_URL}/rfp`,
  },
};

export default function RfpPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Post an RFP", url: "/rfp" },
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Post an RFP — Request for Proposal",
    description:
      "Submit a Request for Proposal and get matched with top AI compliance providers.",
    url: `${SITE_URL}/rfp`,
  };

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      <section
        className="container"
        style={{ maxWidth: 860, padding: "var(--s-8) var(--s-7)" }}
      >
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Post an RFP" },
          ]}
        />

        <div className="eyebrow" style={{ marginTop: 16, marginBottom: 12 }}>
          For businesses
        </div>
        <h1 className="display" style={{ fontSize: 64 }}>
          Post an RFP.
        </h1>
        <p
          className="lede"
          style={{ maxWidth: 700, marginTop: 16, color: "var(--ink-2)" }}
        >
          Describe your AI compliance needs and we'll match you with vetted
          providers. Free to submit — no commitment required.
        </p>

        <div style={{ marginTop: 48 }}>
          <RfpForm />
        </div>
      </section>
    </>
  );
}
