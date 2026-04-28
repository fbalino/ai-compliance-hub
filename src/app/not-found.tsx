import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Not on the register — § 404",
  description:
    "The page you requested isn't on the Regulome register. Search 912 AI regulations or browse common destinations.",
  robots: { index: false, follow: true },
};

const SUGGESTED = [
  {
    kicker: "§ Catalog",
    title: "Browse all regulations",
    body: "AI & cyber regulations across 40+ jurisdictions, with status and effective dates.",
    href: "/regulations",
  },
  {
    kicker: "§ Directory",
    title: "Find a compliance provider",
    body: "Vetted firms by jurisdiction, framework, and sector — audit, legal, and tooling.",
    href: "/providers",
  },
  {
    kicker: "§ Checker",
    title: "Free compliance checker",
    body: "Describe your situation in a sentence and we route you to the regulations that apply.",
    href: "/checker",
  },
  {
    kicker: "§ The Ledger",
    title: "Explainers & analysis",
    body: "Editorial coverage of new rules, guidance, and enforcement — written for operators.",
    href: "/blog",
  },
  {
    kicker: "§ Atlas",
    title: "Browse by jurisdiction",
    body: "EU, US states, UK, Singapore, Brazil, and more — with the laws in force in each.",
    href: "/jurisdictions",
  },
  {
    kicker: "§ Home",
    title: "Back to the homepage",
    body: "Start from the front door — describe what you're trying to do and we'll route you.",
    href: "/",
  },
] as const;

export default function NotFound() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 notfound-wrap">
        <div className="notfound-watermark" aria-hidden="true">
          §
        </div>

        <div className="notfound-inner">
          <div className="notfound-rule v4-rise v4-d1" role="presentation">
            <span>
              <b>The Regulome</b> · Volume IV
            </span>
            <span>
              Status: <b>Citation not found</b>
            </span>
            <span>
              Code: <b>404</b>
            </span>
          </div>

          <section className="notfound-hero" aria-labelledby="nf-headline">
            <div className="eyebrow v4-rise v4-d2">
              <span className="pip" aria-hidden="true" />
              § 404 · Not on the register
            </div>

            <h1 id="nf-headline" className="notfound-headline v4-rise v4-d2">
              This citation isn&apos;t <em>on the register</em>.
            </h1>

            <p className="notfound-lede v4-rise v4-d3">
              The page you requested may have been moved, retired, or never filed.
              If you got here from a link on another site, the reference is stale —
              try the search below or one of the destinations on this page.
            </p>

            <Link
              href="/search"
              className="notfound-search v4-rise v4-d4"
              aria-label="Search the register"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="placeholder">
                Search regulations, providers, and explainers…
              </span>
              <span className="kbd" aria-hidden="true">
                ⌘K
              </span>
            </Link>
          </section>

          <section
            className="notfound-suggested v4-rise v4-d4"
            aria-labelledby="nf-sug-head"
          >
            <div className="notfound-suggested-head" id="nf-sug-head">
              <b>See also — common destinations</b>
              <span className="meta">Updated daily</span>
            </div>

            <div className="notfound-grid">
              {SUGGESTED.map((item) => (
                <Link key={item.href} href={item.href} className="notfound-card">
                  <span className="k">{item.kicker}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className="notfound-card-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>

            <div className="notfound-report">
              <span>Think this page should exist?</span>
              <a href="mailto:corrections@regulome.io?subject=Broken%20link%20on%20regulome.io">
                Report a broken link →
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

/*
  410 (Gone) variant — when a previously-published URL has been retired:

  - Eyebrow:  § 410 · Retired from the register
  - Headline: This citation has been <em>retired</em>.
  - Lede:     The page existed previously but was retired on {date} because
              {reason}. The replacement may be linked below.
  - Status:   Code: 410 · Gone
  - Cards:    Add a "§ Replacement" card pointing at the successor URL when one
              exists; otherwise reuse the standard six.

  Implementation: render a dedicated /gone segment that calls a Server
  Component returning these props, or duplicate this file as gone.tsx and
  swap the literals. Keep the structure identical so the visual treatment
  carries over.
*/
