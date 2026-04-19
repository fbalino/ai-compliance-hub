"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";

export function HeroSearch({
  regCount,
  providerCount,
  defaultDescription,
}: {
  regCount: number;
  providerCount: number;
  defaultDescription?: string;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<"keyword" | "describe">(defaultDescription ? "describe" : "keyword");
  const [query, setQuery] = useState("");
  const [description, setDescription] = useState(defaultDescription ?? "");
  const describe = mode === "describe";
  const keywordRef = useRef<HTMLInputElement>(null);
  const describeRef = useRef<HTMLInputElement>(null);

  function handleSearch() {
    const q = query.trim();
    if (!q) {
      keywordRef.current?.focus();
      return;
    }
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function handleRoute() {
    const d = description.trim();
    if (!d) {
      describeRef.current?.focus();
      return;
    }
    router.push(`/?route=${encodeURIComponent(d)}#matches`);
  }

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
              ref={keywordRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder='Search regulations, providers, topics… e.g. "EU AI Act" or "biometrics"'
            />
            <button className="btn btn-accent" onClick={handleSearch}>Search</button>
          </div>
          <div className="xs faint" style={{ marginTop: 12, textAlign: "center" }}>
            {regCount} regulations · {providerCount} providers — searchable by title, code, jurisdiction, or topic.
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
              ref={describeRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRoute()}
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
            />
            <button className="btn btn-accent" onClick={handleRoute}>Route me →</button>
          </div>
          <div className="xs faint" style={{ marginTop: 12, textAlign: "center" }}>
            Describe your situation and we&apos;ll match you with the right regulations and providers.
          </div>
        </div>
      )}
    </div>
  );
}
