# Features Documentation

This document describes the feature components in the `features/` directory. All components have been migrated to TypeScript (.tsx) for type safety.

## All Members Search (`features/all-members/member-search.tsx`)

**Description:** A search component that allows users to search for EBYF members by name or veng.

**State Management:**
- `searchQuery: string`: Current search input.
- `debouncedSearchQuery: string`: Debounced version for API calls.
- `users: User[]`: Filtered user results.
- `usersLoading: boolean`: Loading state.

**TypeScript:** Uses `User` type from types, typed event handlers `React.ChangeEvent<HTMLInputElement>`.

**Functionality:**
- Debounces search input (1 second).
- Filters users by name or veng using `filterLocalMembersByRole`.
- Displays loading spinner.
- Shows user results in scrollable area.

**Components Used:** `Input`, `Button`, `Search`, `Remove`, `UserItem`, `BounceLoader`.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```tsx
<SearchBox />
```

## Feedback Form (`features/feedback/components/feedback.tsx`)

**Description:** A modal dialog for submitting user feedback, with options for anonymous submission.

**State Management:**
- `feedback: string`: Feedback text.
- `name: string`, `email: string`, `phone: string`: User details.
- `anonymous: boolean`: Boolean for anonymous submission.
- `loading: boolean`: Submission state.
- `emailError: string`: Email validation error.

**TypeScript:** Typed fetch headers as `Record<string, string>`, event handlers for form inputs.

**Functionality:**
- Validates form (feedback required, email if provided).
- Submits to `/api/feedback` with toast notifications.
- Resets form on success.

**Components Used:** `Dialog`, `Button`, `Textarea`, `Input`, `Label`, `Checkbox`.

**Dependencies:** `react-hot-toast`, API endpoint.

**Usage Example:**
```tsx
<FeedbackForm />
```

## Talent Search (`features/talen/components/talen-search.tsx`)

**Description:** Search component for YF Talen 2025 participants.

**State Management:**
- `searchQuery: string`: Search input.
- `debouncedSearchQuery: string`: Debounced query.
- `users: User[]`: Filtered talent users.
- `usersLoading: boolean`: Loading state.

**TypeScript:** Uses `User` type, typed event handlers.

**Functionality:**
- Debounced search (1 second).
- Filters by "EBYF - Talent Sum" role and search query.
- Displays title, description, search input, loading, results.

**Components Used:** `Input`, `Button`, `Search`, `Remove`, `UserItem`, `BounceLoader`.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```tsx
<SearchBox />
```

## User List (`features/user-list/user-list.tsx`)

**Description:** Component to display all members with refresh functionality.

**TypeScript:** Typed `User[]`, null-safe sorting with `(a.number || 0)`, unique keys using `user.id`.

**Functionality:**
- Fetches all users using `useUsers`.
- Sorts users by number with fallback.
- Refresh button to reload data.
- Loading skeletons.

**Components Used:** `Refresh`, `Skeleton`, `UserItem`.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```tsx
<UserListPage />
```

## YF Service Input Form (`features/yf-service/input-form.tsx`)

**Description:** Modal form for inputting service program data.

**Props:**
- `isOpen: boolean`: Modal open state.
- `onClose: () => void`: Close callback.
- `formData: FormData`: Current form data (typed interface).
- `setFormData: (data: Partial<FormData>) => void`: Data setter callback.

**TypeScript:** Uses `FormData` interface for type safety.

**Functionality:**
- Loads/saves data to localStorage.
- Handles input changes.
- Submits and saves data.

**Fields:** Date, hunuk, hunpi, tawpna, laiSiangthoKamngahGen, laiSiangthoSimkhopna, phatnaLa, sumpiApna, duet, ahuamThungetna, groupSong.

**Components Used:** `Dialog`, `Input`, `Button`.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```tsx
<InputForm
  isOpen={true}
  onClose={handleClose}
  formData={data}
  setFormData={setData}
/>
```

## Zo Hun Form (Copy) (`features/yf-service/zo-hun-form copy.js`)

**Description:** Component that overlays service data on a background image for Zo Hun form.

**Props:**
- `formData`: Object with service details.

**Functionality:**
- Formats date to DD.MM.YYYY.
- Positions text over image at specific coordinates.

**Usage Example:**
```jsx
<ZoHunFormPage formData={formData} />
```

## Zo Hun Form (`features/yf-service/zo-hun-form.js`)

**Description:** Main component for displaying Zo Hun service form with overlaid data.

**Props:**
- `formData`: Service data object.

**Functionality:**
- Formats date.
- Overlays various service details on image.

**Usage Example:**
```jsx
<ZoHunFormPage formData={formData} />
```

## Zo Hun SVG (`features/yf-service/zo-hun.js`)

**Description:** SVG version of the Zo Hun form with dynamic text.

**Props:**
- `date`, `hunuk`, `hunpi`, etc.: Service data.

**Functionality:**
- Uses SVG text elements to display data over image.

**Usage Example:**
```jsx
<ZoHunSVG
  date="10.04.2025"
  hunuk="John Doe"
// ... other props
/>
```

## Kawl Hun Form (`features/yf-service/kawl-hun-form.js`)

**Description:** Empty file for Kawl Hun form component.

**Status:** Not implemented.