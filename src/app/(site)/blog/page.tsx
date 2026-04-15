import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
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
    slug: "how-to-prepare-for-colorado-ai-act-june-2026",
    title: "How to Prepare for the Colorado AI Act Before June 30, 2026",
    excerpt:
      "A practical 5-step preparation guide for Colorado deployers: what triggers compliance, impact assessments, consumer notification, and vendor due diligence.",
    category: "Compliance Guides",
    date: "2026-04-14",
    readTime: "8 min read",
    tags: ["Colorado AI Act", "Preparation", "June 2026"],
  },
  {
    slug: "virginia-hb-2094-what-businesses-need-to-know",
    title: "Virginia HB 2094: What Businesses Need to Know Before July 2026",
    excerpt:
      "Virginia's new AI law takes effect July 1, 2026. Here's who it covers, how it compares to Colorado, and what you need to do now.",
    category: "Regulation Analysis",
    date: "2026-04-12",
    readTime: "6 min read",
    tags: ["Virginia HB 2094", "State Laws", "July 2026"],
  },
  {
    slug: "request-for-quote-ai-bias-audit-what-to-expect",
    title: "What to Expect When You Request an AI Bias Audit",
    excerpt:
      "A practical walkthrough of the RFQ process for an AI bias audit: what auditors assess, typical timelines and costs, and the right questions to ask.",
    category: "Compliance Guides",
    date: "2026-04-09",
    readTime: "7 min read",
    tags: ["Bias Audit", "RFQ", "Vendors"],
  },
  {
    slug: "nist-ai-rmf-explainer-for-compliance-teams",
    title: "NIST AI RMF Explained: A Compliance Team's Field Guide",
    excerpt:
      "What the NIST AI Risk Management Framework is, how its four core functions work, and how it maps to the EU AI Act and Colorado requirements.",
    category: "Compliance Guides",
    date: "2026-04-07",
    readTime: "9 min read",
    tags: ["NIST AI RMF", "Frameworks", "Risk Management"],
  },
  {
    slug: "colorado-ai-act-2026-deadline",
    title: "Colorado AI Act Takes Effect June 30, 2026 — What You Need to Do Now",
    excerpt:
      "With six months until the Colorado AI Act's effective date, here's a practical compliance checklist for businesses using high-risk AI systems in Colorado.",
    category: "Compliance Guides",
    date: "2026-04-10",
    readTime: "8 min read",
    tags: ["Colorado AI Act", "Deadline", "Action Required"],
  },
  {
    slug: "eu-ai-act-gpai-obligations",
    title: "EU AI Act GPAI Rules: What Foundation Model Developers Must Do by August 2025",
    excerpt:
      "The general-purpose AI (GPAI) model provisions of the EU AI Act are now in effect. Here's what developers and deployers of foundation models need to know.",
    category: "Regulation Analysis",
    date: "2026-04-05",
    readTime: "11 min read",
    tags: ["EU AI Act", "GPAI", "Foundation Models"],
  },
  {
    slug: "nyc-ll-144-enforcement-update",
    title: "NYC LL 144 Enforcement: First Fines Issued — What Happened and What It Means",
    excerpt:
      "New York City has begun enforcing Local Law 144. We break down the first enforcement actions, the amounts fined, and what employers need to fix immediately.",
    category: "Enforcement Updates",
    date: "2026-03-28",
    readTime: "6 min read",
    tags: ["NYC LL 144", "Enforcement", "Employers"],
  },
  {
    slug: "bias-audit-guide",
    title: "How to Commission a Bias Audit: A Step-by-Step Guide for Employers",
    excerpt:
      "If you use AI tools for hiring in New York City or Colorado, you need a bias audit. Here's exactly how to find an auditor, what the process looks like, and how to post results.",
    category: "Compliance Guides",
    date: "2026-03-20",
    readTime: "14 min read",
    tags: ["Bias Audit", "NYC LL 144", "Hiring AI"],
  },
  {
    slug: "texas-ai-regulation-2026",
    title: "Texas AI Bill HB 1709 Update: What It Would Mean for US Businesses",
    excerpt:
      "Texas is moving toward its own AI regulation modeled on Colorado. Here's what the bill proposes, where it stands, and how to prepare if you operate in Texas.",
    category: "Industry News",
    date: "2026-03-14",
    readTime: "7 min read",
    tags: ["Texas", "State Laws", "Upcoming"],
  },
  {
    slug: "ai-governance-program-guide",
    title: "Building an AI Governance Program: The Practical Guide for Mid-Size Companies",
    excerpt:
      "You don't need a team of 10 to build an effective AI governance program. This guide covers the essentials: policy, inventory, risk assessment, and documentation.",
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

      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                AI Compliance Blog
              </h1>
              <p className="mt-2 text-neutral-600 max-w-xl">
                Enforcement updates, compliance how-to guides, and analysis of new AI laws. Updated weekly.
              </p>
            </div>
            <Link
              href="/newsletter"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              <svg className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Subscribe for updates
            </Link>
          </div>

          {/* Category filter */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-brand-700 px-3 py-1 text-xs font-medium text-white">
              All
            </span>
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 cursor-pointer hover:bg-neutral-200 transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">

        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className="group block">
          <Card hover className="group-hover:border-brand-300 transition-all">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Cover image */}
              <div className="sm:w-48 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-brand-800 to-brand-950 aspect-video sm:aspect-auto">
                <Image
                  src={`/images/blog/${featured.slug}.jpg`}
                  alt={featured.title}
                  width={400}
                  height={225}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="enacted">{featured.category}</Badge>
                  <span className="text-xs text-neutral-500">{featured.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-neutral-900 group-hover:text-brand-800 transition-colors mb-2">
                  {featured.title}
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-3">{featured.excerpt}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <time dateTime={featured.date} className="text-xs text-neutral-500">
                    {formatDate(featured.date)}
                  </time>
                  <div className="flex gap-1.5">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>

        {/* Post grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <Card hover className="h-full group-hover:border-brand-300 transition-all">
                {/* Cover image */}
                <div className="mb-4 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
                  <Image
                    src={`/images/blog/${post.slug}.jpg`}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                    {post.category}
                  </span>
                  <span className="text-xs text-neutral-500">{post.readTime}</span>
                </div>
                <h3 className="font-bold text-neutral-900 group-hover:text-brand-800 transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-3">
                  {post.excerpt}
                </p>
                <time dateTime={post.date} className="text-xs text-neutral-500">
                  {formatDate(post.date)}
                </time>
              </Card>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <section className="rounded-xl bg-brand-900 p-6 sm:p-8 text-center">
          <h2 className="text-xl font-bold text-white">
            Never miss a regulation update
          </h2>
          <p className="mt-2 text-sm text-brand-200 max-w-md mx-auto">
            Weekly digest of new AI laws, enforcement actions, and compliance deadlines. Free. No spam.
          </p>
          <NewsletterForm
            source="blog"
            className="mt-5 max-w-sm mx-auto"
          />
        </section>
      </div>
    </>
  );
}
