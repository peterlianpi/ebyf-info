# Providers Documentation

This document describes the providers in the `src/providers/` directory.

## ThemeProvider (`src/providers/ThemeProvider.js`)

**Description:** Wrapper component for `next-themes` ThemeProvider.

**Props:**
- `children`: React children.
- `...props`: Additional props passed to NextThemesProvider.

**Functionality:** Enables theme switching (light/dark) using next-themes.

**Dependencies:** `next-themes`.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```jsx
<ThemeProvider attribute="class" defaultTheme="light">
  <App />
</ThemeProvider>