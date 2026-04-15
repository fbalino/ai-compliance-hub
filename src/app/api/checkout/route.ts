import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  return new Stripe(key);
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

// Stripe metadata values are capped at 500 chars
function safeMetadataValue(value: string, maxLength = 500): string {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      answers?: unknown;
      email?: string;
    };
    const { answers, email } = body;

    const stripe = getStripe();

    const answersJson = safeMetadataValue(JSON.stringify(answers ?? {}));

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
      metadata: { answers: answersJson },
      ...(email ? { customer_email: email } : {}),
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    // Single-line log so Vercel doesn't truncate across fields
    if (err instanceof Stripe.errors.StripeError) {
      console.error(
        `[checkout] stripe_error type=${err.type} code=${err.code ?? "none"} status=${err.statusCode} msg="${err.message}" reqId=${err.requestId ?? "none"}`
      );
    } else {
      console.error(`[checkout] unexpected_error ${String(err)}`);
    }
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
