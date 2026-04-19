import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { SearchBarClient } from "./SearchBarClient";
import { db } from "@/db";
import { providers } from "@/db/schema";
import { ilike, or, and, count } from "drizzle-orm";
import { getAllRegulations } from "@/lib/regulations";

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

const SAMPLE_ARTICLES = [
  { title: "The biometric patchwork, mapped", slug: "biometric-privacy-law-patchwork" },
  { title: "Clearview AI GDPR fines across Europe", slug: "clearview-ai-gdpr-fines" },
  { title: "BIPA class actions in 2025", slug: "illinois-bipa-class-actions-2025" },
  { title: "The EU AI Act high-risk list, annotated", slug: "eu-ai-act-high-risk-list-annotated" },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tab?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const activeTab = params.tab ?? "all";

  const hasQuery = query.trim().length > 0;
  const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean);

  const [allRegs, matchedProviders, [providerCountResult]] = await Promise.all([
    getAllRegulations(),
    hasQuery
      ? db
          .select()
          .from(providers)
          .where(
            and(
              ...queryWords.map((word) => {
                const pat = `%${word}%`;
                return or(
                  ilike(providers.name, pat),
                  ilike(providers.slug, pat),
                  ilike(providers.description, pat),
                  ilike(providers.tagline, pat)
                );
              })
            )
          )
          .limit(20)
      : db.select().from(providers).limit(20),
    db.select({ value: count() }).from(providers),
  ]);

  const allRegItems = allRegs
    .filter((r) => r.frontmatter.status !== "rescinded")
    .map((r) => ({
      slug: r.slug,
      name: r.frontmatter.name,
      jurisdiction: r.frontmatter.jurisdiction,
      status: r.frontmatter.status,
      summary: r.frontmatter.description,
    }));

  const matchedRegs = hasQuery
    ? allRegItems.filter((r) => {
        const hay = [
          r.name,
          r.slug,
          r.jurisdiction,
          r.summary ?? "",
        ].join(" ").toLowerCase();
        return queryWords.every((w) => hay.includes(w));
      }).slice(0, 20)
    : allRegItems.slice(0, 20);

  const regTotal = allRegItems.length;
  const providerTotal = providerCountResult?.value ?? 0;
  const totalResults = matchedRegs.length + matchedProviders.length;

  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Search", url: "/search" },
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    url: `${SITE_URL}/search`,
  };

  const tabs = [
    { label: "All", value: "all", count: totalResults },
    { label: "Regulations", value: "regulations", count: matchedRegs.length },
    { label: "Providers", value: "providers", count: matchedProviders.length },
  ];

  const showRegs = activeTab === "all" || activeTab === "regulations";
  const showProviders = activeTab === "all" || activeTab === "providers";

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      <div className="page-banner">
        <div className="container" style={{ maxWidth: 1100, padding: 0 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
          <SearchBarClient
            defaultQuery={query}
            resultCount={totalResults}
            regTotal={regTotal}
            providerTotal={providerTotal}
          />
          <div className="flex" style={{ gap: 8, marginTop: 12 }}>
            {tabs.map((tab) => (
              <Link
                key={tab.label}
                href={`/search?q=${encodeURIComponent(query)}&tab=${tab.value}`}
                className={`btn btn-sm ${tab.value === activeTab ? "btn-primary" : "btn-ghost"}`}
              >
                {tab.label} {tab.count}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="container" style={{ maxWidth: 1100, padding: "var(--s-8) var(--s-7)", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}>

        {!hasQuery && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 0" }}>
            <p className="lede soft">Enter a search term to find regulations, providers, and articles.</p>
            <p className="small" style={{ marginTop: 8 }}>
              {regTotal} regulations and {providerTotal} providers indexed.
            </p>
          </div>
        )}

        {hasQuery && showRegs && (
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              Regulations · {matchedRegs.length} {matchedRegs.length === 1 ? "result" : "results"}
            </div>
            <div className="col" style={{ gap: 12 }}>
              {matchedRegs.length === 0 && (
                <p className="small">No regulations matched your search.</p>
              )}
              {matchedRegs.map((reg) => (
                <Link key={reg.slug} href={`/regulations/${reg.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ padding: 16, cursor: "pointer" }}>
                    <div className="flex between items-start">
                      <div>
                        <span className="chip chip-code" style={{ marginBottom: 8 }}>
                          {reg.jurisdiction}
                        </span>
                        <div className="h4" style={{ marginTop: 8 }}>{reg.name}</div>
                        {reg.summary && (
                          <div className="small" style={{ marginTop: 4, color: "var(--ink-2)" }}>
                            {reg.summary.length > 120 ? reg.summary.slice(0, 120) + "…" : reg.summary}
                          </div>
                        )}
                        {reg.status && (
                          <div style={{ marginTop: 8 }}>
                            <span className="chip" style={{ fontSize: 11, padding: "2px 8px" }}>
                              <span className={`dot dot-${reg.status === "enforced" ? "active" : reg.status === "enacted" ? "pending" : reg.status}`} />
                              {reg.status}
                            </span>
                          </div>
                        )}
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--ink-soft)", flexShrink: 0, marginTop: 4 }} aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {hasQuery && showProviders && (
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              Providers · {matchedProviders.length} {matchedProviders.length === 1 ? "result" : "results"}
            </div>
            <div className="col" style={{ gap: 12 }}>
              {matchedProviders.length === 0 && (
                <p className="small">No providers matched your search.</p>
              )}
              {matchedProviders.map((prov) => (
                <Link key={prov.id} href={`/directory/providers/${prov.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card flex items-center" style={{ padding: 14, gap: 12, cursor: "pointer" }}>
                    <div className="avatar avatar-sq" style={{ width: 40, height: 40, fontSize: 15 }}>{prov.name[0]}</div>
                    <div className="flex-1">
                      <div className="h4">{prov.name}</div>
                      <div className="xs" style={{ color: "var(--ink-2)" }}>{prov.tagline ?? prov.category ?? ""}</div>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--ink-soft)", flexShrink: 0 }} aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {hasQuery && (
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>From The Ledger</div>
            <div className="col" style={{ gap: 12 }}>
              {SAMPLE_ARTICLES.map((article) => (
                <Link key={article.title} href={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ padding: 14, cursor: "pointer" }}>
                    <div className="eyebrow" style={{ marginBottom: 4, color: "var(--accent)" }}>{"\u25b8"} Article</div>
                    <div className="h4">{article.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
