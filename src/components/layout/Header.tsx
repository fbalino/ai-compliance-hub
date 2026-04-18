"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Regulations", href: "/regulations" },
  { label: "Providers", href: "/directory" },
  { label: "The Ledger", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="topbar" aria-label="Main navigation">
      <Link href="/" className="brand-mark">
        <span className="glyph" aria-hidden="true">§</span>
        Regulome
      </Link>

      <nav>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={isActive(link.href) ? "active" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="spacer" />

      <Link
        href="/search"
        className="search"
        style={{ minWidth: 240, padding: "6px 12px", textDecoration: "none" }}
      >
        <Search size={14} aria-hidden="true" />
        <span style={{ flex: 1, color: "var(--ink-soft)", fontSize: 14 }}>Search regulations\u2026</span>
        <span className="mono xs faint">\u2318K</span>
      </Link>

      <Link href="/join" className="btn btn-sm btn-ghost">
        For providers
      </Link>
      <Link href="/checker" className="btn btn-sm">
        Sign in
      </Link>

      <button
        type="button"
        aria-expanded={mobileOpen}
        aria-label="Toggle navigation menu"
        onClick={() => setMobileOpen((o) => !o)}
        style={{
          background: "transparent",
          border: "1px solid var(--line)",
          borderRadius: 6,
          padding: 8,
          color: "var(--ink-soft)",
          cursor: "pointer",
          display: "none",
        }}
        className="mobile-menu-btn"
      >
        {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
      </button>

      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            borderTop: "1px solid var(--line)",
            background: "var(--paper)",
            padding: "14px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            zIndex: 50,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "10px 12px",
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 500,
                color: isActive(link.href) ? "var(--accent)" : "var(--ink-soft)",
                background: isActive(link.href) ? "var(--accent-soft)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
