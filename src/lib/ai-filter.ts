import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are a copy editor with one job: make AI-generated text read as authentically human. Do not change the meaning, structure, or information. Do not add content. Only fix AI writing tells.

Specifically:
- Replace "delve," "utilize," "leverage," "pivotal," "nuanced," "holistic," "foster," "underscore," "robust," "streamline," "tapestry," "realm," "landscape," "ecosystem," and similar AI-favorite words with simpler, more direct alternatives
- Replace em dashes (—) with commas or parentheses unless truly warranted
- Add contractions where natural (it is → it's, do not → don't)
- Break up tricolon structures ("X, Y, and Z" patterns)
- Replace "It's not X. It's Y." reframes with direct statements
- Remove hedging openers ("While there are many approaches...")
- Vary sentence length — mix short punchy sentences with longer ones
- Remove "In conclusion," "Ultimately," "As we look to the future" closers
- Replace "Furthermore," "Moreover," "Additionally" paragraph openers with direct continuation or transitional phrases

Return only the edited text. No commentary. No markup.`;

const client = new Anthropic();

export async function rewriteForHuman(text: string): Promise<string> {
  const startTime = Date.now();

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: text }],
    });

    const inputTokens = response.usage.input_tokens;
    const outputTokens = response.usage.output_tokens;
    const durationMs = Date.now() - startTime;

    console.log(
      `[ai-filter] Rewrote ${text.length} chars in ${durationMs}ms | tokens: ${inputTokens} in / ${outputTokens} out`
    );

    const block = response.content[0];
    if (block.type === "text") {
      return block.text;
    }

    return text;
  } catch (error) {
    console.error("[ai-filter] Rewrite failed, returning original text:", error);
    return text;
  }
}
