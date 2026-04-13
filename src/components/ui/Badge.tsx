import { type HTMLAttributes } from "react";

type BadgeVariant =
  | "default"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "enforced"
  | "enacted"
  | "draft"
  | "rescinded";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-neutral-700",
  brand: "bg-brand-100 text-brand-800",
  success: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  danger: "bg-danger-light text-danger",
  enforced: "bg-status-enforced-bg text-status-enforced-text",
  enacted: "bg-status-enacted-bg text-status-enacted-text",
  draft: "bg-status-draft-bg text-status-draft-text",
  rescinded: "bg-status-rescinded-bg text-status-rescinded-text",
};

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}

/** Maps regulation status strings to badge variants */
export function regulationStatusVariant(
  status: string
): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    enforced: "enforced",
    enacted: "enacted",
    draft: "draft",
    rescinded: "rescinded",
  };
  return map[status.toLowerCase()] ?? "default";
}
