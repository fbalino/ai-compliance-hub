import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  providers,
  providerServices,
  providerRegulations,
  providerIndustries,
  reviews,
} from "@/db/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { providerSchema, breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { RequestQuoteForm } from "@/components/RequestQuoteForm";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ReviewData {
  id: string;
  authorName: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  isVerified: boolean;
}

interface ProviderData {
  id: string;
  slug: string;
  name: string;
  description: string;
  logoUrl?: string;
  websiteUrl?: string;
  foundedYear?: number;
  headquarters?: string;
  employeeCountRange?: string;
  tier: "free" | "premium" | "enterprise";
  isVerified: boolean;
  serviceTypes: string[];
  regulations: string[];
  industries: string[];
  reviews: ReviewData[];
  averageRating?: number;
}

// ── Data fetching ─────────────────────────────────────────────────────────────

async function getProvider(slug: string): Promise<ProviderData | null> {
  const [provider] = await db
    .select()
    .from(providers)
    .where(eq(providers.slug, slug))
    .limit(1);

  if (!provider) return null;

  const [services, regs, industries, providerReviews] = await Promise.all([
    db.select().from(providerServices).where(eq(providerServices.providerId, provider.id)),
    db.select().from(providerRegulations).where(eq(providerRegulations.providerId, provider.id)),
    db.select().from(providerIndustries).where(eq(providerIndustries.providerId, provider.id)),
    db.select().from(reviews).where(eq(reviews.providerId, provider.id)),
  ]);

  const ratings = providerReviews
    .map((r) => r.rating)
    .filter((r): r is number => r !== null);
  const averageRating =
    ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : undefined;

  return {
    id: provider.id,
    slug: provider.slug,
    name: provider.name,
    description: provider.description ?? "",
    logoUrl: provider.logoUrl ?? undefined,
    websiteUrl: provider.websiteUrl ?? undefined,
    foundedYear: provider.foundedYear ?? undefined,
    headquarters: provider.headquarters ?? undefined,
    employeeCountRange: provider.employeeCountRange ?? undefined,
    tier: (provider.tier as "free" | "premium" | "enterprise") ?? "free",
    isVerified: provider.isVerified ?? false,
    serviceTypes: services.map((s) => s.serviceType),
    regulations: regs.map((r) => r.regulationSlug),
    industries: industries.map((i) => i.industry),
    reviews: providerReviews.map((r) => ({
      id: r.id,
      authorName: "Verified User",
      rating: r.rating ?? 0,
      title: r.title ?? "",
      body: r.body ?? "",
      createdAt: r.createdAt?.toISOString() ?? new Date().toISOString(),
      isVerified: r.isVerified ?? false,
    })),
    averageRating,
  };
}

