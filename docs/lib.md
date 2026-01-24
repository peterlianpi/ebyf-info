# Library Documentation

This document describes the utilities in the `src/lib/` directory.

## Utils (`src/lib/utils.js`)

**Description:** Utility function for combining CSS classes with Tailwind CSS.

**Function:**
- `cn(...inputs)`: Merges class names using `clsx` and `twMerge`.

**Dependencies:** `clsx`, `tailwind-merge`.

**Usage Example:**
```js
import { cn } from "@/lib/utils";

const className = cn("bg-red-500", condition && "text-white");
// Result: "bg-red-500 text-white" if condition is true