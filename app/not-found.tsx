import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-gray-100">
        404
      </h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
        Page Not Found
      </h2>
      <p className="max-w-md mb-8 text-gray-600 dark:text-gray-400">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}