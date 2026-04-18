"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export interface RegulationItem {
  slug: string | null;
  code: string;
  name: string;
  shortName?: string;
  jurisdiction: string;
  status: "active" | "pending" | "proposed";
  effectiveDate: string;
  maxPenalty?: string;
  summary: string;
  topics: string[];
  providers?: number;
  isUpcoming?: boolean;
}

interface Props {
  regulations: RegulationItem[];
}

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "proposed", label: "Proposed" },
] as const;

const JURISDICTION_OPTIONS = [
  "European Union",
  "United States",
] as const;

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name", label: "Name A–Z" },
] as const;

function StatusDot({ status }: { status: string }) {
  return (
    <span className="chip" style={{ fontSize: 11, padding: "2px 8px" }}>
      <span className={`dot dot-${status}`} />
      {status}
    </span>
  );
}

export function RegulationsFilterClient({ regulations }: Props) {
  const [statuses, setStatuses] = useState<Set<string>>(new Set(["active", "pending", "proposed"]));
  const [jurisdictions, setJurisdictions] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const toggleStatus = (s: string) => {
    setStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  };

  const toggleJurisdiction = (j: string) => {
    setJurisdictions((prev) => {
      const next = new Set(prev);
      if (next.has(j)) next.delete(j);
      else next.add(j);
      return next;
    });
  };

  const clearAll = () => {
    setStatuses(new Set(["active", "pending", "proposed"]));
    setJurisdictions(new Set());
  };

  const removeStatusPill = (s: string) => {
    setStatuses((prev) => {
      const next = new Set(prev);
      next.delete(s);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = regulations.filter((r) => {
      if (statuses.size > 0 && !statuses.has(r.status)) return false;
      if (jurisdictions.size > 0) {
        const matchesJuris = jurisdictions.has("European Union")
          ? r.jurisdiction.includes("European Union")
          : false;
        const matchesUS = jurisdictions.has("United States")
          ? r.jurisdiction.includes("US")
          : false;
        if (!matchesJuris && !matchesUS) return false;
      }
      return true;
    });

    if (sort === "newest") {
      result.sort((a, b) => {
        const dateA = new Date(a.effectiveDate).getTime() || 0;
        const dateB = new Date(b.effectiveDate).getTime() || 0;
        return dateB - dateA;
      });
    } else if (sort === "oldest") {
      result.sort((a, b) => {
        const dateA = new Date(a.effectiveDate).getTime() || 0;
        const dateB = new Date(b.effectiveDate).getTime() || 0;
        return dateA - dateB;
      });
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [regulations, statuses, jurisdictions, sort]);

  const main = filtered.filter((r) => !r.isUpcoming);
  const upcoming = filtered.filter((r) => r.isUpcoming);
  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Newest first";

  return (
    <section className="container" style={{ padding: "var(--s-8) var(--s-7)", display: "grid", gridTemplateColumns: "240px 1fr", gap: 40 }}>
      {/* Sidebar filters */}
      <aside>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Filters</div>

        <div style={{ marginBottom: 20 }}>
          <div className="h5" style={{ marginBottom: 8 }}>Status</div>
          {STATUS_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center small" style={{ gap: 8, padding: "6px 0", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={statuses.has(value)}
                onChange={() => toggleStatus(value)}
              />
              <span className={`dot dot-${value}`} />
              <span>{label}</span>
            </label>
          ))}
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="h5" style={{ marginBottom: 8 }}>Jurisdiction</div>
          {JURISDICTION_OPTIONS.map((j) => (
            <label key={j} className="flex items-center small" style={{ gap: 8, padding: "6px 0", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={jurisdictions.has(j)}
                onChange={() => toggleJurisdiction(j)}
              />
              <span>{j}</span>
            </label>
          ))}
        </div>

        <button className="btn btn-ghost btn-sm w-full" onClick={clearAll}>
          Clear all filters
        </button>
      </aside>

      {/* Main content */}
      <div>
        <div className="between" style={{ marginBottom: 20 }}>
          <div className="flex items-center" style={{ gap: 8, flexWrap: "wrap" }}>
            {Array.from(statuses).map((s) => (
              <button
                key={s}
                className="chip chip-ink"
                style={{ cursor: "pointer", border: "none", background: "var(--ink)", color: "var(--paper)" }}
                onClick={() => removeStatusPill(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)} ✕
              </button>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              Sort: {currentSortLabel} ▾
            </button>
            {showSortMenu && (
              <div style={{
                position: "absolute", right: 0, top: "100%", marginTop: 4,
                background: "var(--paper)", border: "1px solid var(--line)",
                borderRadius: 6, padding: 4, zIndex: 10, minWidth: 160,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setShowSortMenu(false); }}
                    className="small"
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "8px 12px", border: "none", background: sort === opt.value ? "var(--paper-2)" : "transparent",
                      cursor: "pointer", borderRadius: 4,
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--ink-2)" }}>
            <p className="h4">No regulations match your filters.</p>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={clearAll}>
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {main.length > 0 && (
              <table className="data">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Jurisdiction</th>
                    <th>Effective</th>
                    <th>Status</th>
                    {main.some((r) => r.providers != null) && <th>Providers</th>}
                  </tr>
                </thead>
                <tbody>
                  {main.map((reg) => (
                    <tr key={reg.code}>
                      <td style={{ width: 110 }}>
                        {reg.slug ? (
                          <Link href={`/regulations/${reg.slug}`}>
                            <span className="chip chip-code">{reg.code}</span>
                          </Link>
                        ) : (
                          <span className="chip chip-code">{reg.code}</span>
                        )}
                      </td>
                      <td>
                        {reg.slug ? (
                          <Link href={`/regulations/${reg.slug}`} className="h4" style={{ fontSize: 15 }}>
                            {reg.name}
                          </Link>
                        ) : (
                          <span className="h4" style={{ fontSize: 15 }}>{reg.name}</span>
                        )}
                        <div className="tag-strip" style={{ marginTop: 6 }}>
                          {reg.topics.map((t) => (
                            <span key={t} className="chip" style={{ fontSize: 11 }}>{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="small">{reg.jurisdiction}</td>
                      <td className="mono xs">{reg.effectiveDate}</td>
                      <td><StatusDot status={reg.status} /></td>
                      {reg.providers != null && (
                        <td>
                          <span className="mono" style={{ fontSize: 13, color: "var(--ink)" }}>{reg.providers}</span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {upcoming.length > 0 && (
              <div style={{ marginTop: 40 }}>
                <div className="eyebrow" style={{ marginBottom: 12 }}>Upcoming &amp; In Development</div>
                <table className="data">
                  <tbody>
                    {upcoming.map((reg) => {
                      const inner = (
                        <tr key={reg.name} style={{ opacity: reg.slug ? 1 : 0.7 }}>
                          <td style={{ width: 110 }}>
                            <span className="chip chip-code">{reg.code}</span>
                          </td>
                          <td>
                            <div className="h4" style={{ fontSize: 15 }}>{reg.name}</div>
                            <div className="tag-strip" style={{ marginTop: 6 }}>
                              {reg.topics.map((t) => (
                                <span key={t} className="chip" style={{ fontSize: 11 }}>{t}</span>
                              ))}
                            </div>
                          </td>
                          <td className="small">{reg.jurisdiction}</td>
                          <td className="mono xs">{reg.effectiveDate}</td>
                          <td><StatusDot status={reg.status} /></td>
                        </tr>
                      );
                      return reg.slug ? (
                        <Link key={reg.name} href={`/regulations/${reg.slug}`} style={{ display: "contents" }}>
                          {inner}
                        </Link>
                      ) : (
                        inner
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        <p className="small" style={{ marginTop: 14 }}>
          We monitor legislative databases, government feeds, and legal news to keep this list current.{" "}
          <Link href="/newsletter" style={{ textDecoration: "underline" }}>Subscribe for updates</Link>.
        </p>

        <div className="card card-tint" style={{ marginTop: 40, padding: "var(--s-7)", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="h3">Not sure which regulations apply to you?</div>
            <p className="small" style={{ marginTop: 4 }}>Our free compliance checker maps your business and AI use cases to the regulations that matter.</p>
          </div>
          <div className="flex" style={{ gap: 8 }}>
            <Link href="/checker" className="btn btn-primary">Start Free Check</Link>
            <Link href="/compare/us-state-ai-laws" className="btn btn-ghost">Compare Regulations</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
