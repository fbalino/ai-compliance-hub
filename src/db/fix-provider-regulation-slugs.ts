/**
 * One-time migration to fix provider_regulations slug mismatches.
 *
 * The seed data had `nyc-ll-144` instead of `nyc-local-law-144` for 8 providers,
 * plus several non-existent regulation slugs that prevented provider matching.
 *
 * Run: npx tsx src/db/fix-provider-regulation-slugs.ts
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { providerRegulations, providers } from "./schema";
import { eq, and } from "drizzle-orm";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

// Map of old (broken) slugs → new (correct) slug
const SLUG_RENAMES: Record<string, string> = {
  "nyc-ll-144": "nyc-local-law-144",
};

// Provider-specific regulation slug replacements:
// [providerSlug, oldRegSlug, newRegSlug]
const PROVIDER_SLUG_FIXES: Array<[string, string, string]> = [
  // BABL AI: replace eeoc-guidelines with real regulations
  ["babl-ai", "eeoc-guidelines", "illinois-ai-video-interview-act"],
  // ORCAA: replace non-existent slugs
  ["orcaa", "fair-housing-act", "illinois-ai-video-interview-act"],
  ["orcaa", "ecoa", "ccpa-admt"],
  // Fairly AI: replace sr-11-7
  ["fairly-ai", "sr-11-7", "ccpa-admt"],
  // AI Policy Lab: replace non-existent slugs
  ["ai-policy-lab", "uk-ai-regulations", "virginia-human-civil-rights-act"],
  ["ai-policy-lab", "singapore-ai-governance", "ccpa-admt"],
  // Fieldfisher: replace eu-product-liability-directive
  ["fieldfisher-ai", "eu-product-liability-directive", "nis2-directive"],
  // Wiley Rein: replace federal-ai-guidance
  ["wiley-ai-law", "federal-ai-guidance", "virginia-human-civil-rights-act"],
  // Venable: replace non-existent slugs
  ["venable-ai", "ftc-guidelines", "ccpa-admt"],
  ["venable-ai", "california-ai-laws", "california-ab-2013"],
  // AIGP: replace oecd-ai-principles
  ["ai-governance-professional", "oecd-ai-principles", "colorado-ai-act"],
  // ISACA: replace cobit
  ["isaca-ai-audit", "cobit", "eu-ai-act"],
  // Monitaur: replace sr-11-7
  ["monitaur", "sr-11-7", "dora"],
  // BCG X: replace oecd-ai-principles
  ["bcg-x-ai", "oecd-ai-principles", "colorado-ai-act"],
  // KPMG: replace sr-11-7
  ["kpmg-ai-risk", "sr-11-7", "dora"],
  // Covington: replace non-existent slugs
  ["covington-burling-ai", "california-ai-laws", "california-ab-2013"],
  ["covington-burling-ai", "federal-ai-guidance", "ccpa-admt"],
  // Perkins Coie: replace california-ai-laws
  ["perkins-coie-ai", "california-ai-laws", "ccpa-admt"],
  // Sidley Austin: replace non-existent slugs
  ["sidley-austin-ai", "sr-11-7", "dora"],
  ["sidley-austin-ai", "california-ai-laws", "ccpa-admt"],
  // LogicGate: replace sr-11-7
  ["logicgate-ai", "sr-11-7", "dora"],
  // AI for Good: replace non-existent slugs
  ["ai-for-good", "oecd-ai-principles", "nist-ai-rmf"],
  ["ai-for-good", "un-ai-governance", "iso-42001"],
  // IEEE: replace ieee-ethically-aligned-design
  ["ieee-ai-ethics-training", "ieee-ethically-aligned-design", "iso-42001"],
  // MIT Sloan: replace oecd-ai-principles
  ["mit-sloan-ai-compliance", "oecd-ai-principles", "iso-42001"],
  // Coursera: replace oecd-ai-principles
  ["coursera-ai-governance", "oecd-ai-principles", "iso-42001"],
];

// New regulation links to add (provider didn't previously have these)
const NEW_LINKS: Array<[string, string]> = [
  ["holistic-ai", "illinois-bipa"],
  ["babl-ai", "ccpa-admt"],
  ["credo-ai", "ccpa-admt"],
  ["fairly-ai", "dora"],
  ["impartial-ai", "illinois-ai-video-interview-act"],
  ["monitaur", "ccpa-admt"],
  ["fieldfisher-ai", "dora"],
  ["mit-sloan-ai-compliance", "colorado-ai-act"],
  ["coursera-ai-governance", "colorado-ai-act"],
  ["onetrust-ai", "nis2-directive"],
  ["onetrust-ai", "illinois-bipa"],
  ["onetrust-ai", "texas-cubi"],
  ["kpmg-ai-risk", "nis2-directive"],
  ["perkins-coie-ai", "illinois-bipa"],
  ["perkins-coie-ai", "texas-cubi"],
  ["wiley-ai-law", "texas-algorithmic-accountability-act"],
  ["venable-ai", "texas-algorithmic-accountability-act"],
];

async function migrate() {
  console.log("Fixing provider regulation slugs...\n");

  // 1. Bulk rename nyc-ll-144 → nyc-local-law-144
  for (const [oldSlug, newSlug] of Object.entries(SLUG_RENAMES)) {
    const result = await db
      .update(providerRegulations)
      .set({ regulationSlug: newSlug })
      .where(eq(providerRegulations.regulationSlug, oldSlug));
    console.log(`  Renamed "${oldSlug}" → "${newSlug}"`);
  }

  // 2. Provider-specific slug replacements
  for (const [provSlug, oldReg, newReg] of PROVIDER_SLUG_FIXES) {
    const [provider] = await db
      .select({ id: providers.id })
      .from(providers)
      .where(eq(providers.slug, provSlug))
      .limit(1);

    if (!provider) {
      console.log(`  ⚠ Provider "${provSlug}" not found, skipping`);
      continue;
    }

    // Delete old entry
    await db
      .delete(providerRegulations)
      .where(
        and(
          eq(providerRegulations.providerId, provider.id),
          eq(providerRegulations.regulationSlug, oldReg),
        ),
      );

    // Insert new (ignore conflicts from step 1 renames)
    await db
      .insert(providerRegulations)
      .values({ providerId: provider.id, regulationSlug: newReg })
      .onConflictDoNothing();

    console.log(`  ${provSlug}: "${oldReg}" → "${newReg}"`);
  }

  // 3. Add new regulation links
  for (const [provSlug, regSlug] of NEW_LINKS) {
    const [provider] = await db
      .select({ id: providers.id })
      .from(providers)
      .where(eq(providers.slug, provSlug))
      .limit(1);

    if (!provider) {
      console.log(`  ⚠ Provider "${provSlug}" not found, skipping`);
      continue;
    }

    await db
      .insert(providerRegulations)
      .values({ providerId: provider.id, regulationSlug: regSlug })
      .onConflictDoNothing();

    console.log(`  + ${provSlug}: added "${regSlug}"`);
  }

  console.log("\nMigration complete.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
