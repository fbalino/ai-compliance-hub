import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Payment Confirmed — AI Compliance Pro Report",
  description: "Your payment was confirmed. Your AI compliance pro report is being generated.",
};

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export default async function ProReportSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let paymentConfirmed = false;
  let customerEmail: string | null = null;

  if (session_id) {
    try {
      const stripe = getStripe();
      if (stripe) {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        paymentConfirmed = session.payment_status === "paid";
        customerEmail = session.customer_email ?? session.customer_details?.email ?? null;
      }
    } catch (err) {
      console.error("[pro-report/success] Failed to retrieve session:", err);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 text-center">
      {/* Icon */}
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-10 w-10 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
        {paymentConfirmed ? "Payment Confirmed!" : "Thank You for Your Purchase!"}
      </h1>

      <p className="mt-3 text-lg text-neutral-600 leading-relaxed max-w-md mx-auto">
        Your Pro Compliance Report is being generated.
        {customerEmail && (
          <> We&apos;ll send it to <strong>{customerEmail}</strong> once it&apos;s ready.</>
        )}
        {!customerEmail && (
          <> We&apos;ll email it to you once it&apos;s ready.</>
        )}
      </p>

      {/* What happens next */}
      <div className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-left">
        <h2 className="text-base font-bold text-neutral-900 mb-4">What happens next</h2>
        <ol className="space-y-3">
          {[
            {
              step: "1",
              title: "Report generation",
              desc: "Our AI compliance engine is analyzing your answers and mapping your obligations across all applicable regulations.",
            },
            {
              step: "2",
              title: "Email delivery",
              desc: "Your PDF report will be emailed to you within a few minutes.",
            },
            {
              step: "3",
              title: "30-day update guarantee",
              desc: "If a relevant regulation changes within 30 days of your report date, we'll send you a free updated version.",
            },
          ].map((item) => (
            <li key={item.step} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white mt-0.5">
                {item.step}
              </span>
              <div>
                <span className="font-semibold text-neutral-900 text-sm">{item.title}</span>
                <p className="text-sm text-neutral-600 mt-0.5">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* CTA */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/regulations"
          className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          Browse Regulations
        </Link>
        <Link
          href="/directory"
          className="inline-flex items-center justify-center rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors"
        >
          Find Compliance Providers
        </Link>
      </div>

      <p className="mt-8 text-xs text-neutral-500">
        Questions? Contact us at{" "}
        <a href="mailto:hello@aicompliancehub.com" className="underline hover:text-neutral-700">
          hello@aicompliancehub.com
        </a>
      </p>
    </div>
  );
}
