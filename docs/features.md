# Features Documentation

This document describes the feature components in the `src/features/` directory.

## All Members Search (`src/features/all-members/member-search.js`)

**Description:** A search component that allows users to search for EBYF members by name or veng.

**State Management:**
- `searchQuery`: Current search input.
- `debouncedSearchQuery`: Debounced version for API calls.
- `users`: Filtered user results.
- `usersLoading`: Loading state.

**Functionality:**
- Debounces search input (1 second).
- Filters users by name or veng using `filterLocalMembersByRole`.
- Displays loading spinner.
- Shows user results in scrollable area.

**Components Used:** `Input`, `Button`, `Search`, `Remove`, `UserItem`, `BounceLoader`.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```jsx
<SearchBox />
```

## Feedback Form (`src/features/feedback/components/feedback.js`)

**Description:** A modal dialog for submitting user feedback, with options for anonymous submission.

**State Management:**
- `feedback`: Feedback text.
- `name`, `email`, `phone`: User details.
- `anonymous`: Boolean for anonymous submission.
- `loading`: Submission state.
- `emailError`: Email validation error.

**Functionality:**
- Validates form (feedback required, email if provided).
- Submits to `/api/feedback` with toast notifications.
- Resets form on success.

**Components Used:** `Dialog`, `Button`, `Textarea`, `Input`, `Label`, `Checkbox`.

**Dependencies:** `react-hot-toast`, API endpoint.

**Usage Example:**
```jsx
<FeedbackForm />
```

## Talent Search (`src/features/talen/components/talen-search.js`)

**Description:** Search component for YF Talen 2025 participants.

**State Management:**
- `searchQuery`: Search input.
- `debouncedSearchQuery`: Debounced query.
- `users`: Filtered talent users.
- `usersLoading`: Loading state.

**Functionality:**
- Debounced search (1 second).
- Filters by "EBYF - Talent Sum" role and search query.
- Displays title, description, search input, loading, results.

**Components Used:** `Input`, `Button`, `Search`, `Remove`, `UserItem`, `BounceLoader`.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```jsx
<SearchBox />
```

## User List (`src/features/user-list/user-list.js`)

**Description:** Component to display all members with refresh functionality.

**Functionality:**
- Fetches all users using `useUsers`.
- Sorts users by ID.
- Refresh button to reload data.
- Loading skeletons.

**Components Used:** `Refresh`, `Skeleton`, `UserItem`.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```jsx
<UserListPage />
```

## YF Service Input Form (`src/features/yf-service/input-form.js`)

**Description:** Modal form for inputting service program data.

**Props:**
- `isOpen`: Modal open state.
- `onClose`: Close callback.
- `formData`: Current form data.
- `setFormData`: Data setter.

**Functionality:**
- Loads/saves data to localStorage.
- Handles input changes.
- Submits and saves data.

**Fields:** Date, hunuk, hunpi, tawpna, laiSiangthoKamngahGen, laiSiangthoSimkhopna, phatnaLa, sumpiApna, duet, ahuamThungetna, groupSong.

**Components Used:** `Dialog`, `Input`, `Button`.

**Client-Side:** Uses `"use client"`.

**Usage Example:**
```jsx
<InputForm
  isOpen={true}
  onClose={handleClose}
  formData={data}
  setFormData={setData}
/>
```

## Zo Hun Form (Copy) (`src/features/yf-service/zo-hun-form copy.js`)

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

## Zo Hun Form (`src/features/yf-service/zo-hun-form.js`)

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

## Zo Hun SVG (`src/features/yf-service/zo-hun.js`)

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

## Kawl Hun Form (`src/features/yf-service/kawl-hun-form.js`)

**Description:** Empty file for Kawl Hun form component.

**Status:** Not implemented.