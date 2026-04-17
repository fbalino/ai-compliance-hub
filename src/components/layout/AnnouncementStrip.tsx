import Link from "next/link";

export function AnnouncementStrip() {
  return (
    <div className="rg-strip">
      <div className="rg-container rg-strip-inner">
        <span className="rg-dot" aria-hidden="true" />
        <span>
          Colorado AI Act takes effect <strong style={{ fontWeight: 700 }}>June 30, 2026</strong> —{" "}
          <Link href="/regulations/colorado-ai-act">read what it requires →</Link>
        </span>
      </div>
    </div>
  );
}
