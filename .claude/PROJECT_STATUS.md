# Caye Cruiser - Project Status & Architecture

> **Last Updated**: October 2025
> **Version**: 1.0.0
> **Status**: Active Development

---

## Current Implementation Status

### ✅ Completed Features

#### Core Infrastructure
- [x] React 18.3 + TypeScript 5.4 setup with Vite
- [x] Tailwind CSS + shadcn/ui (51 components installed)
- [x] React Router v6 navigation
- [x] Lenis smooth scrolling integration
- [x] GSAP ScrollTrigger animations (NO ScrollSmoother)
- [x] Environment variable validation with Zod
- [x] Error boundary implementation
- [x] Development-friendly environment setup (optional env vars)

#### Authentication System
- [x] Supabase auth integration
- [x] AuthProvider context with full lifecycle management
- [x] Protected routes implementation
- [x] Google OAuth support (configured)
- [x] Email/password authentication
- [x] Development mode fallbacks when Supabase not configured

#### Layout & Navigation
- [x] Main layout component with outlet
- [x] Bottom navigation (mobile-optimized)
- [x] Footer with contact info and links
- [x] Floating map button with rotating text animation
- [x] Section component for consistent spacing

#### Pages
- [x] Main/Home page with hero, map, and about sections
- [x] Cart Rentals page
- [x] Become a Partner page
- [x] User Account page (protected)
- [x] Partner Account page (protected)
- [x] 404 Not Found page

#### UI Components (Marketing)
- [x] Hero section with GRANTE font and Kensington decorative text
- [x] About section with decorative bird/toucan graphics
- [x] ShutterOverlay with opening animation and clip-path text reveal
- [x] Interactive Map with Mapbox GL (conditional rendering based on token)
- [x] Map Placeholder (shows when Mapbox not configured)
- [x] Vehicle Classes component

#### Design System
- [x] Custom color palette (Lime, Ocean Blue, Cocoa, Sand)
- [x] Font system: GRANTE (headings), Kensington (decorative), Oswald (body), Inter (UI)
- [x] Dark mode support (configured, not fully implemented)
- [x] Responsive breakpoints (sm, md, lg, xl, 2xl)
- [x] Custom utility classes (.font-grante, .bg-sand, .text-cocoa, etc.)

#### Animations
- [x] Lenis smooth scrolling (v1.3.11)
- [x] GSAP ScrollTrigger animations (standard, NO ScrollSmoother)
- [x] ShutterOverlay opening animation
- [x] Rotating bird/toucan decorative elements
- [x] Floating map button text rotation
- [x] GPU-accelerated image transforms

### 🚧 In Progress / Partial Implementation

#### Database Integration
- [ ] Supabase database schema defined (migrations exist but empty)
- [ ] Database tables: rides, partners, vehicles, locations, payments, notifications
- [ ] Row Level Security policies (files exist in supabase/policies/)
- [ ] Real-time subscriptions (not yet implemented)

#### Integrations
- [ ] Mapbox integration (configured, basic map working)
- [ ] Stripe payment processing (configured, not integrated)
- [ ] WhatsApp notifications via n8n (workflows defined, not connected)
- [ ] Analytics sync (n8n workflow defined)

#### n8n Workflows
- [ ] WhatsApp notification sender (defined)
- [ ] WhatsApp ride dispatcher (defined)
- [ ] WhatsApp webhook processor (defined)
- [ ] Database user sync (defined)
- [ ] Database ride logger (defined)
- [ ] Stripe webhook handler (defined)
- [ ] Analytics sync (defined)

### ❌ Not Yet Implemented

#### Core Features
- [ ] Complete ride booking flow
- [ ] Real-time ride tracking
- [ ] Partner onboarding process
- [ ] Payment processing integration
- [ ] User profile management
- [ ] Partner dashboard functionality
- [ ] Ride history and management
- [ ] Vehicle management
- [ ] Earnings tracking for partners
- [ ] Rating and review system

#### Advanced Features
- [ ] Push notifications
- [ ] SMS/WhatsApp integration (active)
- [ ] Route optimization
- [ ] ETA calculations
- [ ] Pricing calculator
- [ ] Surge pricing
- [ ] Promo codes / discounts
- [ ] Referral system

---

## Technical Architecture

### Frontend Structure
```
src/
├── components/
│   ├── auth/              # Authentication (Dialog, Protected Route, Error Boundary)
│   ├── images/            # Static assets (SVGs, JPGs)
│   │   ├── about/         # About section graphics
│   │   └── hero/          # Hero section graphics
│   ├── layout/            # Layout components (Layout, Footer, BottomNav, Section, Map)
│   ├── marketing/         # Marketing pages (Hero, About, VehicleClasses, CartRentals)
│   └── ui/                # shadcn/ui components (51 total) + custom (FloatingMapButton, ShutterOverlay, Noise)
├── contexts/
│   └── auth.tsx           # Consolidated auth context, provider, and hook
├── hooks/
│   ├── useLenis.ts        # Smooth scrolling hook
│   ├── useMobile.ts       # Mobile detection hook
│   └── use-toast.ts       # Toast notifications hook
├── lib/
│   ├── client.ts          # Supabase client initialization
│   ├── constants.ts       # App constants and types (WHATSAPP_NUMBER, SAN_PEDRO_CENTER, HERO_LAYOUT)
│   ├── database.types.ts  # Supabase database types
│   ├── env.ts             # Environment validation with Zod
│   └── utils.ts           # Utility functions (cn, etc.)
├── pages/
│   ├── Main.tsx           # Homepage (Hero + Map + About)
│   ├── BecomeAPartner.tsx # Partner onboarding
│   ├── AccountPage.tsx    # User/Partner dashboard
│   └── NotFound.tsx       # 404 page
├── App.tsx                # Router configuration + Lenis initialization
├── main.tsx               # React root + AuthProvider
└── index.css              # Global styles, fonts, animations
```

