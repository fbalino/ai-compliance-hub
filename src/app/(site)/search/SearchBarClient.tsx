"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBarClient({
  defaultQuery,
  resultCount,
  regTotal,
  providerTotal,
}: {
  defaultQuery: string;
  resultCount: number;
  regTotal: number;
  providerTotal: number;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);

  function handleSearch() {
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="search search-lg" style={{ marginTop: 8 }}>
      <Search className="h-4.5 w-4.5" style={{ color: "var(--ink-soft)", flexShrink: 0 }} aria-hidden="true" />
      <input
        type="search"
        placeholder={`Search ${regTotal} regulations, ${providerTotal} providers, articles…`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        style={{ flex: 1, border: 0, background: "transparent", outline: "none", font: "inherit", color: "var(--ink)" }}
      />
      {defaultQuery && (
        <span className="mono xs" style={{ color: "var(--ink-soft)", whiteSpace: "nowrap" }}>
          {resultCount} {resultCount === 1 ? "result" : "results"}
        </span>
      )}
      <button className="btn btn-accent btn-sm" onClick={handleSearch}>Search</button>
    </div>
  );
}
