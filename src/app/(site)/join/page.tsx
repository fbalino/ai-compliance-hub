import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon, Star, Check, Upload } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "List Your Practice — Provider Sign-Up | AI Compliance Hub",
  description:
    "Join the AI Compliance Hub directory. Free listing for verified providers. Upgrade to Featured for top placement on regulation pages, homepage visibility, and priority RFPs.",
  alternates: { canonical: `${SITE_URL}/join` },
  openGraph: {
    title: "List Your Practice in the Register",
    description: "Free for verified providers. Upgrade to Featured for premium placement and lead generation.",
    type: "website",
    url: `${SITE_URL}/join`,
  },
};

const STEPS = [
  { num: "\u2460", label: "About", active: true },
  { num: "\u2461", label: "Regulations", active: false },
  { num: "\u2462", label: "Proof", active: false },
  { num: "\u2463", label: "Plan", active: false },
];

const SERVICE_TYPES = ["Advisory", "Software", "Audit", "Legal"];

const BASIC_FEATURES = [
  "Standard listing",
  "Appears in matched reg pages",
  "Profile + contact form",
  "Ranked after Featured",
];

const FEATURED_FEATURES = [
  "\u2605 Featured badge",
  "Top slot on 5 reg pages",
  "Homepage featured row",
  "RFP priority",
  "Ledger Q&A interview",
  "Analytics dashboard",
];

export default function JoinPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "For Providers", url: "/join" },
  ]);

  const schema = {
    "@context": "https://schema.org", "@type": "WebPage",
    name: "List Your Practice — Provider Sign-Up",
    description: "Join the AI Compliance Hub provider directory.",
    url: `${SITE_URL}/join`,
  };

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      <section className="container" style={{ maxWidth: 1100, padding: "var(--s-8) var(--s-7)" }}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "For Providers" }]} />

        <div className="eyebrow" style={{ marginTop: 16, marginBottom: 12 }}>For providers</div>
        <h1 className="display" style={{ fontSize: 64 }}>List your practice in the register.</h1>
        <p className="lede" style={{ maxWidth: 700, marginTop: 16, color: "var(--ink-2)" }}>
          Free for any verified provider. Upgrade to Featured to appear on matched regulation pages, the homepage, and in Ledger spotlights.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56, marginTop: 48 }}>
          {/* Form area */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 56 }}>
            <div>
              {/* Step indicators */}
              <div className="flex" style={{ gap: 8, marginBottom: 24, alignItems: "center" }}>
                {STEPS.map((step, i) => (
                  <div key={step.label} className="flex items-center" style={{ gap: 8 }}>
                    <button className={`btn ${step.active ? "btn-primary" : "btn-ghost"}`}>
                      {step.num} {step.label}
                    </button>
                    {i < STEPS.length - 1 && (
                      <span className="mono xs" style={{ color: "var(--ink-soft)" }}>&mdash;</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Organisation section */}
              <div className="eyebrow" style={{ marginBottom: 12 }}>&sect; Organisation</div>
              <div className="col" style={{ gap: 12, marginBottom: 24 }}>
                <input className="input" placeholder="Company name" />
                <input className="input" placeholder="Website" />
                <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input className="input" placeholder="HQ country" />
                  <input className="input" placeholder="Founded" />
                </div>
                <textarea className="input" rows={3} placeholder="One-paragraph pitch (shown on profile &amp; cards)" />
              </div>

              {/* Regulations section */}
              <div className="eyebrow" style={{ marginBottom: 12 }}>&sect; Regulations you help with</div>
              <div className="card" style={{ padding: 16, marginBottom: 24 }}>
                <div className="search" style={{ marginBottom: 12 }}>
                  <SearchIcon className="h-3.5 w-3.5" style={{ color: "var(--ink-soft)", flexShrink: 0 }} aria-hidden="true" />
                  <input
                    placeholder="Start typing a regulation\u2026"
                    style={{ flex: 1, border: 0, background: "transparent", outline: "none", font: "inherit", color: "var(--ink)" }}
                  />
                </div>
                <div className="tag-strip">
                  <span className="chip" style={{ background: "var(--ink)", color: "var(--paper)" }}>EU AI Act &times;</span>
                  <span className="chip" style={{ background: "var(--ink)", color: "var(--paper)" }}>NIS2 &times;</span>
                  <span className="chip" style={{ background: "var(--ink)", color: "var(--paper)" }}>GDPR &times;</span>
                  <span className="chip" style={{ cursor: "pointer" }}>+ add</span>
                </div>
              </div>

              {/* Services & proof section */}
              <div className="eyebrow" style={{ marginBottom: 12 }}>&sect; Services &amp; proof</div>
              <div className="flex" style={{ gap: 16, marginBottom: 12 }}>
                {SERVICE_TYPES.map((svc, i) => (
                  <label key={svc} className="flex items-center small" style={{ gap: 8 }}>
                    <input type="checkbox" defaultChecked={i < 2} />
                    {svc}
                  </label>
                ))}
              </div>
              <div className="card" style={{ padding: 20, borderStyle: "dashed", textAlign: "center" }}>
                <Upload className="h-5 w-5" style={{ color: "var(--ink-soft)", margin: "0 auto 8px" }} aria-hidden="true" />
                <div className="small" style={{ marginBottom: 8, color: "var(--ink-2)" }}>Upload 2&ndash;3 case studies or client logos</div>
                <button className="btn btn-ghost btn-sm">Choose files</button>
              </div>

              <button className="btn btn-primary btn-lg" style={{ marginTop: 32 }}>Submit for review &rarr;</button>
            </div>

            {/* Plan cards sidebar */}
            <aside>
              <div className="card" style={{ marginBottom: 16 }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Plan &middot; Basic</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 500 }}>Free</div>
                <ul className="col" style={{ gap: 8, marginTop: 12, paddingLeft: 18, fontSize: 14 }}>
                  {BASIC_FEATURES.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <button className="btn w-full" style={{ marginTop: 20 }}>Select Basic</button>
              </div>

              <div className="card card-feature">
                <div className="feature-flag" style={{ marginBottom: 8 }}>&star; Featured</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 500, color: "var(--accent)" }}>
                  $490<span style={{ fontSize: 16, color: "var(--ink-soft)" }}>/mo</span>
                </div>
                <ul className="col" style={{ gap: 8, marginTop: 12, paddingLeft: 18, fontSize: 14 }}>
                  {FEATURED_FEATURES.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <button className="btn btn-accent w-full" style={{ marginTop: 20 }}>Go Featured &rarr;</button>
              </div>

              <div className="mono xs" style={{ textAlign: "center", marginTop: 16, color: "var(--ink-soft)" }}>
                We review all submissions within 3 business days.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
