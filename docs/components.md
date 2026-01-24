# Components Documentation

This document describes all the components in the `components/` directory. All components have been migrated to TypeScript (.tsx) for type safety, with explicit prop interfaces and strict type checking.

## Logo (`components/Logo.tsx`)

**Description:** Simple logo component that links to the home page.

**Props:** None.

**TypeScript:** No props interface needed (simple component).

**Dependencies:** Next.js `Link`.

**Usage Example:**
```tsx
<Logo />
```

## MobileNav (`components/MobileNav.tsx`)

**Description:** Mobile navigation menu using a sheet component.

**Components Used:**
- `Sheet`, `SheetContent`, `SheetTrigger` from `@/components/ui/sheet`
- `AlignJustify` from `lucide-react`
- `Nav`, `Logo`, `Socials`

**Functionality:** Opens a side sheet with logo, navigation links, and social icons.

**Usage Example:**
```tsx
<MobileNav />
```

## Nav (`components/Nav.tsx`)

**Description:** Navigation links component with active state highlighting using Framer Motion.

**Props:**
- `containerStyles?`: CSS classes for container (optional string).
- `linkStyles?`: CSS classes for links (optional string).
- `underlineStyles?`: CSS classes for underline animation (optional string).

**TypeScript:** Uses `NavProps` interface for type safety.

**Links:** Home, Makai, Venguk, Talen, Contacts, Policy.

**Dependencies:** `Link` from Next.js, `usePathname`, `motion` from Framer Motion.

**Usage Example:**
```tsx
<Nav
  containerStyles="flex gap-x-4"
  linkStyles="relative hover:text-primary"
  underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
/>
```

## periodShow (`components/periodShow.tsx`)

**Description:** Displays service period dates for a role.

**Props:**
- `startedAt?`: Start date string (optional).
- `endedAt?`: End date string (optional, defaults to "Present").

**TypeScript:** Uses `PeriodDisplayProps` interface with optional date strings.

**Functionality:** Formats dates to "DD Month YYYY" and displays "From: date To: date".

**Usage Example:**
```tsx
<PeriodDisplay startedAt="2023-01-01" endedAt="2024-01-01" />
```

## Socials (`components/Socials.tsx`)

**Description:** Social media links component with icons.

**Props:**
- `containerStyles?`: CSS classes for container (optional string).
- `iconsStyles?`: CSS classes for icons (optional string).

**TypeScript:** Uses `SocialsProps` interface.

**Icons:** YouTube, LinkedIn, GitHub, Facebook, Instagram.

**Usage Example:**
```tsx
<Socials containerStyles="flex gap-x-4" iconsStyles="text-2xl" />
```

## ThemeToggler (`components/ThemeToggler.tsx`)

**Description:** Button to toggle between light and dark themes.

**Components Used:** `Button` from `@/components/ui/button`, `SunIcon`, `MoonIcon` from Radix UI.

**Functionality:** Uses `next-themes` to switch themes with smooth icon transitions.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```tsx
<ThemeToggler />
```

## user-item (`components/user-item.tsx`)

**Description:** User card component displaying user info, roles, and contact options.

**Props:**
- `user`: User object with id, name, number, roles, phone, image, veng, fbLink.

**TypeScript:** Uses `UserItemProps` interface with `User` type. Typed state `selectedUser: User | null`, event handlers for phone calls and clicks.

**Functionality:**
- Displays avatar, name, filtered roles with null-safe operations.
- Phone call button with undefined checks.
- Modal on click with detailed info, roles with periods, phone numbers, Facebook link.

**Components Used:** `Phone` icon, `Button`, `Avatar`, `PeriodDisplay`, etc.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```tsx
<UserItem user={userObject} />
```

## Layout Components

### Header (`components/layout/Header.tsx`)

**Description:** App header with logo, navigation, theme toggler, and mobile nav.

**Functionality:** Sticky header that changes style on scroll. Different background on home page.

**TypeScript:** Typed state `header: boolean`, proper event listener cleanup with function references.

**Components Used:** `ThemeToggler`, `Logo`, `Nav`, `MobileNav`, `usePathname`.

**Client-Side:** Uses `"use client"`.

**Performance:** Efficient scroll event handling with if-else logic instead of ternary expressions.

**Usage Example:** Included in root layout.

