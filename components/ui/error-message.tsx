"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  id?: string;
  className?: string;
}

export default function ErrorMessage({ message, id, className = "" }: ErrorMessageProps) {
  return (
    <div
      className={`flex items-center gap-2 text-destructive text-sm mt-1 ${className}`}
      role="alert"
      id={id}
    >
      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}