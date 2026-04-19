import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  timestamp,
  date,
  jsonb,
  index,
  unique,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ─────────────────────────────────────────────
// Users (businesses seeking compliance help)
// ─────────────────────────────────────────────
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  name: text("name"),
  companyName: text("company_name"),
  companySize: text("company_size"),
  industry: text("industry"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─────────────────────────────────────────────
// Provider categories (bias-audit, legal, etc.)
// ─────────────────────────────────────────────
export const providerCategories = pgTable("provider_categories", {
  slug: text("slug").primaryKey(),
  label: text("label").notNull(),
  icon: text("icon").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  // display names of relevant regulations, stored as array
  regulations: text("regulations").array(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─────────────────────────────────────────────
// Core provider directory
// ─────────────────────────────────────────────
export const providers = pgTable(
  "providers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").unique().notNull(),
    name: text("name").notNull(),
    // primary category slug (references providerCategories.slug)
    category: text("category"),
    // short description for listing cards (~150 chars)
    tagline: text("tagline"),
    description: text("description"),
    logoUrl: text("logo_url"),
    websiteUrl: text("website_url"),
    foundedYear: integer("founded_year"),
    headquarters: text("headquarters"),
    // '1-10', '11-50', '51-200', '201-500', '500+'
    employeeCountRange: text("employee_count_range"),
    // geographic scopes: ['US', 'EU', 'UK', 'Global']
    jurisdictions: text("jurisdictions").array(),
    // 'free', 'premium', 'enterprise'
    tier: text("tier").default("free"),
    isVerified: boolean("is_verified").default(false),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("idx_providers_tier").on(t.tier),
    index("idx_providers_verified").on(t.isVerified),
    index("idx_providers_category").on(t.category),
  ]
);

// What regulations a provider covers
export const providerRegulations = pgTable(
  "provider_regulations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    providerId: uuid("provider_id")
      .references(() => providers.id, { onDelete: "cascade" })
      .notNull(),
    // 'colorado-ai-act', 'eu-ai-act', etc.
    regulationSlug: text("regulation_slug").notNull(),
  },
  (t) => [
    unique("provider_regulation_unique").on(t.providerId, t.regulationSlug),
    index("idx_provider_regulations_slug").on(t.regulationSlug),
  ]
);

// What services a provider offers
export const providerServices = pgTable(
  "provider_services",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    providerId: uuid("provider_id")
      .references(() => providers.id, { onDelete: "cascade" })
      .notNull(),
    // 'bias-audit', 'governance-consulting', 'legal', 'software', 'training'
    serviceType: text("service_type").notNull(),
  },
  (t) => [
    unique("provider_service_unique").on(t.providerId, t.serviceType),
    index("idx_provider_services_type").on(t.serviceType),
  ]
);

// What industries a provider serves
export const providerIndustries = pgTable(
  "provider_industries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    providerId: uuid("provider_id")
      .references(() => providers.id, { onDelete: "cascade" })
      .notNull(),
    // 'healthcare', 'fintech', 'hr-recruiting', 'insurance', 'education'
    industry: text("industry").notNull(),
  },
  (t) => [
    unique("provider_industry_unique").on(t.providerId, t.industry),
    index("idx_provider_industries_industry").on(t.industry),
  ]
);

// Reviews
export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  providerId: uuid("provider_id")
    .references(() => providers.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id").references(() => users.id),
  rating: integer("rating"),
  title: text("title"),
  body: text("body"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─────────────────────────────────────────────
// Compliance checker responses
// ─────────────────────────────────────────────
export const checkerResponses = pgTable(
  "checker_responses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id),
    sessionId: text("session_id").notNull(),
    answers: jsonb("answers").notNull(),
    results: jsonb("results").notNull(),
    // 'free' or 'pro'
    reportTier: text("report_tier").default("free"),
    stripePaymentId: text("stripe_payment_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("idx_checker_responses_user").on(t.userId)]
);

// ─────────────────────────────────────────────
// Leads (RFQ form submissions)
// ─────────────────────────────────────────────
export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id),
    providerId: uuid("provider_id").references(() => providers.id),
    regulationSlug: text("regulation_slug"),
    serviceType: text("service_type"),
    message: text("message"),
    // 'new', 'sent', 'responded', 'converted'
    status: text("status").default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("idx_leads_provider").on(t.providerId),
    index("idx_leads_status").on(t.status),
  ]
);

// ─────────────────────────────────────────────
// RFPs (Request for Proposal)
// ─────────────────────────────────────────────
export const rfps = pgTable("rfps", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  companyName: text("company_name").notNull(),
  companySize: text("company_size"),
  industry: text("industry"),
  description: text("description").notNull(),
  regulationSlugs: text("regulation_slugs").array(),
  serviceTypes: text("service_types").array(),
  jurisdictions: text("jurisdictions").array(),
  timeline: text("timeline"),
  budget: text("budget"),
  status: text("status").default("open"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (t) => [
  index("idx_rfps_status").on(t.status),
]);

// ─────────────────────────────────────────────
// Newsletter subscribers
// ─────────────────────────────────────────────
export const subscribers = pgTable("subscribers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  // 'checker', 'blog', 'directory', 'homepage'
  source: text("source"),
  subscribedAt: timestamp("subscribed_at", { withTimezone: true }).defaultNow(),
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
});

// ─────────────────────────────────────────────
// Regulation metadata
// (static content lives in /content/regulations MDX)
// ─────────────────────────────────────────────
export const regulations = pgTable("regulations", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  // 'US-CO', 'EU', 'US-CA', 'US-NY', etc.
  jurisdiction: text("jurisdiction").notNull(),
  // 'draft', 'enacted', 'enforced', 'rescinded'
  status: text("status").notNull(),
  effectiveDate: date("effective_date"),
  enforcementDate: date("enforcement_date"),
  maxPenalty: text("max_penalty"),
  summary: text("summary"),
  lastUpdated: timestamp("last_updated", { withTimezone: true }).defaultNow(),
});

// ─────────────────────────────────────────────
// Type exports
// ─────────────────────────────────────────────
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ProviderCategory = typeof providerCategories.$inferSelect;
export type NewProviderCategory = typeof providerCategories.$inferInsert;
export type Provider = typeof providers.$inferSelect;
export type NewProvider = typeof providers.$inferInsert;
export type ProviderRegulation = typeof providerRegulations.$inferSelect;
export type ProviderService = typeof providerServices.$inferSelect;
export type ProviderIndustry = typeof providerIndustries.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type CheckerResponse = typeof checkerResponses.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type Regulation = typeof regulations.$inferSelect;
export type Rfp = typeof rfps.$inferSelect;
export type NewRfp = typeof rfps.$inferInsert;
