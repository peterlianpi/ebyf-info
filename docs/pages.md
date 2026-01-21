# Pages Documentation

This document describes all the pages in the Next.js application, located in the `src/app/` directory. Each page corresponds to a route in the app router.

## Root Layout (`src/app/layout.js`)

**Route:** `/` (root layout, applies to all pages)

**Description:** The root layout component that wraps all pages in the application. It sets up the HTML structure, metadata, fonts, providers, and common UI elements like header and footer.

**Components Used:**
- `Header` from `@/components/layout/Header`
- `Footer` from `@/components/layout/Footer`
- `Toaster` from `react-hot-toast`
- `Analytics` from `@vercel/analytics/react`
- `SpeedInsights` from `@vercel/speed-insights/next`
- `ThemeProvider` from `@/providers/ThemeProvider`

**Metadata:**
- Application name: EBYF Contacts Info
- Title: EBYF Contacts Info
- Description: Easily connect with church youth. No more typing numbers—just tap and call.
- PWA settings: Manifest, Apple Web App capable, Open Graph, Twitter cards
- Viewport: Theme color #FFFFFF

**Dependencies:** Inter font from Google Fonts, various React components.

**Usage Example:** This layout is automatically applied to all pages. No direct usage.

## Home Page (`src/app/page.js`)

**Route:** `/`

**Description:** The main landing page of the application, displaying the hero section.

**Components Used:**
- `Hero` from `@/components/layout/Hero`

**Client-Side:** Uses `"use client"` directive.

**Usage Example:** Displays the hero content when users visit the root URL.

## Blood Group Page (`src/app/_blood/page.js`)

**Route:** `/_blood`

**Description:** Displays contacts for the blood group members.

**Components Used:**
- `UserItem` from `@/components/user-item`
- `Skeleton` from `@/components/ui/skeleton`
- `useUsers` hook from `@/hooks/useUsers`

**Functionality:**
- Fetches users from `/blood?orgId=1` API route.
- Shows loading skeletons while fetching.
- Displays list of users with their contact information.

**Client-Side:** Uses `"use client"` directive.

**Dependencies:** `useUsers` hook for data fetching.

**Usage Example:** Navigate to `/_blood` to view blood group contacts.

## Hun Gelna Service Page (`src/app/_hun-gelna/page.js`)

**Route:** `/_hun-gelna`

**Description:** Displays the YF Service Program image with download functionality.

**Components Used:**
- `Button` from `@/components/ui/button`
- `DownloadIcon` from `lucide-react`

**Functionality:**
- Displays a service program image (`/yf-service.png`).
- Provides a download button to save the image as `service-image.png`.

**Client-Side:** Uses `"use client"` directive.

**Dependencies:** File must exist at `public/yf-service.png`.

**Usage Example:** Visit `/_hun-gelna` to view and download the service program.

## Add Service Items Page (`src/app/_hun-gelna/add/page.js`)

**Route:** `/_hun-gelna/add`

**Description:** Allows editing and generating YF service forms with PDF and image export capabilities.

**Components Used:**
- `Button` from `@/components/ui/button`
- `InputForm` from `@/features/yf-service/input-form`
- `ZoHunFormPage` from `@/features/yf-service/zo-hun-form`
- `ZoHunSVG` (commented out)

**Functionality:**
- Switches between "Zo Hun" and "Kawl Hun" service types.
- Manages form data for service items.
- Exports to PDF or high-resolution PNG using `html2canvas` and `jsPDF`.
- Preview area shows the generated form.

**State Management:**
- `serviceType`: Current service type ("zo-hun" or "kawl-hun").
- `formData`: Object containing form fields like date, hunuk, hunpi, etc.
- `isFormOpen`: Controls input form modal visibility.

**Client-Side:** Uses `"use client"` directive.

**Dependencies:** `html2canvas`, `jsPDF`, various feature components.

**Usage Example:** Go to `/_hun-gelna/add` to create and export service forms.

## Library Page (`src/app/_library/page.js`)

**Route:** `/_library`

**Description:** Displays library members with their service periods.

**Components Used:**
- `PeriodDisplay` from `@/components/periodShow`
- `Skeleton` from `@/components/ui/skeleton`
- `UserItem` from `@/components/user-item`
- `useUsers` hook from `@/hooks/useUsers`

