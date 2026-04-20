import type { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, Users, Landmark, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/brand";

export const revalidate = false;


export const metadata: Metadata = {
  title: "AI Regulation by Industry: Healthcare, HR, Fintech & Insurance (2026)",
  description:
    "Which AI regulations apply to your industry? Healthcare, HR/recruiting, fintech, and insurance compliance matrix for EU AI Act, NYC LL 144, Colorado AI Act, and Illinois AIVIRA.",
  alternates: { canonical: `${SITE_URL}/compare/ai-regulation-by-industry` },
  openGraph: {
    title: "AI Regulation by Industry: Who Must Comply With What",
    description: "Industry compliance matrix: which AI regulations apply to healthcare, HR-recruiting, fintech, and insurance \u2014 and what each requires.",
    type: "article",
    url: `${SITE_URL}/compare/ai-regulation-by-industry`,
  },
};

const REGULATIONS = [
  { key: "eu", label: "EU AI Act", short: "Reg. 2024/1689", bg: "rgba(202,138,4,0.06)", border: "rgba(202,138,4,0.2)", text: "#713f12", badge: "rgba(202,138,4,0.12)" },
  { key: "nyc", label: "NYC LL 144", short: "NYC Local Law 144", bg: "rgba(37,99,235,0.06)", border: "rgba(37,99,235,0.2)", text: "#1e3a5f", badge: "rgba(37,99,235,0.12)" },
  { key: "co", label: "Colorado AI Act", short: "CO SB 24-205", bg: "rgba(22,163,74,0.06)", border: "rgba(22,163,74,0.2)", text: "#14532d", badge: "rgba(22,163,74,0.12)" },
  { key: "il", label: "IL AIVIRA", short: "Illinois AIVIRA", bg: "rgba(147,51,234,0.06)", border: "rgba(147,51,234,0.2)", text: "#3b0764", badge: "rgba(147,51,234,0.12)" },
];

interface Cell { applies: boolean; note: string; }
interface IndustryRow { industry: string; icon: LucideIcon; eu: Cell; nyc: Cell; co: Cell; il: Cell; }

const MATRIX: IndustryRow[] = [
  {
    industry: "Healthcare", icon: Stethoscope,
    eu: { applies: true, note: "Annex III Class IIb+ medical device AI is high-risk. Clinical decision support, diagnosis, treatment recommendation AI requires conformity assessment, CE marking, and post-market monitoring." },
    nyc: { applies: false, note: "NYC LL 144 covers employment decisions only \u2014 not clinical AI. Healthcare employers using AI for hiring are covered." },
    co: { applies: true, note: "AI that makes consequential decisions in healthcare (diagnosis, treatment, medication) is high-risk under CO AI Act. Impact assessment + consumer notice required." },
    il: { applies: false, note: "Illinois AIVIRA covers employment AI (video interview analysis, resume screening) only. Clinical AI is not covered." },
  },
  {
    industry: "HR / Recruiting", icon: Users,
    eu: { applies: true, note: "Annex III Item 2: AI used for recruitment, selection, CV screening, promotion, and termination is high-risk. Full conformity assessment required." },
    nyc: { applies: true, note: "Core use case for NYC LL 144. Any automated employment decision tool (AEDT) used for NYC-based hiring or promotion must have an annual third-party bias audit and public posting." },
    co: { applies: true, note: "Employment decisions (hiring, promotion, termination, compensation) affecting Colorado employees are covered. Impact assessment + consumer rights required." },
    il: { applies: true, note: "Illinois AIVIRA (HB 2557) specifically covers AI video interview analysis tools. Employers must notify candidates and report demographic data annually to the IDHR." },
  },
  {
    industry: "Fintech / Lending", icon: Landmark,
    eu: { applies: true, note: "Annex III Item 5b: AI for creditworthiness assessment and credit scoring is high-risk. Full conformity requirements apply. GDPR Art. 22 profiling rules also apply." },
    nyc: { applies: false, note: "NYC LL 144 covers employment decisions only \u2014 lending AI is not covered under this law. Federal ECOA/FCRA and NYC Human Rights Law may apply separately." },
    co: { applies: true, note: "Credit and lending decisions (loan approvals, pricing, leases) affecting Colorado consumers are covered. Impact assessment + opt-out + adverse action notice required." },
    il: { applies: false, note: "Illinois AIVIRA covers employment AI only \u2014 lending and credit AI is out of scope." },
  },
  {
    industry: "Insurance", icon: Shield,
    eu: { applies: true, note: "Annex III Item 5c: AI for life and health insurance risk assessment and pricing is high-risk. Third-party conformity assessment required for some uses." },
    nyc: { applies: false, note: "NYC LL 144 covers employment decisions only \u2014 insurance underwriting AI is not covered unless used for employment purposes." },
    co: { applies: true, note: "Insurance applications, pricing, and claims decisions affecting Colorado consumers are covered. Impact assessments, consumer notice, and opt-out rights required." },
    il: { applies: false, note: "Illinois AIVIRA covers video interview AI only. Insurance AI is out of scope, though Illinois Department of Insurance has separate guidance on AI underwriting." },
  },
];

export default function AIRegulationByIndustryPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Comparisons", url: "/compare" },
    { name: "AI Regulation by Industry", url: "/compare/ai-regulation-by-industry" },
  ]);

  const schema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "AI Regulation by Industry: Healthcare, HR, Fintech & Insurance (2026)",
    description: "Industry compliance matrix showing which AI regulations apply to healthcare, HR-recruiting, fintech, and insurance.",
    url: `${SITE_URL}/compare/ai-regulation-by-industry`, dateModified: "2026-04-14",
  };

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbs, schema])} />

      <div className="page-banner">
        <div className="container" style={{ maxWidth: 1100, padding: 0 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Comparisons", href: "/compare" }, { label: "AI Regulation by Industry" }]} />
          <h1 className="h1">AI Regulation by Industry</h1>
          <p className="lede" style={{ maxWidth: 680, marginTop: 8 }}>
            Which AI laws apply to your industry &mdash; and what they actually require. Healthcare, HR/recruiting, fintech, and insurance across the four major AI compliance frameworks.
          </p>
          <div className="tag-strip" style={{ marginTop: 16 }}>
            {REGULATIONS.map((reg) => (
              <span key={reg.key} className="chip" style={{ background: reg.badge, color: reg.text }}>{reg.label}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1100, padding: "var(--s-8) var(--s-7)" }}>

        {/* Regulation legend */}
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 32 }}>
          {REGULATIONS.map((reg) => (
            <div key={reg.key} style={{ borderRadius: 10, border: `1px solid ${reg.border}`, background: reg.bg, padding: 12 }}>
              <p className="small" style={{ fontWeight: 600, color: reg.text }}>{reg.label}</p>
              <p className="xs" style={{ marginTop: 2, color: reg.text, opacity: 0.75 }}>{reg.short}</p>
            </div>
          ))}
        </div>

        {/* Industry matrix */}
        <div className="col" style={{ gap: 24 }}>
          {MATRIX.map((row) => (
            <div key={row.industry} className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ background: "var(--paper-2)", borderBottom: "1px solid var(--line)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "flex", width: 32, height: 32, alignItems: "center", justifyContent: "center", borderRadius: 8, background: "var(--line)", color: "var(--ink-2)" }}>
                  <row.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="h4">{row.industry}</h2>
              </div>
              <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {REGULATIONS.map((reg) => {
                  const cell = row[reg.key as keyof IndustryRow] as Cell;
                  return (
                    <div key={reg.key} style={{ padding: 16, borderBottom: "1px solid var(--line)" }}>
                      <div className="between" style={{ marginBottom: 8 }}>
                        <span className="xs" style={{ fontWeight: 600, color: reg.text }}>{reg.label}</span>
                        <span className="chip" style={cell.applies ? { background: "rgba(220,38,38,0.1)", color: "#b91c1c" } : { background: "var(--paper-2)", color: "var(--ink-2)" }}>
                          {cell.applies ? "Applies" : "Not covered"}
                        </span>
                      </div>
                      <p className="xs" style={{ color: "var(--ink-2)", lineHeight: 1.6 }}>{cell.note}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Important notes */}
        <div className="card" style={{ marginTop: 32, borderColor: "rgba(217,119,6,0.3)", background: "rgba(217,119,6,0.06)" }}>
          <h2 className="h5" style={{ color: "#78350f", marginBottom: 8 }}>Important Notes</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "#92400e" }}>
            <li>&bull; This matrix shows the primary AI-specific regulations. Federal laws (ECOA, FCRA, HIPAA, ADA) and general anti-discrimination laws apply independently and may impose additional requirements.</li>
            <li>&bull; &ldquo;Not covered&rdquo; means the specific law does not apply &mdash; it does not mean there are no applicable regulations in that sector.</li>
            <li>&bull; Virginia HB 2094 (effective July 2026) follows the Colorado AI Act model and will add similar coverage for Virginia consumers across these industries.</li>
            <li>&bull; This matrix reflects the law as of April 2026. Always verify with qualified legal counsel for your specific situation.</li>
          </ul>
        </div>

        {/* CTAs */}
        <div className="tag-strip" style={{ marginTop: 32 }}>
          <Link href="/checker" className="btn btn-primary">Check My Compliance</Link>
          <Link href="/directory" className="btn btn-ghost">Find Industry Experts</Link>
          <Link href="/compare/us-state-ai-laws" className="btn btn-ghost">Compare US State AI Laws &rarr;</Link>
        </div>
      </div>
    </>
  );
}
