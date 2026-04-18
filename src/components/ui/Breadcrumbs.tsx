import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={className}
      style={{
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--ink-soft)",
        marginBottom: 8,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            {index > 0 && (
              <span style={{ color: "var(--ink-faint)", fontSize: 11 }} aria-hidden="true">
                ·
              </span>
            )}
            {isLast || !item.href ? (
              <span aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            ) : (
              <Link href={item.href} style={{ color: "var(--ink-soft)", textDecoration: "none" }}>
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
