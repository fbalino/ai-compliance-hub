import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { BRAND_EMAIL_HELLO } from "@/lib/brand";

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
    <section style={{ textAlign: "center" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "60px 40px" }}>
        <div style={{
          margin: "0 auto 24px", width: 80, height: 80, borderRadius: "50%",
          background: "var(--accent-soft)", display: "grid", placeItems: "center",
        }}>
          <svg style={{ width: 40, height: 40, color: "var(--accent)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="h1" style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>
          {paymentConfirmed ? "Payment Confirmed!" : "Thank You for Your Purchase!"}
        </h1>

        <p className="lede" style={{ maxWidth: 460, margin: "12px auto 0" }}>
          Your Pro Compliance Report is being generated.
          {customerEmail && (
            <> We&apos;ll send it to <strong>{customerEmail}</strong> once it&apos;s ready.</>
          )}
          {!customerEmail && (
            <> We&apos;ll email it to you once it&apos;s ready.</>
          )}
        </p>

        <div className="card" style={{ textAlign: "left", marginTop: 40 }}>
          <h2 className="h3" style={{ marginBottom: 16 }}>What happens next</h2>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { step: "1", title: "Report generation", desc: "Our AI compliance engine is analyzing your answers and mapping your obligations across all applicable regulations." },
              { step: "2", title: "Email delivery", desc: "Your PDF report will be emailed to you within a few minutes." },
              { step: "3", title: "30-day update guarantee", desc: "If a relevant regulation changes within 30 days of your report date, we\u2019ll send you a free updated version." },
            ].map((item) => (
              <li key={item.step} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{
                  display: "flex", width: 24, height: 24, flexShrink: 0, alignItems: "center", justifyContent: "center",
                  borderRadius: "50%", background: "var(--accent)", color: "#fff", fontSize: 12, fontWeight: 700,
                }}>
                  {item.step}
                </span>
                <div>
                  <strong className="small" style={{ fontWeight: 600 }}>{item.title}</strong>
                  <p className="small" style={{ marginTop: 2, color: "var(--ink-2)" }}>{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          <Link href="/regulations" className="btn btn-ghost">Browse Regulations</Link>
          <Link href="/directory" className="btn btn-primary">Find Compliance Providers</Link>
        </div>

        <p className="xs" style={{ marginTop: 32, color: "var(--ink-2)" }}>
          Questions? Contact us at{" "}
          <a href={`mailto:${BRAND_EMAIL_HELLO}`} style={{ textDecoration: "underline" }}>{BRAND_EMAIL_HELLO}</a>
        </p>
      </div>
    </section>
  );
}
