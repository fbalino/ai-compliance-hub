import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { db } from "@/db";
import { providers } from "@/db/schema";
import { count } from "drizzle-orm";
import { getAllRegulationSlugs } from "@/lib/regulations";

export const revalidate = 21600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "For Providers — Grow Your Compliance Practice | Regulome",
  description:
    "Join the Regulome marketplace. Get discovered by businesses searching for AI compliance help. Free listing for verified providers, with Featured upgrades for premium placement.",
  alternates: { canonical: `${SITE_URL}/providers` },
  openGraph: {
    title: "For Providers — Grow Your Compliance Practice",
    description:
      "Get discovered by businesses searching for AI compliance help. Free to list, Featured upgrades available.",
    type: "website",
    url: `${SITE_URL}/providers`,
  },
};

function Icon({ name, size = 28 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    eye: (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    zap: <path d="M13 2 3 14h9l-1 8 10-12h-9z" />,
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    bar: (
      <>
        <rect x="4" y="14" width="4" height="7" rx="1" />
        <rect x="10" y="9" width="4" height="12" rx="1" />
        <rect x="16" y="4" width="4" height="17" rx="1" />
      </>
    ),
    star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="M20 6 9 17l-5-5" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      {paths[name] || <circle cx="12" cy="12" r="2" />}
    </svg>
  );
}

const BENEFITS = [
  {
    icon: "eye",
    title: "Visibility where it matters",
    desc: "Your profile appears alongside the regulations you cover. Buyers find you at the exact moment they're researching compliance requirements.",
  },
  {
    icon: "target",
    title: "Qualified lead flow",
    desc: "Every visitor on Regulome is researching AI compliance. No cold outreach needed \u2014 they come to you with a specific regulatory need.",
  },
  {
    icon: "shield",
    title: "Third-party credibility",
    desc: "Verified listings signal trustworthiness. Editorial coverage in The Ledger positions your team as subject-matter experts.",
  },
  {
    icon: "bar",
    title: "Analytics & insights",
    desc: "Featured providers get profile view counts, regulation-page impressions, and contact-form analytics to measure ROI.",
  },
];

const FREE_FEATURES = [
  "Profile page with description, services, and regulations covered",
  "Appear in directory search results",
  "Verified badge after editorial review",
  "Listed on matched regulation pages",
];

const FEATURED_EXTRAS = [
  "Top placement on regulation pages you cover",
  "Homepage visibility in Top Providers section",
  "Priority in directory search results",
  "Profile view & lead analytics dashboard",
  "Featured badge and highlight styling",
  "Spotlight in The Ledger newsletter",
];

export default async function ProvidersPage() {
  const [[providerResult], regSlugs] = await Promise.all([
    db.select({ value: count() }).from(providers),
    getAllRegulationSlugs(),
  ]);
  const providerCount = providerResult?.value ?? 0;
  const regCount = regSlugs.length;

  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "For Providers", url: "/providers" },
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "For Providers \u2014 Grow Your Compliance Practice",
    description: "Join the Regulome marketplace and get discovered by businesses searching for AI compliance help.",
    url: `${SITE_URL}/providers`,
  };

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      {/* HERO */}
      <section className="hero-bg" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56, textAlign: "center" }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "For Providers" }]} />

          <div className="eyebrow" style={{ marginTop: 24, marginBottom: 12 }}>For providers</div>
          <h1
            className="display v4-rise"
            style={{ maxWidth: 800, margin: "0 auto" }}
          >
            Meet buyers at the moment they&apos;re{" "}
            <em className="serif" style={{ color: "var(--accent)" }}>searching</em>.
          </h1>
          <p
            className="lede soft v4-rise v4-d1"
            style={{ maxWidth: 640, margin: "20px auto 0" }}
          >
            {regCount} regulations indexed. {providerCount}+ providers listed.
            3,000+ monthly searches from compliance teams actively looking for help.
          </p>

          <div className="flex v4-rise v4-d2" style={{ gap: 12, marginTop: 32, justifyContent: "center" }}>
            <Link href="/join" className="btn btn-accent btn-lg">
              List your firm
            </Link>
            <Link href="/directory" className="btn btn-lg btn-ghost">
              Browse directory
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Why list on Regulome</div>
        <h2 className="h1" style={{ marginBottom: 32 }}>Four reasons providers choose us.</h2>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {BENEFITS.map((b) => (
            <div key={b.title} className="card" style={{ padding: 28 }}>
              <div style={{ color: "var(--accent)", marginBottom: 14 }}>
                <Icon name={b.icon} />
              </div>
              <h3 className="h3" style={{ marginBottom: 8 }}>{b.title}</h3>
              <p className="small" style={{ color: "var(--ink-2)", lineHeight: 1.6 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PREVIEW */}
      <section
        style={{
          background: "var(--paper-2)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>What buyers see</div>
          <h2 className="h1" style={{ marginBottom: 8 }}>Your firm, front and center.</h2>
          <p className="lede soft" style={{ maxWidth: 600, marginBottom: 32 }}>
            Featured providers get top placement on every regulation page they cover, plus homepage visibility and newsletter spotlights.
          </p>

          {/* Mock featured listing */}
          <div
            className="card card-feature"
            style={{
              maxWidth: 520,
              padding: 24,
              margin: "0 auto",
              border: "2px solid var(--accent)",
            }}
          >
            <div className="flex items-center" style={{ gap: 14, marginBottom: 14 }}>
              <div
                className="avatar avatar-sq"
                style={{
                  width: 52,
                  height: 52,
                  fontSize: 20,
                  borderRadius: 10,
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                  fontWeight: 700,
                }}
              >
                Y
              </div>
              <div style={{ flex: 1 }}>
                <div className="h3" style={{ margin: 0 }}>Your Firm Name</div>
                <div className="xs" style={{ color: "var(--ink-2)" }}>Advisory &middot; Audit &middot; New York, NY</div>
              </div>
              <span className="feature-flag">★ Featured</span>
            </div>
            <p className="small" style={{ color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 14 }}>
              Your tagline and description appear here. Buyers see your expertise at a glance alongside the regulation they&apos;re researching.
            </p>
            <div className="mono xs" style={{ marginBottom: 16, letterSpacing: "0.04em" }}>
              <span className="soft">Covers: </span>
              EU AI Act &middot; Colorado AI &middot; NYC LL 144
              <span className="soft"> +4</span>
            </div>
            <div className="flex" style={{ gap: 8 }}>
              <span className="btn btn-sm btn-primary" style={{ flex: 1, textAlign: "center" }}>Contact</span>
              <span className="btn btn-sm btn-ghost">Profile</span>
            </div>
          </div>

          <p className="mono xs" style={{ textAlign: "center", marginTop: 16, color: "var(--ink-faint)", letterSpacing: "0.04em" }}>
            Example of a Featured provider card on a regulation page
          </p>
        </div>
      </section>

      {/* FREE vs FEATURED comparison */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Tiers</div>
        <h2 className="h1" style={{ marginBottom: 32 }}>Free to list. Pay to stand out.</h2>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {/* Free tier */}
          <div className="card" style={{ padding: 32 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Free</div>
            <div className="serif" style={{ fontSize: 48, fontWeight: 500, lineHeight: 1, marginBottom: 4 }}>$0</div>
            <div className="xs soft" style={{ marginBottom: 24 }}>forever &middot; no credit card</div>
            <div className="col" style={{ gap: 12 }}>
              {FREE_FEATURES.map((f) => (
                <div key={f} className="flex" style={{ gap: 10, alignItems: "flex-start" }}>
                  <div style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}>
                    <Icon name="check" size={16} />
                  </div>
                  <span className="small">{f}</span>
                </div>
              ))}
            </div>
            <Link href="/join" className="btn btn-ghost w-full" style={{ marginTop: 24, textAlign: "center" }}>
              Get listed free &rarr;
            </Link>
          </div>

          {/* Featured tier */}
          <div className="card card-feature" style={{ padding: 32, border: "2px solid var(--accent)" }}>
            <div className="flex between items-center" style={{ marginBottom: 8 }}>
              <div className="eyebrow">Featured</div>
              <span className="feature-flag">★ Popular</span>
            </div>
            <div className="serif" style={{ fontSize: 48, fontWeight: 500, lineHeight: 1, marginBottom: 4 }}>$490<span className="small" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>/mo</span></div>
            <div className="xs soft" style={{ marginBottom: 24 }}>maximum &middot; scales with coverage scope</div>
            <div className="col" style={{ gap: 12 }}>
              {FEATURED_EXTRAS.map((f) => (
                <div key={f} className="flex" style={{ gap: 10, alignItems: "flex-start" }}>
                  <div style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}>
                    <Icon name="check" size={16} />
                  </div>
                  <span className="small">{f}</span>
                </div>
              ))}
            </div>
            <Link href="/join" className="btn btn-accent w-full" style={{ marginTop: 24, textAlign: "center" }}>
              Apply for Featured &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: "var(--paper-inverse)", color: "var(--ink-inverse)" }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24, textAlign: "center" }}
          >
            {[
              { n: String(regCount), l: "regulations indexed" },
              { n: String(providerCount) + "+", l: "listed providers" },
              { n: "3,000+", l: "monthly searches" },
              { n: "9,200", l: "newsletter subscribers" },
            ].map((stat) => (
              <div key={stat.l}>
                <div className="serif" style={{ fontSize: 40, fontWeight: 500, color: "var(--ink-inverse)", lineHeight: 1 }}>
                  {stat.n}
                </div>
                <div
                  className="mono xs"
                  style={{ marginTop: 8, color: "var(--ink-inverse-soft)", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {stat.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container" style={{ paddingTop: 64, paddingBottom: 64, textAlign: "center" }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Ready?</div>
        <h2 className="display" style={{ fontSize: 48, maxWidth: 700, margin: "0 auto" }}>
          List your practice in the register.
        </h2>
        <p className="lede soft" style={{ maxWidth: 540, margin: "16px auto 0" }}>
          Free for any verified provider. Takes two minutes. Upgrade to Featured anytime.
        </p>
        <div className="flex" style={{ gap: 12, marginTop: 32, justifyContent: "center" }}>
          <Link href="/join" className="btn btn-accent btn-lg">
            Get started &rarr;
          </Link>
          <Link href="/directory" className="btn btn-lg btn-ghost">
            See current providers
          </Link>
        </div>
      </section>
    </>
  );
}
