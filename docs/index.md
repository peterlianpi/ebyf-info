# EBYF Info Documentation

This is comprehensive documentation for the EBYF Info project, a Next.js application for church youth contacts and information.

## Table of Contents

- [Configuration](configuration.md) - Root config files like package.json, next.config.mjs, etc.
- [Pages](pages.md) - All pages in the app router (src/app/)
- [Components](components.md) - Reusable components (src/components/)
- [Features](features.md) - Feature-specific components (src/features/)
- [Hooks](hooks.md) - Custom React hooks (src/hooks/)
- [Lib](lib.md) - Library utilities (src/lib/)
- [Providers](providers.md) - Context providers (src/providers/)
- [Schema](schema.md) - Data schemas (src/schema/)
- [Utils](utils.md) - Utility functions (src/utils/)

## Project Overview

EBYF Info is a Progressive Web App built with Next.js that provides contact information for church youth members. Key features include:

- User search and filtering
- Role-based member listing
- Offline functionality with IndexedDB
- Encrypted local storage
- PWA capabilities
- Service program form generation
- Feedback system

## Architecture

- **Frontend:** Next.js 15 with App Router, React 19, Tailwind CSS
- **UI:** shadcn/ui components with Radix UI
- **State:** Custom hooks with local storage
- **Storage:** IndexedDB with AES encryption
- **Deployment:** Vercel with analytics

## Getting Started

See README.md for setup instructions.