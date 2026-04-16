// Concept A — "The Ledger"
// Aesthetic: 19th-century legal gazette / Financial Times / law journal
// Commitment: cream paper, oxblood accent, Fraunces serif, drop caps, rule lines
import Link from "next/link";
import { Fraunces, Instrument_Sans } from "next/font/google";
import type { Metadata } from "next";

const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const caps = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-caps",
});

export const metadata: Metadata = {
  title: "Concept A — The Ledger",
  robots: { index: false, follow: false },
};

// ── Palette ────────────────────────────────────────
const ink = "#0D0B07";
const paper = "#F3EBD8";
const paperDeep = "#E8DDC2";
const oxblood = "#7B1A1A";
const moss = "#3F5137";
const rule = "#2B2820";

const REGS = [
  { slug: "eu-ai-act", name: "EU AI Act", sigil: "EU", jurisdiction: "European Union", status: "Enforced", effective: "Aug 2026" },
  { slug: "colorado-ai-act", name: "Colorado AI Act", sigil: "CO", jurisdiction: "Colorado · US", status: "Enacted", effective: "Jun 30, 2026" },
  { slug: "nyc-local-law-144", name: "NYC Local Law 144", sigil: "NY", jurisdiction: "New York City", status: "Enforced", effective: "Jul 2023" },
  { slug: "virginia-hb-2094", name: "Virginia HB 2094", sigil: "VA", jurisdiction: "Virginia · US", status: "Enacted", effective: "Jul 1, 2026" },
  { slug: "california-ab-2013", name: "California AB 2013", sigil: "CA", jurisdiction: "California · US", status: "Enacted", effective: "Jan 1, 2026" },
];

const PRINCIPLES = [
  { n: "I", title: "Of Cartography", body: "Every rule, every jurisdiction — charted, cross-referenced, and continuously updated against the primary sources." },
  { n: "II", title: "Of Plain Speech", body: "Legal text rendered into operative obligations: what you must do, by when, and under what authority." },
  { n: "III", title: "Of Provenance", body: "Every claim cites its source. Every interpretation is dated. No opinion is mistaken for law." },
  { n: "IV", title: "Of Counsel", body: "A curated register of auditors, counsel, and compliance platforms — vetted to your particular situation." },
];