export async function generateStaticParams() {
  const rows = await db.select({ slug: providers.slug }).from(providers);
  return rows.map((r) => ({ slug: r.slug }));
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const provider = await getProvider(slug);
  if (!provider) return {};

  const title = `${provider.name} — AI Compliance Provider`;
  const description = provider.description.slice(0, 155);

  return {
    title,
    description,
    openGraph: { title, description, type: "profile" },
    alternates: { canonical: `${SITE_URL}/directory/providers/${slug}` },
  };
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  const provider = await getProvider(slug);
  if (!provider) notFound();

  const schemas = [
    breadcrumbListSchema([
      { name: "Home", url: "/" },
      { name: "Provider Directory", url: "/directory" },
      { name: provider.name, url: `/directory/providers/${slug}` },
    ]),
    providerSchema({
      name: provider.name,
      description: provider.description,
      url: provider.websiteUrl ?? `${SITE_URL}/directory/providers/${slug}`,
      serviceTypes: provider.serviceTypes,
      ratingValue: provider.averageRating,
      reviewCount: provider.reviews.length,
    }),
  ];

  return (
    <>
      <script {...jsonLdScriptProps(schemas)} />

      <div className="rg-page-head">
        <div className="rg-container" style={{ maxWidth: 1000 }}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Provider Directory", href: "/directory" },
              { label: provider.name },
            ]}
          />

          <div style={{ marginTop: 16, display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{
              width: 64, height: 64, borderRadius: 14, border: "1px solid var(--rg-border)",
              background: "var(--rg-surface)", display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, overflow: "hidden",
            }}>
              {provider.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={provider.logoUrl} alt={`${provider.name} logo`} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
              ) : (
                <span style={{ fontSize: 24, fontWeight: 700, color: "var(--rg-ink-dim)" }}>{provider.name.charAt(0)}</span>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h1>{provider.name}</h1>
              {provider.headquarters && (
                <p style={{ marginTop: 2, fontSize: 13, color: "var(--rg-ink-dim)" }}>
                  {provider.headquarters}
                  {provider.foundedYear && ` \u00b7 Founded ${provider.foundedYear}`}
                  {provider.employeeCountRange && ` \u00b7 ${provider.employeeCountRange} employees`}
                </p>
              )}
              {provider.averageRating && provider.reviews.length > 0 && (
                <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
                  <StarRating rating={provider.averageRating} />
                  <span style={{ fontSize: 13, color: "var(--rg-ink-dim)" }}>
                    {provider.averageRating.toFixed(1)} ({provider.reviews.length} review{provider.reviews.length !== 1 ? "s" : ""})
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              {provider.websiteUrl && (
                <a href={provider.websiteUrl} target="_blank" rel="noopener noreferrer" className="rg-btn rg-btn-outline">
                  Visit Website &#8599;
                </a>
              )}
              <Link href={`/directory/providers/${slug}/request-quote`} className="rg-btn rg-btn-primary">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="rg-page-body">
        <div className="rg-container" style={{ maxWidth: 1000 }}>
          <div className="rg-2col">
            <div className="rg-2col-main">
              <section>
                <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>About</h2>
                <p style={{ color: "var(--rg-ink-dim)", lineHeight: 1.7 }}>{provider.description}</p>
              </section>

              {provider.serviceTypes.length > 0 && (
                <section style={{ marginTop: 32 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Services</h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {provider.serviceTypes.map((svc) => (
                      <span key={svc} className="rg-tag">{svc}</span>
                    ))}
                  </div>
                </section>
              )}

              {provider.regulations.length > 0 && (
                <section style={{ marginTop: 32 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Regulations Covered</h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {provider.regulations.map((regSlug) => (
                      <Link
                        key={regSlug}
                        href={`/regulations/${regSlug}`}
                        className="rg-tag"
                        style={{ color: "var(--rg-primary-deep)", background: "var(--rg-primary-faint)", borderColor: "var(--rg-primary-faint)" }}
                      >
                        {formatRegulationSlug(regSlug)}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {provider.industries.length > 0 && (
                <section style={{ marginTop: 32 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Industries Served</h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {provider.industries.map((ind) => (
                      <span key={ind} className="rg-tag">{ind}</span>
                    ))}
                  </div>
                </section>
              )}

              {provider.reviews.length > 0 && (
                <section style={{ marginTop: 32 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Reviews</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {provider.reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="rg-2col-side">
              <div className="rg-scard">
                <h4>Quick Info</h4>
                <dl style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {provider.foundedYear && <InfoRow label="Founded" value={String(provider.foundedYear)} />}
                  {provider.headquarters && <InfoRow label="Location" value={provider.headquarters} />}
                  {provider.employeeCountRange && <InfoRow label="Team Size" value={`${provider.employeeCountRange} employees`} />}
                </dl>
              </div>

              <div className="rg-scard" style={{ borderColor: "var(--rg-primary-faint)", background: "var(--rg-primary-faint)" }}>
                <h4 style={{ color: "var(--rg-ink)" }}>Request a Quote</h4>
                <p style={{ fontSize: 14, color: "var(--rg-ink-dim)", marginBottom: 16 }}>
                  Get a proposal from {provider.name}.
                </p>
                <RequestQuoteForm
                  providerSlug={provider.slug}
                  providerServices={provider.serviceTypes}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          style={{ width: 16, height: 16, color: star <= Math.round(rating) ? "#f59e0b" : "var(--rg-border)" }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewData }) {
  return (
    <div className="rg-scard">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
        <div>
          <span style={{ fontWeight: 500, fontSize: 14 }}>{review.authorName}</span>
          <p style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{review.title}</p>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p style={{ fontSize: 14, color: "var(--rg-ink-dim)", lineHeight: 1.6 }}>{review.body}</p>
      <p style={{ marginTop: 8, fontSize: 12, color: "var(--rg-ink-dim)" }}>
        {new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
      </p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 14 }}>
      <dt style={{ color: "var(--rg-ink-dim)" }}>{label}</dt>
      <dd style={{ fontWeight: 500, textAlign: "right" }}>{value}</dd>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatRegulationSlug(slug: string): string {
  const map: Record<string, string> = {
    "eu-ai-act": "EU AI Act",
    "nyc-ll-144": "NYC LL 144",
    "nist-ai-rmf": "NIST AI RMF",
    "colorado-ai-act": "Colorado AI Act",
    "eeoc-guidelines": "EEOC Guidelines",
    "fair-housing-act": "Fair Housing Act",
    ecoa: "ECOA",
    "iso-42001": "ISO 42001",
    "sr-11-7": "SR 11-7",
    "uk-ai-regulations": "UK AI Regulations",
    "singapore-ai-governance": "Singapore AI Governance",
    gdpr: "GDPR",
    "eu-product-liability-directive": "EU Product Liability Directive",
    "california-ab-2013": "California AB 2013",
    "ftc-guidelines": "FTC Guidelines",
    "california-ai-laws": "California AI Laws",
    "oecd-ai-principles": "OECD AI Principles",
    cobit: "COBIT",
    "general-compliance": "General Compliance",
    "federal-ai-guidance": "Federal AI Guidance",
    "state-ai-laws": "State AI Laws",
  };
  return map[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
