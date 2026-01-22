"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isStandalone] = useState(() => typeof window !== 'undefined' ? window.matchMedia("(display-mode: standalone)").matches : false);
  const [isIOS] = useState(() => typeof window !== 'undefined' ? /iPad|iPhone|iPod/.test(navigator.userAgent) : false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
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
