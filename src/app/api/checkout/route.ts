import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  return new Stripe(key);
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      answers?: unknown;
      email?: string;
    };
    const { answers, email } = body;

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "AI Compliance Pro Report" },
            unit_amount: 4900,
          },
          quantity: 1,
        },
      ],
      success_url: `${SITE_URL}/checker/pro-report/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/checker/pro-report`,
      metadata: { answers: JSON.stringify(answers ?? {}) },
      ...(email ? { customer_email: email } : {}),
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Error creating session:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
