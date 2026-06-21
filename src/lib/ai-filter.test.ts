import { describe, it, expect, vi, beforeEach } from "vitest";

// rewriteForHuman is a thin wrapper around the Anthropic API. Its *output quality*
// (does the model actually strip AI tells?) is a non-deterministic model eval that
// needs a live, paid API key — that does not belong in the default unit suite
// (it made `npm test` fail whenever no key was present). Here we mock the SDK and
// test the wrapper's real contract: it calls the API and returns the model text,
// and it degrades gracefully (returns the original text) on any failure.

// vi.mock is hoisted above imports, so the mock fn must be created via vi.hoisted
// to exist when the factory runs (otherwise it's in the temporal dead zone).
const { createMock } = vi.hoisted(() => ({ createMock: vi.fn() }));
vi.mock("@anthropic-ai/sdk", () => ({
  default: class {
    messages = { create: createMock };
  },
}));

import { rewriteForHuman } from "./ai-filter";

beforeEach(() => {
  createMock.mockReset();
});

describe("ai-filter: rewriteForHuman", () => {
  it("returns the rewritten text from the model on success", async () => {
    createMock.mockResolvedValue({
      content: [{ type: "text", text: "Companies should act now." }],
      usage: { input_tokens: 10, output_tokens: 5 },
    });

    const result = await rewriteForHuman("It is important to leverage robust frameworks.");

    expect(result).toBe("Companies should act now.");
    expect(createMock).toHaveBeenCalledTimes(1);
  });

  it("sends the input as the user message to a Claude model", async () => {
    createMock.mockResolvedValue({
      content: [{ type: "text", text: "ok" }],
      usage: { input_tokens: 1, output_tokens: 1 },
    });

    const input = "Some draft copy.";
    await rewriteForHuman(input);

    const args = createMock.mock.calls[0][0];
    expect(args.model).toMatch(/claude/);
    expect(args.messages).toEqual([{ role: "user", content: input }]);
    expect(typeof args.system).toBe("string");
  });

  it("returns the original text when the API call throws", async () => {
    createMock.mockRejectedValue(new Error("network error"));

    const input = "This is the original text.";
    const result = await rewriteForHuman(input);

    expect(result).toBe(input);
  });

  it("returns the original text when the response block is not text", async () => {
    createMock.mockResolvedValue({
      content: [{ type: "tool_use", id: "x", name: "y", input: {} }],
      usage: { input_tokens: 1, output_tokens: 1 },
    });

    const input = "Original, untouched.";
    const result = await rewriteForHuman(input);

    expect(result).toBe(input);
  });
});
