# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Response Style Preferences

- **Concise summaries**: Provide brief summaries of changes without including full code blocks in explanations
- **Focus on intent**: Explain what changed and why, not the literal code content
- **Reference locations**: Use file paths and line numbers (e.g., `ScrollingCruise.tsx:15-30`) instead of pasting code
- **Action-oriented**: Lead with what was done, followed by brief reasoning

## Project Overview

**Caye Cruiser** is a React + TypeScript web application for golf cart ride-sharing and rentals in San Pedro, Belize. The app features a brutalist design aesthetic with smooth scroll animations, Supabase backend integration, interactive Mapbox maps, and Stripe payments.

**Purpose**: Connects riders with drivers for on-demand golf cart transportation in San Pedro, featuring dual dashboards (riders + partners), real-time ride tracking, and WhatsApp notifications.

## Tech Stack

- **Frontend**: React 18.3, TypeScript 5.4, Vite 7.1
- **Styling**: Tailwind CSS 3.4 + shadcn/ui (51 Radix UI components)
- **Animation**: GSAP 3.13 ScrollTrigger + Lenis 1.3 (smooth scrolling)
- **Backend**: Supabase (Auth, Database, Real-time, Storage)
- **Maps**: Mapbox GL JS 3.0 + React Map GL 7.1
- **Payments**: Stripe 7.9
- **Routing**: React Router 6.30
- **Forms**: React Hook Form 7.61 + Zod 3.25
- **State**: React Context + TanStack Query 5.83
- **Notifications**: Sonner (toasts) + n8n (WhatsApp automation)

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code with ESLint
```

## Environment Setup

Create `.env.local` from `.env.example`. All variables are **optional in development** - the app gracefully degrades with placeholders:

- `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` - Backend/auth (see `src/lib/client.ts` for fallback)
- `VITE_MAPBOX_TOKEN` - Maps (falls back to `MapPlaceholder` component)
- `VITE_STRIPE_PUBLISHABLE_KEY` - Payments
- `VITE_WHATSAPP_NUMBER` - WhatsApp Business integration

**Key Pattern**: Environment validation in `src/lib/env.ts` uses Zod with optional schema in dev, required in production.

**Development Behavior**: App works without env vars (shows placeholders), warnings in console but no crashes.

## Architecture

### High-Level Structure

```
src/
├── components/
│   ├── auth/          # AuthDialog, ProtectedRoute, ErrorBoundary
│   ├── images/        # Static assets (SVGs, JPGs) - about/, hero/
│   ├── layout/        # Layout, Section, Footer, BottomNav, InteractiveMap
│   ├── sections/      # Hero, About, ScrollingCruise, Testimonials, LongTermRentals, VehicleClasses
│   └── ui/            # 51 shadcn/ui components + custom (Noise, ShutterOverlay, CustomWaveBackground, FloatingMapButton)
├── contexts/
│   └── auth.tsx       # Consolidated auth context, provider, and hook
├── hooks/             # useLenis (smooth scroll), useMobile, use-toast
├── lib/               # client.ts (Supabase), env.ts (validation), constants.ts, utils.ts, database.types.ts
├── pages/             # Main (home), BecomeAPartner, AccountPage, NotFound
└── App.tsx            # Router config + Lenis initialization
```

### Routes

| Route | Component | Auth | Description |
|-------|-----------|------|-------------|
| `/` | Main | Public | Homepage (Hero + Map + About + sections) |
| `/cart-rentals` | CartRentals | Public | Long-term rental information |
| `/become-a-partner` | BecomeAPartner | Public | Partner/driver signup |
| `/user-account` | AccountPage (rider) | Protected | User dashboard |
| `/partner-account` | AccountPage (partner) | Protected | Partner dashboard |
| `*` (404) | NotFound | Public | Page not found |

### Key Architectural Patterns

**1. Layout System**
- Single `Layout` component wraps all routes (provides nav/footer)
- `Section` component enforces consistent spacing with props: `spacing`, `background`, `fullWidth`, `noPadding`
- All pages use the `Section` wrapper pattern for consistency

**2. Animation Architecture** (CRITICAL)
- **Lenis** provides smooth scrolling (initialized via `useLenis()` hook in `App.tsx`)
- **GSAP ScrollTrigger** for scroll-based animations (NO ScrollSmoother - causes React conflicts)
- Always use `gsap.context()` for proper cleanup in `useEffect` returns
- Pattern: Set `will-change: transform` and `force3D: true` for GPU acceleration
- **Important**: Do NOT use `scroller` property - Lenis handles scrolling at document level

Example from `Main.tsx:31-75`:
```tsx
useEffect(() => {
  let ctx: gsap.Context | null = null;
  const timer = setTimeout(() => {
    const elements = gsap.utils.toArray<HTMLElement>(".image-transform");
    ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.set(el, { willChange: "transform", force3D: true });
        gsap.fromTo(el, {...}, { scrollTrigger: {...} });
      });
    });
    ScrollTrigger.refresh();
  }, 100);
  return () => {
    clearTimeout(timer);
    ctx?.revert(); // Kills all animations and ScrollTriggers
  };
}, []);
```

**3. Layout Constants Pattern**
Centralized layout values in `src/lib/constants.ts`:
```tsx
export const HERO_LAYOUT = {
  WAVE_BG_TOP: 550,
  MAP_NEGATIVE_MARGIN: -330,
  MAP_HEIGHT: 700,
} as const;