export default function ConceptA() {
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const issueNo = "MMXXVI · Vol. I";

  return (
    <div className={`${display.variable} ${caps.variable}`} style={{ background: paper, color: ink, fontFamily: "var(--font-display), Georgia, serif", minHeight: "100vh" }}>
      {/* preview banner */}
      <div style={{ background: ink, color: paper, textAlign: "center", padding: "6px 12px", fontFamily: "var(--font-caps), sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
        Concept A · The Ledger · <Link href="/v2" style={{ color: paperDeep, textDecoration: "underline" }}>← back to index</Link> · <Link href="/v2/concept-b" style={{ color: paperDeep, textDecoration: "underline" }}>B</Link> · <Link href="/v2/concept-c" style={{ color: paperDeep, textDecoration: "underline" }}>C</Link>
      </div>

      {/* ── Masthead ─────────────────────────────────────── */}
      <header style={{ borderBottom: `3px double ${rule}`, padding: "24px 32px 16px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 16 }}>
          <div style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: rule }}>
            {issueNo} · Established MMXXV
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: oxblood, marginBottom: 2 }}>
              ⁂  Regulome  ⁂
            </div>
            <div style={{ fontWeight: 900, fontSize: 52, letterSpacing: "-0.03em", lineHeight: 1, fontStyle: "italic", fontVariationSettings: "'SOFT' 50, 'WONK' 1" }}>
              The Regulome <span style={{ color: oxblood }}>Gazette</span>
            </div>
            <div style={{ marginTop: 6, fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: rule }}>
              A journal of artificial-intelligence law & compliance
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: rule, textAlign: "right" }}>
            {today} · regulome.io
          </div>
        </div>

        <nav style={{ maxWidth: 1180, margin: "14px auto 0", display: "flex", justifyContent: "center", gap: 28, fontFamily: "var(--font-caps), sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: ink, borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}`, padding: "8px 0" }}>
          {["The Register", "Jurisdictions", "Counsel", "Glossarium", "Dispatches", "Compliance Assay"].map((l) => (
            <a key={l} href="#" style={{ color: ink, textDecoration: "none" }}>{l}</a>
          ))}
        </nav>
      </header>

      {/* ── Hero / Broadsheet ────────────────────────────── */}
      <section style={{ padding: "48px 32px 56px", borderBottom: `1px solid ${rule}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Main broadsheet */}
          <div style={{ borderRight: `1px solid ${rule}`, paddingRight: 48 }}>
            <div style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: oxblood, marginBottom: 14 }}>
              ⸺  Principal Affair of the Hour  ⸺
            </div>
            <h1 style={{ fontSize: 78, lineHeight: 0.95, fontWeight: 900, letterSpacing: "-0.035em", margin: "0 0 18px", fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}>
              A survey of every law that now governs your artificial intelligence.
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.5, fontStyle: "italic", color: rule, maxWidth: "58ch", margin: "0 0 28px", borderLeft: `3px solid ${oxblood}`, paddingLeft: 18, fontWeight: 400 }}>
              From Brussels to Sacramento, from the City of New York to the Commonwealth of Virginia — the legal topography of machine intelligence, kept current in these pages.
            </p>

            {/* Drop-cap intro */}
            <div style={{ fontSize: 17, lineHeight: 1.75, color: ink, columnCount: 2, columnGap: 32, columnRule: `1px solid ${paperDeep}` }}>
              <p style={{ margin: 0, textAlign: "justify", hyphens: "auto" }}>
                <span style={{ float: "left", fontSize: 88, lineHeight: 0.82, fontWeight: 900, marginRight: 10, marginTop: 6, marginBottom: -4, color: oxblood, fontStyle: "italic", fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}>R</span>
                egulome is the register of record for organisations whose products employ artificial intelligence. We map each system against the statutes that bind it — the EU Act, the bills of the several American states, the directives of local authorities — and render the obligations plain, with citations, in working language.
              </p>
              <p style={{ margin: "14px 0 0", textAlign: "justify", hyphens: "auto" }}>
                Our free Assay inspects a company&apos;s circumstances against the full body of present law, returning an itemised schedule of duties and deadlines. For matters requiring counsel, our vetted Register connects firms with auditors, lawyers, and software platforms qualified to act.
              </p>
            </div>

            <div style={{ marginTop: 32, display: "flex", gap: 16, alignItems: "center" }}>
              <Link href="/checker" style={{ background: ink, color: paper, padding: "14px 24px", fontFamily: "var(--font-caps), sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>
                ⟶ Commence the Assay
              </Link>
              <Link href="/regulations" style={{ color: oxblood, padding: "14px 8px", fontFamily: "var(--font-caps), sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "underline", textUnderlineOffset: 4 }}>
                Consult the register →
              </Link>
            </div>
          </div>

          {/* Side column — the gazette */}
          <aside>
            <div style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: oxblood, borderBottom: `1px solid ${rule}`, paddingBottom: 8, marginBottom: 16 }}>
              In This Edition
            </div>
            {REGS.slice(0, 4).map((r, i) => (
              <Link key={r.slug} href={`/regulations/${r.slug}`} style={{ display: "block", padding: "14px 0", borderBottom: i < 3 ? `1px dotted ${rule}` : "none", textDecoration: "none", color: ink }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.2em", color: oxblood, minWidth: 26 }}>№ {String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: rule }}>{r.jurisdiction}</span>
                </div>
                <div style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.015em", marginBottom: 4, fontStyle: "italic", fontVariationSettings: "'SOFT' 50" }}>{r.name}</div>
                <div style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: moss }}>
                  {r.status} · {r.effective}
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      {/* ── Principles / Four Pillars ────────────────────── */}
      <section style={{ padding: "72px 32px", borderBottom: `1px solid ${rule}`, background: paperDeep }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: oxblood, marginBottom: 10 }}>
              ⁂  The House's Four Tenets  ⁂
            </div>
            <h2 style={{ fontSize: 44, lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 700, margin: 0, fontStyle: "italic", fontVariationSettings: "'SOFT' 50" }}>
              What you may expect of this work.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: `1px solid ${rule}`, background: paper }}>
            {PRINCIPLES.map((p, i) => (
              <div key={p.n} style={{ padding: "32px 28px", borderRight: i < 3 ? `1px solid ${rule}` : "none" }}>
                <div style={{ fontSize: 68, fontWeight: 900, color: oxblood, lineHeight: 0.8, marginBottom: 14, fontStyle: "italic", fontVariationSettings: "'SOFT' 80, 'WONK' 1" }}>{p.n}</div>
                <div style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: rule, marginBottom: 10 }}>
                  {p.title}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: ink, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Register / Table of Regulations ──────────── */}
      <section style={{ padding: "72px 32px", borderBottom: `1px solid ${rule}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-end", borderBottom: `3px double ${rule}`, paddingBottom: 20, marginBottom: 0 }}>
            <div>
              <div style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: oxblood, marginBottom: 8 }}>⸺ The Register ⸺</div>
              <h2 style={{ fontSize: 44, lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 900, margin: 0 }}>Laws now in force & imminent.</h2>
            </div>
            <Link href="/regulations" style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: oxblood, textDecoration: "underline", textUnderlineOffset: 4 }}>
              The full register →
            </Link>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
            <thead>
              <tr style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: rule }}>
                <th style={{ padding: "14px 8px 14px 0", textAlign: "left", borderBottom: `1px solid ${rule}`, fontWeight: 500, width: 60 }}>Sigil</th>
                <th style={{ padding: "14px 8px", textAlign: "left", borderBottom: `1px solid ${rule}`, fontWeight: 500 }}>Instrument</th>
                <th style={{ padding: "14px 8px", textAlign: "left", borderBottom: `1px solid ${rule}`, fontWeight: 500 }}>Jurisdiction</th>
                <th style={{ padding: "14px 8px", textAlign: "left", borderBottom: `1px solid ${rule}`, fontWeight: 500 }}>Status</th>
                <th style={{ padding: "14px 0 14px 8px", textAlign: "right", borderBottom: `1px solid ${rule}`, fontWeight: 500 }}>Effective</th>
              </tr>
            </thead>
            <tbody>
              {REGS.map((r) => (
                <tr key={r.slug} style={{ borderBottom: `1px dotted ${rule}` }}>
                  <td style={{ padding: "22px 8px 22px 0" }}>
                    <span style={{ display: "inline-flex", width: 42, height: 42, alignItems: "center", justifyContent: "center", border: `1.5px solid ${ink}`, fontFamily: "var(--font-caps), sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", background: paperDeep }}>
                      {r.sigil}
                    </span>
                  </td>
                  <td style={{ padding: "22px 8px" }}>
                    <Link href={`/regulations/${r.slug}`} style={{ color: ink, textDecoration: "none" }}>
                      <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "-0.015em", fontStyle: "italic", fontVariationSettings: "'SOFT' 40" }}>{r.name}</span>
                    </Link>
                  </td>
                  <td style={{ padding: "22px 8px", color: rule, fontSize: 15 }}>{r.jurisdiction}</td>
                  <td style={{ padding: "22px 8px" }}>
                    <span style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: r.status === "Enforced" ? moss : oxblood, fontWeight: 600 }}>
                      · {r.status}
                    </span>
                  </td>
                  <td style={{ padding: "22px 0 22px 8px", textAlign: "right", fontFamily: "var(--font-caps), sans-serif", fontSize: 12, letterSpacing: "0.1em", color: ink, fontWeight: 500 }}>
                    {r.effective}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── The Assay CTA ────────────────────────────────── */}
      <section style={{ padding: "80px 32px", background: ink, color: paper, borderBottom: `1px solid ${rule}` }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: paperDeep, marginBottom: 16 }}>
            ⁂  The Compliance Assay  ⁂
          </div>
          <h2 style={{ fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 900, margin: "0 0 18px", fontStyle: "italic", fontVariationSettings: "'SOFT' 50, 'WONK' 1" }}>
            Four questions, an itemised schedule of your duties.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: paperDeep, maxWidth: "48ch", margin: "0 auto 32px" }}>
            Furnish a brief particulars of your organisation and we shall return the laws that bind you, the clauses that apply, and the deadlines by which you must act.
          </p>
          <Link href="/checker" style={{ display: "inline-block", background: paper, color: ink, padding: "16px 32px", fontFamily: "var(--font-caps), sans-serif", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600, border: `2px solid ${paper}` }}>
            ⟶ Commence free of charge
          </Link>
          <p style={{ marginTop: 18, fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A8168" }}>
            Informational only · Not legal counsel
          </p>
        </div>
      </section>

      {/* ── Colophon / Footer ────────────────────────────── */}
      <footer style={{ padding: "48px 32px 32px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 24, color: oxblood, letterSpacing: "0.5em", marginBottom: 8 }}>⁂ ⁂ ⁂</div>
            <div style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: rule }}>
              Colophon
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}`, padding: "24px 0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {[
              { h: "The Register", l: ["EU AI Act", "Colorado AI Act", "NYC LL 144", "All instruments"] },
              { h: "Counsel", l: ["Auditors", "Legal", "Governance", "Software"] },
              { h: "Instruments", l: ["Compliance Assay", "Jurisdictional Compare", "Glossarium", "Dispatches"] },
              { h: "The House", l: ["Privacy", "Terms", "Newsletter", "Correspondence"] },
            ].map((col) => (
              <div key={col.h}>
                <div style={{ fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: oxblood, marginBottom: 10 }}>{col.h}</div>
                {col.l.map((item) => (
                  <div key={item} style={{ fontSize: 14, lineHeight: 1.9, color: ink }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-caps), sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: rule }}>
            <span>Regulome · Established MMXXV · regulome.io</span>
            <span>Set in Fraunces & Instrument · Printed digitally</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
