import type { Metadata } from "next";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";

export const revalidate = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "Search Regulations, Providers & Articles — AI Compliance Hub",
  description:
    "Search across AI regulations, compliance providers, and editorial articles. Find biometric laws, GDPR guidance, AI Act obligations, and expert providers in one place.",
  alternates: { canonical: `${SITE_URL}/search` },
  openGraph: {
    title: "Search — AI Compliance Hub",
    description: "Unified search across regulations, providers, and articles.",
    type: "website",
    url: `${SITE_URL}/search`,
  },
};

const SAMPLE_REGULATIONS: { code: string; title: string; desc: string; slug: string }[] = [
  { code: "EU-AIA-24", title: "EU AI Act \u00b7 Art. 5", desc: "Prohibits real-time remote biometric identification", slug: "eu-ai-act" },
  { code: "US-IL-BIPA", title: "Illinois BIPA", desc: "Consent + retention rules for biometric data", slug: "illinois-ai-video-interview-act" },
  { code: "EU-GDPR", title: "GDPR \u00b7 Art. 9", desc: "Biometric data as special category", slug: "eu-ai-act" },
  { code: "US-TX-CUBI", title: "Texas CUBI", desc: "State-level biometric privacy", slug: "colorado-ai-act" },
];

const SAMPLE_PROVIDERS: { name: string; desc: string }[] = [
  { name: "Saffron AI", desc: "Biometric audits" },
  { name: "IrisGuard", desc: "BIPA litigation" },
  { name: "Harbor", desc: "Multi-regime biometrics" },
  { name: "Orbit GRC", desc: "Consent workflows" },
];

const SAMPLE_ARTICLES: string[] = [
  "\u201cThe biometric patchwork, mapped\u201d",
  "\u201cAfter Clearview: state-level responses\u201d",
  "\u201cBIPA class actions in 2025\u201d",
  "\u201cReal-time biometrics in the AI Act\u201d",
];

const FILTER_TABS = [
  { label: "All", count: 84, active: true },
  { label: "Regulations", count: 31, active: false },
  { label: "Providers", count: 19, active: false },
  { label: "Articles", count: 34, active: false },
];

export default function SearchPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Search", url: "/search" },
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    url: `${SITE_URL}/search`,
  };

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      <div className="page-banner">
        <div className="container" style={{ maxWidth: 1100, padding: 0 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
          <div className="search search-lg" style={{ marginTop: 8 }}>
            <Search className="h-4.5 w-4.5" style={{ color: "var(--ink-soft)", flexShrink: 0 }} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search regulations, providers, articles\u2026"
              defaultValue="\u201cbiometric identification\u201d"
              style={{ flex: 1, border: 0, background: "transparent", outline: "none", font: "inherit", color: "var(--ink)" }}
            />
            <span className="mono xs" style={{ color: "var(--ink-soft)", whiteSpace: "nowrap" }}>84 results</span>
          </div>
          <div className="flex" style={{ gap: 8, marginTop: 12 }}>
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.label}
                className={`btn btn-sm ${tab.active ? "btn-primary" : "btn-ghost"}`}
              >
                {tab.label} {tab.count}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="container" style={{ maxWidth: 1100, padding: "var(--s-8) var(--s-7)", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}>

        {/* Regulations column */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Regulations</div>
          <div className="col" style={{ gap: 12 }}>
            {SAMPLE_REGULATIONS.map((reg) => (
              <Link key={reg.code} href={`/regulations/${reg.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: 16 }}>
                  <div className="flex between items-start">
                    <div>
                      <span className="chip chip-code" style={{ marginBottom: 8 }}>{reg.code}</span>
                      <div className="h4" style={{ marginTop: 8 }}>{reg.title}</div>
                      <div className="small" style={{ marginTop: 4, color: "var(--ink-2)" }}>{reg.desc}</div>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--ink-soft)", flexShrink: 0, marginTop: 4 }} aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Providers column */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Providers</div>
          <div className="col" style={{ gap: 12 }}>
            {SAMPLE_PROVIDERS.map((prov) => (
              <Link key={prov.name} href="/directory" style={{ textDecoration: "none" }}>
                <div className="card flex items-center" style={{ padding: 14, gap: 12 }}>
                  <div className="avatar avatar-sq" style={{ width: 40, height: 40, fontSize: 15 }}>{prov.name[0]}</div>
                  <div className="flex-1">
                    <div className="h4">{prov.name}</div>
                    <div className="xs" style={{ color: "var(--ink-2)" }}>{prov.desc}</div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--ink-soft)", flexShrink: 0 }} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Articles column */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>From The Ledger</div>
          <div className="col" style={{ gap: 12 }}>
            {SAMPLE_ARTICLES.map((title) => (
              <Link key={title} href="/blog" style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 4, color: "var(--accent)" }}>{"\u25b8"} Article</div>
                  <div className="h4">{title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