export const SAN_PEDRO_CENTER = {
  latitude: 17.9157,
  longitude: -87.9654,
  zoom: 14,
} as const;
```
Used throughout `Main.tsx` for coordinating overlapping sections (Hero → Map → About).

**4. Graceful Degradation**
- Supabase: `isSupabaseConfigured()` check before operations
- Mapbox: Conditional render `{hasValidMapboxToken ? <InteractiveMap /> : <MapPlaceholder />}`
- Environment validation shows warnings but doesn't crash

**5. Import Alias**
Use `@/` for all imports (configured in `vite.config.ts`):
```tsx
import Section from "@/components/layout/Section";
import { HERO_LAYOUT } from "@/lib/constants";
```

### Page Flow

**Main.tsx** (homepage) implements a complex layered layout:
1. `<ShutterOverlay />` - Opening animation
2. Hero section with absolute-positioned decorative birds/toucans
3. Map section with negative margin to overlap Hero
4. CustomWaveBackground positioned between map and subsequent sections
5. About → ScrollingCruise → Testimonials → LongTermRentals sections

**Key**: Background decorations use absolute positioning coordinated via z-index layers and HERO_LAYOUT constants.

## Design System

### Colors (HSL CSS Variables)

Defined in `src/index.css:20-58`:
```css
--primary: 60 50% 40%       /* Lime */
--secondary: 193 24% 55%    /* Ocean Blue */
--accent: 17 33% 32%        /* Cocoa */
--background: 30 18% 93%    /* Sand/Beige */
--foreground: 20 14.3% 4.1% /* Dark text */
```

### Fonts

```css
--font-grante: 'grante', 'GRANTE', 'Oswald', 'Arial Black', sans-serif
--font-kensington: 'Kensington', 'Oswald'
--font-body: 'Oswald'
--font-ui: 'Inter'
```

**Usage**:
- **GRANTE** (Adobe Fonts) - Display/headings, `font-grante`
- **Kensington** - Decorative text, `font-kensington`
- **Oswald** - Body text (default)
- **Inter** - UI components (Google Fonts)

### Custom Utilities

In `src/index.css:228+`:
- `.image-transform` - GPU-accelerated transforms
- `.bg-cocoa`, `.text-cocoa` - Accent colors
- `.bg-sand` - Sand background
- `.font-grante`, `.font-kensington` - Font classes

### State Management

- **Authentication**: `src/contexts/auth.tsx` provides `useAuth()` hook
- **Supabase client**: `src/lib/client.ts` exports typed client
- **Forms**: React Hook Form + Zod validation
- **Server state**: TanStack Query v5 (configured but not fully integrated)
- **Toast notifications**: `useToast()` hook + Sonner

## Implementation Status

### ✅ Completed Features

**Core Infrastructure**:
- React 18.3 + TypeScript 5.4 setup with Vite
- Tailwind CSS + shadcn/ui (51 components installed)
- React Router v6 navigation
- Lenis smooth scrolling + GSAP ScrollTrigger (NO ScrollSmoother)
- Environment variable validation with Zod
- Error boundary implementation
- Development-friendly setup (optional env vars)

**Authentication**:
- Supabase auth integration
- AuthProvider context with full lifecycle
- Protected routes
- Google OAuth + email/password
- Development mode fallbacks

**UI & Pages**:
- Layout, Footer, BottomNav, Section components
- Main/Home, Cart Rentals, Become a Partner, Account pages
- Hero, About, VehicleClasses, ShutterOverlay sections
- Interactive Mapbox map + placeholder fallback
- Floating map button with rotating text

**Design System**:
- Custom color palette (Lime, Ocean Blue, Cocoa, Sand)
- Font system (GRANTE, Kensington, Oswald, Inter)
- Dark mode support (configured, not fully implemented)
- Responsive breakpoints
- Custom utility classes

**Animations**:
- Lenis smooth scrolling (v1.3.11)
- GSAP ScrollTrigger (standard, NO ScrollSmoother)
- ShutterOverlay opening animation
- Rotating bird/toucan decorative elements
- GPU-accelerated image transforms

### 🚧 Partial Implementation

**Database**:
- Supabase schema defined (migrations exist but empty)
- Tables planned: rides, partners, vehicles, locations, payments, notifications
- RLS policies (files exist in supabase/policies/)
- Real-time subscriptions (not yet implemented)

**Integrations**:
- Mapbox (configured, basic map working)
- Stripe (configured, not integrated into flows)
- WhatsApp via n8n (7 workflows defined but not connected)

### ❌ Not Yet Implemented

**Core Features**:
- Complete ride booking flow
- Real-time ride tracking
- Partner onboarding process
- Payment processing integration
- User profile management
- Partner dashboard functionality
- Ride history and management
- Vehicle management
- Earnings tracking
- Rating and review system

**Advanced Features**:
- Push notifications
- SMS/WhatsApp integration (active)
- Route optimization
- ETA calculations
- Pricing calculator
- Surge pricing
- Promo codes/discounts
- Referral system

## Critical Rules & Gotchas

### Animation Rules (MUST READ)
1. ❌ **NO ScrollSmoother** - Removed from project, causes React conflicts
2. ✅ **Use standard ScrollTrigger** with Lenis smooth scrolling
3. ✅ **Never set `scroller` property** - Lenis handles document-level scrolling
4. ✅ **Always cleanup** with `gsap.context()` and `ctx.revert()`
5. ✅ **GPU acceleration** - Use `will-change` and `force3D: true`
6. ✅ **Use `invalidateOnRefresh: true`** for responsive behavior
7. ⚠️ **Timeline scale** - With scrub, positions use 0-1 scale
8. ⚠️ **No pinning inside grid/flex layouts** - Causes layout issues

**See**: `.claude/docs/GSAP-SCROLLTRIGGER-IMPLEMENTATION.md` for complete debugging guide

### Component Patterns
- Use `Section` wrapper for consistent spacing
- Check feature flags before rendering (Supabase, Mapbox)
- Protected routes wrap with `<ProtectedRoute>` component
- Forms use React Hook Form + Zod schemas

### Code Style
- No `any` types
- Use type imports: `import type { Database } from "@/lib/database.types"`
- Prefer functional components with hooks
- Extract business logic to custom hooks
- Component-first architecture

## Common Tasks

### Add a New Page
1. Create component in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx:13-39` router config
3. Add nav link in `src/components/layout/Footer.tsx` or `BottomNav.tsx`

