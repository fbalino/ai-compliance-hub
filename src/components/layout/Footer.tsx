import Link from "next/link";

const FOOTER_LINKS = {
  Regulations: [
    { label: "Colorado AI Act", href: "/regulations/colorado-ai-act" },
    { label: "EU AI Act", href: "/regulations/eu-ai-act" },
    { label: "California AB 2013", href: "/regulations/california-ab-2013" },
    { label: "NYC Local Law 144", href: "/regulations/nyc-local-law-144" },
    { label: "Illinois AIVIRA", href: "/regulations/illinois-ai-video-interview-act" },
    { label: "All Regulations", href: "/regulations" },
  ],
  "Provider Directory": [
    { label: "Find Providers", href: "/directory" },
    { label: "Bias Auditors", href: "/directory/categories/bias-audit" },
    { label: "Legal & Compliance", href: "/directory/categories/legal" },
    { label: "Governance Consulting", href: "/directory/categories/governance-consulting" },
    { label: "Compliance Software", href: "/directory/categories/compliance-software" },
  ],
  Tools: [
    { label: "Compliance Checker", href: "/checker" },
    { label: "Compare Regulations", href: "/compare/us-state-ai-laws" },
    { label: "Glossary", href: "/glossary" },
    { label: "Blog", href: "/blog" },
    { label: "Newsletter", href: "/newsletter" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-800">
                <svg
                  className="h-3.5 w-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1M4.22 4.22l.707.707m13.435 13.435.707.707M1 12h1m20 0h1M4.22 19.778l.707-.707M18.364 5.636l.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold text-neutral-900">AI Compliance Hub</span>
            </Link>
            <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
              Know what&apos;s required. Find who can help. The central destination for AI regulation intelligence and compliance providers.
            </p>
            <div className="mt-4">
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-900 transition-colors"
              >
                Subscribe to our newsletter
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {section}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} AI Compliance Hub. Not legal advice. Always consult a qualified attorney.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
