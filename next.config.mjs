/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

// Initialize the PWA configuration
const withPWA = withPWAInit({
  sw: "service-worker.js",
  cacheStartUrl: true,
  dynamicStartUrl: true,
  dynamicStartUrlRedirect: true,
  extendDefaultRuntimeCaching: true,
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  workboxOptions: {
    disableDevLogs: true,
    additionalManifestEntries: [
      { url: "/", revision: null },
    { url: "/favicon.ico", revision: null },
    { url: "/contacts", revision: null },
    { url: "/policy", revision: null },
    { url: "/makaite", revision: null },
    { url: "/talent", revision: null },
    { url: "/vengukte", revision: null },
    { url: "/~offline", revision: null },
    // Precache icons from public folder
    { url: "/manifest.json", revision: null },
    { url: "/icons/icon-192x192.png", revision: null },
    { url: "/icons/icon-384x384.png", revision: null },
    { url: "/icons/icon-512x512.png", revision: null },
    ],
  },
  fallbacks: {
    // Configure fallbacks for different file types
    document: "/~offline", // Fallback for failed page requests
    // data: "/fallback.json", // Fallback for JSON files
    // image: "/fallback.webp", // Fallback for images
    // audio: "/fallback.mp3", // Fallback for audio files
    // video: "/fallback.mp4", // Fallback for video files
    // font: "/fallback-font.woff2", // Fallback for fonts
  },
});

// Configure Next.js options
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com", // Allow Google-hosted images
      },
      {
        protocol: "https",
        hostname: "ipfs.filebase.io", // Allow Filebase IPFS images
      },
    ],
  },
};

export default withPWA({
  ...nextConfig, // Spread the Next.js config
});
