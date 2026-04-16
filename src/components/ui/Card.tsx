import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover = false, className = "", style, children, ...props }: CardProps) {
  return (
    <div
      className={[
        "rounded-xl p-6",
        hover ? "transition-all" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        boxShadow: hover ? undefined : "none",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["mb-4", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={[
        "text-lg font-semibold leading-snug",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ color: "var(--text-primary)" }}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className = "", children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={["mt-1 text-sm", className]
        .filter(Boolean)
        .join(" ")}
      style={{ color: "var(--text-muted)" }}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardFooter({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        "mt-4 flex items-center gap-3 pt-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ borderTop: "1px solid var(--border-subtle)" }}
      {...props}
    >
      {children}
    </div>
  );
}
