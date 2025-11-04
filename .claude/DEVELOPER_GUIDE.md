# Caye Cruiser - Developer Guide

> **Last Updated**: November 2025
> Quick reference for customizing and extending the Caye Cruiser platform

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

Golf cart ride-sharing platform for San Pedro, Belize with React + TypeScript.

**Stack**: React 18.3, TypeScript 5.4, Vite, TailwindCSS, shadcn/ui (51 components), GSAP + Lenis, Supabase, Mapbox, Stripe, React Router v6, React Hook Form + Zod

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

### Routes (`src/App.tsx:14-33`)

| Route | Component | Auth | Description |
|-------|-----------|------|-------------|
| `/` | Main | Public | Homepage |
| `/cart-rentals` | CartRentals | Public | Long-term rentals |
| `/become-a-partner` | BecomeAPartner | Public | Partner signup |
| `/user-account` | AccountPage (rider) | Protected | User dashboard |
| `/partner-account` | AccountPage (partner) | Protected | Partner dashboard |

### Pages

**Main** (`src/pages/Main.tsx`): ShutterOverlay → Hero → Interactive Map → About sections. Customize layout via `HERO_LAYOUT` constants in `src/lib/constants.ts:26-32` (BIRD_RIGHT_TOP: 675, WAVE_BG_TOP: 800, MAP_NEGATIVE_MARGIN: -475, MAP_HEIGHT: 700)

**CartRentals** (`src/components/marketing/CartRentals.tsx`): Long-term rental info

**BecomeAPartner** (`src/pages/BecomeAPartner.tsx`): Partner onboarding

**AccountPage** (`src/pages/AccountPage.tsx`): Dashboards with `type: "rider" | "partner"` prop. Protected routes redirect if not authenticated

**NotFound** (`src/pages/NotFound.tsx`): 404 page

---

## Design System

### Colors (`src/index.css:20-98`)

**Light Mode**: `--primary: 60 50% 40%` (Lime), `--secondary: 193 24% 55%` (Ocean Blue), `--accent: 17 33% 32%` (Cocoa), `--background: 30 18% 93%` (Sand)

**Dark Mode**: Brighter versions of above

**Usage**: `className="bg-primary text-primary-foreground"` or `className="bg-cocoa bg-sand"`

### Typography (`src/index.css:4,138-150`)

| Font | Use Case | Class |
|------|----------|-------|
| **Grante** | Display/headings | `font-grante` |
| **Kensington** | Decorative | `font-kensington` |
| **Oswald** | Body (default) | auto |
| **Inter** | UI components | auto |

### Layout

**Container**: Center, 2rem padding, 1400px max width (`tailwind.config.ts:14-20`)
**Radius**: `--radius: 0.5rem` (8px). Use `rounded-lg`, `rounded-md`, `rounded-sm`
**Breakpoints**: sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px

---

## Components Guide

### Layout

| Component | File | Description |
|-----------|------|-------------|
| **Layout** | `layout/Layout.tsx` | Main wrapper: BottomNav + Outlet + FloatingMapButton + Footer |
| **Section** | `layout/Section.tsx` | Spacing wrapper. Props: `spacing`, `background`, `fullWidth`, `noPadding` |
| **BottomNav** | `layout/BottomNav.tsx` | Mobile navigation |
| **Footer** | `layout/Footer.tsx` | Site footer with links, services, contact (uses WHATSAPP_NUMBER) |

### Marketing

| Component | File | Description |
|-----------|------|-------------|
| **Hero** | `marketing/Hero.tsx` | Hero section. Edit text at lines 13-18 |
| **About** | `marketing/About.tsx` | Decorative text with graphics |
| **VehicleClasses** | `marketing/VehicleClasses.tsx` | Vehicle types display |
| **CartRentals** | `marketing/CartRentals.tsx` | Rental info page |

### Interactive

**InteractiveMap** (`layout/InteractiveMap.tsx`): Mapbox map with props: `pickup`, `dropoff`, `isLoading`, `onMapClick`, `onRequestRide`. Customize center at line 89 (lat: 17.9163, lng: -87.9665). Map styles: streets-v11, outdoors-v11, light-v10, dark-v10, satellite-v9

**FloatingMapButton** (`ui/FloatingMapButton.tsx`): Rotating button (bottom-right). Style in `src/index.css:157-223`

**ShutterOverlay** (`ui/ShutterOverlay.tsx`): Page load animation

### shadcn/ui (`src/components/ui/`)

