# EBYF Info

A modern, TypeScript-powered Progressive Web App (PWA) for church youth contact management and community engagement. Built with Next.js 15, featuring offline-first architecture, encrypted local storage, and comprehensive type safety.

## 🌟 Features

- **Contact Management**: Easy access to church youth member contacts with role-based filtering
- **Offline-First**: Full PWA functionality with IndexedDB storage and service worker caching
- **Type Safety**: Complete TypeScript implementation with shared type definitions
- **Encrypted Storage**: AES-256 encrypted local data storage for security
- **Responsive Design**: Mobile-first UI built with Tailwind CSS and shadcn/ui
- **Service Program Tools**: Generate and export church service program forms
- **Talent Management**: Specialized search and management for youth talents
- **Feedback System**: Anonymous and authenticated feedback collection
- **Dark/Light Theme**: Built-in theme switching with next-themes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ebyf-info

# Install dependencies
bun install
# or
npm install
```

### Development

```bash
# Start development server
bun dev
# or
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build the application
bun run build
# or
npm run build

# Start production server
bun start
# or
npm start
```

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.9** - Type-safe JavaScript

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library

### Data & Storage
- **IndexedDB** - Client-side database
- **CryptoJS** - AES encryption
- **next-pwa** - PWA functionality

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **PostCSS** - CSS processing

## 📁 Project Structure

```
ebyf-info/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   └── [routes]/          # Route-specific pages
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   └── layout/           # Layout components
│   ├── features/             # Feature-specific components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries
│   ├── providers/            # Context providers
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Helper functions
├── public/                   # Static assets
├── docs/                     # Documentation
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS config
├── css.d.ts                 # CSS module type declarations
└── package.json
```

## 🔧 TypeScript Migration

This project has been fully migrated to TypeScript for improved type safety and developer experience.

### Key Changes

1. **File Extensions**: All JavaScript files converted to TypeScript (`.js` → `.ts`, `.jsx` → `.tsx`)

2. **Type Definitions**: Comprehensive type system in `src/types/index.ts`
   ```typescript
   export interface User {
     id: string;
     name?: string;
     roles?: Role[];
     phone?: string;
     email?: string;
   }
   ```

3. **Component Typing**: All components properly typed
   ```typescript
   interface UserItemProps {
     user: User;
   }

   export default function UserItem({ user }: UserItemProps) {
     // Component logic
   }
   ```

4. **Utility Functions**: Type-safe utility functions
   ```typescript
   // src/lib/utils.ts
   export function cn(...inputs: ClassValue[]): string {
     return twMerge(clsxOriginal(inputs));
   }
   ```

5. **Configuration Files**: TypeScript-enabled configs
   ```typescript
   // next.config.ts
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     // Configuration with full type safety
   };
   ```

6. **CSS Declarations**: Type declarations for CSS imports
   ```typescript
   // css.d.ts
   declare module "*.css" {
     const content: string;
     export default content;
   }
   ```

### Benefits of TypeScript

- **Compile-time Error Checking**: Catch errors before runtime
- **Enhanced IDE Support**: Better autocomplete and refactoring
- **Self-Documenting Code**: Types serve as documentation
- **Improved Maintainability**: Easier to understand and modify code
- **Safer Refactoring**: Confidence when making changes

## 📖 Documentation

Comprehensive documentation is available in the `docs/` directory:

- [Configuration](docs/configuration.md) - Project configuration files
- [Pages](docs/pages.md) - Application pages and routing
- [Components](docs/components.md) - UI components
- [Features](docs/features.md) - Feature-specific modules
- [Hooks](docs/hooks.md) - Custom React hooks
- [Utils](docs/utils.md) - Utility functions
- [Types](docs/schema.md) - Type definitions

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_API_KEY=your_api_key
   NEXT_PUBLIC_ENCRYPTION_KEY=your_encryption_key
   ```
3. Deploy automatically on push

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔒 Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
NEXT_PUBLIC_API_KEY=your_api_key_here
NEXT_PUBLIC_ENCRYPTION_KEY=your_32_char_encryption_key
NEXT_PUBLIC_OLD_ENCRYPTION_KEY=fallback_key_if_needed
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- PWA functionality via [next-pwa](https://github.com/DuCanhGH/next-pwa)

---

**EBYF Info** - Connecting church youth with modern technology 🕊️