### Backend Structure
```
supabase/
├── config.toml            # Supabase project config
├── migrations/            # Database migrations (empty placeholders)
│   ├── 001_initial_schema.sql
│   ├── 002_points_of_interest.sql
│   └── 003_add_coordinates.sql
└── policies/              # RLS policies (directory exists)

n8n-workflow/
├── database/              # Database automation workflows
│   ├── user-sync.json
│   └── ride-logger.json
├── integrations/          # Third-party integrations
│   ├── analytics-sync.json
│   └── stripe-webhook.json
└── whatsapp/              # WhatsApp automation
    ├── notification-sender.json
    ├── ride-dispatcher.json
    └── webhook-processor.json
```

### Key Dependencies
```json
{
  "react": "^18.3.1",
  "typescript": "^5.4.5",
  "vite": "^7.1.5",
  "tailwindcss": "^3.4.4",
  "gsap": "^3.13.0",
  "lenis": "^1.3.11",
  "@supabase/supabase-js": "^2.39.8",
  "@tanstack/react-query": "^5.83.0",
  "react-router-dom": "^6.30.1",
  "react-hook-form": "^7.61.1",
  "zod": "^3.25.76",
  "mapbox-gl": "^3.0.0",
  "react-map-gl": "7.1.7",
  "@stripe/stripe-js": "^7.9.0",
  "class-variance-authority": "^0.7.1",
  "lucide-react": "^0.462.0",
  "sonner": "^1.7.4"
}
```

---

## Animation System

### CRITICAL: NO ScrollSmoother
- **Status**: Removed from project
- **Reason**: Causes React lifecycle conflicts, race conditions, and complexity
- **Solution**: Using standard GSAP ScrollTrigger + Lenis for smooth scrolling
- **Documentation**: See `.claude/docs/GSAP-SCROLLTRIGGER-IMPLEMENTATION.md`

### Current Animations
1. **Lenis Smooth Scrolling** - Applied globally via `useLenis()` hook in App.tsx
2. **ShutterOverlay** - Opening animation with clip-path text reveal (see SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md)
3. **Decorative Elements** - Rotating birds/toucans on scroll (.image-transform class)
4. **Floating Map Button** - Rotating text animation (CSS-based)

### Animation Guidelines
- Always use `gsap.context()` for proper cleanup
- Use `will-change` and `force3D` for GPU acceleration
- Timeline positions: 0-1 scale with scrub
- NO pinning inside grid/flex layouts
- Use `invalidateOnRefresh: true` for responsive behavior

---

## Environment Configuration

### Required (Production)
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_MAPBOX_TOKEN=pk.your-mapbox-token
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-key
```

### Optional (Development)
```bash
VITE_WHATSAPP_NUMBER=501XXXXXXX
```

### Development Behavior
- App works without env vars (shows placeholders)
- Supabase: Auth disabled, fallback client created
- Mapbox: Map placeholder shown instead of real map
- Stripe: Not initialized
- Warnings in console, but app doesn't crash

---

## Routes

| Route | Component | Auth | Description |
|-------|-----------|------|-------------|
| `/` | Main | Public | Homepage (Hero + Map + About) |
| `/cart-rentals` | CartRentals | Public | Long-term rental information |
| `/become-a-partner` | BecomeAPartner | Public | Partner/driver signup |
| `/user-account` | AccountPage (rider) | Protected | User dashboard |
| `/partner-account` | AccountPage (partner) | Protected | Partner dashboard |
| `*` (404) | NotFound | Public | Page not found |

---

## Design Tokens

### Colors (HSL)
```css
--primary: 60 50% 40%      /* Lime */
--secondary: 193 24% 55%   /* Ocean Blue */
--accent: 17 33% 32%       /* Cocoa */
--background: 30 18% 93%   /* Sand */
--foreground: 20 14.3% 4.1% /* Dark text */
```

### Fonts
```css
--font-grante: 'grante', 'GRANTE', 'Oswald', 'Arial Black', sans-serif
--font-kensington: 'Kensington', 'Oswald'
--font-body: 'Oswald'
--font-ui: 'Inter'
```

### Layout Constants
```typescript
HERO_LAYOUT = {
  BIRD_RIGHT_TOP: 675,
  WAVE_BG_TOP: 800,
  TOUCAN_LEFT_TOP: 1400,
  MAP_NEGATIVE_MARGIN: -475,
  MAP_HEIGHT: 700,
}
```

---

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

---

## Related Documentation

- **MASTER_PROMPT.md** - Quick reference guide
- **DEVELOPER_GUIDE.md** - Complete customization guide
- **GSAP-SCROLLTRIGGER-IMPLEMENTATION.md** - Animation implementation patterns
- **SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md** - Animation debugging log
- **figma-to-standalone-workflow.md** - Design-to-code workflow

---

**Maintainer**: Development Team
**Last Audit**: October 2025
