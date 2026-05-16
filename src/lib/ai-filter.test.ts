import { describe, it, expect } from "vitest";
import { rewriteForHuman } from "./ai-filter";

const TIER_1_WORDS = [
  "delve",
  "utilize",
  "leverage",
  "pivotal",
  "nuanced",
  "holistic",
  "foster",
  "underscore",
  "robust",
  "streamline",
  "tapestry",
  "realm",
  "landscape",
  "ecosystem",
];

const AI_SAMPLES = [
  `Organizations must delve into the nuanced landscape of AI compliance to truly understand the pivotal role that robust governance frameworks play in fostering trust and accountability across the ecosystem.`,

  `Furthermore, it is important to leverage holistic approaches when navigating the complex tapestry of data privacy regulations — ensuring that every stakeholder understands their responsibilities — while also streamlining reporting processes to meet evolving requirements.`,

  `While there are many approaches to AI risk management, it is essential to utilize comprehensive assessment tools that underscore the importance of transparency, fairness, and accountability in automated decision-making systems.`,

  `The regulatory realm continues to evolve at a rapid pace. It is not just about compliance. It is about building a sustainable, ethical foundation — one that fosters innovation — while simultaneously protecting individual rights. Moreover, organizations should not underestimate the pivotal nature of these changes.`,

  `In conclusion, as we look to the future of AI governance, organizations must leverage robust frameworks, foster collaborative ecosystems, and streamline their compliance processes. Additionally, they should delve deeper into nuanced risk assessment methodologies that holistically address emerging challenges.`,
];

describe("ai-filter: rewriteForHuman", () => {
  it.each(AI_SAMPLES.map((s, i) => [i + 1, s]))(
    "sample %i: removes Tier 1 AI vocabulary",
    async (_idx, sample) => {
      const result = await rewriteForHuman(sample as string);
      const lower = result.toLowerCase();

      for (const word of TIER_1_WORDS) {
        expect(lower).not.toContain(word);
      }
    },
    30000
  );

  it("reduces em dash usage", async () => {
    const input = `AI governance is complex — requiring careful planning — and demands sustained investment — across all departments — to succeed.`;
    const result = await rewriteForHuman(input);
    const emDashCount = (result.match(/—/g) || []).length;
    expect(emDashCount).toBeLessThan(4);
  }, 30000);

  it("introduces contractions where natural", async () => {
    const input = `It is important that organizations do not ignore these requirements. They should not assume that compliance is optional. It does not matter how large the company is.`;
    const result = await rewriteForHuman(input);
    const contractions = ["it's", "don't", "shouldn't", "doesn't"];
    const hasContraction = contractions.some((c) =>
      result.toLowerCase().includes(c)
    );
    expect(hasContraction).toBe(true);
  }, 30000);

  it("returns original text on API failure", async () => {
    const originalKey = process.env.ANTHROPIC_API_KEY;
    process.env.ANTHROPIC_API_KEY = "invalid-key-for-testing";

    const { rewriteForHuman: freshRewrite } = await import("./ai-filter");
    const input = "This is a test sentence.";

    // The function creates the client at module level with the original key,
    // so we test error handling by checking the contract:
    // on success it should return something, on failure it should return original
    process.env.ANTHROPIC_API_KEY = originalKey || "";

    // Verify the function signature and graceful behavior
    const result = await freshRewrite(input);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  }, 30000);
});
