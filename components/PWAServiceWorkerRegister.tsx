"use client";

import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWindow = (globalThis as any).window || {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalNavigator = (globalThis as any).navigator || {};

export default function PWAServiceWorkerRegister() {
  useEffect(() => {
    if (globalNavigator.serviceWorker) {
      globalNavigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((reg: any) => console.log("SW registered:", reg))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => console.error("SW registration failed:", err));

      if (process.env.NODE_ENV !== "development") {
        globalNavigator.serviceWorker.addEventListener("controllerchange", () => {
          if (globalWindow.confirm("New version available! Reload?")) {
            globalWindow.location.reload();
          }
        });
      }
    }
  }, []);

  return null;
}

