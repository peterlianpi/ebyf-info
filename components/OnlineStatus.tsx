"use client";
import { useState, useEffect } from "react";

export default function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

  useEffect(() => {
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

  if (isOnline) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "#f59e0b",
        color: "#000",
        padding: "8px",
        textAlign: "center",
      }}
    >
      You&apos;re offline - Changes will sync when you reconnect
    </div>
  );
}
