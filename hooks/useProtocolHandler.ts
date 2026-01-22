import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export function useProtocolHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const url = searchParams.get("url");
    if (url && url.startsWith("web+ebyf:")) {
      const protocolUrl = url;
      const [, action] = protocolUrl.split(":");

      if (action === "contacts") {
        // Navigate to contacts page
        if (window.location.pathname !== "/contacts") {
          router.push("/contacts");
        }
      } else if (action === "makaite") {
        // Navigate to makaite page
        if (window.location.pathname !== "/makaite") {
          router.push("/makaite");
        }
      } else if (action === "" || action === undefined) {
        // No action, stay on root or current page
        // Optionally navigate to home
        if (window.location.pathname !== "/") {
          router.push("/");
        }
      } else {
        // Unknown action, navigate to root
        router.push("/");
      }

      // Remove the url param to prevent re-triggering
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("url");
      router.replace(newUrl.pathname + newUrl.search);
    }
  }, [searchParams, router]);
}