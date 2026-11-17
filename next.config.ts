import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: false,
  },
};

export default withMDX(nextConfig);
