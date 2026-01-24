/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

 
const globalWindow = (globalThis as any).window || {};

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWADebug() {
  const [isOnline, setIsOnline] = useState(true);
  const [swStatus, setSwStatus] = useState<string>("Checking...");
  const [pwaInstallable, setPwaInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  // Keyboard shortcut to toggle debug panel (Ctrl+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        setShowPanel((prev) => !prev);
      }
    };

    if (typeof globalThis !== "undefined") {
      globalThis.addEventListener("keydown", handleKeyDown);
      return () => globalThis.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  useEffect(() => {
    // Online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    globalWindow.addEventListener("online", handleOnline);
    globalWindow.addEventListener("offline", handleOffline);

    // Check service worker
    const checkSW = async () => {
      if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
        try {
          const registrations =
            await navigator.serviceWorker.getRegistrations();
          if (registrations.length > 0) {
            registrations.forEach((registration) => {
              console.log("Service Worker registered:", registration.scope);
              setSwStatus(`Registered: ${registration.scope}`);
              registration.update(); // Force update check
            });
          } else {
            console.log("No service worker registered");
            setSwStatus("Not registered");
          }
        } catch (err) {
          console.error("SW registration check failed:", err);
          setSwStatus(`Error: ${(err as Error).message}`);
        }
      } else {
        setSwStatus("Not supported");
      }
    };

    checkSW();

    // PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPwaInstallable(true);
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      console.log("PWA install prompt available");
    };

    globalWindow.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener,
    );

    // Check if already installed
    if (globalWindow.matchMedia("(display-mode: standalone)").matches) {
      console.log("App is running in standalone mode");
    }

    return () => {
      globalWindow.removeEventListener("online", handleOnline);
      globalWindow.removeEventListener("offline", handleOffline);
      globalWindow.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt().then(() => {
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }
          setDeferredPrompt(null);
          setPwaInstallable(false);
        });
      });
    }
  };

  return (
    <>
      {showPanel && (
        <div className="fixed bottom-20 right-4 p-4 border rounded-lg bg-background shadow-lg z-50 max-w-sm">
          <h3 className="font-bold mb-3">PWA Debug Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Online:</span>
              <span className={isOnline ? "text-green-600" : "text-red-600"}>
                {isOnline ? "✓ Yes" : "✗ No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Service Worker:</span>
              <span className="text-xs font-mono">{swStatus}</span>
            </div>
            <div className="flex justify-between">
              <span>PWA Installable:</span>
              <span
                className={pwaInstallable ? "text-green-600" : "text-gray-500"}
              >
                {pwaInstallable ? "✓ Yes" : "○ No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Environment:</span>
              <span className="text-xs">
                {process.env.NODE_ENV || "production"}
              </span>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {pwaInstallable && (
              <Button onClick={handleInstall} size="sm">
                Install PWA
              </Button>
            )}
            <Button
              onClick={() => globalWindow.location.reload()}
              variant="outline"
              size="sm"
            >
              Refresh
            </Button>
          </div>

          <div className="text-xs text-muted-foreground mt-2">
            Press Ctrl+Shift+D to toggle
          </div>
        </div>
      )}
      <Button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-4 right-4 w-8 h-8 rounded-full shadow-md z-50 opacity-50 hover:opacity-100 transition-opacity"
        size="icon"
        title="PWA Debug (Ctrl+Shift+D)"
        aria-label="Toggle PWA Debug Panel"
      >
        🐛
      </Button>
    </>
  );
}
