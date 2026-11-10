import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: { '/api/fan/og': ['./public/fan/og-*.png', './public/fan/korean.woff'] },
};

export default nextConfig;
