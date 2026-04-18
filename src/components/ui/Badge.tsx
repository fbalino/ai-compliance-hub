import { type HTMLAttributes } from "react";

type BadgeVariant =
  | "default"
  | "active"
  | "pending"
  | "proposed"
  | "repealed";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`chip ${className}`.trim()}
      style={{ fontSize: 11, padding: "2px 8px" }}
      {...props}
    >
      <span className={`dot dot-${variant}`} />
      {children}
    </span>
  );
}

export function regulationStatusVariant(
  status: string
): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    active: "active",
    enforced: "active",
    enacted: "pending",
    pending: "pending",
    draft: "proposed",
    proposed: "proposed",
    rescinded: "repealed",
    repealed: "repealed",
  };
  return map[status.toLowerCase()] ?? "default";
}
