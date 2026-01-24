import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";
import { spawnSync } from "node:child_process";

const revision = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout ?? crypto.randomUUID();

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: false, // Disabled for UI refactor
  additionalPrecacheEntries:
    [
      { url: "/", revision },
      { url: "/favicon.ico", revision },
      { url: "/contacts", revision },
      { url: "/policy", revision },
      { url: "/makaite", revision },
      { url: "/talen", revision },
      { url: "/vengukte", revision },
      { url: "/~offline", revision },
      { url: "/icons/icon-192x192.png", revision },
      { url: "/icons/icon-384x384.png", revision },
      { url: "/icons/icon-512x512.png", revision },
    ],

});

const nextConfig: NextConfig = {
  turbopack: {},
  reactStrictMode: true,
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

export default withSerwist(nextConfig);
