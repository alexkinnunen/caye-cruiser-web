# Caye Cruiser - Complete Developer Guide

> **Last Updated**: October 2025
> **For Designers & Developers**: How to customize, modify, and extend the Caye Cruiser platform

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Routing & Pages](#routing--pages)
4. [Design System](#design-system)
5. [Components Guide](#components-guide)
6. [Styling & Customization](#styling--customization)
7. [Animation System](#animation-system)
8. [State Management](#state-management)
9. [Common Customizations](#common-customizations)
10. [File Location Reference](#file-location-reference)

---

## Project Overview

**Caye Cruiser** is a golf cart ride-sharing platform for San Pedro, Belize. Built with React, TypeScript, and Tailwind CSS, it features smooth animations, real-time ride tracking, and dual interfaces for riders and partners.

### Tech Stack
- **Frontend**: React 18.3 + TypeScript 5.4 + Vite
- **Styling**: TailwindCSS + shadcn/ui (51 components)
- **Animation**: GSAP ScrollTrigger + Lenis (smooth scrolling)
- **Backend**: Supabase (auth, database, real-time)
- **Maps**: Mapbox GL JS + React Map GL
- **Payments**: Stripe
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **State**: React Context + TanStack Query v5

---

## Project Structure

```
caye-cruiser-web/
├── public/                    # Static assets (served as-is)
├── src/
│   ├── components/
│   │   ├── auth/             # Authentication components
│   │   ├── images/           # Image assets (SVG, JPG)
│   │   ├── layout/           # Layout components (Header, Footer, etc.)
│   │   ├── marketing/        # Marketing/landing page sections
│   │   └── ui/               # shadcn/ui components (51 total)
│   ├── contexts/             # React Context providers
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities, constants, types
│   ├── pages/                # Page components (route targets)
│   ├── App.tsx               # Main app component & routing
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles & Tailwind
├── .claude/                  # Claude Code configuration
├── docs/                     # Documentation
└── n8n-workflow/            # WhatsApp automation workflows
```

---

## Routing & Pages

### Route Configuration
**File**: `src/App.tsx:14-33`

All routes are defined using React Router v6:

```typescript
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,              // Wraps all pages
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },                    // Homepage
      { path: "cart-rentals", element: <CartRentals /> },    // Rentals page
      { path: "become-a-partner", element: <BecomeAPartner /> }, // Partner signup
      { path: "user-account", element: <ProtectedRoute><AccountPage type="rider" /></ProtectedRoute> },
      { path: "partner-account", element: <ProtectedRoute><AccountPage type="partner" /></ProtectedRoute> },
    ],
  },
]);
```

### Pages Breakdown

#### 1. **Main Page** (Homepage)
**File**: `src/pages/Main.tsx`
**Route**: `/`

**Sections** (in order):
1. **ShutterOverlay** - Opening animation overlay
2. **Hero Section** - Large title with animated background birds
3. **Interactive Map** - Mapbox map for ride booking
4. **About Section** - "Drop a pin, request a driver, enjoy the cruise"

**Layout Constants** (customizable):
- `HERO_LAYOUT.BIRD_RIGHT_TOP: 675` - Position of right bird decoration
- `HERO_LAYOUT.WAVE_BG_TOP: 800` - Position of wave background
- `HERO_LAYOUT.TOUCAN_LEFT_TOP: 1400` - Position of left toucan
- `HERO_LAYOUT.MAP_NEGATIVE_MARGIN: -475` - Map overlap with hero
- `HERO_LAYOUT.MAP_HEIGHT: 700` - Map container height

**To Adjust Hero Layout**:
```typescript
// src/lib/constants.ts:26-32
export const HERO_LAYOUT = {
  BIRD_RIGHT_TOP: 675,     // Change this number to move bird up/down
  WAVE_BG_TOP: 800,        // Move wave background
  TOUCAN_LEFT_TOP: 1400,   // Move toucan decoration
  MAP_NEGATIVE_MARGIN: -475, // How much map overlaps hero
  MAP_HEIGHT: 700,         // Map container height in pixels
} as const;
```

#### 2. **Cart Rentals Page**
**File**: `src/components/marketing/CartRentals.tsx`
**Route**: `/cart-rentals`

Long-term golf cart rental information.

#### 3. **Become a Partner Page**
**File**: `src/pages/BecomeAPartner.tsx`
**Route**: `/become-a-partner`

Partner/driver onboarding and signup.

#### 4. **Account Pages** (Protected)
**File**: `src/pages/AccountPage.tsx`
**Routes**: `/user-account`, `/partner-account`

**Props**:
- `type: "rider" | "partner"` - Determines which dashboard to show

Protected by authentication - redirects to home if not logged in.

#### 5. **404 Page**
**File**: `src/pages/NotFound.tsx`
**Route**: Any unmatched route

---

## Design System

### Color Palette

**File**: `src/index.css:20-98`

#### Light Mode (Default)
```css
--background: 30 18% 93%;      /* Sand background */
--foreground: 20 14.3% 4.1%;   /* Dark text */
--primary: 60 50% 40%;         /* Lime green */
--secondary: 193 24% 55%;      /* Ocean blue */
--accent: 17 33% 32%;          /* Cocoa brown */
--sand: 20 14.3% 98%;          /* Light sand */
```

#### Dark Mode
```css
--background: 20 14.3% 4.1%;   /* Dark background */
--primary: 60 50% 50%;         /* Brighter lime */
--secondary: 193 24% 65%;      /* Lighter blue */
--accent: 17 33% 45%;          /* Lighter cocoa */
```

### Using Colors in Code

**Tailwind Classes**:
```jsx
<div className="bg-primary text-primary-foreground">Lime button</div>
<div className="bg-secondary text-white">Ocean blue</div>
<div className="bg-cocoa text-white">Cocoa accent</div>
<div className="bg-sand">Sand background</div>
```

**Custom CSS**:
```css
.my-element {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

### Typography

**File**: `src/index.css:4,138-150`

#### Font Families

1. **Grante** (Display/Headings)
   - Used for: Large titles, "CAYE CRUISER" branding
   - Tailwind: `font-grante`
   - Fallback: Oswald, Arial Black

2. **Kensington** (Decorative)
   - Used for: Taglines, decorative text
   - Tailwind: `font-kensington`
   - Fallback: Oswald, Arial

3. **Oswald** (Body - Default)
   - Used for: All body text
   - Auto-applied to `<body>` tag

4. **Inter** (UI Elements)
   - Used for: Buttons, forms, UI components
   - Loaded via Google Fonts

#### Usage
```jsx
<h1 className="font-grante text-9xl">CAYE CRUISER</h1>
<h2 className="font-kensington text-6xl">For the Island, By the Island.</h2>
<p className="font-sans">Regular body text uses Oswald</p>
```

### Spacing & Layout

**File**: `tailwind.config.ts:14-20`

```typescript
container: {
  center: true,
  padding: "2rem",     // Default container padding
  screens: {
    "2xl": "1400px",   // Max container width on large screens
  },
}
```

### Border Radius

**File**: `src/index.css:51`

```css
--radius: 0.5rem;   /* 8px - Used for cards, buttons, inputs */
```

Tailwind utilities:
- `rounded-lg` = `var(--radius)` = 8px
- `rounded-md` = `var(--radius) - 2px` = 6px
- `rounded-sm` = `var(--radius) - 4px` = 4px

---

## Components Guide

### Layout Components

#### **Layout** (Main Wrapper)
**File**: `src/components/layout/Layout.tsx`

Wraps all pages. Contains:
- `<BottomNav />` - Mobile navigation
- `<Outlet />` - Current page content
- `<FloatingMapButton />` - Floating action button
- `<Footer />`

**To modify site-wide layout**, edit this file.

#### **BottomNav**
**File**: `src/components/layout/BottomNav.tsx`

Mobile navigation bar (shows on small screens).

**To customize nav items**, edit this component.

#### **Footer**
**File**: `src/components/layout/Footer.tsx`

Site footer with:
- Brand info
- Quick links
- Services
- Contact info (pulls from `WHATSAPP_NUMBER` constant)

**To change footer content**:
```tsx
// src/components/layout/Footer.tsx
<div className="space-y-4">
  <h4>Your Section Title</h4>
  <ul>
    <li><a href="/your-link">Your Link</a></li>
  </ul>
</div>
```

#### **Section** (Layout Helper)
**File**: `src/components/layout/Section.tsx`

Wrapper for consistent spacing.

**Props**:
- `spacing?: "sm" | "md" | "lg" | "xl"` - Vertical padding
- `background?: "transparent" | "beige" | "white"` - Background color
- `fullWidth?: boolean` - Remove container width constraint
- `noPadding?: boolean` - Remove all padding
- `className?: string` - Additional classes

**Usage**:
```tsx
<Section spacing="lg" background="beige">
  <YourContent />
</Section>
```

### Marketing Components

#### **Hero**
**File**: `src/components/marketing/Hero.tsx`

Large hero section with:
- Tagline: "For the Island, By the Island."
- Main title: "CAYE CRUISER"

**To customize text**:
```tsx
// src/components/marketing/Hero.tsx:13-18
<h2 className="text-6xl md:text-7xl lg:text-8xl font-kensington">
  Your New Tagline Here
</h2>
<h1 className="text-5xl md:text-7xl lg:text-9xl font-grante">
  YOUR BRAND
</h1>
```

#### **About**
**File**: `src/components/marketing/About.tsx`

Decorative text section with background graphics.

**To customize**:
```tsx
// src/components/marketing/About.tsx:20-95
<h1 className="text-right text-cocoa font-kensington">
  <span className="font-bold">YOUR TEXT HERE</span>
  ...
</h1>
```

#### **VehicleClasses**
**File**: `src/components/marketing/VehicleClasses.tsx`

Display available vehicle types.

#### **CartRentals**
**File**: `src/components/marketing/CartRentals.tsx`

Long-term rental information page.

### Interactive Components

#### **InteractiveMap**
**File**: `src/components/layout/InteractiveMap.tsx`

Mapbox-powered map for ride booking.

**Props**:
- `pickup: LocationPoint | null` - Pickup location
- `dropoff: LocationPoint | null` - Dropoff location
- `isLoading: boolean` - Loading state
- `onMapClick: (event: MapMouseEvent) => void` - Handle map clicks
- `onRequestRide: () => void` - Handle ride requests

**To customize map center**:
```tsx
// src/components/layout/InteractiveMap.tsx:89
initialViewState={{
  latitude: 17.9163,   // Change to your location
  longitude: -87.9665,
  zoom: 14
}}
```

**Map styles** (change appearance):
```tsx
// src/components/layout/InteractiveMap.tsx:90
mapStyle="mapbox://styles/mapbox/streets-v11"
// Options: streets-v11, outdoors-v11, light-v10, dark-v10, satellite-v9
```

#### **FloatingMapButton**
**File**: `src/components/ui/FloatingMapButton.tsx`

Circular rotating button (bottom-right corner).

**To customize**:
```css
/* src/index.css:157-223 */
.button {
  background: #999933;  /* Change button color */
  width: 100px;         /* Change size */
  height: 100px;
}
```

#### **ShutterOverlay**
**File**: `src/components/ui/ShutterOverlay.tsx`

Opening animation overlay (shows on page load).

### UI Components (shadcn/ui)

**Location**: `src/components/ui/`

51 pre-built components from shadcn/ui:

**Common ones**:
- `button.tsx` - Buttons
- `card.tsx` - Cards
- `dialog.tsx` - Modals
- `input.tsx` - Text inputs
- `form.tsx` - Form wrapper
- `toast.tsx` - Notifications
- `sheet.tsx` - Slide-out panels
- `dropdown-menu.tsx` - Dropdowns
- `tabs.tsx` - Tab navigation

**Full list**: See `src/components/ui/` directory

**Usage**:
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Your Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Your content</p>
    <Button>Click Me</Button>
  </CardContent>
</Card>
```

### Authentication Components

#### **AuthDialog**
**File**: `src/components/auth/AuthDialog.tsx`

Login/signup modal.

#### **ProtectedRoute**
**File**: `src/components/auth/ProtectedRoute.tsx`

Wraps routes that require authentication.

**Usage**:
```tsx
<ProtectedRoute>
  <YourPrivatePage />
</ProtectedRoute>
```

Shows loading spinner while checking auth, redirects to `/` if not logged in.

#### **ErrorBoundary**
**File**: `src/components/auth/ErrorBoundary.tsx`

Catches React errors and shows friendly UI.

---

## Styling & Customization

### How Styling Works

1. **Tailwind CSS** - Utility-first CSS framework
2. **CSS Variables** - Color tokens in `src/index.css`
3. **Custom CSS** - Additional styles in `src/index.css`

### Customizing Colors

**Step 1**: Update CSS variables
```css
/* src/index.css:20-58 */
:root {
  --primary: 60 50% 40%;     /* Your new primary color (HSL) */
  --secondary: 193 24% 55%;  /* Your new secondary color */
  /* ... */
}
```

**Step 2**: Use in components
```tsx
<div className="bg-primary text-primary-foreground">
  I use your new primary color!
</div>
```

### Customizing Fonts

**Step 1**: Add font to `src/index.css`
```css
@import url("https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap");
```

**Step 2**: Add to Tailwind config
```typescript
// tailwind.config.ts:23-25
fontFamily: {
  'yourfont': ['YourFont', 'sans-serif'],
}
```

**Step 3**: Use in components
```tsx
<h1 className="font-yourfont">Text in your font</h1>
```

### Responsive Design

Tailwind breakpoints:
- `sm:` - 640px and up (small tablets)
- `md:` - 768px and up (tablets)
- `lg:` - 1024px and up (small laptops)
- `xl:` - 1280px and up (desktops)
- `2xl:` - 1536px and up (large screens)

**Example**:
```tsx
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive text size
</div>
```

### Custom Utility Classes

**File**: `src/index.css:228-327`

Pre-built utilities:
```css
.font-grante { /* Display font */ }
.font-kensington { /* Decorative font */ }
.bg-sand { /* Sand background */ }
.bg-ocean-blue { /* Ocean blue */ }
.bg-cocoa { /* Cocoa brown */ }
.text-cocoa { /* Cocoa text */ }
.text-sand { /* Sand text */ }
.image-transform { /* GPU-accelerated images */ }
.gpu-accelerated { /* Performance optimization */ }
```

---

## Animation System

### Lenis Smooth Scrolling

**File**: `src/hooks/useLenis.ts`

Automatically initialized in `App.tsx`. Provides butter-smooth scrolling.

**Configuration**:
```typescript
// src/hooks/useLenis.ts:15-25
const lenis = new Lenis({
  duration: 1.2,              // Scroll duration (higher = slower)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,          // Smooth mouse wheel
  smoothTouch: false,         // Native touch on mobile
});
```

**To disable smooth scrolling**: Comment out `useLenis()` in `src/App.tsx:37`

### GSAP ScrollTrigger Animations

**File**: `src/pages/Main.tsx:25-70`

Currently animates birds/decorations that rotate as you scroll.

**How it works**:
1. Elements with class `.image-transform` are selected
2. Each element rotates from -30° or +30° to 0° as you scroll
3. Animation is scrubbed (tied to scroll position)

**To add new scroll animations**:
```typescript
// src/pages/Main.tsx (in useEffect)
gsap.fromTo(
  ".your-element",
  {
    opacity: 0,
    y: 100,  // Start 100px down
  },
  {
    opacity: 1,
    y: 0,    // End at normal position
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".your-element",
      start: "top bottom",    // When top of element hits bottom of viewport
      end: "bottom top",      // When bottom of element hits top of viewport
      scrub: 1,               // Smooth scrubbing
      invalidateOnRefresh: true,
    },
  }
);
```

**Animation Guidelines** (CRITICAL):
- Always use `gsap.context()` for cleanup
- Use `will-change` and `force3D` for GPU acceleration
- NO ScrollSmoother (causes React conflicts)
- Timeline positions: 0-1 scale with scrub
- See `docs/GSAP-SCROLLTRIGGER-IMPLEMENTATION.md` for details

### Custom Animations

**File**: `src/index.css:333-350`

Pre-built keyframe animations:
```css
@keyframes slideUpFade { /* Fade in from bottom */ }
@keyframes text-rotation { /* Continuous rotation */ }
```

**Usage**:
```tsx
<div className="animate-[slideUpFade_1s_ease-out]">
  Fades in from bottom
</div>
```

---

## State Management

### Authentication State

**File**: `src/contexts/auth.tsx`

**Provider**: Wraps entire app in `src/main.tsx:11`

**Hook**: `useAuth()`

**Available data & methods**:
```typescript
const {
  user,              // Current user object (or null)
  session,           // Current session (or null)
  loading,           // Is auth loading?
  error,             // Auth error (or null)
  signInWithGoogle,  // () => Promise<void>
  signInWithEmail,   // (credentials) => Promise<data>
  signUpWithEmail,   // (credentials) => Promise<data>
  signOut,           // () => Promise<void>
  clearError,        // () => void
} = useAuth();
```

**Usage in components**:
```tsx
import { useAuth } from "@/contexts/auth";

function MyComponent() {
  const { user, signOut } = useAuth();

  if (!user) return <p>Please log in</p>;

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Supabase Client

**File**: `src/lib/client.ts`

**Usage**:
```typescript
import { supabase } from "@/lib/client";

// Query data
const { data, error } = await supabase
  .from('rides')
  .select('*')
  .eq('status', 'active');

// Insert data
const { data, error } = await supabase
  .from('rides')
  .insert({ pickup_location: {...}, dropoff_location: {...} });
```

**Check if configured**:
```typescript
import { isSupabaseConfigured } from "@/lib/client";

if (isSupabaseConfigured()) {
  // Safe to use Supabase
}
```

### Custom Hooks

#### **useLenis**
**File**: `src/hooks/useLenis.ts`

Initializes smooth scrolling. Auto-called in `App.tsx`.

#### **useMobile**
**File**: `src/hooks/useMobile.ts`

Detects mobile screens.

**Usage**:
```tsx
import { useMobile } from "@/hooks/useMobile";

function MyComponent() {
  const isMobile = useMobile();

  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

#### **useToast**
**File**: `src/hooks/use-toast.ts`

Shows toast notifications.

**Usage**:
```tsx
import { useToast } from "@/hooks/use-toast";

function MyComponent() {
  const { toast } = useToast();

  const showNotification = () => {
    toast({
      title: "Success!",
      description: "Your ride has been booked.",
      variant: "default", // or "destructive"
    });
  };

  return <button onClick={showNotification}>Book Ride</button>;
}
```

---

## Common Customizations

### 1. Change Homepage Hero Text

**File**: `src/components/marketing/Hero.tsx:13-18`

```tsx
<h2 className="text-6xl md:text-7xl lg:text-8xl font-kensington">
  For the Island, By the Island.  {/* ← Change this */}
</h2>
<h1 className="text-5xl md:text-7xl lg:text-9xl font-grante">
  CAYE CRUISER  {/* ← Change this */}
</h1>
```

### 2. Change Footer Links

**File**: `src/components/layout/Footer.tsx:38-105`

```tsx
<div className="space-y-4">
  <h4 className="text-lg font-semibold">Quick Links</h4>
  <ul className="space-y-2">
    <li>
      <a href="/your-new-link">Your New Link</a>  {/* ← Add here */}
    </li>
  </ul>
</div>
```

### 3. Change Contact Information

**File**: `src/components/layout/Footer.tsx:117-128`

```tsx
<div className="flex items-center gap-3">
  <MapPin className="w-4 h-4" />
  <span>Your Address Here</span>  {/* ← Change */}
</div>
<div className="flex items-center gap-3">
  <Mail className="w-4 h-4" />
  <span>your-email@example.com</span>  {/* ← Change */}
</div>
```

Phone number pulls from `.env.local`:
```bash
VITE_WHATSAPP_NUMBER=5012261234
```

### 4. Add New Page

**Step 1**: Create page component
```tsx
// src/pages/YourNewPage.tsx
export default function YourNewPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Your New Page</h1>
      <p>Page content here...</p>
    </div>
  );
}
```

**Step 2**: Add route
```tsx
// src/App.tsx:14-33
import YourNewPage from "@/pages/YourNewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // ... existing routes
      { path: "your-new-page", element: <YourNewPage /> },  // ← Add here
    ],
  },
]);
```

**Step 3**: Add navigation link
```tsx
// src/components/layout/Footer.tsx or BottomNav.tsx
<a href="/your-new-page">Your New Page</a>
```

### 5. Change Map Starting Location

**File**: `src/components/layout/InteractiveMap.tsx:89`

```tsx
initialViewState={{
  latitude: 17.9163,   // ← Change to your latitude
  longitude: -87.9665, // ← Change to your longitude
  zoom: 14             // ← Adjust zoom level (1-22)
}}
```

**Also update**:
```typescript
// src/lib/constants.ts:12-15
export const SAN_PEDRO_CENTER = {
  latitude: 17.9163,   // ← Your center point
  longitude: -87.9665,
};
```

### 6. Change Color Theme

**File**: `src/index.css:20-58`

```css
:root {
  --primary: 60 50% 40%;      /* Lime → Your primary color (H S L) */
  --secondary: 193 24% 55%;   /* Ocean Blue → Your secondary */
  --accent: 17 33% 32%;       /* Cocoa → Your accent */
}
```

**Find HSL values**: Use https://hslpicker.com/

### 7. Add Social Media Links

**File**: `src/components/layout/Footer.tsx:24-34`

```tsx
<div className="flex gap-3">
  <Button variant="secondary" size="icon" asChild>
    <a href="https://facebook.com/yourpage" target="_blank">
      <Facebook className="w-4 h-4" />
    </a>
  </Button>
  <Button variant="secondary" size="icon" asChild>
    <a href="https://instagram.com/yourpage" target="_blank">
      <Instagram className="w-4 h-4" />
    </a>
  </Button>
  {/* Add more social links here */}
</div>
```

### 8. Change Scroll Speed

**File**: `src/hooks/useLenis.ts:16`

```typescript
const lenis = new Lenis({
  duration: 1.2,  // ← Change this (higher = slower, try 0.8 - 2.0)
  // ...
});
```

### 9. Adjust Mobile Navigation

**File**: `src/components/layout/BottomNav.tsx`

Customize nav items, add/remove buttons, change styling.

### 10. Change Button Styles

**File**: `src/components/ui/button.tsx`

Uses `class-variance-authority` for variants.

**Quick override in your component**:
```tsx
<Button className="bg-purple-600 hover:bg-purple-700">
  Custom Purple Button
</Button>
```

---

## File Location Reference

### Quick Find Table

| What you want to change | File Location |
|------------------------|---------------|
| **Homepage hero text** | `src/components/marketing/Hero.tsx:13-18` |
| **About section text** | `src/components/marketing/About.tsx:9-99` |
| **Footer links** | `src/components/layout/Footer.tsx:38-105` |
| **Footer contact info** | `src/components/layout/Footer.tsx:108-130` |
| **Routes** | `src/App.tsx:14-33` |
| **Color theme** | `src/index.css:20-98` |
| **Fonts** | `src/index.css:4,138-150` & `tailwind.config.ts:23-25` |
| **Map center location** | `src/components/layout/InteractiveMap.tsx:89` |
| **Map style** | `src/components/layout/InteractiveMap.tsx:90` |
| **Layout constants** | `src/lib/constants.ts:26-32` |
| **Scroll speed** | `src/hooks/useLenis.ts:16` |
| **Animations** | `src/pages/Main.tsx:25-70` |
| **Mobile nav** | `src/components/layout/BottomNav.tsx` |
| **Environment variables** | `.env.local` (create from `.env.example`) |
| **Phone number** | `.env.local` (VITE_WHATSAPP_NUMBER) |

### Component Import Paths

Using `@/` alias (configured in `vite.config.ts` & `tsconfig.json`):

```typescript
// Components
import { Button } from "@/components/ui/button";
import Hero from "@/components/marketing/Hero";
import Layout from "@/components/layout/Layout";

// Hooks
import { useAuth } from "@/contexts/auth";
import { useMobile } from "@/hooks/useMobile";
import { useToast } from "@/hooks/use-toast";

// Utils
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/client";
import { WHATSAPP_NUMBER, SAN_PEDRO_CENTER } from "@/lib/constants";

// Types
import type { Database } from "@/lib/database.types";
import type { LocationPoint } from "@/lib/constants";
```

### Asset Locations

| Asset Type | Location |
|-----------|----------|
| **Images** | `src/components/images/` |
| **Hero images** | `src/components/images/hero/` |
| **About images** | `src/components/images/about/` |
| **SVG assets** | `src/components/images/*.svg` |
| **Public assets** | `public/` (served from `/`) |

**Import images**:
```typescript
import MyImage from "@/components/images/hero/my-image.jpg";

<img src={MyImage} alt="Description" />
```

---

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## Environment Variables

**File**: `.env.local` (create from `.env.example`)

```bash
# Required for full functionality
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_MAPBOX_TOKEN=pk.your-mapbox-token
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key

# Optional
VITE_WHATSAPP_NUMBER=5012261234
```

**In development**: App works without these (shows placeholders).
**In production**: All required.

---

## Tips for Designers

### 1. Spacing System
Use Tailwind's spacing scale (4px increments):
- `p-4` = 16px padding
- `m-8` = 32px margin
- `gap-6` = 24px gap

### 2. Responsive Images
```tsx
<img
  src={YourImage}
  alt="Description"
  className="w-full md:w-1/2 lg:w-1/3 h-auto object-cover"
/>
```

### 3. Text Sizing
```tsx
<h1 className="text-4xl md:text-6xl lg:text-8xl">
  Responsive Heading
</h1>
```

### 4. Layout Containers
```tsx
<div className="container mx-auto px-4">
  {/* Content automatically centered with padding */}
</div>
```

### 5. Flexbox Layouts
```tsx
<div className="flex flex-col md:flex-row gap-8 items-center justify-between">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

### 6. Grid Layouts
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## Additional Resources

- **TailwindCSS Docs**: https://tailwindcss.com/docs
- **shadcn/ui Components**: https://ui.shadcn.com
- **GSAP Docs**: https://gsap.com/docs/v3/
- **React Router**: https://reactrouter.com/
- **Supabase Docs**: https://supabase.com/docs
- **Mapbox GL JS**: https://docs.mapbox.com/mapbox-gl-js/

---

## Support

For questions about this codebase:
1. Check this guide first
2. Review `docs/` folder for specialized guides
3. Check `.claude/` folder for project configuration

---

**Last Updated**: October 2025
**Version**: 1.0
**Maintainer**: Development Team
