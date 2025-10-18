# Caye Cruiser - Project Specification

## Tech Stack
- **Frontend**: React 18 + TypeScript, Vite, React Router, TailwindCSS + Radix UI
- **Backend**: Supabase (database, auth, real-time), Stripe, Mapbox, WhatsApp (n8n)
- **Animation**: GSAP ScrollTrigger + Lenis (smooth scrolling)
- **Key Libraries**: React Hook Form + Zod, TanStack Query, Sonner, Lucide, Recharts

## Project Structure
```
src/
├── components/
│   ├── auth/        # Authentication
│   ├── layout/      # Header, Footer, Main, InteractiveMap
│   ├── marketing/   # Hero, About, HowItWorks, VehicleClasses
│   ├── partner/     # Partner dashboard
│   ├── ride/        # Ride components
│   └── ui/          # 51 shadcn/ui components
├── hooks/           # Custom hooks
├── pages/           # Route pages
├── services/        # API integrations
└── types/           # TypeScript types
```

## Design System
- **Colors**: Lime (primary), Ocean Blue, Cocoa, Sand background
- **Fonts**: Kensington (display), Inter (body)
- **UI**: Radix UI primitives + TailwindCSS + dark/light mode

## Routes
```
/ (Home) - Landing page
/cart-rentals - Long-term rentals
/become-a-partner - Driver onboarding
/user-account (Protected) - User dashboard
/partner-account (Protected) - Partner dashboard
```

## Key Components

**Pages**: Main (Home), CartRentals, BecomeAPartner, AccountPage (User/Partner), NotFound
**Layout**: Layout, BottomNav, Footer, Section, InteractiveMap (Mapbox), MapPlaceholder
**Auth**: AuthDialog, ProtectedRoute, ErrorBoundary
**Marketing**: Hero, About, VehicleClasses, CartRentals
**UI (Custom)**: FloatingMapButton, ShutterOverlay, Noise
**UI (shadcn)**: 51 components (button, card, dialog, form, input, etc.)
**Partner**: (To be implemented: Dashboard, Settings, RideQueue, EarningsStats)
**Ride**: (To be implemented: RideCard, RideHistory, RideRequestForm, RideTracker)

## Hooks & Services

**Hooks**: useAuth, useLenis, useMobile, use-toast
**Services**: (To be implemented: stripe, mapbox integration, whatsapp via n8n)
**Lib**: client.ts (Supabase), constants.ts, env.ts (Zod validation), utils.ts, database.types.ts

## State Management
- SupabaseProvider + AuthProvider
- React Query for server state
- Context for global state
- Custom hooks for business logic

## Development

**Commands**:
```bash
npm install          # Install
npm run dev          # Dev server (localhost:5173)
npm run build        # Production build
```

**Config**: vite.config.ts, tailwind.config.ts, tsconfig.json, .env.local

## Environment Variables
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_STRIPE_PUBLISHABLE_KEY
VITE_MAPBOX_ACCESS_TOKEN
```

## Animations (GSAP + Lenis)
- **Lenis Smooth Scrolling**: Initialized via `useLenis()` hook in App.tsx
- **GSAP ScrollTrigger**: Standard implementation (NO ScrollSmoother)
- **Critical**: Do NOT use `scroller` property (Lenis handles scrolling)
- **Required**: Always use `gsap.context()` for cleanup
- **Optimization**: Use `will-change`, `force3D`, and `invalidateOnRefresh: true`
- See `docs/GSAP-SCROLLTRIGGER-IMPLEMENTATION.md` for complete guide
- See `SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md` for clip-path animation patterns

## Integrations
- **Supabase**: Auth, real-time DB, storage
- **Stripe**: Payments, webhooks
- **Mapbox**: Maps, geocoding, routing
- **n8n**: WhatsApp notifications, workflow automation