// Concept C — "The Atlas"
// Aesthetic: scientific genome atlas / Nature journal / anatomical plate
// Commitment: bone-white, Instrument Serif italic display, cobalt + oxblood + moss, DNA helix motif
import Link from "next/link";
import { Instrument_Serif, Geist, Azeret_Mono } from "next/font/google";
import type { Metadata } from "next";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const sans = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const mono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Concept C — The Atlas",
  robots: { index: false, follow: false },
};

// ── Palette — scientific plate ────────────────────
const bone = "#F7F3EA";
const boneDeep = "#EFE9DC";
const ink = "#1A1815";
const ash = "#4A4740";
const faint = "#8C8876";
const cobalt = "#1E3A8A";
const oxblood = "#8B1A1A";
const moss = "#3E5C2C";
const ochre = "#A8670C";

const REGS = [
  { slug: "eu-ai-act", locus: "EU-AIA.2024.1689", name: "EU AI Act", jur: "European Union", phylum: "Comprehensive · Risk-tiered", status: "enforced", effective: "Aug 2026", chromaticity: cobalt, weight: 98 },
  { slug: "colorado-ai-act", locus: "CO-SB24.205", name: "Colorado AI Act", jur: "Colorado · US", phylum: "High-risk deployer", status: "enacted", effective: "Jun 30, 2026", chromaticity: oxblood, weight: 62 },
  { slug: "nyc-local-law-144", locus: "NYC-LL.144.2021", name: "NYC Local Law 144", jur: "New York City", phylum: "Employment · bias audit", status: "enforced", effective: "Jul 2023", chromaticity: moss, weight: 34 },
  { slug: "virginia-human-civil-rights-act", locus: "VA-HB.2094", name: "Virginia HB 2094", jur: "Virginia · US", phylum: "Consumer protection", status: "enacted", effective: "Jul 1, 2026", chromaticity: ochre, weight: 48 },
];

const LOCI = [
  { n: "I.", kingdom: "Cartography", title: "Regulatory topography, mapped.", body: "Each statute located on its jurisdictional chromosome — comprehensively indexed, cross-referenced to primary sources, versioned on every amendment." },
  { n: "II.", kingdom: "Assay", title: "An instrument for the particular case.", body: "Feed an organisation its circumstances; receive the set of loci that bind it, the articles implicated, and the operational obligations demanded." },
  { n: "III.", kingdom: "Register", title: "A curated consilium of practitioners.", body: "Auditors, counsel, and compliance platforms — each vetted against a specimen of their actual work, matched to the regulatory situation at hand." },
  { n: "IV.", kingdom: "Dispatches", title: "Enforcement as it occurs.", body: "Weekly chronicle of filings, enforcement actions, deadline shifts. Read by those who must know before it becomes general knowledge." },
];

// Small inline SVG helix ornament
function Helix({ height = 120 }: { height?: number }) {
  return (
    <svg viewBox="0 0 40 120" width={height / 3} height={height} aria-hidden="true">
      <defs>
        <linearGradient id="helixG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={cobalt} />
          <stop offset="1" stopColor={oxblood} />
        </linearGradient>
      </defs>
      {Array.from({ length: 12 }).map((_, i) => {
        const y = i * 10 + 5;
        const t = i / 11;
        return <line key={i} x1={4 + t * 32} y1={y} x2={36 - t * 32} y2={y} stroke="url(#helixG)" strokeWidth="0.8" opacity="0.4" />;
      })}
      {Array.from({ length: 60 }).map((_, i) => {
        const y = i * 2;
        const phase = (i / 60) * Math.PI * 6;
        const x = 20 + Math.sin(phase) * 14;
        return <circle key={`a${i}`} cx={x} cy={y} r="1.2" fill={cobalt} opacity="0.8" />;
      })}
      {Array.from({ length: 60 }).map((_, i) => {
        const y = i * 2;
        const phase = (i / 60) * Math.PI * 6;
        const x = 20 + Math.sin(phase + Math.PI) * 14;
        return <circle key={`b${i}`} cx={x} cy={y} r="1.2" fill={oxblood} opacity="0.8" />;
      })}
    </svg>
  );
}

