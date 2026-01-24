# Configuration Files Documentation

This document describes the configuration files in the root of the project.

## package.json

**File Path:** `package.json`

**Description:** The package.json file defines the project metadata, dependencies, and scripts for the Node.js project. This is a Next.js application named "ebyf-info" version 1.0.0.

**Scripts:**
- `dev`: Runs the development server using Next.js (`next dev`).
- `build`: Builds the application for production (`next build`).
- `start`: Starts the production server (`next start`).
- `lint`: Lints the code using Next.js linting (`next lint`).

**Dependencies:**
- `@ducanh2912/next-pwa`: For Progressive Web App functionality.
- UI Libraries: `@emotion/react`, `@emotion/styled`, `@mui/material`, Radix UI components for various UI elements.
- Form handling: `@hookform/resolvers`, `react-hook-form`.
- Utilities: `bcrypt` for password hashing, `cloudinary` for image management, `crypto-js` for cryptography, `idb` for IndexedDB, `jspdf` for PDF generation, `html2canvas` for screenshot capture.
- React ecosystem: `next`, `react`, `react-dom`, `framer-motion` for animations, `react-hot-toast` for toasts.
- Styling: `tailwindcss`, `class-variance-authority`, `clsx`, `tailwind-merge`.
- Analytics: `@vercel/analytics`, `@vercel/speed-insights`.
- Other: `sonner` for notifications, `swiper` for carousels, `react-countup` for counters.

**DevDependencies:**
- `autoprefixer`, `postcss`, `tailwindcss` for CSS processing.
- `eslint` for linting.
- `webpack` for bundling.

**Trusted Dependencies:** Lists dependencies that are trusted for security purposes.

**Usage Example:**
To run the development server:
```bash
npm run dev
```

## next.config.mjs

**File Path:** `next.config.mjs`

**Description:** Next.js configuration file that sets up Progressive Web App (PWA) features and image optimization. It uses the `@ducanh2912/next-pwa` plugin to enable service worker, caching strategies, and offline fallbacks.

**Key Configurations:**
- PWA Initialization: Configures service worker with precaching for specific routes, runtime caching for HTML pages, external APIs, static resources, and images.
- Caching Strategies:
  - Root page: StaleWhileRevalidate.
  - HTML pages: StaleWhileRevalidate with 30 entries.
  - External APIs: NetworkFirst with 3-second timeout.
  - JS/CSS: StaleWhileRevalidate.
  - Images: CacheFirst with 30-day expiration.
- Fallbacks: Falls back to `/~offline` for documents.
- Images: Allows remote images from Google User Content and IPFS Filebase.

**Dependencies:** Requires `@ducanh2912/next-pwa` package.

**Usage Example:**
This configuration is automatically applied when Next.js builds or runs the app. No direct usage required.

## tailwind.config.js

**File Path:** `tailwind.config.js`

**Description:** Tailwind CSS configuration file that defines the theme, content paths, and plugins for the styling system.

**Key Configurations:**
- Dark Mode: Enabled via class (`darkMode: ["class"]`).
- Content Paths: Scans files in `./pages/`, `./components/`, `./app/`, `./src/` for Tailwind classes.
- Theme Extensions: Adds custom colors using CSS variables, border radius, keyframes for accordion animations.
- Plugins: Includes `tailwindcss-animate` for additional animations.

**Dependencies:** Requires `tailwindcss` and `tailwindcss-animate` packages.

**Usage Example:**
Custom colors are defined using HSL variables, for example:
```css
--primary: 220 70% 50%;
```
Used in components with `bg-primary` classes.

## postcss.config.js

**File Path:** `postcss.config.js`

**Description:** PostCSS configuration file that processes CSS with Tailwind CSS and Autoprefixer.

**Plugins:**
- `tailwindcss`: Processes Tailwind directives.
- `autoprefixer`: Adds vendor prefixes to CSS rules.

**Dependencies:** Requires `postcss`, `tailwindcss`, `autoprefixer`.

**Usage Example:**
Automatically processes CSS files during build. No direct usage.

## jsconfig.json

**File Path:** `jsconfig.json`

**Description:** JavaScript configuration file that sets path aliases for module resolution.

**Compiler Options:**
- Paths: Maps `@/*` to `./src/*` for easier imports.

**Usage Example:**
Import components like:
```js
import { Button } from '@/components/ui/button';
```

## components.json

**File Path:** `components.json`

**Description:** Configuration file for shadcn/ui components, defining style preferences and aliases.

**Configurations:**
- Style: Default style.
- RSC: React Server Components enabled.
- TSX: TypeScript disabled (using JS).
- Tailwind: Points to `tailwind.config.js`, `src/app/globals.css`, base color slate, CSS variables enabled.
- Aliases: `@/components` for components, `@/utils` for utils.

**Dependencies:** Part of shadcn/ui setup.

**Usage Example:**
Used by shadcn/ui CLI to add components:
```bash
npx shadcn-ui add button
```

## .eslintrc.json

**File Path:** `.eslintrc.json`

**Description:** ESLint configuration file that extends Next.js core web vitals rules.

**Extensions:** `next/core-web-vitals` preset.

**Usage Example:**
Runs automatically with `npm run lint` or during development.

## README.md

**File Path:** `README.md`

**Description:** Project README file providing basic setup and usage instructions.

**Content:**
- Project description as Next.js app.
- Getting started instructions with various package managers.
- Links to Next.js documentation and deployment guide.

**Usage Example:**
Displayed on GitHub repository page or read by developers.