"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

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
    <div className="space-y-6">
      {/* Search bar + category filter chips */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search providers by name, specialization, or regulation..."
            className="block w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-9 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600"
              aria-label="Clear search"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeCategory === null
                ? "border-brand-600 bg-brand-700 text-white"
                : "border-neutral-300 bg-white text-neutral-600 hover:border-brand-300 hover:text-brand-700"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                setActiveCategory(activeCategory === cat.slug ? null : cat.slug)
              }
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                activeCategory === cat.slug
                  ? "border-brand-600 bg-brand-700 text-white"
                  : "border-neutral-300 bg-white text-neutral-600 hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              <span aria-hidden="true">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {isFiltering && (
        <div>
          <p className="mb-4 text-sm text-neutral-500">
            {filtered.length === 0
              ? "No providers match your search."
              : `${filtered.length} provider${filtered.length !== 1 ? "s" : ""} found`}
          </p>

          {filtered.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/directory/providers/${provider.slug}`}
                  className="group block"
                >
                  <Card hover className="h-full group-hover:border-brand-300 transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-neutral-900 group-hover:text-brand-800 transition-colors">
                        {provider.name}
                      </h3>
                      {provider.isVerified && (
                        <span className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 rounded-full px-2 py-0.5">
                          <svg
                            className="h-3 w-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-brand-700 mb-2">
                      {provider.categoryIcon} {provider.categoryLabel}
                    </p>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                      {provider.tagline}
                    </p>
                    {provider.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {provider.specializations.slice(0, 3).map((spec) => (
                          <span
                            key={spec}
                            className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                    {provider.jurisdictions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {provider.jurisdictions.map((j) => (
                          <Badge key={j} variant="default">
                            {j}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
