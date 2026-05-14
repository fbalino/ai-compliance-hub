import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Free AI Compliance Tools & Checklists | Regulome.io",
  description:
    "Free downloadable checklists and tools for AI compliance. ISO 42001, Colorado AI Act, EU AI Act, and bias audit templates.",
  alternates: { canonical: `${SITE_URL}/tools` },
};

const TOOLS = [
  {
    slug: "colorado-ai-act-checklist",
    title: "Colorado AI Act Compliance Checklist",
    description:
      "43-item printable checklist covering all deployer and developer obligations under Colorado SB 24-205. Deadline: June 30, 2026.",
    tags: ["Colorado AI Act", "June 2026", "Free Download"],
    updated: "May 2026",
  },
  {
    slug: "iso-42001-checklist",
    title: "ISO 42001 Certification Checklist",
    description:
      "48 requirements across 7 phases. Print-ready checklist for AI management system certification audit preparation.",
    tags: ["ISO 42001", "Certification", "Free Download"],
    updated: "May 2026",
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Free AI Compliance Tools</h1>
        <p className="text-gray-600 text-lg">
          Printable checklists and reference tools for AI compliance teams. No signup required.
        </p>
      </div>

      <div className="grid gap-4">
        {TOOLS.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-gray-900 mb-1">{tool.title}</h2>
                <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-400 whitespace-nowrap">Updated {tool.updated}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
