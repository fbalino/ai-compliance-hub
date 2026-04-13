import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { checkerResponses } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      sessionId: string;
      answers: Record<string, string | string[]>;
      results: unknown[];
      reportTier?: string;
    };

    const { sessionId, answers, results, reportTier = "free" } = body;

    if (!sessionId || !answers || !results) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db.insert(checkerResponses).values({
      sessionId,
      answers,
      results,
      reportTier,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[checker/save] Error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
