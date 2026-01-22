"use client";

import Hero from "@/components/layout/Hero";
import { useProtocolHandler } from "@/hooks/useProtocolHandler";

export default function Home() {
  useProtocolHandler();

  return (
    <>
      <Hero />
    </>
  );
}
