import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { providerCategories, providers, providerServices } from "@/db/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
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
        tagline: p.tagline ?? (p.description ? p.description.slice(0, 140) + "…" : ""),
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

      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Provider Directory", href: "/directory" },
              { label: cat.label },
            ]}
          />
          <div className="mt-4 flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
              <CategoryIcon name={cat.icon} className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                {cat.label}
              </h1>
              <p className="mt-2 text-lg text-neutral-600 max-w-2xl">
                {cat.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        {/* What are these providers */}
        <section className="prose prose-neutral max-w-none">
          <p className="text-neutral-600 leading-relaxed">{cat.longDescription}</p>
          {regulations.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm font-medium text-neutral-500">Relevant regulations:</span>
              {regulations.map((reg) => (
                <span
                  key={reg}
                  className="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700"
                >
                  {reg}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Provider list */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-neutral-900">
              {categoryProviders.length > 0
                ? `${categoryProviders.length} Provider${categoryProviders.length !== 1 ? "s" : ""}`
                : "Providers"}
            </h2>
          </div>

          {categoryProviders.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {categoryProviders.map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/directory/providers/${provider.slug}`}
                  className="group block"
                >
                  <Card hover className="h-full group-hover:border-brand-300 transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-neutral-900 group-hover:text-brand-800 transition-colors">
                        {provider.name}
                      </h3>
                      {/* TODO: Verified badge hidden — no verification process defined yet */}
                    </div>
                    {provider.founded && (
                      <p className="text-xs text-neutral-500 mb-1.5">Est. {provider.founded}</p>
                    )}
                    <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                      {provider.tagline}
                    </p>
                    {provider.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {provider.specializations.slice(0, 3).map((spec) => (
                          <span
                            key={spec}
                            className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                    {provider.jurisdictions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {provider.jurisdictions.map((j) => (
                          <Badge key={j} variant="default">{j}</Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="text-center py-10">
              <p className="text-neutral-500">Providers in this category are being added shortly.</p>
              <Link href="/directory" className="mt-3 inline-block text-sm font-medium text-brand-700 hover:text-brand-900 transition-colors">
                Browse all categories →
              </Link>
            </Card>
          )}
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-brand-50 border border-brand-100 p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h2 className="font-bold text-brand-900">
                Are you a {cat.label.toLowerCase().replace(/s$/, "")}?
              </h2>
              <p className="mt-1 text-sm text-brand-700">
                Get listed in this directory and reach businesses looking for your expertise.
              </p>
            </div>
            <a
              href="mailto:providers@aicompliancehub.com"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors"
            >
              Apply to List
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
