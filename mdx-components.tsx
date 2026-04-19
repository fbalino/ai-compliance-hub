import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Map standard HTML elements to styled versions
    h1: ({ children }) => (
      <h1 className="text-3xl font-extrabold tracking-tight text-ink mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-ink mt-10 mb-3 scroll-mt-24" id={slugify(String(children))}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-ink mt-8 mb-2 scroll-mt-24" id={slugify(String(children))}>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-ink-2 leading-relaxed mb-5">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-1.5 text-ink-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-ink-2">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    a: ({ href, children }) => (
      <Link
        href={href ?? "#"}
        className="text-accent underline underline-offset-2 hover:text-accent-ink transition-colors"
      >
        {children}
      </Link>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent-soft pl-4 italic text-ink-soft my-6">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-paper-2 rounded px-1.5 py-0.5 font-mono text-sm text-ink">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-paper-3 text-ink rounded-lg p-4 overflow-x-auto text-sm my-6 font-mono">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-paper-2 border border-line px-3.5 py-2.5 text-left font-semibold text-ink">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-line px-3.5 py-2.5 text-ink-2 align-top">
        {children}
      </td>
    ),
    hr: () => <hr className="border-line my-8" />,
    ...components,
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
