import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { breadcrumbListSchema, jsonLdScriptProps } from "@/lib/jsonld";
import { getAllRegulations } from "@/lib/regulations";

export const revalidate = 86400;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicompliancehub.com";

export const metadata: Metadata = {
  title: "AI Regulations by Jurisdiction — Browse by Region",
  description:
    "Browse AI compliance regulations grouped by jurisdiction: European Union directives, US state AI laws, and more. Find the rules that apply where you operate.",
  alternates: {
    canonical: `${SITE_URL}/jurisdictions`,
  },
};

interface JurisdictionGroup {
  region: string;
  flag: string;
  description: string;
  jurisdictions: {
    name: string;
    regulations: {
      slug: string;
      name: string;
      shortName?: string;
      status: string;
      effectiveDate?: string;
    }[];
  }[];
}

function statusLabel(status: string): string {
  switch (status) {
    case "enforced":
      return "active";
    case "enacted":
      return "pending";
    case "draft":
      return "proposed";
    default:
      return status;
  }
}

export default async function JurisdictionsPage() {
  const allRegs = await getAllRegulations();

  type RegEntry = { slug: string; name: string; shortName?: string; status: string; effectiveDate?: string };
  function toEntry(r: (typeof allRegs)[number]): RegEntry {
    return {
      slug: r.slug,
      name: r.frontmatter.name,
      shortName: r.frontmatter.shortName,
      status: r.frontmatter.status,
      effectiveDate: r.frontmatter.effectiveDate,
    };
  }

  const euRegs = allRegs.filter(
    (r) => r.frontmatter.jurisdiction === "European Union"
  );
  const usRegs = allRegs.filter((r) =>
    r.frontmatter.jurisdiction.startsWith("US")
  );
  const intlRegs = allRegs.filter(
    (r) => r.frontmatter.jurisdiction === "International"
  );

  const usSubgroups = new Map<string, RegEntry[]>();
  for (const r of usRegs) {
    const sub = r.frontmatter.jurisdiction.replace("US · ", "");
    if (!usSubgroups.has(sub)) usSubgroups.set(sub, []);
    usSubgroups.get(sub)!.push(toEntry(r));
  }

  const groups: JurisdictionGroup[] = [
    {
      region: "European Union",
      flag: "\u{1F1EA}\u{1F1FA}",
      description:
        "EU-wide regulations and directives governing AI systems, digital resilience, and cybersecurity.",
      jurisdictions: [
        { name: "European Union", regulations: euRegs.map(toEntry) },
      ],
    },
    {
      region: "United States",
      flag: "\u{1F1FA}\u{1F1F8}",
      description:
        "Federal frameworks and state-level AI laws covering hiring, consumer protection, transparency, and algorithmic accountability.",
      jurisdictions: Array.from(usSubgroups.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([sub, regs]) => ({ name: sub, regulations: regs })),
    },
  ];

  if (intlRegs.length > 0) {
    groups.push({
      region: "International",
      flag: "\u{1F30D}",
      description:
        "International standards and voluntary frameworks for AI governance and risk management.",
      jurisdictions: [
        { name: "International", regulations: intlRegs.map(toEntry) },
      ],
    });
  }

  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Jurisdictions", url: "/jurisdictions" },
  ]);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <div className="page-banner">
        <div className="container" style={{ padding: 0 }}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Jurisdictions" },
            ]}
          />
          <h1 className="h1">Regulations by jurisdiction</h1>
          <p
            className="lede"
            style={{ maxWidth: 640, marginTop: 8 }}
          >
            Browse AI compliance laws grouped by region — find the
            rules that apply where you operate.
          </p>
        </div>
      </div>

      <section
        className="container"
        style={{ paddingTop: 40, paddingBottom: 56 }}
      >
        <div className="col" style={{ gap: 48 }}>
          {groups.map((group) => (
            <div key={group.region}>
              <div className="section-head">
                <div>
                  <h2 className="h2">
                    {group.flag} {group.region}
                  </h2>
                  <p
                    className="small"
                    style={{ marginTop: 4 }}
                  >
                    {group.description}
                  </p>
                </div>
                <span className="mono xs">
                  {group.jurisdictions.reduce(
                    (sum, j) => sum + j.regulations.length,
                    0
                  )}{" "}
                  regulations
                </span>
              </div>

              <div
                className="grid"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: 16,
                }}
              >
                {group.jurisdictions.map((jur) => (
                  <div
                    key={jur.name}
                    className="card"
                    style={{ padding: 24 }}
                  >
                    <div
                      className="between"
                      style={{ marginBottom: 16 }}
                    >
                      <h3
                        className="h4"
                        style={{ fontSize: 18 }}
                      >
                        {jur.name}
                      </h3>
                      <span className="chip">
                        {jur.regulations.length}{" "}
                        {jur.regulations.length === 1
                          ? "law"
                          : "laws"}
                      </span>
                    </div>
                    <div
                      className="col"
                      style={{ gap: 0 }}
                    >
                      {jur.regulations.map((reg, idx) => (
                        <Link
                          key={reg.slug}
                          href={`/regulations/${reg.slug}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12,
                            padding: "12px 0",
                            borderTop:
                              idx > 0
                                ? "1px solid var(--line)"
                                : "none",
                            textDecoration: "none",
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div
                              className="h5"
                              style={{
                                color: "var(--ink)",
                              }}
                            >
                              {reg.name}
                            </div>
                            {reg.effectiveDate && (
                              <div
                                className="mono xs"
                                style={{ marginTop: 2 }}
                              >
                                {reg.effectiveDate}
                              </div>
                            )}
                          </div>
                          <span
                            className="chip"
                            style={{
                              fontSize: 11,
                              padding: "2px 8px",
                            }}
                          >
                            <span
                              className={`dot dot-${statusLabel(reg.status)}`}
                            />
                            {statusLabel(reg.status)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="card card-tint"
          style={{
            marginTop: 48,
            padding: "var(--s-7)",
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="h3">
              Looking for a specific regulation?
            </div>
            <p className="small" style={{ marginTop: 4 }}>
              Search our complete catalog of{" "}
              {allRegs.length} AI regulations with
              filters, sorting, and comparison tools.
            </p>
          </div>
          <div className="flex" style={{ gap: 8 }}>
            <Link
              href="/regulations"
              className="btn btn-primary"
            >
              Browse full catalog
            </Link>
            <Link
              href="/checker"
              className="btn btn-ghost"
            >
              Free compliance check
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
