import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWindow = (globalThis as any).window || {};

export function useProtocolHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  useEffect(() => {
    // Only run on client side and when mounted
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (globalThis as any).window === 'undefined' || !mountedRef.current) return;
    const url = searchParams.get("url");
    if (url && url.startsWith("web+ebyf:")) {
      const protocolUrl = url;
      const [, action] = protocolUrl.split(":");

      if (action === "contacts") {
        // Navigate to contacts page
        if (globalWindow.location.pathname !== "/contacts") {
          router.push("/contacts");
        }
      } else if (action === "makaite") {
        // Navigate to makaite page
        if (globalWindow.location.pathname !== "/makaite") {
          router.push("/makaite");
        }
      } else if (action === "" || action === undefined) {
        // No action, stay on root or current page
        // Optionally navigate to home
        if (globalWindow.location.pathname !== "/") {
          router.push("/");
        }
      } else {
        // Unknown action, navigate to root
        router.push("/");
      }

      // Remove the url param to prevent re-triggering
      const newUrl = new URL(globalWindow.location.href);
      newUrl.searchParams.delete("url");
      router.replace(newUrl.pathname + newUrl.search);
    }
  }, [searchParams, router]);
}