import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["esbuild-wasm"],
  // Compress responses
  compress: true,
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ipfs.filebase.io",
      },
    ],
    // Optimize image formats
    formats: ["image/webp", "image/avif"],
  },
  // Enable experimental features for bundle optimization
  experimental: {
    // Optimize CSS
    optimizeCss: true,
  },
};

export default nextConfig;
