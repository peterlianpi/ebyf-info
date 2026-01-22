"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtocolHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const url = searchParams.get("url");
    if (url && url.startsWith("web+ebyf:")) {
      const protocolUrl = url;
      const [, action] = protocolUrl.split(":");

      if (action.startsWith("member-")) {
        const memberId = action.replace("member-", "");
        // Navigate to contacts page
        router.push("/contacts");
      }

      // Remove the url param to prevent re-triggering
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("url");
      router.replace(newUrl.pathname + newUrl.search);
    }
  }, [searchParams, router]);

  return null; // This component doesn't render anything
}