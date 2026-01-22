'use client';

import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWindow = (globalThis as any).window || {};

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWADebug() {
  const [isOnline, setIsOnline] = useState(true);
  const [swStatus, setSwStatus] = useState<string>('Checking...');
  const [pwaInstallable, setPwaInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    // Online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    globalWindow.addEventListener('online', handleOnline);
    globalWindow.addEventListener('offline', handleOffline);

    // Check service worker
    const checkSW = async () => {
      if (typeof navigator !== "undefined" && 'serviceWorker' in navigator) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          if (registrations.length > 0) {
            registrations.forEach(registration => {
              console.log('Service Worker registered:', registration.scope);
              setSwStatus(`Registered: ${registration.scope}`);
              registration.update(); // Force update check
            });
          } else {
            console.log('No service worker registered');
            setSwStatus('Not registered');
          }
        } catch (err) {
          console.error('SW registration check failed:', err);
          setSwStatus(`Error: ${(err as Error).message}`);
        }
      } else {
        setSwStatus('Not supported');
      }
    };

    checkSW();

    // PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPwaInstallable(true);
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      console.log('PWA install prompt available');
    };

    globalWindow.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    // Check if already installed
    if (globalWindow.matchMedia('(display-mode: standalone)').matches) {
      console.log('App is running in standalone mode');
    }

    return () => {
      globalWindow.removeEventListener('online', handleOnline);
      globalWindow.removeEventListener('offline', handleOffline);
      globalWindow.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt().then(() => {
        deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
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
        <div className="fixed bottom-20 right-4 p-4 border rounded bg-gray-50 dark:bg-gray-800 shadow-lg z-50">
          <h3 className="font-bold">PWA Debug Info</h3>
          <p>Online: {isOnline ? 'Yes' : 'No'}</p>
          <p>Service Worker: {swStatus}</p>
          <p>PWA Installable: {pwaInstallable ? 'Yes' : 'No'}</p>
          {pwaInstallable && (
            <button onClick={handleInstall} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Install PWA
            </button>
          )}
          <button
            onClick={() => globalWindow.location.reload()}
            className="mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Refresh
          </button>
          
        </div>
      )}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center"
        aria-label="Toggle PWA Debug"
      >
        🐛
      </button>
    </>
  );
}