"use client";

import React from "react";
import { BounceLoader } from "react-spinners";

interface LoadingStateProps {
  variant?: "spinner" | "skeleton";
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export default function LoadingState({
  variant = "spinner",
  size = "md",
  className = "",
  text,
}: LoadingStateProps) {
  const getSize = () => {
    switch (size) {
      case "sm":
        return 20;
      case "lg":
        return 40;
      default:
        return 30;
    }
  };

  if (variant === "skeleton") {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center py-4 ${className}`} aria-live="polite">
      <BounceLoader color="hsl(var(--primary))" size={getSize()} />
      {text && <span className="sr-only">{text}</span>}
      <span className="sr-only">Loading...</span>
    </div>
  );
}