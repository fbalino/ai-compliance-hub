"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export interface ProviderSearchItem {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  categoryIcon: string;
  tagline: string;
  isVerified: boolean;
  jurisdictions: string[];
  specializations: string[];
}

interface CategoryOption {
  slug: string;
  label: string;
  icon: string;
}

interface Props {
  providers: ProviderSearchItem[];
  categories: CategoryOption[];
}

export function DirectorySearchClient({ providers, categories }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const isFiltering = query.trim().length > 0 || activeCategory !== null;

  const filtered = useMemo(() => {
    if (!isFiltering) return providers;

    const q = query.trim().toLowerCase();

    return providers.filter((p) => {
      const matchesCategory = activeCategory === null || p.category === activeCategory;
      if (!matchesCategory) return false;

      if (q === "") return true;

      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.specializations.some((s) => s.toLowerCase().includes(q)) ||
        p.jurisdictions.some((j) => j.toLowerCase().includes(q))
      );
    });
  }, [query, activeCategory, providers, isFiltering]);

  return (
    <div className="col" style={{ gap: 20 }}>
      {/* Search bar */}
      <div className="search" style={{ maxWidth: 580 }}>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search providers by name, specialization, or regulation…"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--ink-soft)" }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 6 12 12" /><path d="m18 6-12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category filter chips */}
      <div className="tag-strip">
        <button
          onClick={() => setActiveCategory(null)}
          className={activeCategory === null ? "chip chip-ink" : "chip"}
          style={{ cursor: "pointer" }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
            className={activeCategory === cat.slug ? "chip chip-ink" : "chip"}
            style={{ cursor: "pointer" }}
          >
            <span aria-hidden="true">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {isFiltering && (
        <div>
          <p className="small" style={{ marginBottom: 16 }}>
            {filtered.length === 0
              ? "No providers match your search."
              : `${filtered.length} provider${filtered.length !== 1 ? "s" : ""} found`}
          </p>

          {filtered.length > 0 && (
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {filtered.map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/directory/providers/${provider.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <article className="card" style={{ height: "100%" }}>
                    <div className="flex items-center" style={{ gap: 12, marginBottom: 12 }}>
                      <div className="avatar avatar-sq" style={{ width: 44, height: 44, fontSize: 17, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", borderRadius: 6, flexShrink: 0, fontFamily: "var(--serif)", fontWeight: 600 }}>
                        {provider.name[0]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="h4">{provider.name}</div>
                        <div className="xs">{provider.categoryIcon} {provider.categoryLabel}</div>
                      </div>
                    </div>
                    <p className="small" style={{ color: "var(--ink-2)", lineHeight: 1.5, marginBottom: 12 }}>
                      {provider.tagline}
                    </p>
                    {provider.specializations.length > 0 && (
                      <div className="tag-strip" style={{ marginBottom: 8 }}>
                        {provider.specializations.slice(0, 3).map((spec) => (
                          <span key={spec} className="chip" style={{ fontSize: 11 }}>{spec}</span>
                        ))}
                      </div>
                    )}
                    {provider.jurisdictions.length > 0 && (
                      <div className="mono xs" style={{ letterSpacing: "0.04em" }}>
                        <span className="soft">Covers: </span>
                        {provider.jurisdictions.slice(0, 3).join(" · ")}
                        {provider.jurisdictions.length > 3 && <span className="soft"> +{provider.jurisdictions.length - 3}</span>}
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
