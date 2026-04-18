import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "tint" | "feature" | "raised";
  hover?: boolean;
}

export function Card({ variant = "default", hover = false, className = "", children, ...props }: CardProps) {
  const variantClass = variant === "tint" ? "card-tint" : variant === "feature" ? "card-feature" : variant === "raised" ? "card-raised" : "";
  return (
    <div className={`card ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div style={{ marginBottom: 14 }} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className="h4" {...props}>{children}</h3>;
}

export function CardDescription({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className="small" {...props}>{children}</p>;
}

export function CardFooter({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        marginTop: 14,
        paddingTop: 14,
        borderTop: "1px solid var(--line)",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
