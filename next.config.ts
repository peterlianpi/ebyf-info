// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

import withPWAInit from "@ducanh2912/next-pwa";

// Initialize the PWA configuration
const withPWA = withPWAInit({
  sw: "service-worker.js",
  cacheStartUrl: true,
  dynamicStartUrl: true,
  dynamicStartUrlRedirect: "/",
  extendDefaultRuntimeCaching: true,
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
    // Precache on install
    additionalManifestEntries: [
      { url: "/", revision: null },
      { url: "/favicon.ico", revision: null },
      { url: "/contacts", revision: null },
      { url: "/policy", revision: null },
      { url: "/makaite", revision: null },
      { url: "/talen", revision: null },
      { url: "/vengukte", revision: null },
      { url: "/~offline", revision: null },
      { url: "/icons/icon-192x192.png", revision: null },
      { url: "/icons/icon-384x384.png", revision: null },
      { url: "/icons/icon-512x512.png", revision: null },
    ],

    // Runtime caching for navigation and assets
    runtimeCaching: [
      {
        urlPattern: /^\/$/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "page-root",
          expiration: { maxEntries: 1 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        urlPattern: ({ request }: { request: Request }) => request.destination === "document",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "html-pages",
          expiration: { maxEntries: 30 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },

      {
        urlPattern: /^https?:\/\/(.*)\/api\/.*$/, // Matches any external API with /api/
        handler: "NetworkFirst",
        options: {
          cacheName: "external-api-cache",
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },

      {
        urlPattern: /\.(?:js|css)$/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-resources",
          expiration: { maxEntries: 40 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
        handler: "CacheFirst",
        options: {
          cacheName: "image-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
    ],
  },

  fallbacks: {
    document: "/~offline",
    // You can also add:
    // image: "/fallback.webp",
    // data: "/fallback.json",
  },
});

// Next.js configuration
const nextConfig: NextConfig = {
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
  turbopack: {},
};

export default withPWA({
  ...nextConfig,
});