### Modify Hero Layout
Edit `src/lib/constants.ts:26-31` HERO_LAYOUT values, used in `src/pages/Main.tsx`

### Change Map Center
Update both:
- `src/lib/constants.ts:13-16` (SAN_PEDRO_CENTER)
- `src/components/layout/InteractiveMap.tsx:89` (initialViewState)

### Add Scroll Animation
Follow pattern in `src/pages/Main.tsx:31-75`:
- Use `gsap.context()` for cleanup
- Add `.image-transform` class or custom selector
- Set GPU acceleration properties
- Return cleanup function with `ctx?.revert()`

### Modify Color Scheme
Edit CSS variables in `src/index.css:20-58` (HSL format)

### Add New Component
1. If using shadcn/ui: `npx shadcn-ui@latest add [component-name]`
2. Custom components: Create in `src/components/[category]/ComponentName.tsx`
3. Follow existing patterns (typed props, functional components)
4. Import with `@/` alias

### Change Fonts
1. Update font imports in `src/index.css:1-18`
2. Modify CSS variables in `src/index.css:75-78`
3. Update Tailwind config if needed in `tailwind.config.ts`

## Documentation

### Primary Documentation

**This file (CLAUDE.md)** - Main reference for Claude Code, contains:
- Project overview & tech stack
- Architecture patterns
- Implementation status
- Critical rules
- Common tasks

