import Link from "next/link";

export function AnnouncementStrip() {
  return (
    <div style={{ background: "var(--accent)", color: "#fff", fontSize: 13, padding: "8px 0", textAlign: "center" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <span className="dot dot-active" aria-hidden="true" />
        <span>
          Colorado AI Act takes effect <strong style={{ fontWeight: 700 }}>June 30, 2026</strong> —{" "}
          <Link href="/regulations/colorado-ai-act" style={{ color: "inherit", textDecoration: "underline" }}>read what it requires →</Link>
        </span>
      </div>
    </div>
  );
}
