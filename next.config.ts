import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/digitechlearn",
  assetPrefix: "/digitechlearn/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

