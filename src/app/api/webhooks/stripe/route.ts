import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { checkerResponses } from "@/db/schema";

// Force dynamic so this route is never statically rendered
export const dynamic = "force-dynamic";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  return new Stripe(key);
}

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  const sig = request.headers.get("stripe-signature") ?? "";

  // Read raw body — required for Stripe signature verification
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const answers = session.metadata?.answers
      ? (JSON.parse(session.metadata.answers) as Record<string, unknown>)
      : {};

    const stripePaymentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent?.id ?? null);

    try {
      await db.insert(checkerResponses).values({
        sessionId: session.id,
        answers,
        results: {},
        reportTier: "pro",
        ...(stripePaymentId ? { stripePaymentId } : {}),
      });
    } catch (dbErr) {
      console.error("[stripe-webhook] DB insert error:", dbErr);
      // Don't return an error — we already acknowledged the event
    }
  }

  return NextResponse.json({ received: true });
}
