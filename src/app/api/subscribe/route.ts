import { NextRequest, NextResponse } from "next/server";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://regulome.io";

const LOOPS_API_BASE = "https://app.loops.so/api/v1";

export async function POST(request: NextRequest) {
  const referer = request.headers.get("referer") ?? "/newsletter";
  const contentType = request.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  // Helper: respond with success (redirect for form submissions, JSON for API calls)
  const respondSuccess = () => {
    if (isJson) return NextResponse.json({ success: true });
    const successUrl = new URL(referer, SITE_URL);
    successUrl.searchParams.set("subscribed", "1");
    return NextResponse.redirect(successUrl.toString(), { status: 303 });
  };

  try {
    let email: string | null = null;

    if (isJson) {
      const body = (await request.json()) as { email?: unknown };
      email = typeof body.email === "string" ? body.email : null;
    } else {
      const body = await request.formData();
      const raw = body.get("email");
      email = typeof raw === "string" ? raw : null;
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const apiKey = process.env.LOOPS_API_KEY;
    if (!apiKey) {
      console.warn("[subscribe] LOOPS_API_KEY not set — skipping Loops integration");
      return respondSuccess();
    }

    const headers = {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    // Add contact to Loops (includes mailing list if LIST_ID is configured)
    const listId = process.env.LOOPS_LIST_ID;
    const contactPayload: Record<string, unknown> = { email };
    if (listId) {
      contactPayload.mailingLists = { [listId]: true };
    }

    const contactRes = await fetch(`${LOOPS_API_BASE}/contacts/create`, {
      method: "POST",
      headers,
      body: JSON.stringify(contactPayload),
    }).catch((err: unknown) => {
      console.error("[subscribe] Loops contacts/create error:", err);
      return null;
    });

    if (contactRes && !contactRes.ok) {
      const body = await contactRes.text().catch(() => "");
      // 409 means contact already exists — treat as success
      if (contactRes.status !== 409) {
        console.error("[subscribe] Loops contacts/create non-OK:", contactRes.status, body);
      }
    }

    // Send transactional welcome email if template ID is configured
    const transactionalId = process.env.LOOPS_TRANSACTIONAL_ID;
    if (transactionalId) {
      await fetch(`${LOOPS_API_BASE}/transactional/${transactionalId}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email }),
      }).catch((err: unknown) => {
        console.error("[subscribe] Loops transactional email error:", err);
      });
    }

    return respondSuccess();
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    // Still respond on unexpected error so UX is not broken
    return respondSuccess();
  }
}