### Footer (`components/layout/Footer.tsx`)

**Description:** Simple footer with copyright notice.

**Props:** None.

**Usage Example:** Included in root layout.

### Hero (`components/layout/Hero.tsx`)

**Description:** Hero section on home page with title, subtitle, search, socials, and feedback form.

**Components Used:** `Socials`, `SearchBox` from features, `FeedbackForm`.

**Client-Side:** Uses `"use client"`.

**Usage Example:** Used in home page.

### SearchBox (`components/layout/SearchBox.tsx`)

**Description:** Search input for users by name or veng.

**Props:**
- `users`: Array of users.
- `isFetchingComplete`: Boolean for loading state.

**Functionality:** Filters users, displays results in scrollable area.

**Components Used:** `Remove`, `Search` icons, `UserItem`.

**Usage Example:**
```tsx
<SearchBox users={users} isFetchingComplete={true} />
```

### UserForm (`components/layout/UserForm.tsx`)

**Description:** Form for editing user profiles.

**Props:**
- `user`: User object.
- `onSave`: Save callback function.

**State:** Manages form fields, image upload, veng selection.

**Functionality:** File upload to `/api/upload`, form submission with toast notifications.

**Components Used:** `Button`, `Image`, etc.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```tsx
<UserForm user={user} onSave={handleSave} />
```

## Icon Components

All icon components are simple React components exporting SVG icons, migrated to TypeScript with typed props.

### Close (`components/icons/Close.tsx`)

**Description:** Close/X icon.

**Props:** `className?: string`

### Delete (`components/icons/Delete.tsx`)

**Description:** Delete icon.

**Props:** `className?: string`

### Edit (`components/icons/Edit.tsx`)

**Description:** Edit icon.

**Props:** `className?: string`

### Loading (`components/icons/Loading.tsx`)

**Description:** Loading spinner icon.

**Props:** None (uses MUI CircularProgress).

### Phone (`components/icons/Phone.tsx`)

**Description:** Phone icon.

**Props:** `className?: string`

### Refresh (`components/icons/Refresh.tsx`)

**Description:** Refresh icon.

**Props:** `className?: string`

### Remove (`components/icons/Remove.tsx`)

**Description:** Remove icon.

**Props:** `className?: string`

### Search (`components/icons/Search.tsx`)

**Description:** Search icon.

**Props:** `className?: string`

## UI Components

The `components/ui/` directory contains shadcn/ui components. These are standard UI library components with minimal customization.

### avatar.jsx

**Description:** Avatar component with image and fallback.

**Dependencies:** Radix UI avatar.

### badge.jsx

**Description:** Badge component for labels/tags.

### button.jsx

**Description:** Button component with variants.

### card.jsx

**Description:** Card container component.

### checkbox.jsx

**Description:** Checkbox input component.

### command.jsx

**Description:** Command palette component.

### dialog.jsx

**Description:** Modal dialog component.

### form.jsx

**Description:** Form wrapper with react-hook-form integration.

### input.jsx

**Description:** Input field component.

### label.jsx

**Description:** Label component.

### progress.jsx

**Description:** Progress bar component.

### select.jsx

**Description:** Select dropdown component.

### sheet.jsx

**Description:** Slide-out sheet component.

### skeleton.jsx

**Description:** Skeleton loading placeholder.

### sonner.jsx

**Description:** Toast notification component.

### tabs.jsx

**Description:** Tabs component.

### textarea.jsx

**Description:** Textarea input component.

All UI components follow shadcn/ui patterns and can be used as per their documentation.

## Page Components

All page components in `app/` have been migrated to `.tsx` with TypeScript support.

### Makaite Page (`app/makaite/page.tsx`)

**Description:** Displays filtered members with specific roles.

**TypeScript:** Typed `User[]`, null-safe sorting with `(a.number || 0)`, unique keys using `user.id`.

**Performance:** Optimized sorting with fallback for undefined `number` fields.

### Contacts Page (`app/contacts/page.tsx`)

**Description:** Tabbed interface for different member categories.

**TypeScript:** Typed `Tab` interface, `User[]` state, null-safe role filtering `(user.roles || []).filter(...)`.

**Performance:** Efficient filtering with fallbacks for undefined arrays.

### Other Pages

All other pages (policy, vengukte, etc.) are statically typed with no dynamic props.