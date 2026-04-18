import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const REGULATION_SUMMARIES = `
EU AI Act: Applies to AI systems used or placed on market in EU. High-risk AI (hiring, credit, healthcare, biometrics, critical infrastructure) requires conformity assessments, documentation, human oversight. GPAI models need transparency docs. Biometric ID in public spaces largely prohibited. High-risk rules enforced August 2026; GPAI rules August 2025.

NYC Local Law 144 (LL 144): Applies to employers using AI/automated employment decision tools (AEDT) for hiring or promotion decisions affecting NYC-based employees or applicants. Requires annual third-party bias audit, public posting of audit results, and candidate notification. In effect since July 5, 2023.

Colorado AI Act (SB 24-205): Applies to developers and deployers of high-risk AI systems making consequential decisions affecting Colorado consumers in employment, credit/lending, education, healthcare, housing, or insurance. Requires impact assessments, risk management, and consumer notifications. Effective June 30, 2026.

California AB 2013: Applies to developers of generative AI systems that meet compute thresholds (~$50M training cost or 10^23 FLOPs) and operate in California. Requires publishing training data transparency reports on their website. Effective January 1, 2026.

Illinois AI Video Interview Act (AIVIRA): Applies to employers using AI to analyze video interviews for hiring decisions involving Illinois applicants. Requires pre-interview notification, candidate consent, explanation of AI-evaluated characteristics, limits on third-party data sharing, and video deletion within 30 days of written request. In effect since January 1, 2020.
`;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      answers: Record<string, string | string[]>;
    };
    const { answers } = body;

    if (!answers) {
      return NextResponse.json({ error: "answers required" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Claude API not configured", source: "fallback" },
        { status: 503 }
      );
    }

    const client = new Anthropic({ apiKey });

    const userPrompt = `A company has answered an AI compliance assessment. Determine which regulations apply based on their profile.

Company profile:
- Operations/locations: ${JSON.stringify(answers.operations)}
- AI use cases: ${JSON.stringify(answers.ai_uses)}
- Organization size: ${answers.org_size}
- AI role: ${answers.ai_role}

Return ONLY a valid JSON array (no markdown, no explanation, no code blocks). Each applicable regulation must use exactly these fields:
{
  "slug": string,         // one of: "eu-ai-act", "nyc-local-law-144", "colorado-ai-act", "california-ab-2013", "illinois-ai-video-interview-act"
  "name": string,         // full regulation name
  "jurisdiction": string, // e.g. "European Union", "US · New York City", "US · Colorado"
  "status": string,       // "enforced" or "enacted"
  "effectiveDate": string, // human-readable, e.g. "In effect since July 5, 2023"
  "urgency": string,      // "high", "medium", or "low"
  "reason": string,       // 1-2 sentences explaining why this applies to this company
  "actions": string[]     // 3-5 specific, actionable compliance steps for this company
}

If no regulations apply, return [].
Sort by urgency: high first, then medium, then low.

Regulation reference:
${REGULATION_SUMMARIES}`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      system:
        "You are an expert AI compliance attorney. Analyze a company profile and return exactly which AI regulations apply. Respond with valid JSON only — no markdown, no code blocks, no commentary. Just the raw JSON array.",
      messages: [{ role: "user", content: userPrompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // Strip accidental markdown code fences
    const text = content.text.trim();
    const jsonText = text
      .replace(/^```(?:json)?\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    const results = JSON.parse(jsonText) as unknown[];

    if (!Array.isArray(results)) {
      throw new Error("Claude did not return an array");
    }

    return NextResponse.json({ results, source: "claude" });
  } catch (err) {
    console.error("[checker/analyze] Error:", err);
    return NextResponse.json(
      { error: "Analysis failed", source: "fallback" },
      { status: 500 }
    );
  }
}
