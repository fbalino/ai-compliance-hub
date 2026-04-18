import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { ArrowUpRight } from "lucide-react";
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

async function getRelatedProviders(currentSlug: string): Promise<{ slug: string; name: string }[]> {
  const rows = await db.select({ slug: providers.slug, name: providers.name }).from(providers).limit(4);
  return rows.filter((r) => r.slug !== currentSlug).slice(0, 3);
}

export async function generateStaticParams() {
  const rows = await db.select({ slug: providers.slug }).from(providers);
  return rows.map((r) => ({ slug: r.slug }));
}

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
  const [provider, relatedProviders] = await Promise.all([
    getProvider(slug),
    getRelatedProviders(slug),
  ]);
  if (!provider) notFound();

  const isFeatured = provider.tier === "premium" || provider.tier === "enterprise";

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

      <div className="page-banner">
        <div className="container" style={{ maxWidth: 1100, padding: 0 }}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Provider Directory", href: "/directory" },
              { label: provider.name },
            ]}
          />

          <div className="flex" style={{ marginTop: 16, gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div className="avatar avatar-sq" style={{
              width: 88, height: 88, borderRadius: 14, border: "1px solid var(--line)",
              background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, overflow: "hidden",
            }}>
              {provider.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={provider.logoUrl} alt={`${provider.name} logo`} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
              ) : (
                <span className="serif" style={{ fontSize: 32, fontWeight: 700, color: "var(--ink-soft)" }}>{provider.name.charAt(0)}</span>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center" style={{ gap: 10, marginBottom: 4 }}>
                <h1 className="h1" style={{ margin: 0 }}>{provider.name}</h1>
                {isFeatured && <span className="feature-flag">{"\u2605"} Featured</span>}
                {provider.isVerified && <span className="chip chip-sage">{"\u2713"} Verified</span>}
              </div>
              <p className="lede" style={{ margin: 0, color: "var(--ink-2)" }}>
                {provider.serviceTypes.join(" \u00b7 ")}
                {provider.headquarters && ` \u00b7 ${provider.headquarters}`}
                {provider.foundedYear && ` \u00b7 founded ${provider.foundedYear}`}
              </p>
              {provider.averageRating && provider.reviews.length > 0 && (
                <div className="flex items-center" style={{ gap: 6, marginTop: 6 }}>
                  <StarRating rating={provider.averageRating} />
                  <span className="xs">
                    {provider.averageRating.toFixed(1)} ({provider.reviews.length} review{provider.reviews.length !== 1 ? "s" : ""})
                  </span>
                </div>
              )}
            </div>

            <div className="flex" style={{ gap: 8, flexShrink: 0 }}>
              {provider.websiteUrl && (
                <a href={provider.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Website {"\u2197"}
                </a>
              )}
              <Link href={`/directory/providers/${slug}/request-quote`} className="btn btn-primary">
                {"\u2709"} Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="container grid-article-sidebar" style={{ maxWidth: 1100, gap: 56 }}>
        <article>
          {/* About */}
          <div className="eyebrow" style={{ marginBottom: 8 }}>&sect; About</div>
          <p className="lede" style={{ color: "var(--ink)" }}>{provider.description}</p>

          {/* Regulations covered */}
          {provider.regulations.length > 0 && (
            <section style={{ marginTop: 32 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>&sect; Regulations covered &middot; {provider.regulations.length}</div>
              <div className="tag-strip">
                {provider.regulations.map((regSlug) => (
                  <Link key={regSlug} href={`/regulations/${regSlug}`} className="chip" style={{ cursor: "pointer" }}>
                    {formatRegulationSlug(regSlug)}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Services */}
          {provider.serviceTypes.length > 0 && (
            <section style={{ marginTop: 32 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>&sect; Services</div>
              <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                {provider.serviceTypes.map((svc) => (
                  <div key={svc} className="card">
                    <div className="h4">{svc}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Industries served */}
          {provider.industries.length > 0 && (
            <section style={{ marginTop: 32 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>&sect; Industries served</div>
              <div className="tag-strip">
                {provider.industries.map((ind) => (
                  <span key={ind} className="chip">{ind}</span>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          {provider.reviews.length > 0 && (
            <section style={{ marginTop: 32 }}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>&sect; Reviews</div>
              <div className="col" style={{ gap: 12 }}>
                {provider.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>
          )}

          {/* Also in The Ledger */}
          <section style={{ marginTop: 32 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>&sect; Also in The Ledger</div>
            <div className="col" style={{ gap: 8 }}>
              <Link href="/blog" style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 4, color: "var(--accent)" }}>{"\u25b8"} Q&A</div>
                  <div className="h4">&ldquo;How {provider.name} approaches compliance readiness&rdquo;</div>
                </div>
              </Link>
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <aside style={{ position: "sticky", top: 60, alignSelf: "start" }}>
          {/* Contact form */}
          <div className="card card-feature" style={{ padding: 20, marginBottom: 16 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Send a message</div>
            <RequestQuoteForm
              providerSlug={provider.slug}
              providerServices={provider.serviceTypes}
            />
          </div>

          {/* At a glance */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>At a glance</div>
            <dl className="kv">
              {provider.foundedYear && <><dt>Founded</dt><dd>{provider.foundedYear}</dd></>}
              {provider.employeeCountRange && <><dt>Team</dt><dd>{provider.employeeCountRange}</dd></>}
              {provider.headquarters && <><dt>HQ</dt><dd>{provider.headquarters}</dd></>}
              {provider.serviceTypes.length > 0 && <><dt>Type</dt><dd>{provider.serviceTypes.join(", ")}</dd></>}
              {provider.websiteUrl && <><dt>Website</dt><dd><a href={provider.websiteUrl} target="_blank" rel="noopener noreferrer" className="link">{new URL(provider.websiteUrl).hostname} {"\u2197"}</a></dd></>}
            </dl>
          </div>

          {/* Compare with */}
          {relatedProviders.length > 0 && (
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Compare with</div>
              <div className="col" style={{ gap: 8 }}>
                {relatedProviders.map((rp) => (
                  <Link key={rp.slug} href={`/directory/providers/${rp.slug}`} className="flex between small" style={{ textDecoration: "none", color: "var(--ink)" }}>
                    <span>{rp.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--ink-soft)" }} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center" style={{ gap: 2 }} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          style={{ width: 16, height: 16, color: star <= Math.round(rating) ? "var(--gold)" : "var(--line)" }}
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
    <div className="card">
      <div className="between" style={{ marginBottom: 8 }}>
        <div>
          <span className="h5">{review.authorName}</span>
          <p className="h4" style={{ marginTop: 2 }}>{review.title}</p>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="small" style={{ color: "var(--ink-2)", lineHeight: 1.6 }}>{review.body}</p>
      <p className="xs" style={{ marginTop: 8 }}>
        {new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
      </p>
    </div>
  );
}

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
