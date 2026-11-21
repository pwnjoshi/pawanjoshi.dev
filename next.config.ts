import type { NextConfig } from "next";
import path from "node:path";
import createMDX from "@next/mdx";

const withMDX = createMDX({});

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  // Pin the root so a stray lockfile in a parent folder is never picked up.
  turbopack: { root: path.resolve(".") },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "media2.dev.to" },
      { protocol: "https", hostname: "dev-to-uploads.s3.amazonaws.com" },
      { protocol: "https", hostname: "dev-to-uploads.s3.us-east-2.amazonaws.com" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/Pawan_Joshi_Resume.pdf",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default withMDX(nextConfig);
