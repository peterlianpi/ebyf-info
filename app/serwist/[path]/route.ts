import { spawnSync } from "node:child_process";
import { createSerwistRoute } from "@serwist/turbopack";

// Using `git rev-parse HEAD` might not the most efficient
// way of determining a revision. You may prefer to use
// the hashes of every extra file you precache.
const revision = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout ?? crypto.randomUUID();

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } = createSerwistRoute({
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
  swSrc: "app/sw.ts",
  
  // Copy relevant Next.js configuration (assetPrefix,
  // basePath, distDir) over if you've changed them.
  nextConfig: {},
});



 
 