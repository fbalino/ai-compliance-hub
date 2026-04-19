import createMDX from "@next/mdx";
import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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
