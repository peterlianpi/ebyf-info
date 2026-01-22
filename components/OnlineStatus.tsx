"use client";
import { useState, useEffect } from "react";

declare const window: Window & typeof globalThis;

export default function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(() => typeof navigator !== "undefined" ? navigator.onLine : true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    console.log("OnlineStatus: Initial navigator.onLine:", navigator.onLine);
    const handleOnline = () => {
      console.log("OnlineStatus: Online event");
      setIsOnline(true);
    };
    const handleOffline = () => {
      console.log("OnlineStatus: Offline event");
      setIsOnline(false);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return null;
}
