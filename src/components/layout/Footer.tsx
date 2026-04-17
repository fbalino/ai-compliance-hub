import Link from "next/link";

const REG_LINKS = [
  { label: "All regulations", href: "/regulations", count: "14" },
  { label: "Glossary", href: "/glossary" },
  { label: "Compare laws", href: "/compare/us-state-ai-laws" },
  { label: "Blog", href: "/blog" },
];

const PROVIDER_LINKS = [
  { label: "Browse providers", href: "/directory", count: "38" },
  { label: "Legal firms", href: "/directory/categories/legal" },
  { label: "Bias auditors", href: "/directory/categories/bias-audit" },
  { label: "Governance", href: "/directory/categories/governance-consulting" },
];

const COMPANY_LINKS = [
  { label: "Compliance checker", href: "/checker" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "About", href: "/" },
  { label: "Contact", href: "/" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Editorial policy", href: "/" },
  { label: "Disclosures", href: "/" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string; count?: string }[] }) {
  return (
    <div className="rg-foot-col">
      <h5>{title}</h5>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href}>
              {l.label}
              {l.count && <em>{l.count}</em>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="rg-footer">
      <div className="rg-container">
        <div className="rg-foot-top">
          <div className="rg-foot-brand">
            <Link href="/" className="rg-brand">
              <span className="rg-brand-mark" aria-hidden="true" />
              <span className="rg-brand-name">
                regulome<span className="rg-brand-dot">.</span>
              </span>
            </Link>
            <p className="rg-foot-desc">
              The directory of AI regulations and the vetted experts who can help you comply.
            </p>
          </div>

          <Column title="Regulations" links={REG_LINKS} />
          <Column title="Providers" links={PROVIDER_LINKS} />
          <Column title="Company" links={COMPANY_LINKS} />
          <Column title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="rg-foot-bottom">
          <span>
            © {new Date().getFullYear()} Regulome, Inc. · Updated{" "}
            {new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="rg-disc">Informational only — not legal advice.</span>
        </div>
      </div>
    </footer>
  );
}