**`.claude/DEVELOPER_GUIDE.md`** - Complete customization guide (1100+ lines) for designers & developers:
- Detailed component guide (all 51+ components)
- Complete file structure
- Styling & customization
- Tips for designers
- Quick find reference table

### Technical Guides

**`.claude/docs/GSAP-SCROLLTRIGGER-IMPLEMENTATION.md`** - Animation patterns & debugging:
- Why NO ScrollSmoother in React
- Standard ScrollTrigger patterns
- Complete debugging checklist
- Common patterns (horizontal scroll, stagger, SVG path)
- Error solutions & best practices

**`.claude/docs/POLYGON-CLIPPATH-ANIMATION-GUIDE.md`** - Advanced clip-path animations:
- Polygon clip-path with dynamic calculation
- Syncing animations via `onUpdate` callback
- Viewport height unit techniques
- Visual diagrams & complete implementation

**`.claude/docs/HOWITWORKS-CUSTOMIZATION-GUIDE.md`** - Horizontal scroll component customization

**`.claude/SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md`** - Debugging log (11 attempts documented):
- Learning from past mistakes
- Clip-path animation solutions

### Specialized Topics

**`.claude/figma-to-standalone-workflow.md`** - Figma design conversion workflow

**`.claude/docs/agents/`** - Specialized agent documentation:
- `animation-agent.md` - GSAP & ScrollTrigger specialist
- `component-agent.md` - shadcn/ui & React components
- `supabase-agent.md` - Database, auth & real-time
- `figma-agent.md` - Design-to-code conversion
- `README.md` - Agent system overview

## Known Issues & Limitations

### Current Limitations
1. **Database migrations are empty** - Schema not yet implemented
2. **n8n workflows defined but not connected** - Workflows exist but not active
3. **Ride booking flow incomplete** - UI exists, backend not connected
4. **Partner dashboard empty** - Placeholder only
5. **Real-time features not implemented** - Subscriptions not set up

### Resolved Issues
1. ✅ ScrollSmoother conflicts - Removed, using standard ScrollTrigger
2. ✅ ShutterOverlay animation - Fixed clip-path approach (11 attempts documented)
3. ✅ Environment variable crashes - Made optional for development
4. ✅ Mapbox token errors - Added conditional rendering and placeholder

## Next Steps (Recommended Priority)

### Phase 1: Backend Setup
1. Create and run Supabase database migrations
2. Implement RLS policies
3. Test auth flows end-to-end
4. Set up real-time subscriptions

### Phase 2: Core Features
1. Complete ride booking flow
2. Implement ride history
3. Partner onboarding process
4. Basic payment integration with Stripe

### Phase 3: Real-time & Notifications
1. Connect n8n workflows
2. Implement WhatsApp notifications
3. Real-time ride tracking
4. Partner ride queue

### Phase 4: Polish & Launch
1. Complete partner dashboard
2. User profile management
3. Rating and review system
4. Performance optimization
5. Production deployment

## Support

When encountering issues:
1. Check this CLAUDE.md for high-level patterns and status
2. Consult `.claude/DEVELOPER_GUIDE.md` for detailed customization
3. Check `.claude/docs/GSAP-SCROLLTRIGGER-IMPLEMENTATION.md` for animation issues
4. Review debugging logs in `.claude/SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md` for similar issues
5. Consult relevant agent documentation in `.claude/docs/agents/`

**Last Updated**: October 2025
