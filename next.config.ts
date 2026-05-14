import createMDX from "@next/mdx";
import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  serverExternalPackages: ["@anthropic-ai/sdk"],
  async redirects() {
    return [
      {
        source: "/regulations/texas-hb-1709",
        destination: "/regulations/texas-traiga",
        permanent: true,
      },
      {
        source: "/regulations/texas-algorithmic-accountability-act",
        destination: "/regulations/texas-traiga",
        permanent: true,
      },
      {
        source: "/regulations/virginia-human-civil-rights-act",
        destination: "/regulations/virginia-hb-2094",
        permanent: true,
      },
      {
        source: "/regulations/nyc-ll-144",
        destination: "/regulations/nyc-local-law-144",
        permanent: true,
      },
      {
        source: "/regulations/california-ai-laws",
        destination: "/regulations/california-ab-2013",
        permanent: true,
      },
      {
        source: "/regulations/nis2",
        destination: "/regulations/nis2-directive",
        permanent: true,
      },
      {
        source: "/directory",
        destination: "/providers",
        permanent: true,
      },
      {
        source: "/directory/categories",
        destination: "/providers/categories",
        permanent: true,
      },
      {
        source: "/directory/categories/:slug",
        destination: "/providers/categories/:slug",
        permanent: true,
      },
      {
        source: "/directory/providers/:slug",
        destination: "/providers/:slug",
        permanent: true,
      },
      {
        source: "/directory/providers/:slug/request-quote",
        destination: "/providers/:slug#contact",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/resources/ai-compliance-checklist",
        destination: "/resources/ai-compliance-checklist.html",
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      content: path.resolve(process.cwd(), "content"),
    };
    return config;
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
