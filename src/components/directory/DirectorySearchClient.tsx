"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Microscope, Building2, Scale, Monitor, BookOpen, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  microscope: Microscope,
  building2: Building2,
  scale: Scale,
  monitor: Monitor,
  bookopen: BookOpen,
};

const SERVICE_TYPES = ["Software", "Advisory", "Legal counsel", "Audit"];
const REGIONS = ["EU", "UK", "US", "APAC", "LATAM"];

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

function toggleSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export function DirectorySearchClient({ providers, categories }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeServices, setActiveServices] = useState<Set<string>>(new Set());
  const [activeRegions, setActiveRegions] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hasFilters = activeCategory !== null || activeServices.size > 0 || activeRegions.size > 0 || query !== "";

  const clearAll = useCallback(() => {
    setQuery("");
    setActiveCategory(null);
    setActiveServices(new Set());
    setActiveRegions(new Set());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return providers.filter((p) => {
      if (activeCategory !== null && p.category !== activeCategory) return false;

      if (activeServices.size > 0 && !p.specializations.some((s) => activeServices.has(s))) return false;

      if (activeRegions.size > 0 && !p.jurisdictions.some((j) => activeRegions.has(j))) return false;

      if (q === "") return true;

      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.specializations.some((s) => s.toLowerCase().includes(q)) ||
        p.jurisdictions.some((j) => j.toLowerCase().includes(q))
      );
    });
  }, [query, activeCategory, activeServices, activeRegions, providers]);

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        className="mobile-filter-toggle btn btn-ghost btn-sm w-full"
        onClick={() => setSidebarOpen((o) => !o)}
      >
        {sidebarOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Sidebar */}
      <aside className={sidebarOpen ? "sidebar-open" : undefined}>
        <div className="flex between items-center" style={{ marginBottom: 12 }}>
          <div className="eyebrow">Filters</div>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="small"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", padding: 0 }}
            >
              Clear all
            </button>
          )}
        </div>

        <div style={{ marginBottom: 24 }}>
          <div className="h5" style={{ marginBottom: 8 }}>Service</div>
          {SERVICE_TYPES.map((svc) => (
            <label key={svc} className="flex items-center small" style={{ gap: 8, padding: "6px 0", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={activeServices.has(svc)}
                onChange={() => setActiveServices((s) => toggleSet(s, svc))}
              />
              <span>{svc}</span>
            </label>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <div className="h5" style={{ marginBottom: 8 }}>Region</div>
          {REGIONS.map((region) => (
            <label key={region} className="flex items-center small" style={{ gap: 8, padding: "6px 0", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={activeRegions.has(region)}
                onChange={() => setActiveRegions((s) => toggleSet(s, region))}
              />
              <span>{region}</span>
            </label>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <div className="h5" style={{ marginBottom: 8 }}>Specialization</div>
          <div className="col" style={{ gap: 4 }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              const Icon = ICON_MAP[cat.icon.toLowerCase()] ?? Monitor;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(isActive ? null : cat.slug)}
                  className="small flex items-center"
                  style={{
                    gap: 8,
                    padding: "6px 0",
                    color: isActive ? "var(--accent)" : "var(--ink-2)",
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: "none",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div>
        <div className="between" style={{ marginBottom: 20 }}>
          <div className="eyebrow">Sorted: Featured &middot; then coverage</div>
        </div>

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
                {(() => { const Icon = ICON_MAP[cat.icon.toLowerCase()]; return Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null; })()}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results */}
          <div>
            <p className="small" style={{ marginBottom: 16 }}>
              {filtered.length === 0
                ? "No providers match your filters."
                : `${filtered.length} provider${filtered.length !== 1 ? "s" : ""}`}
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
                          <div className="xs">{provider.categoryLabel}</div>
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
        </div>

        {/* Provider CTA */}
        <div className="card" style={{ marginTop: 40, padding: "var(--s-7)", background: "var(--paper-inverse)", color: "var(--ink-inverse)" }}>
          <div className="flex between" style={{ flexWrap: "wrap", gap: 24 }}>
            <div style={{ maxWidth: 560 }}>
              <div className="h3" style={{ color: "var(--ink-inverse)" }}>Are you a compliance provider?</div>
              <p className="small" style={{ color: "var(--ink-inverse-soft)", marginTop: 8 }}>
                List your firm in our directory. Free for verified providers. Featured listings include priority placement, lead routing, and analytics.
              </p>
            </div>
            <Link href="/join" className="btn btn-accent" style={{ flexShrink: 0 }}>
              Get Listed &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
