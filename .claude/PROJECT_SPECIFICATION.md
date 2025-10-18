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

**Pages**: Home, CartRentals, BecomeAPartner, UserAccount, PartnerAccount
**Layout**: Header, Footer, Main (smooth scroll), InteractiveMap (Mapbox)
**Auth**: AuthDialog, ProtectedRoute
**Marketing**: Hero, HowItWorks, About, VehicleClasses
**Partner**: Dashboard, Onboarding, Settings, RideQueue, EarningsStats
**Ride**: RideCard, RideHistory, RideRequestForm, RideTracker

## Hooks & Services

**Hooks**: useAuth, useSupabase, useLocation, useRides, useMobile
**Services**: stripe.ts, mapbox.ts, whatsapp.ts, analytics.ts
**Types**: api.ts, database.ts, supabase.ts

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

## Animations (GSAP)
- **ScrollSmoother**: `#smooth-wrapper` → `#smooth-content`
- **Critical**: All ScrollTriggers must use `scroller: "#smooth-content"`
- See `SCROLL_ANIMATION_LESSONS_LEARNED.md` for details
- Lenis for additional smooth scrolling

## Integrations
- **Supabase**: Auth, real-time DB, storage
- **Stripe**: Payments, webhooks
- **Mapbox**: Maps, geocoding, routing
- **n8n**: WhatsApp notifications, workflow automation