import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  serverExternalPackages: ["esbuild-wasm"],
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
  },
};

export default nextConfig
