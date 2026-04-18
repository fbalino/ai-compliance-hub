"use client";

import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

export function HeroSearch() {
  const [mode, setMode] = useState<"keyword" | "describe">("keyword");
  const describe = mode === "describe";

  return (
    <div>
      {/* Toggle pill */}
      <div
        style={{
          display: "inline-flex",
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: 999,
          padding: 4,
          marginBottom: 16,
          boxShadow: "var(--shadow-xs)",
        }}
      >
        <button
          onClick={() => setMode("keyword")}
          className={mode === "keyword" ? "btn btn-sm btn-primary" : "btn btn-sm btn-ghost"}
          style={{ borderRadius: 999, border: "none", padding: "8px 18px" }}
        >
          <Search size={13} /> Keyword search
        </button>
        <button
          onClick={() => setMode("describe")}
          className={mode === "describe" ? "btn btn-sm btn-accent" : "btn btn-sm btn-ghost"}
          style={{ borderRadius: 999, border: "none", padding: "8px 18px" }}
        >
          <Sparkles size={13} /> Describe my situation
        </button>
      </div>

      {!describe && (
        <div>
          <div
            className="search search-lg"
            style={{
              padding: "18px 22px",
              background: "var(--paper)",
              border: "1.5px solid var(--ink)",
              boxShadow: "var(--shadow)",
            }}
          >
            <Search size={20} />
            <input
              placeholder='Search regulations, providers, topics… e.g. "EU AI Act" or "biometrics"'
            />
            <button className="btn btn-accent">Search</button>
          </div>
          <div className="xs faint" style={{ marginTop: 12, textAlign: "center" }}>
            912 regulations · 314 providers · 340 articles — searchable by title, code, jurisdiction, or topic.
          </div>
        </div>
      )}

      {describe && (
        <div>
          <div
            className="search search-lg"
            style={{
              padding: "18px 22px",
              background: "var(--paper)",
              border: "1.5px solid var(--accent)",
              boxShadow: "var(--shadow)",
              alignItems: "center",
              minHeight: 62,
            }}
          >
            <Sparkles size={20} />
            <input
              style={{
                flex: 1,
                border: 0,
                outline: 0,
                background: "transparent",
                fontFamily: "var(--sans)",
                fontSize: 17,
                color: "var(--ink)",
              }}
              placeholder="e.g. A US bank deploying a hiring model in the EU…"
              defaultValue="A US bank deploying a hiring model in the EU"
            />
            <button className="btn btn-accent">Route me →</button>
          </div>
          <div
            className="flex"
            style={{
              gap: 8,
              marginTop: 16,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span className="xs faint">Detected:</span>
            <span className="chip chip-ink">Sector · Financial</span>
            <span className="chip chip-ink">Use-case · Hiring AI</span>
            <span className="chip chip-ink">Geography · US + EU</span>
            <a
              className="xs"
              style={{ color: "var(--accent)", borderBottom: "1px solid var(--accent-soft)", cursor: "pointer" }}
            >
              adjust →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
