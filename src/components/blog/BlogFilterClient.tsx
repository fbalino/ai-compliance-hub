"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { BlogCover } from "./BlogCover";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface Props {
  categories: string[];
  posts: BlogPost[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogFilterClient({ categories, posts }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const param = new URLSearchParams(window.location.search).get("category");
    if (!param) return;
    const match = categories.find((c) => c.toLowerCase() === param.toLowerCase());
    if (match) setActiveCategory(match);
  }, [categories]);

  const filtered = useMemo(() => {
    if (!activeCategory) return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [activeCategory, posts]);

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* Section nav / category strip */}
      <nav className="ledger-nav" aria-label="Article categories">
        <span className="badge">Sections</span>
        <button
          onClick={() => setActiveCategory(null)}
          className={activeCategory === null ? "on" : ""}
          aria-pressed={activeCategory === null}
        >
          All
        </button>
        {categories.map((cat) => (
          <span key={cat} style={{ display: "contents" }}>
            <span className="sep" aria-hidden="true">·</span>
            <button
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={activeCategory === cat ? "on" : ""}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          </span>
        ))}
        <span className="spacer" />
        <Link href="/newsletter">Subscribe →</Link>
      </nav>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 64, textAlign: "center", color: "var(--ink-2)" }}>
            <p className="h4">No articles match this section.</p>
            <button
              className="btn btn-ghost btn-sm"
              style={{ marginTop: 12 }}
              onClick={() => setActiveCategory(null)}
            >
              Show all articles
            </button>
          </div>
        ) : (
          <>
            {featured && (
              <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <article className="gazette-lead">
                  <div className="plate-wrap">
                    <BlogCover
                      slug={featured.slug}
                      category={featured.category}
                      title={featured.title}
                      variant="lead"
                    />
                  </div>
                  <div>
                    <span className="k">▸ Lead · {featured.category}</span>
                    <h2>{featured.title}</h2>
                    <p className="dek">{featured.excerpt}</p>
                    <div className="meta">
                      <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                      <span>·</span>
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="gazette-grid">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    style={{ textDecoration: "none", color: "inherit", display: "contents" }}
                  >
                    <article>
                      <div className="thumb-wrap" aria-hidden="true">
                        <BlogCover slug={post.slug} category={post.category} title={post.title} variant="card" />
                      </div>
                      <span className="k">▸ {post.category}</span>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="meta">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
