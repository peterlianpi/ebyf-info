'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWADebug() {
  const [isOnline, setIsOnline] = useState(true);
  const [swStatus, setSwStatus] = useState<string>('Checking...');
  const [pwaInstallable, setPwaInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check service worker
    const checkSW = async () => {
      if ('serviceWorker' in navigator) {
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

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App is running in standalone mode');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
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
    <div className="p-4 border rounded bg-gray-50 dark:bg-gray-800">
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
        onClick={() => window.location.reload()}
        className="mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        Refresh
      </button>
    </div>
  );
}