51 components: button, card, dialog, input, form, toast, sheet, dropdown-menu, tabs, etc.

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
```

### Auth

**AuthDialog** (`auth/AuthDialog.tsx`): Login/signup modal
**ProtectedRoute** (`auth/ProtectedRoute.tsx`): Wraps protected routes, redirects if not authenticated
**ErrorBoundary** (`auth/ErrorBoundary.tsx`): Catches React errors

---

## Styling & Customization

**System**: TailwindCSS (utilities) + CSS Variables (`src/index.css`) + Custom CSS

**Customize Colors**: Edit HSL values in `src/index.css:20-58`. Use https://hslpicker.com for conversions

**Add Fonts**:
1. Import in `src/index.css`
2. Add to `tailwind.config.ts:23-25` fontFamily
3. Use `className="font-yourfont"`

**Custom Utilities** (`src/index.css:228-327`): `.font-grante`, `.font-kensington`, `.bg-sand`, `.bg-ocean-blue`, `.bg-cocoa`, `.text-cocoa`, `.image-transform`, `.gpu-accelerated`

---

## Animation System

### Lenis Smooth Scrolling (`src/hooks/useLenis.ts`)

Auto-initialized in `App.tsx:37`. Config: `duration: 1.2` (higher = slower). Disable by commenting out `useLenis()` call.

### GSAP ScrollTrigger (`src/pages/Main.tsx:25-70`)

Animates `.image-transform` elements on scroll (rotation tied to scroll position).

**Add animations**:
```typescript
gsap.fromTo(".your-element", { opacity: 0, y: 100 }, {
  opacity: 1, y: 0, ease: "power2.out",
  scrollTrigger: { trigger: ".your-element", start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true }
});
```

**Rules**: Use `gsap.context()` for cleanup, `will-change` + `force3D` for GPU, NO ScrollSmoother. See `.claude/docs/GSAP-SCROLLTRIGGER-IMPLEMENTATION.md`

**Custom keyframes** (`src/index.css:333-350`): `slideUpFade`, `text-rotation`. Use: `className="animate-[slideUpFade_1s_ease-out]"`

---

## State Management

### Auth (`src/contexts/auth.tsx`)

**useAuth()** hook: `user`, `session`, `loading`, `error`, `signInWithGoogle()`, `signInWithEmail()`, `signUpWithEmail()`, `signOut()`, `clearError()`

```tsx
import { useAuth } from "@/contexts/auth";
const { user, signOut } = useAuth();
```

### Supabase (`src/lib/client.ts`)

```typescript
import { supabase, isSupabaseConfigured } from "@/lib/client";
const { data, error } = await supabase.from('rides').select('*').eq('status', 'active');
```

### Custom Hooks

**useLenis** (`hooks/useLenis.ts`): Smooth scrolling (auto-called in App.tsx)
**useMobile** (`hooks/useMobile.ts`): Detects mobile screens
**useToast** (`hooks/use-toast.ts`): Toast notifications - `toast({ title, description, variant })`

---

## Common Customizations

| Task | File | Line/Details |
|------|------|--------------|
| **Hero text** | `marketing/Hero.tsx` | Lines 13-18 |
| **Footer links** | `layout/Footer.tsx` | Lines 38-105 |
| **Contact info** | `layout/Footer.tsx` | Lines 117-128. Phone: `.env.local` VITE_WHATSAPP_NUMBER |
| **Map location** | `layout/InteractiveMap.tsx` + `lib/constants.ts` | Line 89 + lines 12-15 (lat/lng/zoom) |
| **Color theme** | `index.css` | Lines 20-58 (HSL values, use hslpicker.com) |
| **Social links** | `layout/Footer.tsx` | Lines 24-34 |
| **Scroll speed** | `hooks/useLenis.ts` | Line 16, duration: 1.2 (0.8-2.0) |
| **Mobile nav** | `layout/BottomNav.tsx` | Full file |
| **Button styles** | `ui/button.tsx` | Override with className |

**Add new page**:
1. Create `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx:14-33` children array
3. Add nav link in Footer/BottomNav

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

### Import Patterns (using `@/` alias)

```typescript
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/lib/client";
import type { Database } from "@/lib/database.types";
```

### Assets

**Images**: `src/components/images/` (hero/, about/, *.svg)
**Public**: `public/` (served from `/`)

```tsx
import MyImage from "@/components/images/hero/my-image.jpg";
<img src={MyImage} alt="Description" />
```

---

## Commands & Environment

**Dev**: `npm install`, `npm run dev` (localhost:5173), `npm run build`, `npm run preview`, `npm run lint`

**Env** (`.env.local`): VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_MAPBOX_TOKEN, VITE_STRIPE_PUBLISHABLE_KEY, VITE_WHATSAPP_NUMBER (optional in dev, required in prod)

---

## Quick Tips

**Spacing**: Use Tailwind scale (p-4=16px, m-8=32px, gap-6=24px)
**Responsive**: `className="text-4xl md:text-6xl lg:text-8xl"` or `w-full md:w-1/2 lg:w-1/3`
**Container**: `className="container mx-auto px-4"`
**Flex**: `className="flex flex-col md:flex-row gap-8 items-center"`
**Grid**: `className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"`

---

## Resources

[TailwindCSS](https://tailwindcss.com/docs) • [shadcn/ui](https://ui.shadcn.com) • [GSAP](https://gsap.com/docs/v3/) • [React Router](https://reactrouter.com/) • [Supabase](https://supabase.com/docs) • [Mapbox](https://docs.mapbox.com/mapbox-gl-js/)

**Support**: Check this guide → `.claude/docs/` → `.claude/CLAUDE.md`

---

**Last Updated**: November 2025
