"use client";

import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWindow = (globalThis as any).window || {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalNavigator = (globalThis as any).navigator || {};

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isStandalone] = useState(() => globalWindow.matchMedia ? globalWindow.matchMedia("(display-mode: standalone)").matches : false);
  const [isIOS] = useState(() => globalNavigator.userAgent ? /iPad|iPhone|iPod/.test(globalNavigator.userAgent) : false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    globalWindow.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => globalWindow.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  if (isStandalone) return null;

  if (isIOS) {
    return (
      <div className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <h3 className="font-semibold mb-2">Install this App</h3>
        <p className="text-sm mb-3">
          Tap the share icon → &ldquo;Add to Home Screen&rdquo;
        </p>
      </div>
    );
  }

  if (showInstall) {
    return (
      <button
        onClick={async () => {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User ${outcome} install`);
            setShowInstall(false);
          }
        }}
        className="fixed bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
      >
        📲 Install App
      </button>
    );
  }

  return null;
}