**Functionality:**
- Fetches users from `/library?orgId=1`.
- Filters roles to only show those containing "Library".
- Displays service period for each member.

**Client-Side:** Uses `"use client"` directive.

**Dependencies:** `useUsers` hook.

**Usage Example:** Access `/_library` to view library team members and their terms.

## Mopuan Page (`src/app/_mopuan/page.js`)

**Route:** `/_mopuan`

**Description:** Displays Mopuan group contacts.

**Components Used:**
- `UserItem` from `@/components/user-item`
- `Skeleton` from `@/components/ui/skeleton`
- `useUsers` hook from `@/hooks/useUsers`

**Functionality:**
- Fetches users from `/mopuan?orgId=1`.
- Shows loading skeletons.
- Lists all users in the group.

**Client-Side:** Uses `"use client"` directive.

**Dependencies:** `useUsers` hook.

**Usage Example:** Visit `/_mopuan` for Mopuan contacts.

## Offline Fallback Page (`src/app/~offline/page.js`)

**Route:** `/~offline`

**Description:** Fallback page displayed when the user is offline.

**Components Used:** None (server component).

**Functionality:** Shows offline message and instructions.

**Dependencies:** Next.js Head component.

**Usage Example:** Automatically shown by PWA when offline.

## Contacts Page (`src/app/contacts/page.js`)

**Route:** `/contacts`

**Description:** Combined contacts page with tabs for different groups: Sisan, Library, Mopuan.

**Components Used:**
- `UserItem` from `@/components/user-item`
- `Skeleton` from `@/components/ui/skeleton`
- `PeriodDisplay` from `@/components/periodShow`
- `useUsers` hook from `@/hooks/useUsers`
- Utility functions from `@/utils/filterLocalMembersByRole` and `@/utils/roleFilters`

**Functionality:**
- Tabbed interface to switch between groups.
- Fetches and filters users based on active tab.
- Special handling for Library tab to show service periods.

**State Management:**
- `activeTab`: Current selected tab.
- `users`: Filtered user list.

**Client-Side:** Uses `"use client"` directive.

**Dependencies:** Filtering utilities, hooks.

**Usage Example:** Go to `/contacts` and switch tabs to view different contact groups.

## Makaite Page (`src/app/makaite/page.js`)

**Route:** `/makaite`

**Description:** Displays EBYF leadership team (Makai te).

**Components Used:**
- `Skeleton` from `@/components/ui/skeleton`
- `UserItem` from `@/components/user-item`
- `useUsers` hook from `@/hooks/useUsers`
- `filterLocalMembersByRole` from `@/utils/filterLocalMembersByRole`

**Functionality:**
- Filters users by specific leadership roles.
- Sorts by user number.
- Displays leadership contacts.

**Client-Side:** Uses `"use client"` directive.

**Dependencies:** Filtering utility.

**Usage Example:** Visit `/makaite` to view EBYF leaders.

## Policy Page (`src/app/policy/page.js`)

**Route:** `/policy`

**Description:** Privacy policy page.

**Components Used:** None (server component).

**Content:** Detailed privacy policy covering data collection, use, storage, security, sharing, access, consent, and policy changes.

**Usage Example:** Navigate to `/policy` to read the privacy policy.

## Talen Page (`src/app/talen/page.js`)

**Route:** `/talen`

**Description:** Talent search page.

**Components Used:**
- `SearchBox` from `@/features/talen/components/talen-search`

**Functionality:** Provides a search interface for talents.

**Dependencies:** Talen feature component.

**Usage Example:** Go to `/talen` to search for talents.

## Vengukte Page (`src/app/vengukte/page.js`)

**Route:** `/vengukte`

**Description:** Displays Veng-Uk team members.

**Components Used:**
- `Skeleton` from `@/components/ui/skeleton`
- `UserItem` from `@/components/user-item`
- `useUsers` hook from `@/hooks/useUsers`
- `filterLocalMembersByRole` from `@/utils/filterLocalMembersByRole`

**Functionality:**
- Filters users by "Veng Uk" keyword.
- Sorts by user number.
- Shows loading component while fetching.

**Client-Side:** Uses `"use client"` directive.

**Dependencies:** Filtering utility.

**Usage Example:** Access `/vengukte` for Veng-Uk team contacts.