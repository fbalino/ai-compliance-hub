import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { BRAND_NAME, BRAND_DOMAIN } from "@/lib/brand";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = BRAND_NAME;

type Props = { params: Promise<{ slug: string }> };

async function loadPost(slug: string) {
  const mod = await import("./page");
  return mod.POSTS?.[slug];
}

function seedFrom(slug: string) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function motifAccent(category: string) {
  switch (category) {
    case "Enforcement Updates": return "#a4475a";
    case "Regulation Analysis": return "#3d4ee3";
    case "Industry News": return "#e89a2b";
    case "Comparison": return "#2e7d5b";
    default: return "#3d4ee3";
  }
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params;
  const post = await loadPost(slug).catch(() => undefined);
  if (!post) notFound();

  const seed = seedFrom(slug);
  const accent = motifAccent(post.category);
  const plateNo = String(Math.floor(seed * 899 + 100));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 56,
          fontFamily: "Inter, system-ui, sans-serif",
          background:
            "radial-gradient(circle at 30% 20%, rgba(61,78,227,0.14), transparent 55%), radial-gradient(circle at 85% 90%, rgba(232,154,43,0.14), transparent 55%), #eef0f7",
          color: "#0e1330",
          position: "relative",
          border: "2px solid #0e1330",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "1px solid rgba(14,19,48,0.25)",
            pointerEvents: "none",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#242a4a" }}>
          <div>{post.category}</div>
          <div>PLATE № {plateNo}</div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontFamily: "serif",
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#0e1330",
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {post.title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(14,19,48,0.5)",
            paddingTop: 20,
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#242a4a",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 28, height: 28, background: accent }} />
            <div>{BRAND_NAME}</div>
          </div>
          <div>{BRAND_DOMAIN}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
