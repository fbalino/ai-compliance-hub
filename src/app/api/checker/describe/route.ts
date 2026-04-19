import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { db } from "@/db";
import { providers, providerRegulations } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

const REGULATION_REFERENCE = `
Regulations and their jurisdictions (ONLY return regulations whose jurisdiction matches the user's described situation):

EU AI Act [slug: "eu-ai-act", jurisdiction: "European Union"]: Applies to AI systems used or placed on market in EU. High-risk AI (hiring, credit, healthcare, biometrics, critical infrastructure) requires conformity assessments, documentation, human oversight. GPAI models need transparency docs. Biometric ID in public spaces largely prohibited.

DORA [slug: "dora", jurisdiction: "European Union"]: EU regulation for digital operational resilience of financial entities (banks, insurers, investment firms). Covers ICT risk management and third-party oversight.

NIS2 Directive [slug: "nis2-directive", jurisdiction: "European Union"]: EU cybersecurity obligations for essential and important entities across critical sectors.

GDPR [slug: "gdpr", jurisdiction: "European Union"]: EU data protection framework governing processing of personal data, including biometric and AI-processed data. Extraterritorial reach.

NYC Local Law 144 [slug: "nyc-local-law-144", jurisdiction: "US · New York City"]: Applies ONLY to employers using AI/automated tools for hiring or promotion decisions affecting NYC-based employees or applicants.

Colorado AI Act [slug: "colorado-ai-act", jurisdiction: "US · Colorado"]: Applies ONLY to deployers of high-risk AI systems making consequential decisions affecting Colorado consumers in employment, credit, education, healthcare, housing, or insurance.

California AB 2013 [slug: "california-ab-2013", jurisdiction: "US · California"]: Applies ONLY to developers of generative AI systems with California operations.

Illinois AI Video Interview Act [slug: "illinois-ai-video-interview-act", jurisdiction: "US · Illinois"]: Applies ONLY to employers using AI to analyze video interviews for hiring decisions involving Illinois applicants.

Illinois BIPA [slug: "illinois-bipa", jurisdiction: "US · Illinois"]: Applies ONLY to entities collecting biometric identifiers from Illinois residents.

Virginia HB 2094 [slug: "virginia-hb-2094", jurisdiction: "US · Virginia"]: Applies ONLY to automated decision systems affecting Virginia residents in employment, credit, or healthcare.

Texas CUBI [slug: "texas-cubi", jurisdiction: "US · Texas"]: Applies ONLY to entities capturing biometric identifiers of Texas residents.

Texas HB 1709 [slug: "texas-hb-1709", jurisdiction: "US · Texas"]: Proposed law for deployers of high-risk AI systems in Texas (draft status, not yet enacted).
`;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { description: string };
    const { description } = body;

    if (!description || typeof description !== "string" || description.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a description of at least 5 characters" },
        { status: 400 },
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Claude API not configured" },
        { status: 503 },
      );
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2500,
      system: `You are an expert AI compliance attorney. A user will describe their business situation in free text. Your job is to determine which AI regulations apply to them based STRICTLY on jurisdiction matching.

CRITICAL RULES:
1. JURISDICTION FIRST: Only return regulations from jurisdictions where the user actually operates or has employees/customers. A German bank should NEVER see Illinois or Colorado laws unless they explicitly mention US operations there.
2. Be conservative: if the user doesn't mention a jurisdiction, don't assume they operate there. "German bank" = EU jurisdiction only, unless they say they also operate in the US.
3. EU regulations (EU AI Act, DORA, GDPR, NIS2) apply to any entity operating in or serving EU customers.
4. US state laws apply ONLY if the user mentions that specific state, or mentions "US" broadly (in which case note that it depends on specific state presence).
5. Return ONLY regulations that have a genuine connection to the user's described business and AI use.
6. Sort by urgency: high first, then medium, then low.

Respond with valid JSON only — no markdown, no code blocks, no commentary.`,
      messages: [
        {
          role: "user",
          content: `A user described their situation as: "${description.trim()}"

Based on this description, determine which regulations apply. Return a JSON object with this structure:
{
  "regulations": [
    {
      "slug": string,        // regulation slug from the reference list
      "name": string,        // full regulation name
      "jurisdiction": string, // e.g. "European Union", "US · New York City"
      "status": "enforced" | "enacted" | "draft",
      "urgency": "high" | "medium" | "low",
      "reason": string,      // 1-2 sentences explaining why this applies to THIS specific user
      "actions": string[]    // 3-5 specific, actionable compliance steps
    }
  ],
  "extractedContext": {
    "jurisdictions": string[],   // jurisdictions identified from the description
    "aiUseCases": string[],      // AI use cases identified
    "industry": string | null,   // industry if identifiable
    "orgType": string | null     // organization type if identifiable
  }
}

If no regulations clearly apply, return {"regulations": [], "extractedContext": {...}}.

Regulation reference:
${REGULATION_REFERENCE}`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const text = content.text.trim();
    const jsonText = text
      .replace(/^```(?:json)?\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    const parsed = JSON.parse(jsonText) as {
      regulations: Array<{
        slug: string;
        name: string;
        jurisdiction: string;
        status: string;
        urgency: string;
        reason: string;
        actions: string[];
      }>;
      extractedContext: {
        jurisdictions: string[];
        aiUseCases: string[];
        industry: string | null;
        orgType: string | null;
      };
    };

    if (!parsed.regulations || !Array.isArray(parsed.regulations)) {
      throw new Error("Invalid response structure");
    }

    const regSlugs = parsed.regulations.map((r) => r.slug);
    let matchedProviders: Array<{
      id: string;
      slug: string;
      name: string;
      tagline: string | null;
      category: string | null;
      jurisdictions: string[] | null;
      isVerified: boolean | null;
      tier: string | null;
      websiteUrl: string | null;
    }> = [];

    if (regSlugs.length > 0) {
      const providerRegs = await db
        .select({
          providerId: providerRegulations.providerId,
          regulationSlug: providerRegulations.regulationSlug,
        })
        .from(providerRegulations)
        .where(inArray(providerRegulations.regulationSlug, regSlugs));

      const providerIds = [...new Set(providerRegs.map((pr) => pr.providerId))];

      if (providerIds.length > 0) {
        const allProviders = await db
          .select({
            id: providers.id,
            slug: providers.slug,
            name: providers.name,
            tagline: providers.tagline,
            category: providers.category,
            jurisdictions: providers.jurisdictions,
            isVerified: providers.isVerified,
            tier: providers.tier,
            websiteUrl: providers.websiteUrl,
          })
          .from(providers)
          .where(inArray(providers.id, providerIds));

        const providerRegCount = new Map<string, number>();
        for (const pr of providerRegs) {
          providerRegCount.set(
            pr.providerId,
            (providerRegCount.get(pr.providerId) ?? 0) + 1,
          );
        }

        matchedProviders = allProviders
          .sort((a, b) => {
            const aVerified = a.isVerified ? 1 : 0;
            const bVerified = b.isVerified ? 1 : 0;
            if (bVerified !== aVerified) return bVerified - aVerified;
            const aCount = providerRegCount.get(a.id) ?? 0;
            const bCount = providerRegCount.get(b.id) ?? 0;
            return bCount - aCount;
          })
          .slice(0, 8);
      }
    }

    return NextResponse.json({
      regulations: parsed.regulations,
      providers: matchedProviders,
      extractedContext: parsed.extractedContext,
      source: "claude",
    });
  } catch (err) {
    console.error("[checker/describe] Error:", err);
    return NextResponse.json(
      { error: "Analysis failed. Please try the guided assessment instead." },
      { status: 500 },
    );
  }
}
