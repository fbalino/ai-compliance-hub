const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";
const SITE_NAME = "AI Compliance Hub";
const LOGO_URL = `${SITE_URL}/logo.png`;

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
    sameAs: [],
  };
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
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
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
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
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
