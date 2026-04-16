// Concept B — "The Terminal"
// Aesthetic: Bloomberg terminal / research IDE / hacker tool
// Commitment: deep indigo, phosphor amber + acid green, JetBrains Mono everywhere, box-drawing
import Link from "next/link";
import { JetBrains_Mono, IBM_Plex_Sans_Condensed } from "next/font/google";
import type { Metadata } from "next";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mono",
});

const sans = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Concept B — The Terminal",
  robots: { index: false, follow: false },
};

// ── Palette ────────────────────────────────────────
const bg = "#0A0D14";
const bgPanel = "#111622";
const bgDeeper = "#060812";
const border = "#1F2734";
const borderBright = "#2E3A4F";
const fg = "#E4E7EF";
const fgDim = "#7E8595";
const fgFaint = "#4A5263";
const amber = "#FFB547";
const phosphor = "#7FFFC3";
const crimson = "#FF4B4B";
const amberBg = "rgba(255, 181, 71, 0.08)";
const phosphorBg = "rgba(127, 255, 195, 0.08)";

const REGS = [
  { idx: "001", ticker: "EUAI", name: "EU AI Act", jur: "EU-27", status: "ACTIVE", delta: "+", eff: "2026-08-01", articles: 113 },
  { idx: "002", ticker: "COAI", name: "Colorado AI Act", jur: "US-CO", status: "PENDING", delta: "!", eff: "2026-06-30", articles: 17 },
  { idx: "003", ticker: "NYLL144", name: "NYC Local Law 144", jur: "US-NY-NYC", status: "ACTIVE", delta: "=", eff: "2023-07-05", articles: 8 },
  { idx: "004", ticker: "VAHB2094", name: "Virginia HB 2094", jur: "US-VA", status: "PENDING", delta: "!", eff: "2026-07-01", articles: 12 },
  { idx: "005", ticker: "CAAB2013", name: "California AB 2013", jur: "US-CA", status: "PENDING", delta: "+", eff: "2026-01-01", articles: 6 },
  { idx: "006", ticker: "ILAIVIRA", name: "Illinois AIVIRA", jur: "US-IL", status: "ACTIVE", delta: "=", eff: "2020-01-01", articles: 4 },
  { idx: "007", ticker: "UKAIB", name: "UK AI Principles", jur: "UK-GB", status: "DRAFT", delta: "?", eff: "TBD", articles: 0 },
];

const SYSTEMS = [
  { k: "CHECKER", label: "Compliance Assay", desc: "4-question vector → precise obligation graph", n: "free" },
  { k: "REGISTRY", label: "Regulation Registry", desc: "Primary-source instruments, continuously diffed", n: `${REGS.length} tracked` },
  { k: "DIRECTORY", label: "Counsel Directory", desc: "Vetted auditors / legal / software / training", n: "30+ verified" },
  { k: "DIGEST", label: "Weekly Digest", desc: "Enforcement actions, new filings, deadline alerts", n: "free" },
];

function Bar({ w = "full" }: { w?: "full" | "half" }) {
  return <div style={{ borderBottom: `1px solid ${border}`, width: w === "full" ? "100%" : "50%" }} />;
}

