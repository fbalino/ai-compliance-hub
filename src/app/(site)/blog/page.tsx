import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { NewsletterForm } from "@/components/NewsletterForm";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "AI Compliance Blog — Regulation Updates & Compliance Guides",
  description:
    "Stay current on AI regulation: enforcement updates, compliance how-to guides, analysis of new laws, and expert commentary. Weekly updates.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

const CATEGORIES = [
  "Enforcement Updates",
  "Compliance Guides",
  "Regulation Analysis",
  "Industry News",
];

const POSTS = [
  {
    slug: "colorado-ai-act-60-day-checklist",
    title: "Colorado AI Act 60-Day Compliance Checklist (SB 24-205)",
    excerpt: "75 days until enforcement. Use this step-by-step checklist to get your business compliant with the Colorado AI Act before the June 30, 2026 deadline.",
    category: "Compliance Guides",
    date: "2026-04-16",
    readTime: "10 min read",
    tags: ["Colorado AI Act", "Checklist", "June 2026"],
  },
  {
    slug: "how-to-prepare-for-colorado-ai-act-june-2026",
    title: "How to Prepare for the Colorado AI Act Before June 30, 2026",
    excerpt: "A practical 5-step preparation guide for Colorado deployers: what triggers compliance, impact assessments, consumer notification, and vendor due diligence.",
    category: "Compliance Guides",
    date: "2026-04-14",
    readTime: "8 min read",
    tags: ["Colorado AI Act", "Preparation", "June 2026"],
  },
  {
    slug: "virginia-hb-2094-what-businesses-need-to-know",
    title: "Virginia HB 2094: What Businesses Need to Know Before July 2026",
    excerpt: "Virginia\u2019s new AI law takes effect July 1, 2026. Here\u2019s who it covers, how it compares to Colorado, and what you need to do now.",
    category: "Regulation Analysis",
    date: "2026-04-12",
    readTime: "6 min read",
    tags: ["Virginia HB 2094", "State Laws", "July 2026"],
  },
  {
    slug: "request-for-quote-ai-bias-audit-what-to-expect",
    title: "What to Expect When You Request an AI Bias Audit",
    excerpt: "A practical walkthrough of the RFQ process for an AI bias audit: what auditors assess, typical timelines and costs, and the right questions to ask.",
    category: "Compliance Guides",
    date: "2026-04-09",
    readTime: "7 min read",
    tags: ["Bias Audit", "RFQ", "Vendors"],
  },
  {
    slug: "nist-ai-rmf-explainer-for-compliance-teams",
    title: "NIST AI RMF Explained: A Compliance Team\u2019s Field Guide",
    excerpt: "What the NIST AI Risk Management Framework is, how its four core functions work, and how it maps to the EU AI Act and Colorado requirements.",
    category: "Compliance Guides",
    date: "2026-04-07",
    readTime: "9 min read",
    tags: ["NIST AI RMF", "Frameworks", "Risk Management"],
  },
  {
    slug: "colorado-ai-act-2026-deadline",
    title: "Colorado AI Act Takes Effect June 30, 2026 \u2014 What You Need to Do Now",
    excerpt: "With six months until the Colorado AI Act\u2019s effective date, here\u2019s a practical compliance checklist for businesses using high-risk AI systems in Colorado.",
    category: "Compliance Guides",
    date: "2026-04-10",
    readTime: "8 min read",
    tags: ["Colorado AI Act", "Deadline", "Action Required"],
  },
  {
    slug: "eu-ai-act-gpai-obligations",
    title: "EU AI Act GPAI Rules: What Foundation Model Developers Must Do by August 2025",
    excerpt: "The general-purpose AI (GPAI) model provisions of the EU AI Act are now in effect. Here\u2019s what developers and deployers of foundation models need to know.",
    category: "Regulation Analysis",
    date: "2026-04-05",
    readTime: "11 min read",
    tags: ["EU AI Act", "GPAI", "Foundation Models"],
  },
  {
    slug: "nyc-ll-144-enforcement-update",
    title: "NYC LL 144 Enforcement: First Fines Issued \u2014 What Happened and What It Means",
    excerpt: "New York City has begun enforcing Local Law 144. We break down the first enforcement actions, the amounts fined, and what employers need to fix immediately.",
    category: "Enforcement Updates",
    date: "2026-03-28",
    readTime: "6 min read",
    tags: ["NYC LL 144", "Enforcement", "Employers"],
  },
  {
    slug: "bias-audit-guide",
    title: "How to Commission a Bias Audit: A Step-by-Step Guide for Employers",
    excerpt: "If you use AI tools for hiring in New York City or Colorado, you need a bias audit. Here\u2019s exactly how to find an auditor, what the process looks like, and how to post results.",
    category: "Compliance Guides",
    date: "2026-03-20",
    readTime: "14 min read",
    tags: ["Bias Audit", "NYC LL 144", "Hiring AI"],
  },
  {
    slug: "texas-ai-regulation-2026",
    title: "Texas AI Bill HB 1709 Update: What It Would Mean for US Businesses",
    excerpt: "Texas is moving toward its own AI regulation modeled on Colorado. Here\u2019s what the bill proposes, where it stands, and how to prepare if you operate in Texas.",
    category: "Industry News",
    date: "2026-03-14",
    readTime: "7 min read",
    tags: ["Texas", "State Laws", "Upcoming"],
  },
  {
    slug: "ai-governance-program-guide",
    title: "Building an AI Governance Program: The Practical Guide for Mid-Size Companies",
    excerpt: "You don\u2019t need a team of 10 to build an effective AI governance program. This guide covers the essentials: policy, inventory, risk assessment, and documentation.",
    category: "Compliance Guides",
    date: "2026-03-07",
    readTime: "16 min read",
    tags: ["AI Governance", "NIST AI RMF", "Policy"],
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  const [featured, ...rest] = POSTS;

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="rg-page-head">
        <div className="rg-container" style={{ maxWidth: 1000 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h1>AI Compliance Blog</h1>
              <p className="rg-page-desc">
                Enforcement updates, compliance how-to guides, and analysis of new AI laws. Updated weekly.
              </p>
            </div>
            <Link href="/newsletter" className="rg-btn rg-btn-outline" style={{ flexShrink: 0 }}>
              <svg style={{ width: 16, height: 16, marginRight: 6 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Subscribe for updates
            </Link>
          </div>

          <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 6 }}>
            <span className="rg-pill-status" style={{ background: "var(--rg-primary)", color: "#fff" }}>All</span>
            {CATEGORIES.map((cat) => (
              <span key={cat} className="rg-tag" style={{ cursor: "pointer" }}>{cat}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="rg-page-body">
        <div className="rg-container" style={{ maxWidth: 1000 }}>

          {/* Featured post */}
          <Link href={`/blog/${featured.slug}`} className="rg-scard-link">
            <div className="rg-scard" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div style={{ width: 200, flexShrink: 0, borderRadius: 10, overflow: "hidden", background: "linear-gradient(135deg, var(--rg-primary-deep), var(--rg-primary))", aspectRatio: "16/9" }}>
                <Image
                  src={`/images/blog/${featured.slug}.jpg`}
                  alt={featured.title}
                  width={400}
                  height={225}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  priority
                />
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span className="rg-pill-status" style={{ background: "var(--rg-primary-faint)", color: "var(--rg-primary-deep)" }}>{featured.category}</span>
                  <span style={{ fontSize: 12, color: "var(--rg-ink-dim)" }}>{featured.readTime}</span>
                </div>
                <h2 style={{ marginBottom: 8 }}>{featured.title}</h2>
                <p style={{ marginBottom: 12 }}>{featured.excerpt}</p>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                  <time dateTime={featured.date} style={{ fontSize: 12, color: "var(--rg-ink-dim)" }}>{formatDate(featured.date)}</time>
                  <div style={{ display: "flex", gap: 5 }}>
                    {featured.tags.map((tag) => (
                      <span key={tag} className="rg-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Post grid */}
          <div className="rg-scard-grid-3" style={{ marginTop: 32 }}>
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="rg-scard-link">
                <div className="rg-scard" style={{ height: "100%" }}>
                  <div style={{ marginBottom: 14, height: 120, borderRadius: 8, overflow: "hidden", background: "linear-gradient(135deg, var(--rg-bg), var(--rg-border))" }}>
                    <Image
                      src={`/images/blog/${post.slug}.jpg`}
                      alt={post.title}
                      width={400}
                      height={225}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span className="rg-tag">{post.category}</span>
                    <span style={{ fontSize: 12, color: "var(--rg-ink-dim)" }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ lineHeight: 1.35, marginBottom: 8 }}>{post.title}</h3>
                  <p style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 10 }}>
                    {post.excerpt}
                  </p>
                  <time dateTime={post.date} style={{ fontSize: 12, color: "var(--rg-ink-dim)" }}>{formatDate(post.date)}</time>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="rg-cta-dark" style={{ marginTop: 48, textAlign: "center" }}>
            <h2>Never miss a regulation update</h2>
            <p style={{ maxWidth: 420, margin: "8px auto 0" }}>
              Weekly digest of new AI laws, enforcement actions, and compliance deadlines. Free. No spam.
            </p>
            <NewsletterForm source="blog" className="mt-5 max-w-sm mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
