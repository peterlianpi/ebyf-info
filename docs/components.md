# Components Documentation

This document describes all the components in the `src/components/` directory.

## Logo (`src/components/Logo.js`)

**Description:** Simple logo component that links to the home page.

**Props:** None.

**Dependencies:** Next.js `Link`.

**Usage Example:**
```jsx
<Logo />
```

## MobileNav (`src/components/MobileNav.js`)

**Description:** Mobile navigation menu using a sheet component.

**Components Used:**
- `Sheet`, `SheetContent`, `SheetTrigger` from `@/components/ui/sheet`
- `AlignJustify` from `lucide-react`
- `Nav`, `Logo`, `Socials`

**Functionality:** Opens a side sheet with logo, navigation links, and social icons.

**Usage Example:**
```jsx
<MobileNav />
```

## Nav (`src/components/Nav.js`)

**Description:** Navigation links component with active state highlighting using Framer Motion.

**Props:**
- `containerStyles`: CSS classes for container.
- `linkStyles`: CSS classes for links.
- `underlineStyles`: CSS classes for underline animation.

**Links:** Home, Makai, Venguk, Talen, Contacts, Policy.

**Dependencies:** `Link` from Next.js, `usePathname`, `motion` from Framer Motion.

**Usage Example:**
```jsx
<Nav
  containerStyles="flex gap-x-4"
  linkStyles="relative hover:text-primary"
  underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
/>
```

## periodShow (`src/components/periodShow.js`)

**Description:** Displays service period dates for a role.

**Props:**
- `startedAt`: Start date string.
- `endedAt`: End date string (optional, defaults to "Present").

**Functionality:** Formats dates to "DD Month YYYY" and displays "From: date To: date".

**Usage Example:**
```jsx
<PeriodDisplay startedAt="2023-01-01" endedAt="2024-01-01" />
```

## Socials (`src/components/Socials.js`)

**Description:** Social media links component with icons.

**Props:**
- `containerStyles`: CSS classes for container.
- `iconsStyles`: CSS classes for icons.

**Icons:** YouTube, LinkedIn, GitHub, Facebook, Instagram.

**Usage Example:**
```jsx
<Socials containerStyles="flex gap-x-4" iconsStyles="text-2xl" />
```

## ThemeToggler (`src/components/ThemeToggler.js`)

**Description:** Button to toggle between light and dark themes.

**Components Used:** `Button` from `@/components/ui/button`, `SunIcon`, `MoonIcon` from Radix UI.

**Functionality:** Uses `next-themes` to switch themes with smooth icon transitions.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```jsx
<ThemeToggler />
```

## user-item (`src/components/user-item.js`)

**Description:** User card component displaying user info, roles, and contact options.

**Props:**
- `user`: User object with id, name, number, roles, phone, image, veng, fbLink.

**Functionality:**
- Displays avatar, name, filtered roles.
- Phone call button.
- Modal on click with detailed info, roles with periods, phone numbers, Facebook link.

**Components Used:** `Phone` icon, `Button`, `Avatar`, `PeriodDisplay`, etc.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```jsx
<UserItem user={userObject} />
```

## Layout Components

### Header (`src/components/layout/Header.js`)

**Description:** App header with logo, navigation, theme toggler, and mobile nav.

**Functionality:** Sticky header that changes style on scroll. Different background on home page.

**Components Used:** `ThemeToggler`, `Logo`, `Nav`, `MobileNav`, `usePathname`.

**Client-Side:** Uses `"use client"`.

**Usage Example:** Included in root layout.

### Footer (`src/components/layout/Footer.js`)

**Description:** Simple footer with copyright notice.

**Props:** None.

**Usage Example:** Included in root layout.

### Hero (`src/components/layout/Hero.js`)

**Description:** Hero section on home page with title, subtitle, search, socials, and feedback form.

**Components Used:** `Socials`, `SearchBox` from features, `FeedbackForm`.

**Client-Side:** Uses `"use client"`.

**Usage Example:** Used in home page.

### SearchBox (`src/components/layout/SearchBox.js`)

**Description:** Search input for users by name or veng.

**Props:**
- `users`: Array of users.
- `isFetchingComplete`: Boolean for loading state.

**Functionality:** Filters users, displays results in scrollable area.

**Components Used:** `Remove`, `Search` icons, `UserItem`.

**Usage Example:**
```jsx
<SearchBox users={users} isFetchingComplete={true} />
```

### UserForm (`src/components/layout/UserForm.js`)

**Description:** Form for editing user profiles.

**Props:**
- `user`: User object.
- `onSave`: Save callback function.

**State:** Manages form fields, image upload, veng selection.

**Functionality:** File upload to `/api/upload`, form submission with toast notifications.

**Components Used:** `Button`, `Image`, etc.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```jsx
<UserForm user={user} onSave={handleSave} />
```

## Icon Components

All icon components are simple React components exporting SVG icons.

### Close (`src/components/icons/Close.js`)

**Description:** Close/X icon.

### Delete (`src/components/icons/Delete.js`)

**Description:** Delete icon.

### Edit (`src/components/icons/Edit.js`)

**Description:** Edit icon.

### Loading (`src/components/icons/Loading.js`)

**Description:** Loading spinner icon.

### Phone (`src/components/icons/Phone.js`)

**Description:** Phone icon.

### Refresh (`src/components/icons/Refresh.js`)

**Description:** Refresh icon.

### Remove (`src/components/icons/Remove.js`)

**Description:** Remove icon.

### Search (`src/components/icons/Search.js`)

**Description:** Search icon.

## UI Components

The `src/components/ui/` directory contains shadcn/ui components. These are standard UI library components with minimal customization.

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