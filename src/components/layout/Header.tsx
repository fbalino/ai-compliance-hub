"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dna, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "Regulations", href: "/regulations" },
  { label: "Directory", href: "/directory" },
  { label: "Checker", href: "/checker" },
  { label: "Glossary", href: "/glossary" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "var(--bg-page)",
        borderBottom: "1px solid var(--border-subtle)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 rounded-md focus-visible:outline focus-visible:outline-2"
            style={{ outlineColor: "var(--accent-primary)" }}
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: "var(--accent-primary)" }}
            >
              <Dna className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <span className="text-[15px] font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              regulome
              <span style={{ color: "var(--accent-primary)" }}>.io</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus-visible:outline focus-visible:outline-2"
                  style={{
                    outlineColor: "var(--accent-primary)",
                    color: active ? "var(--accent-primary)" : "var(--text-muted)",
                    background: active ? "var(--bg-accent)" : "transparent",
                    fontWeight: active ? "600" : "500",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                      (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <Link
              href="/checker"
              className="inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                background: "var(--accent-primary)",
                outlineColor: "var(--accent-primary)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              Check Compliance
            </Link>
          </div>

          {/* Mobile: theme toggle + menu */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              className="rounded-md p-2 transition-colors focus-visible:outline focus-visible:outline-2"
              style={{
                color: "var(--text-muted)",
                outlineColor: "var(--accent-primary)",
              }}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setMobileOpen((o) => !o)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 py-3"
          style={{
            borderTop: "1px solid var(--border-subtle)",
            background: "var(--bg-surface)",
          }}
        >
          <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
                  style={{
                    color: active ? "var(--accent-primary)" : "var(--text-secondary)",
                    background: active ? "var(--bg-accent)" : "transparent",
                    borderLeft: active ? "2px solid var(--accent-primary)" : "2px solid transparent",
                    paddingLeft: "10px",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
              <Link
                href="/checker"
                className="flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-colors"
                style={{ background: "var(--accent-primary)" }}
                onClick={() => setMobileOpen(false)}
              >
                Check Compliance
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
