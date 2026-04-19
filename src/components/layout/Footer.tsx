import Link from "next/link";

const CATALOG_LINKS = [
  { label: "All regulations", href: "/regulations" },
  { label: "By jurisdiction", href: "/jurisdictions" },
  { label: "By topic", href: "/regulations#topics" },
  { label: "Compare", href: "/compare/us-state-ai-laws" },
  { label: "Glossary", href: "/glossary" },
];

const DIRECTORY_LINKS = [
  { label: "All providers", href: "/directory" },
  { label: "Categories", href: "/directory/categories" },
  { label: "Post an RFP", href: "/rfp" },
  { label: "List your firm", href: "/join" },
];

const LEDGER_LINKS = [
  { label: "Latest", href: "/blog" },
  { label: "Explainers", href: "/blog?category=Compliance+Guides" },
  { label: "Q&As", href: "/blog?category=Regulation+Analysis" },
  { label: "Subscribe", href: "/newsletter" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/about#methodology" },
  { label: "Corrections", href: "/about#corrections" },
  { label: "Contact", href: "/about#contact" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="col">
      <h5 className="col-head">{title}</h5>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="cols">
        <div className="col">
          <Link href="/" className="brand-mark" style={{ color: "#fbfbfd" }}>
            <span
              className="glyph"
              aria-hidden="true"
              style={{ background: "var(--accent)", borderColor: "var(--accent)" }}
            >
              §
            </span>
            Regulome
          </Link>
          <div
            className="small"
            style={{ marginTop: 12, color: "rgba(251,251,253,0.7)", maxWidth: 320 }}
          >
            The global register of AI &amp; cyber regulations — and the providers who can help.
          </div>
        </div>

        <FooterColumn title="Catalog" links={CATALOG_LINKS} />
        <FooterColumn title="Directory" links={DIRECTORY_LINKS} />
        <FooterColumn title="The Ledger" links={LEDGER_LINKS} />
        <FooterColumn title="Company" links={COMPANY_LINKS} />
      </div>

      <div className="bottom">
        <span>© {new Date().getFullYear()} Regulome · based in Lisbon</span>
        <span style={{ display: "flex", gap: 16 }}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
