"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Regulations", href: "/regulations" },
  { label: "Providers", href: "/directory" },
  { label: "Checker", href: "/checker" },
  { label: "Newsletter", href: "/newsletter" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="rg-nav" aria-label="Main navigation">
      <div className="rg-container rg-nav-inner">
        <Link href="/" className="rg-brand">
          <span className="rg-brand-mark" aria-hidden="true" />
          <span className="rg-brand-name">
            regulome<span className="rg-brand-dot">.</span>
          </span>
        </Link>

        <ul className="rg-nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="rg-nav-right">
          <Link
            href="/newsletter"
            className="rg-btn rg-btn-ghost"
            style={{ display: "none" }}
          >
            Sign in
          </Link>
          <Link href="/checker" className="rg-btn rg-btn-primary">
            Run a free check <span className="rg-arrow" aria-hidden="true">→</span>
          </Link>

          <button
            type="button"
            className="md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              background: "transparent",
              border: "1px solid var(--rg-border)",
              borderRadius: 8,
              padding: 8,
              color: "var(--rg-ink-muted)",
              cursor: "pointer",
              marginLeft: 4,
            }}
          >
            {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          style={{
            borderTop: "1px solid var(--rg-border)",
            background: "var(--rg-card)",
            padding: "14px 0",
          }}
        >
          <div className="rg-container" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive(link.href) ? "var(--rg-primary-deep)" : "var(--rg-ink-muted)",
                  background: isActive(link.href) ? "var(--rg-primary-faint)" : "transparent",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
