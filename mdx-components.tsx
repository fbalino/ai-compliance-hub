import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Map standard HTML elements to styled versions
    h1: ({ children }) => (
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-3 scroll-mt-24" id={slugify(String(children))}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-neutral-800 mt-8 mb-2 scroll-mt-24" id={slugify(String(children))}>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-neutral-700 leading-relaxed mb-5">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-1.5 text-neutral-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-neutral-700">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    a: ({ href, children }) => (
      <Link
        href={href ?? "#"}
        className="text-brand-700 underline underline-offset-2 hover:text-brand-900 transition-colors"
      >
        {children}
      </Link>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-300 pl-4 italic text-neutral-600 my-6">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-neutral-100 rounded px-1.5 py-0.5 font-mono text-sm text-neutral-800">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-neutral-900 text-neutral-100 rounded-lg p-4 overflow-x-auto text-sm my-6 font-mono">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 text-left font-semibold text-neutral-700">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-neutral-200 px-3.5 py-2.5 text-neutral-700 align-top">
        {children}
      </td>
    ),
    hr: () => <hr className="border-neutral-200 my-8" />,
    ...components,
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