export default function ConceptC() {
  return (
    <div className={`${display.variable} ${sans.variable} ${mono.variable}`} style={{ background: bone, color: ink, fontFamily: "var(--font-sans), sans-serif", minHeight: "100vh" }}>
      {/* preview banner */}
      <div style={{ background: ink, color: bone, textAlign: "center", padding: "6px 12px", fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>
        Concept C · The Atlas · <Link href="/v2" style={{ color: boneDeep, textDecoration: "underline" }}>← index</Link> · <Link href="/v2/concept-a" style={{ color: boneDeep, textDecoration: "underline" }}>A</Link> · <Link href="/v2/concept-b" style={{ color: boneDeep, textDecoration: "underline" }}>B</Link>
      </div>

      {/* ── Header / scientific plate ────────────────── */}
      <header style={{ padding: "24px 40px 0", position: "relative" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "center", paddingBottom: 18 }}>
          <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: faint }}>
            Plate 001 · Folio I
          </div>
          <Link href="/" style={{ textAlign: "center", textDecoration: "none", color: ink }}>
            <div style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", fontSize: 32, letterSpacing: "-0.01em", lineHeight: 1 }}>
              Reg<span style={{ color: oxblood }}>u</span>lome
            </div>
          </Link>
          <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: faint, textAlign: "right" }}>
            An atlas of AI law
          </div>
        </div>

        <nav style={{ maxWidth: 1280, margin: "0 auto", borderTop: `1px solid ${ink}`, borderBottom: `1px solid ${ink}`, padding: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          <div style={{ display: "flex", gap: 28 }}>
            {["Atlas", "Assay", "Consilium", "Lexicon", "Dispatches"].map((l) => (
              <a key={l} href="#" style={{ color: ink, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <a href="#" style={{ color: ash, textDecoration: "none" }}>Enter library →</a>
          </div>
        </nav>
      </header>

      {/* ── Hero plate ─────────────────────────────── */}
      <section style={{ padding: "72px 40px 56px", borderBottom: `1px solid ${ink}`, position: "relative", overflow: "hidden" }}>
        {/* grain */}
        <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence baseFrequency='0.9'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")` }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1.4fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: cobalt, marginBottom: 20 }}>
              Fig. 1 — the regulome, charted
            </div>
            <h1 style={{ margin: 0, fontSize: 84, lineHeight: 0.95, color: ink, fontWeight: 400, letterSpacing: "-0.02em" }}>
              <span style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic" }}>Every law</span><br />
              that <span style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", color: oxblood }}>governs</span><br />
              the machines<br />
              <span style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", color: cobalt }}>you deploy</span>.
            </h1>
            <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 48, height: 1, background: ink }} />
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: ash }}>
                Vol. MMXXVI · compiled continuously
              </span>
            </div>
          </div>

          {/* Center: helix ornament */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <Helix height={280} />
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: faint, textAlign: "center" }}>
              Plate specimen<br />
              × 1.0
            </div>
          </div>

          <div>
            <p style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", fontSize: 26, lineHeight: 1.4, color: ash, margin: "0 0 22px", maxWidth: "30ch" }}>
              A single comprehensive map of the statutes, bylaws, and directives that now constrain artificial intelligence — located, annotated, kept current against the primary record.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: ink, margin: 0, maxWidth: "36ch" }}>
              Regulome is the working reference for compliance and product teams. Tell us about your organisation and its AI stack; we return the precise set of legal loci that bind you, with citations, deadlines, and a curated register of specialists who can act on your behalf.
            </p>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/checker" style={{ background: ink, color: bone, padding: "15px 22px", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textDecoration: "none", display: "inline-flex", justifyContent: "space-between", alignItems: "center", maxWidth: 360 }}>
                <span>Begin the Assay</span>
                <span style={{ color: "#D5CDB8", fontFamily: "var(--font-mono), monospace", fontSize: 11 }}>~60s · free</span>
              </Link>
              <Link href="/regulations" style={{ color: ink, padding: "15px 2px", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textDecoration: "none", display: "inline-flex", justifyContent: "space-between", alignItems: "center", maxWidth: 360, borderBottom: `1px solid ${ink}` }}>
                <span>Consult the Atlas</span>
                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: faint }}>↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* caption strip */}
        <div style={{ maxWidth: 1280, margin: "56px auto 0", borderTop: `1px solid ${ink}`, paddingTop: 14, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40, fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: ash, textTransform: "uppercase" }}>
          <div><span style={{ color: cobalt, fontWeight: 600 }}>[a]</span> Seven instruments in force or imminent</div>
          <div><span style={{ color: oxblood, fontWeight: 600 }}>[b]</span> Thirty-plus counsel vetted</div>
          <div><span style={{ color: moss, fontWeight: 600 }}>[c]</span> Free compliance assay</div>
          <div><span style={{ color: ochre, fontWeight: 600 }}>[d]</span> Forty-eight hours · diff latency</div>
        </div>
      </section>

      {/* ── Four loci / kingdoms ─────────────────────── */}
      <section style={{ padding: "80px 40px", borderBottom: `1px solid ${ink}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 56 }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: cobalt, marginBottom: 14 }}>
                § — On the kingdoms
              </div>
              <h2 style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", fontSize: 56, lineHeight: 1, letterSpacing: "-0.02em", margin: 0, fontWeight: 400 }}>
                The atlas contains<br />four principal <em>loci</em>.
              </h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: ash, margin: 0, maxWidth: "52ch" }}>
              The regulome is organised as a scientific atlas, not a blog. Each of the four kingdoms below serves a distinct operational purpose for compliance, legal, and product teams. Together they constitute the working reference.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: `1px solid ${ink}`, borderBottom: `1px solid ${ink}` }}>
            {LOCI.map((l, i) => (
              <div key={l.n} style={{ padding: "32px 24px 36px", borderLeft: i > 0 ? `1px solid ${ink}` : "none", position: "relative" }}>
                <div style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", fontSize: 40, fontWeight: 400, color: [cobalt, oxblood, moss, ochre][i], lineHeight: 1, marginBottom: 14 }}>
                  {l.n}
                </div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: faint, marginBottom: 12 }}>
                  Kingdom · {l.kingdom}
                </div>
                <h3 style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", fontSize: 22, lineHeight: 1.2, margin: "0 0 12px", color: ink, fontWeight: 400 }}>
                  {l.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: ash, margin: 0 }}>{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Regulation specimen plate ────────────────── */}
      <section style={{ padding: "80px 40px", background: boneDeep, borderBottom: `1px solid ${ink}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 36 }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: cobalt, marginBottom: 10 }}>
                Plate 002 — principal specimens
              </div>
              <h2 style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", fontSize: 48, lineHeight: 1, margin: 0, letterSpacing: "-0.02em", fontWeight: 400 }}>
                Laws now binding, charted.
              </h2>
            </div>
            <Link href="/regulations" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: ink, textDecoration: "underline", textUnderlineOffset: 4 }}>
              The full atlas →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {REGS.map((r) => (
              <Link key={r.slug} href={`/regulations/${r.slug}`} style={{ textDecoration: "none", color: ink, background: bone, border: `1px solid ${ink}`, padding: 0, display: "grid", gridTemplateColumns: "14px 1fr", minHeight: 200 }}>
                {/* color bar indicating kingdom */}
                <div style={{ background: r.chromaticity }} />
                <div style={{ padding: "22px 24px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16 }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: faint }}>
                      <span>{r.locus}</span>
                      <span style={{ color: r.chromaticity, fontWeight: 600 }}>· {r.status}</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", fontSize: 32, lineHeight: 1.05, margin: "0 0 8px", fontWeight: 400, letterSpacing: "-0.015em" }}>
                      {r.name}
                    </h3>
                    <div style={{ fontSize: 13, color: ash }}>{r.jur} · {r.phylum}</div>
                  </div>

                  {/* "weight" bar — visual signal of scope */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontFamily: "var(--font-mono), monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: faint, marginBottom: 6 }}>
                      <span>Scope index</span>
                      <span>{r.weight}/100 · eff {r.effective}</span>
                    </div>
                    <div style={{ height: 6, background: boneDeep, position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, width: `${r.weight}%`, background: r.chromaticity }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Assay CTA ─────────────────────────────── */}
      <section style={{ padding: "96px 40px", borderBottom: `1px solid ${ink}`, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr", gap: 56, alignItems: "center" }}>
          <Helix height={240} />
          <div>
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: cobalt, marginBottom: 14 }}>
              § — the assay · free, 60 seconds
            </div>
            <h2 style={{ fontSize: 64, lineHeight: 0.95, margin: "0 0 20px", fontWeight: 400, letterSpacing: "-0.03em" }}>
              <span style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic" }}>Four</span>{" "}
              <span>particulars.</span><br />
              <span style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", color: oxblood }}>A precise map</span><br />
              <span>of your duties.</span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: ash, maxWidth: "52ch", margin: "0 0 28px" }}>
              Describe your organisation and its AI stack in four short answers. We return the regulations that apply, the specific clauses that bind you, and the deadlines by which you must act.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/checker" style={{ background: ink, color: bone, padding: "14px 24px", fontSize: 13, fontWeight: 500, textDecoration: "none", letterSpacing: "0.03em" }}>
                Begin the Assay →
              </Link>
              <Link href="/checker/pro-report" style={{ color: ink, padding: "14px 0", fontSize: 13, fontWeight: 500, textDecoration: "none", letterSpacing: "0.03em", borderBottom: `1px solid ${ink}` }}>
                Pro dossier · $49
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Colophon ─────────────────────────────── */}
      <footer style={{ padding: "56px 40px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", fontSize: 40, lineHeight: 1, color: ink, letterSpacing: "-0.01em" }}>
              Reg<span style={{ color: oxblood }}>u</span>lome
            </div>
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: faint, marginTop: 10 }}>
              an atlas of artificial-intelligence law
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${ink}`, borderBottom: `1px solid ${ink}`, padding: "24px 0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
            {[
              { h: "Atlas", l: ["EU AI Act", "Colorado AI Act", "NYC LL 144", "Full atlas"] },
              { h: "Consilium", l: ["Auditors", "Legal", "Governance", "Software"] },
              { h: "Instruments", l: ["Assay", "Compare", "Lexicon", "Dispatches"] },
              { h: "Colophon", l: ["Privacy", "Terms", "Sources", "Contact"] },
            ].map((col) => (
              <div key={col.h}>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: cobalt, marginBottom: 12 }}>{col.h}</div>
                {col.l.map((i) => <div key={i} style={{ fontSize: 13, lineHeight: 2, color: ink }}>{i}</div>)}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.12em", color: faint, textTransform: "uppercase" }}>
            <span>© MMXXVI regulome · not legal advice</span>
            <span>Set in Instrument Serif · Geist · Azeret Mono</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
