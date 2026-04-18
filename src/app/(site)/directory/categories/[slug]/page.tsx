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

      <div className="page-banner">
        <div className="container" style={{ maxWidth: 1000, padding: 0 }}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Provider Directory", href: "/directory" },
              { label: cat.label },
            ]}
          />
          <div className="flex" style={{ marginTop: 16, alignItems: "flex-start", gap: 16 }}>
            <span style={{
              display: "grid", placeItems: "center", width: 56, height: 56, flexShrink: 0,
              borderRadius: 6, background: "var(--accent-soft)", color: "var(--accent)",
            }}>
              <CategoryIcon name={cat.icon} className="h-7 w-7" />
            </span>
            <div>
              <h1 className="h1">{cat.label}</h1>
              <p className="lede" style={{ marginTop: 4 }}>{cat.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1000, padding: "var(--s-8) var(--s-7)" }}>
        <section>
          <p className="small" style={{ lineHeight: 1.7, color: "var(--ink-2)" }}>{cat.longDescription}</p>
          {regulations.length > 0 && (
            <div className="flex items-center" style={{ marginTop: 12, gap: 6, flexWrap: "wrap" }}>
              <span className="small" style={{ fontWeight: 500 }}>Relevant regulations:</span>
              {regulations.map((reg) => (
                <span key={reg} className="chip" style={{ fontSize: 11 }}>{reg}</span>
              ))}
            </div>
          )}
        </section>

        <section style={{ marginTop: 40 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            {categoryProviders.length > 0
              ? `${categoryProviders.length} Provider${categoryProviders.length !== 1 ? "s" : ""}`
              : "Providers"}
          </div>

          {categoryProviders.length > 0 ? (
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {categoryProviders.map((provider) => (
                <Link key={provider.slug} href={`/directory/providers/${provider.slug}`} style={{ textDecoration: "none" }}>
                  <article className="card" style={{ height: "100%" }}>
                    <div className="flex items-center" style={{ gap: 10, marginBottom: 8 }}>
                      <div className="avatar avatar-sq" style={{ width: 36, height: 36, fontSize: 14, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", borderRadius: 6, flexShrink: 0, fontFamily: "var(--serif)", fontWeight: 600 }}>
                        {provider.name[0]}
                      </div>
                      <div>
                        <div className="h4">{provider.name}</div>
                        {provider.founded && <div className="xs">Est. {provider.founded}</div>}
                      </div>
                    </div>
                    <p className="small" style={{ lineHeight: 1.5, color: "var(--ink-2)", marginBottom: 12 }}>{provider.tagline}</p>
                    {provider.specializations.length > 0 && (
                      <div className="tag-strip" style={{ marginBottom: 8 }}>
                        {provider.specializations.slice(0, 3).map((spec) => (
                          <span key={spec} className="chip" style={{ fontSize: 11 }}>{spec}</span>
                        ))}
                      </div>
                    )}
                    {provider.jurisdictions.length > 0 && (
                      <div className="mono xs" style={{ letterSpacing: "0.04em" }}>
                        <span className="soft">Covers: </span>
                        {provider.jurisdictions.join(" · ")}
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: "center", padding: "40px 24px" }}>
              <p className="small">Providers in this category are being added shortly.</p>
              <Link href="/directory" className="btn btn-ghost" style={{ marginTop: 12 }}>
                Browse all categories →
              </Link>
            </div>
          )}
        </section>

        <div className="card" style={{ marginTop: 40, padding: "var(--s-6)", background: "var(--ink)", color: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="h4" style={{ color: "var(--paper)" }}>Are you a {cat.label.toLowerCase().replace(/s$/, "")}?</div>
            <span className="small" style={{ color: "rgba(247,244,236,0.7)", display: "block", marginTop: 4 }}>
              Get listed in this directory and reach businesses looking for your expertise.
            </span>
          </div>
          <Link href="/newsletter" className="btn btn-accent">
            Apply to List
          </Link>
        </div>
      </div>
    </>
  );
}
