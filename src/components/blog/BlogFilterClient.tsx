"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  hasImage?: boolean;
}

interface Props {
  categories: string[];
  posts: BlogPost[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
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
      <div className="tag-strip" style={{ marginTop: 20 }}>
        <button
          onClick={() => setActiveCategory(null)}
          className={activeCategory === null ? "chip chip-accent" : "chip"}
          style={{ cursor: "pointer", border: activeCategory === null ? undefined : "1px solid var(--line)" }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={activeCategory === cat ? "chip chip-accent" : "chip"}
            style={{ cursor: "pointer", border: activeCategory === cat ? undefined : "1px solid var(--line)" }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "var(--s-8) 0" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--ink-2)" }}>
            <p className="h4">No posts match this category.</p>
            <button
              className="btn btn-ghost btn-sm"
              style={{ marginTop: 12 }}
              onClick={() => setActiveCategory(null)}
            >
              Show all posts
            </button>
          </div>
        ) : (
          <>
            {featured && (
              <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 200px", maxWidth: 400, borderRadius: 10, overflow: "hidden", background: "linear-gradient(135deg, var(--accent), var(--gold))", aspectRatio: "16/9" }}>
                    {featured.hasImage ? (
                      <Image
                        src={`/images/blog/${featured.slug}.jpg`}
                        alt={featured.title}
                        width={400}
                        height={225}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        priority
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: "rgba(255,255,255,0.7)", fontFamily: "var(--serif)", fontSize: 48, fontWeight: 600 }}>
                        §
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div className="tag-strip" style={{ marginBottom: 8 }}>
                      <span className="chip chip-accent">{featured.category}</span>
                      <span className="xs" style={{ color: "var(--ink-2)" }}>{featured.readTime}</span>
                    </div>
                    <h2 className="h3" style={{ marginBottom: 8 }}>{featured.title}</h2>
                    <p className="small" style={{ marginBottom: 12, color: "var(--ink-2)" }}>{featured.excerpt}</p>
                    <div className="tag-strip">
                      <time dateTime={featured.date} className="xs" style={{ color: "var(--ink-2)" }}>{formatDate(featured.date)}</time>
                      {featured.tags.map((tag) => (
                        <span key={tag} className="chip" style={{ fontSize: 11 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="grid" style={{ marginTop: 32, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {rest.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                    <div className="card" style={{ height: "100%" }}>
                      <div style={{ marginBottom: 14, height: 120, borderRadius: 8, overflow: "hidden", background: "linear-gradient(135deg, var(--paper-2), var(--line))" }}>
                        {post.hasImage ? (
                          <Image
                            src={`/images/blog/${post.slug}.jpg`}
                            alt={post.title}
                            width={400}
                            height={225}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: "var(--ink-faint)", fontFamily: "var(--serif)", fontSize: 32, fontWeight: 600 }}>
                            §
                          </div>
                        )}
                      </div>
                      <div className="tag-strip" style={{ marginBottom: 8 }}>
                        <span className="chip" style={{ fontSize: 11 }}>{post.category}</span>
                        <span className="xs" style={{ color: "var(--ink-2)" }}>{post.readTime}</span>
                      </div>
                      <h3 className="h4" style={{ lineHeight: 1.35, marginBottom: 8 }}>{post.title}</h3>
                      <p className="small" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 10, color: "var(--ink-2)" }}>
                        {post.excerpt}
                      </p>
                      <time dateTime={post.date} className="xs" style={{ color: "var(--ink-2)" }}>{formatDate(post.date)}</time>
                    </div>
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
