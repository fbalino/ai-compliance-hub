import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { providerCategories, providers, providerServices } from "@/db/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { CategoryIcon } from "@/lib/category-icons";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

// ── Data fetching ─────────────────────────────────────────────────────────────

async function getCategory(slug: string) {
  const [cat] = await db
    .select()
    .from(providerCategories)
    .where(eq(providerCategories.slug, slug))
    .limit(1);
  return cat ?? null;
}

interface ProviderCard {
  slug: string;
  name: string;
  tagline: string;
  verified: boolean;
  specializations: string[];
  jurisdictions: string[];
  founded?: string;
}

async function getCategoryProviders(categorySlug: string): Promise<ProviderCard[]> {
  const rows = await db
    .select()
    .from(providers)
    .where(eq(providers.category, categorySlug));

  const cards: ProviderCard[] = await Promise.all(
    rows.map(async (p) => {
      const services = await db
        .select({ serviceType: providerServices.serviceType })
        .from(providerServices)
        .where(eq(providerServices.providerId, p.id));

      return {
        slug: p.slug,
        name: p.name,
        tagline: p.tagline ?? (p.description ? p.description.slice(0, 140) + "\u2026" : ""),
        verified: p.isVerified ?? false,
        specializations: services.map((s) => s.serviceType),
        jurisdictions: (p.jurisdictions as string[] | null) ?? [],
        founded: p.foundedYear ? String(p.foundedYear) : undefined,
      };
    })
  );

  return cards;
}

export async function generateStaticParams() {
  const rows = await db
    .select({ slug: providerCategories.slug })
    .from(providerCategories);
  return rows.map((r) => ({ slug: r.slug }));
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategory(slug);
  if (!cat) return {};

  return {
    title: `${cat.label} — AI Compliance Provider Directory`,
    description: cat.description,
    alternates: {
      canonical: `${SITE_URL}/directory/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [cat, categoryProviders] = await Promise.all([
    getCategory(slug),
    getCategoryProviders(slug),
  ]);
  if (!cat) notFound();

  const regulations = (cat.regulations as string[] | null) ?? [];

  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Provider Directory", url: "/directory" },
    { name: cat.label, url: `/directory/categories/${slug}` },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="rg-page-head">
        <div className="rg-container" style={{ maxWidth: 1000 }}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Provider Directory", href: "/directory" },
              { label: cat.label },
            ]}
          />
          <div style={{ marginTop: 16, display: "flex", alignItems: "flex-start", gap: 16 }}>
            <span style={{
              display: "flex", width: 56, height: 56, flexShrink: 0, alignItems: "center", justifyContent: "center",
              borderRadius: 14, background: "var(--rg-primary-faint)", color: "var(--rg-primary-deep)",
            }}>
              <CategoryIcon name={cat.icon} className="h-7 w-7" />
            </span>
            <div>
              <h1>{cat.label}</h1>
              <p className="rg-page-desc">{cat.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rg-page-body">
        <div className="rg-container" style={{ maxWidth: 1000 }}>
          <section>
            <p style={{ color: "var(--rg-ink-dim)", lineHeight: 1.7 }}>{cat.longDescription}</p>
            {regulations.length > 0 && (
              <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--rg-ink-dim)" }}>Relevant regulations:</span>
                {regulations.map((reg) => (
                  <span key={reg} className="rg-tag">{reg}</span>
                ))}
              </div>
            )}
          </section>

          <section style={{ marginTop: 40 }}>
            <div className="rg-kicker" style={{ marginBottom: 16 }}>
              {categoryProviders.length > 0
                ? `${categoryProviders.length} Provider${categoryProviders.length !== 1 ? "s" : ""}`
                : "Providers"}
            </div>

            {categoryProviders.length > 0 ? (
              <div className="rg-scard-grid">
                {categoryProviders.map((provider) => (
                  <Link key={provider.slug} href={`/directory/providers/${provider.slug}`} className="rg-scard-link">
                    <div className="rg-scard" style={{ height: "100%" }}>
                      <h3>{provider.name}</h3>
                      {provider.founded && (
                        <p style={{ fontSize: 12, color: "var(--rg-ink-dim)", marginBottom: 6 }}>Est. {provider.founded}</p>
                      )}
                      <p style={{ marginBottom: 12 }}>{provider.tagline}</p>
                      {provider.specializations.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                          {provider.specializations.slice(0, 3).map((spec) => (
                            <span key={spec} className="rg-tag">{spec}</span>
                          ))}
                        </div>
                      )}
                      {provider.jurisdictions.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {provider.jurisdictions.map((j) => (
                            <span key={j} className="rg-tag">{j}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rg-scard" style={{ textAlign: "center", padding: "40px 24px" }}>
                <p style={{ color: "var(--rg-ink-dim)" }}>Providers in this category are being added shortly.</p>
                <Link href="/directory" className="rg-btn rg-btn-outline" style={{ marginTop: 12 }}>
                  Browse all categories &rarr;
                </Link>
              </div>
            )}
          </section>

          <div className="rg-cta-banner" style={{ marginTop: 40 }}>
            <div style={{ flex: 1 }}>
              <strong>Are you a {cat.label.toLowerCase().replace(/s$/, "")}?</strong>
              <span style={{ display: "block", marginTop: 6 }}>
                Get listed in this directory and reach businesses looking for your expertise.
              </span>
            </div>
            <a href="mailto:providers@aicompliancehub.com" className="rg-btn rg-btn-primary">
              Apply to List
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
