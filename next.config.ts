import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@design-finity/design-system'],
  devIndicators: false,
};

export default nextConfig;
