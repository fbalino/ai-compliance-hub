import Link from "next/link";
import { Dna } from "lucide-react";

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
    <footer style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ background: "var(--accent-primary)" }}
              >
                <Dna className="h-3.5 w-3.5 text-white" aria-hidden="true" />
              </div>
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                regulome<span style={{ color: "var(--accent-primary)" }}>.io</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The regulatory intelligence platform for AI compliance. Map your exposure to applicable laws worldwide.
            </p>
            <div className="mt-4">
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{ color: "var(--accent-primary)" }}
              >
                Subscribe to updates
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {section}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} regulome.io. Not legal advice. Always consult a qualified attorney.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
