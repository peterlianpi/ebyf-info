"use client";

import React, { useState, useEffect, useId } from "react";
import { Input } from "./input";
import { Button } from "./button";
import Search from "@/components/icons/Search";
import Remove from "@/components/icons/Remove";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onDebouncedChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  debounceMs?: number;
  className?: string;
  "aria-describedby"?: string;
  id?: string;
}

export default function SearchInput({
  value,
  onChange,
  onDebouncedChange,
  placeholder = "Search...",
  disabled = false,
  debounceMs = 500,
  className = "",
  "aria-describedby": ariaDescribedBy,
  id,
}: SearchInputProps) {
  const generatedId = useId();

  useEffect(() => {
    const timer = setTimeout(() => {
      onDebouncedChange?.(value);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [value, debounceMs, onDebouncedChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const clearSearch = () => {
    onChange("");
  };

  const inputId = id || `search-input-${generatedId}`;

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <div className="relative flex items-center px-4 py-3 bg-muted/50 rounded-xl border-0 focus-within:bg-background focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200">
        {!value && (
          <Search
            className="text-muted-foreground w-5 h-5 mr-3 flex-shrink-0"
            aria-hidden="true"
          />
        )}
        <Input
          id={inputId}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full border-none bg-transparent focus:ring-0 focus:outline-none placeholder:font-medium placeholder:text-muted-foreground/70 text-foreground"
          disabled={disabled}
          aria-describedby={ariaDescribedBy}
        />
        {value && !disabled && (
          <>
            <Button
              type="button"
              size="icon-lg"
              variant="ghost"
              onClick={clearSearch}
              className="h-4 w-4 p-0 hover:bg-muted-foreground/10 rounded-full ml-2 shrink-0"
              aria-label="Clear search"
            >
              <Remove className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
