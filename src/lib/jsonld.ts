const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://regulome.io";
const SITE_NAME = "regulome.io";
const LOGO_URL = `${SITE_URL}/logo.png`;

const PUBLISHER = {
  "@type": "Organization" as const,
  name: SITE_NAME,
  url: SITE_URL,
  logo: { "@type": "ImageObject" as const, url: LOGO_URL },
};

// ─────────────────────────────────────────────
// Breadcrumbs
// ─────────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ─────────────────────────────────────────────
// Organization (site-wide)
// ─────────────────────────────────────────────
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    description:
      "The global register of AI regulations. Search 912+ AI and cyber regulations, find vetted compliance providers, and determine which laws apply to your business.",
    foundingDate: "2024",
    knowsAbout: [
      "AI regulation",
      "EU AI Act",
      "AI compliance",
      "Algorithmic accountability",
      "AI governance frameworks",
      "NIST AI RMF",
      "ISO 42001",
      "Bias auditing",
      "AI risk management",
    ],
    sameAs: [],
  };
}

// ─────────────────────────────────────────────
// Person / Author schema
// ─────────────────────────────────────────────
export interface PersonSchemaParams {
  name: string;
  url?: string;
  jobTitle?: string;
  worksFor?: string;
  knowsAbout?: string[];
  sameAs?: string[];
}

export function personSchema(params: PersonSchemaParams) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: params.name,
  };
  if (params.url) schema.url = params.url;
  if (params.jobTitle) schema.jobTitle = params.jobTitle;
  if (params.worksFor) {
    schema.worksFor = { "@type": "Organization", name: params.worksFor };
  }
  if (params.knowsAbout?.length) schema.knowsAbout = params.knowsAbout;
  if (params.sameAs?.length) schema.sameAs = params.sameAs;
  return schema;
}

// ─────────────────────────────────────────────
// Regulation pages — Article + FAQPage
// ─────────────────────────────────────────────
export interface FaqItem {
  question: string;
  answer: string;
}

export interface RegulationArticleParams {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  faqs?: FaqItem[];
}

export function regulationArticleSchema(params: RegulationArticleParams) {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: PUBLISHER,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": params.url.startsWith("http") ? params.url : `${SITE_URL}${params.url}`,
    },
  };

  if (!params.faqs?.length) return article;

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: params.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return [article, faqPage];
}

// ─────────────────────────────────────────────
// Provider profile pages — ProfessionalService
// ─────────────────────────────────────────────
export interface ProviderSchemaParams {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
  serviceTypes: string[];
  ratingValue?: number;
  reviewCount?: number;
}

export function providerSchema(params: ProviderSchemaParams) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: params.name,
    description: params.description,
    url: params.url,
    areaServed: params.areaServed ?? "Global",
    serviceType: params.serviceTypes,
  };

  if (params.ratingValue && params.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: params.ratingValue.toFixed(1),
      reviewCount: params.reviewCount,
    };
  }

  return schema;
}

// ─────────────────────────────────────────────
// Compliance checker tool — WebApplication
// ─────────────────────────────────────────────
export function checkerToolSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Compliance Checker",
    description:
      "Free tool to determine which AI regulations apply to your business and what you need to do to comply.",
    url: `${SITE_URL}/checker`,
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

// ─────────────────────────────────────────────
// Comparison pages — Article with about
// ─────────────────────────────────────────────
export interface ComparisonArticleParams {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  aboutRegulations: Array<{ name: string; url: string }>;
}

export function comparisonArticleSchema(params: ComparisonArticleParams) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: PUBLISHER,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": params.url.startsWith("http") ? params.url : `${SITE_URL}${params.url}`,
    },
    about: params.aboutRegulations.map((r) => ({
      "@type": "Legislation",
      name: r.name,
      url: r.url,
    })),
  };
}

// ─────────────────────────────────────────────
// Blog article (The Ledger posts)
// ─────────────────────────────────────────────
export interface BlogArticleParams {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  category?: string;
  tags?: string[];
  wordCount?: number;
  imageUrl?: string;
}

export function blogArticleSchema(params: BlogArticleParams) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: {
      "@type": "Organization",
      name: params.authorName ?? SITE_NAME,
    },
    publisher: PUBLISHER,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": params.url.startsWith("http") ? params.url : `${SITE_URL}${params.url}`,
    },
  };
  if (params.category) schema.articleSection = params.category;
  if (params.tags?.length) schema.keywords = params.tags.join(", ");
  if (params.wordCount) schema.wordCount = params.wordCount;
  if (params.imageUrl) {
    schema.image = { "@type": "ImageObject", url: params.imageUrl };
  }
  return schema;
}

// ─────────────────────────────────────────────
// FAQ schema (standalone, for any page with Q&A)
// ─────────────────────────────────────────────
export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─────────────────────────────────────────────
// Speakable schema (marks content for voice/AI readout)
// ─────────────────────────────────────────────
export interface SpeakableParams {
  url: string;
  cssSelectors?: string[];
  xpaths?: string[];
}

export function speakableSchema(params: SpeakableParams) {
  const speakable: Record<string, unknown> = {
    "@type": "SpeakableSpecification",
  };
  if (params.cssSelectors?.length) {
    speakable.cssSelector = params.cssSelectors;
  }
  if (params.xpaths?.length) {
    speakable.xpath = params.xpaths;
  }
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: params.url.startsWith("http") ? params.url : `${SITE_URL}${params.url}`,
    speakable,
  };
}

// ─────────────────────────────────────────────
// Helper: serialize to script tag props
// ─────────────────────────────────────────────
export function jsonLdScriptProps(schema: object | object[]) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema),
    },
  };
}