export default function ConceptB() {
  const now = new Date();
  const stamp = now.toISOString().replace("T", " ").slice(0, 19) + " UTC";

  return (
    <div className={`${mono.variable} ${sans.variable}`} style={{ background: bg, color: fg, fontFamily: "var(--font-mono), ui-monospace, monospace", minHeight: "100vh" }}>

      {/* preview banner */}
      <div style={{ background: bgDeeper, color: amber, textAlign: "center", padding: "6px 12px", fontSize: 11, letterSpacing: "0.1em", borderBottom: `1px solid ${border}` }}>
        [CONCEPT B / THE TERMINAL] <Link href="/v2" style={{ color: phosphor, textDecoration: "underline" }}>← index</Link> · <Link href="/v2/concept-a" style={{ color: phosphor, textDecoration: "underline" }}>A</Link> · <Link href="/v2/concept-c" style={{ color: phosphor, textDecoration: "underline" }}>C</Link>
      </div>

      {/* ── Top bar / status line ─────────────────────── */}
      <div style={{ background: bgPanel, borderBottom: `1px solid ${border}`, padding: "6px 16px", fontSize: 11, display: "flex", justifyContent: "space-between", color: fgDim }}>
        <div style={{ display: "flex", gap: 18 }}>
          <span><span style={{ color: phosphor }}>●</span> REGULOME/v2.0.0</span>
          <span>session: <span style={{ color: fg }}>anon-guest</span></span>
          <span>region: <span style={{ color: fg }}>global</span></span>
          <span>registry: <span style={{ color: phosphor }}>synced</span></span>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          <span>{stamp}</span>
          <span>uptime <span style={{ color: phosphor }}>99.98%</span></span>
        </div>
      </div>

      {/* ── Header ──────────────────────────────────── */}
      <header style={{ borderBottom: `1px solid ${border}`, padding: "18px 24px", background: bgDeeper }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
          <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none", color: fg }}>
            <span style={{ color: amber, fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>▚</span>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em", color: fg }}>regulome</span>
            <span style={{ color: amber, fontSize: 20, fontWeight: 700 }}>.io</span>
            <span style={{ color: fgFaint, fontSize: 11, marginLeft: 6 }}>// regulatory compliance terminal</span>
          </Link>
          <nav style={{ display: "flex", gap: 4, fontSize: 12 }}>
            {[
              { k: "REG", l: "registry" },
              { k: "DIR", l: "directory" },
              { k: "ASY", l: "assay" },
              { k: "GLX", l: "glossary" },
              { k: "DSP", l: "dispatches" },
            ].map((n) => (
              <a key={n.k} href="#" style={{ color: fgDim, padding: "6px 10px", textDecoration: "none", display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ color: fgFaint }}>[{n.k}]</span>
                <span>{n.l}</span>
              </a>
            ))}
          </nav>
          <div style={{ display: "flex", gap: 8 }}>
            <a href="#" style={{ color: fgDim, padding: "6px 12px", textDecoration: "none", fontSize: 12, border: `1px solid ${border}` }}>
              ⌘K
            </a>
            <Link href="/checker" style={{ background: amber, color: bgDeeper, padding: "7px 14px", textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.02em" }}>
              ▶ run_assay()
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────── */}
      <section style={{ padding: "56px 24px 40px", borderBottom: `1px solid ${border}`, position: "relative", overflow: "hidden" }}>
        {/* scanline effect */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(127,255,195,0.015) 2px, rgba(127,255,195,0.015) 3px)`, pointerEvents: "none" }} />
        {/* grid overlay */}
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${borderBright} 1px, transparent 1px), linear-gradient(90deg, ${borderBright} 1px, transparent 1px)`, backgroundSize: "64px 64px", opacity: 0.12, pointerEvents: "none", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }} />

        <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "start" }}>
            <div>
              <div style={{ fontSize: 11, color: phosphor, marginBottom: 20, display: "flex", alignItems: "center", gap: 10, letterSpacing: "0.08em" }}>
                <span>$</span>
                <span style={{ color: fgDim }}>regulome</span>
                <span style={{ color: fg }}>describe</span>
                <span style={{ color: amber }}>--scope=all</span>
                <span style={{ width: 9, height: 15, background: phosphor, display: "inline-block", verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
              </div>

              <h1 style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 96, lineHeight: 0.92, fontWeight: 700, letterSpacing: "-0.04em", margin: "0 0 24px", color: fg }}>
                AI regulation,<br />
                <span style={{ color: amber }}>diff&apos;d</span> &amp; <span style={{ color: phosphor }}>indexed</span>.
              </h1>

              <p style={{ fontSize: 16, lineHeight: 1.7, color: fgDim, maxWidth: "64ch", margin: "0 0 36px", fontFamily: "var(--font-mono), monospace" }}>
                {"// A machine-readable registry of every law that binds your AI stack."}<br />
                {"// Primary sources continuously diff'd against the wire."}<br />
                {"// Obligations rendered as deterministic checklists, not legal prose."}<br />
                <span style={{ color: fgFaint }}>{"// Built for compliance & product engineers. No account required."}</span>
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                <Link href="/checker" style={{ background: amber, color: bgDeeper, padding: "14px 22px", textDecoration: "none", fontSize: 13, fontWeight: 800, letterSpacing: "0.02em", display: "inline-flex", alignItems: "center", gap: 10 }}>
                  ▶ run_assay()
                  <span style={{ color: "rgba(10,13,20,0.4)", fontWeight: 500 }}>↵</span>
                </Link>
                <Link href="/regulations" style={{ border: `1px solid ${borderBright}`, color: fg, padding: "13px 22px", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>
                  $ list --registry
                </Link>
              </div>

              {/* KPI strip */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: border, border: `1px solid ${border}` }}>
                {[
                  { k: "registry.size", v: "7", u: "laws" },
                  { k: "counsel.vetted", v: "30+", u: "firms" },
                  { k: "assay.runs", v: "free", u: "forever" },
                  { k: "sync.latency", v: "<48h", u: "p50" },
                ].map((s) => (
                  <div key={s.k} style={{ background: bgPanel, padding: "18px 18px" }}>
                    <div style={{ fontSize: 10, color: fgFaint, letterSpacing: "0.04em", marginBottom: 6 }}>{s.k}</div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: fg, lineHeight: 1, fontFamily: "var(--font-sans), sans-serif" }}>{s.v}</div>
                    <div style={{ fontSize: 10, color: fgDim, marginTop: 4 }}>{s.u}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal panel — live registry */}
            <div style={{ background: bgDeeper, border: `1px solid ${borderBright}`, fontSize: 12 }}>
              <div style={{ background: bgPanel, padding: "10px 14px", borderBottom: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: phosphor, letterSpacing: "0.06em" }}>REGISTRY_FEED.LIVE</span>
                <span style={{ color: fgDim, fontSize: 10 }}>▲▼ scroll · ↵ open</span>
              </div>
              <div>
                {REGS.slice(0, 7).map((r, i) => (
                  <Link key={r.ticker} href={`/regulations/${r.name.toLowerCase().replace(/\s+/g, "-")}`} style={{ display: "grid", gridTemplateColumns: "28px 78px 1fr auto", gap: 10, padding: "10px 14px", borderBottom: i < 6 ? `1px solid ${border}` : "none", textDecoration: "none", color: fg, alignItems: "center" }}>
                    <span style={{ color: fgFaint }}>{r.idx}</span>
                    <span style={{ color: amber, fontWeight: 600 }}>{r.ticker}</span>
                    <span style={{ fontSize: 12, color: fg }}>{r.name}</span>
                    <span style={{
                      fontSize: 10, padding: "3px 8px",
                      color: r.status === "ACTIVE" ? phosphor : r.status === "PENDING" ? amber : r.status === "DRAFT" ? fgDim : crimson,
                      background: r.status === "ACTIVE" ? phosphorBg : r.status === "PENDING" ? amberBg : "transparent",
                      border: `1px solid ${r.status === "ACTIVE" ? phosphor : r.status === "PENDING" ? amber : border}`,
                      letterSpacing: "0.08em",
                    }}>
                      {r.delta} {r.status}
                    </span>
                  </Link>
                ))}
              </div>
              <div style={{ padding: "8px 14px", borderTop: `1px solid ${border}`, fontSize: 10, color: fgFaint, display: "flex", justifyContent: "space-between" }}>
                <span>{REGS.length} rows · last sync {stamp.slice(11)}</span>
                <span>← j/k · q exit</span>
              </div>
            </div>
          </div>
        </div>

        <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
      </section>

      {/* ── Systems grid ────────────────────────────── */}
      <section style={{ padding: "64px 24px", borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ marginBottom: 36, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 11, color: phosphor, letterSpacing: "0.08em", marginBottom: 8 }}>// SYSTEMS</div>
              <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", margin: 0, color: fg, fontFamily: "var(--font-sans), sans-serif" }}>
                Four modules. Zero bullshit.
              </h2>
            </div>
            <div style={{ color: fgFaint, fontSize: 11 }}>
              man <span style={{ color: fg }}>regulome</span> · ↵
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: border, border: `1px solid ${border}` }}>
            {SYSTEMS.map((s, i) => (
              <div key={s.k} style={{ background: bgPanel, padding: "28px 22px", position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                  <span style={{ fontSize: 11, color: phosphor, letterSpacing: "0.06em" }}>[{String(i).padStart(2, "0")}]</span>
                  <span style={{ fontSize: 10, color: amber, background: amberBg, padding: "3px 8px", letterSpacing: "0.08em" }}>{s.n}</span>
                </div>
                <div style={{ fontSize: 11, color: fgDim, letterSpacing: "0.12em", marginBottom: 10, fontWeight: 600 }}>
                  /{s.k.toLowerCase()}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: fg, marginBottom: 10, letterSpacing: "-0.01em", fontFamily: "var(--font-sans), sans-serif" }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 12, color: fgDim, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA panel ───────────────────────────────── */}
      <section style={{ padding: "72px 24px", borderBottom: `1px solid ${border}`, background: bgDeeper }}>
        <div style={{ maxWidth: 980, margin: "0 auto", border: `1px solid ${borderBright}`, background: bgPanel }}>
          <div style={{ borderBottom: `1px solid ${border}`, padding: "10px 20px", fontSize: 11, color: fgDim, display: "flex", justifyContent: "space-between" }}>
            <span><span style={{ color: phosphor }}>●</span> /bin/assay</span>
            <span>interactive · 4 prompts · ~60s</span>
          </div>
          <div style={{ padding: "48px 32px", textAlign: "center" }}>
            <h2 style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 18px", color: fg, fontFamily: "var(--font-sans), sans-serif", lineHeight: 1 }}>
              <span style={{ color: amber }}>$</span> regulome assay<br />
              <span style={{ color: fgDim, fontSize: 32 }}>--org=you --ai=your-stack</span>
            </h2>
            <p style={{ fontSize: 15, color: fgDim, maxWidth: "56ch", margin: "0 auto 32px", lineHeight: 1.7 }}>
              Feed 4 particulars about your org and its AI systems. Receive back a deterministic obligation graph: which laws apply, which clauses, which deadlines, which evidence you must produce.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/checker" style={{ background: phosphor, color: bgDeeper, padding: "14px 28px", textDecoration: "none", fontSize: 13, fontWeight: 800, letterSpacing: "0.02em" }}>
                ▶ ./assay --free
              </Link>
              <Link href="/checker/pro-report" style={{ background: "transparent", color: amber, padding: "13px 28px", textDecoration: "none", fontSize: 13, fontWeight: 600, border: `1px solid ${amber}` }}>
                $ assay --pro  <span style={{ color: fgDim }}>// $49</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer style={{ padding: "36px 24px 18px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 48, paddingBottom: 28, borderBottom: `1px solid ${border}` }}>
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 10 }}>
                <span style={{ color: amber, fontSize: 18, fontWeight: 800 }}>▚</span>
                <span style={{ fontSize: 15, color: fg, fontWeight: 700 }}>regulome<span style={{ color: amber }}>.io</span></span>
              </div>
              <div style={{ fontSize: 11, color: fgFaint, fontFamily: "var(--font-mono), monospace", lineHeight: 1.8 }}>
                // regulatory-compliance CLI<br />
                // v2.0.0 · MIT License<br />
                // gpl-ops@regulome.io
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {[
                { h: "/registry", l: ["EU AI Act", "Colorado AI", "NYC LL 144", "All laws"] },
                { h: "/directory", l: ["Auditors", "Legal", "Governance", "Software"] },
                { h: "/bin", l: ["assay", "compare", "diff", "digest"] },
                { h: "/meta", l: ["Privacy", "Terms", "Status", "Contact"] },
              ].map((col) => (
                <div key={col.h}>
                  <div style={{ fontSize: 11, color: phosphor, marginBottom: 10, letterSpacing: "0.06em" }}>{col.h}</div>
                  {col.l.map((i) => <div key={i} style={{ fontSize: 11, color: fgDim, lineHeight: 1.9 }}>{i}</div>)}
                </div>
              ))}
            </div>
          </div>
          <div style={{ paddingTop: 16, display: "flex", justifyContent: "space-between", fontSize: 10, color: fgFaint }}>
            <span>© {now.getFullYear()} regulome — set in JetBrains Mono & IBM Plex Sans Condensed</span>
            <span>not legal advice · exit 0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
