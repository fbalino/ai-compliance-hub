import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { JoinForm } from "./JoinForm";
import { SITE_URL } from "@/lib/brand";

export const revalidate = false;


export const metadata: Metadata = {
  title: "List Your Practice — Provider Sign-Up",
  description:
    "Join the Regulome directory. Free listing for verified providers. Upgrade to Featured for top placement on regulation pages, homepage visibility, and priority RFPs.",
  alternates: { canonical: `${SITE_URL}/join` },
  openGraph: {
    title: "List Your Practice in the Register",
    description: "Free for verified providers. Upgrade to Featured for premium placement and lead generation.",
    type: "website",
    url: `${SITE_URL}/join`,
  },
};

export default function JoinPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "For Providers", url: "/for-providers" },
    { name: "Sign Up", url: "/join" },
  ]);

  const schema = {
    "@context": "https://schema.org", "@type": "WebPage",
    name: "List Your Practice — Provider Sign-Up",
    description: "Join the Regulome provider directory.",
    url: `${SITE_URL}/join`,
  };

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      <section className="container" style={{ maxWidth: 1100, padding: "var(--s-8) var(--s-7)" }}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "For Providers", href: "/for-providers" }, { label: "Sign Up" }]} />

        <div className="eyebrow" style={{ marginTop: 16, marginBottom: 12 }}>For Providers</div>
        <h1 className="display" style={{ fontSize: 64 }}>List your practice in the register.</h1>
        <p className="lede" style={{ maxWidth: 700, marginTop: 16, color: "var(--ink-2)" }}>
          Free for any verified provider. Upgrade to Featured to appear on matched regulation pages, the homepage, and in Ledger spotlights.
        </p>

        <div style={{ marginTop: 48 }}>
          <JoinForm />
        </div>
      </section>
    </>
  );
}
