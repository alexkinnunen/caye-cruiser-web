# Caye Cruiser - Project Specification

## Overview
Caye Cruiser is a modern ride-sharing application built specifically for golf cart transportation services. The platform connects users who need rides with golf cart drivers, featuring real-time tracking, payment processing, and partner management capabilities.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **React Router DOM** for client-side routing
- **TailwindCSS** with custom design system
- **Radix UI** for accessible component primitives

### Backend & Services
- **Supabase** for backend services (database, auth, real-time)
- **Stripe** for payment processing
- **Mapbox** for mapping and location services
- **WhatsApp API** for notifications
- **n8n** for workflow automation

### Key Libraries
- **React Hook Form** with Zod validation
- **TanStack Query** for data fetching
- **Sonner** for toast notifications
- **Lucide React** for icons
- **date-fns** for date handling
- **GSAP** with ScrollTrigger and ScrollSmoother for animations
- **Lenis** for smooth scrolling
- **Embla Carousel** for carousel components
- **Recharts** for data visualization

## Project Structure

```
├── public/                    # Static assets
│   ├── fonts/                # Custom font files (Kensington)
│   ├── favicon.svg           # Site favicon
│   └── *.jpg, *.svg          # Public images
├── src/
│   ├── assets/               # Source assets
│   │   ├── poi/              # Point of interest assets
│   │   └── vehicles/         # Vehicle imagery
│   ├── components/
│   │   ├── auth/             # Authentication components
│   │   ├── context/          # React contexts
│   │   ├── images/           # Image components
│   │   │   └── SVG/          # SVG icon components (Asset 5, 6, 7)
│   │   ├── layout/           # Layout components (Header, Footer, Main, InteractiveMap, Layout)
│   │   ├── marketing/        # Landing page components (Hero, About, HowItWorks, VehicleClasses)
│   │   ├── partner/          # Partner/driver dashboard components
│   │   ├── providers/        # Context providers
│   │   ├── ride/             # Ride-related components
│   │   └── ui/               # Reusable UI components (shadcn/ui) - 51 components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and configurations
│   ├── pages/                # Route page components (9 pages)
│   ├── services/             # External service integrations
│   └── types/                # TypeScript type definitions
├── dist/                     # Production build output
├── supabase/                 # Supabase configuration and migrations
├── n8n-workflow/             # Automation workflows
│   ├── whatsapp/             # WhatsApp notification workflows
│   ├── database/             # Database sync workflows
│   └── integrations/         # Third-party integration workflows
├── docs/                     # Project documentation
│   └── architecture/         # System architecture docs
├── scripts/                  # Build and deployment scripts
└── .claude/                  # Claude Code configuration
```

## Design System

### Color Palette
- **Primary**: Lime (`hsl(60, 50%, 40%)`)
- **Secondary**: Ocean Blue (`hsl(193, 24%, 55%)`) 
- **Accent**: Cocoa (`hsl(17, 33%, 32%)`)
- **Accent2**: Grey (`hsl(0, 0%, 85%)`)
- **Background**: Sand (`hsl(30, 18%, 93%)`)


### Typography
- **Body text**: Inter font family
- **Headings**: Grante
- **Display/Decorative**: Kensington (Adobe font) - configured as `font-kensington`
- Responsive typography with TailwindCSS utilities

### Component Architecture
- Built on Radix UI primitives for accessibility
- Custom styled with TailwindCSS
- Consistent design tokens via CSS custom properties
- Dark/light mode support with `next-themes`

## Application Structure

### Routing
The app uses React Router with the following structure:
```
/ (Main Layout)
├── / (Home)
├── /cart-rentals
├── /become-a-partner
├── /user-account (Protected)
└── /partner-account (Protected)
```

### Pages & Components

#### Core Pages
- **Home** (`src/pages/Home.tsx`): Landing page with Hero, About, and Cart Rentals sections
- **Cart Rentals** (`src/pages/CartRentals.tsx`): Golf cart rental service for long-term rentals
- **Become a Partner** (`src/pages/BecomeAPartner.tsx`): Driver onboarding / cart rental onboarding
- **User Account** (`src/pages/UserAccount.tsx`): User dashboard and profile (Protected)
- **Partner Account** (`src/pages/PartnerAccount.tsx`): Partner dashboard (Protected)
- **Not Found** (`src/pages/NotFound.tsx`): 404 error page

#### Layout Components
- **Layout** (`src/components/layout/Layout.tsx`): Root layout wrapper
- **Main** (`src/components/layout/Main.tsx`): Main content container with smooth scrolling
- **Header** (`src/components/layout/Header.tsx`): Navigation and auth controls
- **Footer** (`src/components/layout/Footer.tsx`): Site footer
- **InteractiveMap** (`src/components/layout/InteractiveMap.tsx`): Mapbox integration with real-time tracking

#### Feature Components

**Authentication** (`src/components/auth/`)
- `AuthDialog.tsx`: Login/signup modal
- `ProtectedRoute.tsx`: Route protection wrapper

**Marketing** (`src/components/marketing/`)
- `Hero.tsx`: Landing page hero section with visual elements
- `HowItWorks.tsx`: Feature explanation with step-by-step guide
- `About.tsx`: Company information and branding
- `VehicleClasses.tsx`: Vehicle type display and classification

**Partner Dashboard** (`src/components/partner/`)
- `PartnerDashboard.tsx`: Main Partner interface
- `PartnerOnboarding.tsx`: Partner registration flow
- `PartnerSettings.tsx`: Partner account settings
- `RideQueue.tsx`: Active ride management
- `EarningsStats.tsx`: Financial analytics

**Ride Management** (`src/components/ride/`)
- `RideCard.tsx`: Individual ride display
- `RideHistoryView.tsx`: Past rides
- `RideRequestForm.tsx`: New ride booking
- `RideTracker.tsx`: Real-time ride tracking

**UI Components** (`src/components/ui/`) - 51 components
- Complete shadcn/ui component library including:
  - Forms: Input, Textarea, Select, Checkbox, Radio Group, Switch, etc.
  - Overlays: Dialog, Sheet, Drawer, Popover, Hover Card, Tooltip
  - Navigation: Tabs, Accordion, Breadcrumb, Menubar, Navigation Menu
  - Data Display: Table, Card, Badge, Avatar, Separator
  - Feedback: Alert, Toast, Progress, Skeleton
  - Custom: FloatingMapButton, ShutterOverlay, Noise (texture effect)

### Custom Hooks

**Core Hooks** (`src/hooks/`)
- `useAuth.ts`: Authentication state management
- `useSupabase.ts`: Supabase client access
- `useLocation.ts`: Geolocation services
- `useRides.ts`: Ride data management
- `useMobile.ts`: Mobile device detection (responsive design helper)

### Services Integration

**External APIs** (`src/services/`)
- `stripe.ts`: Payment processing
- `mapbox.ts`: Maps and geocoding
- `whatsapp.ts`: Messaging integration
- `analytics.ts`: Usage tracking

### Data Layer

**Type Definitions** (`src/types/`)
- `api.ts`: API response types
- `database.ts`: Database schema types
- `supabase.ts`: Supabase-specific types

**Core Types** (`src/lib/types.ts`)
```typescript
type UserProfile = {
  id: string;
  updated_at: string | null;
  full_name: string | null;
  phone_number: string | null;
  role: 'user' | 'driver';
};

type LocationPoint = {
  latitude: number;
  longitude: number;
};
```

## State Management

### Context Providers
- **SupabaseProvider**: Database and auth client
- **AuthProvider**: User authentication state
- React Query for server state management

### Data Flow
1. Supabase handles authentication and real-time data
2. React Query manages server state caching
3. Context providers share global state
4. Custom hooks encapsulate business logic

## Development Workflow

### Setup
```bash
npm install          # Install dependencies
npm run dev          # Start development server (localhost:5173)
npm run build        # Production build
npm run lint         # ESLint checking
npm run preview      # Preview production build
```

### Current Version
- **Version**: 1.0.0
- **Build Tool**: Vite 7.1.5
- **TypeScript**: 5.4.5
- **React**: 18.3.1

### Key Configuration Files
- `vite.config.ts`: Build configuration with path aliases
- `tailwind.config.ts`: Design system configuration
- `tsconfig.json`: TypeScript configuration
- `.env.local`: Environment variables (Supabase, Stripe, Mapbox)

### Code Standards
- TypeScript strict mode enabled
- ESLint with React hooks and TypeScript rules
- Consistent import paths using `@/` alias
- Component-first architecture
- Custom hooks for reusable logic

## External Integrations

### Supabase
- User authentication
- Real-time database
- Row-level security policies
- File storage for images

### Stripe
- Payment processing
- Subscription management
- Webhook handling

### Mapbox
- Interactive maps
- Geocoding services
- Route optimization
- Real-time location tracking

### n8n Workflows
- User synchronization
- Ride logging
- Analytics sync
- WhatsApp notifications
- Stripe webhook processing

## Features

### Core Functionality
- User registration and authentication
- Real-time ride booking and tracking
- Payment processing with Stripe
- Partner (driver) onboarding and dashboard
- Interactive map with real-time updates
- WhatsApp notifications for ride updates

### User Experience
- Responsive design for mobile and desktop
- Dark/light mode support
- Accessible UI components
- Real-time notifications
- Smooth animations and transitions

## Navigation Guide

### For Users
1. **Home Page**: Book rides, view services
2. **User Account**: Manage profile, view ride history
3. **Interactive Map**: Real-time vehicle tracking

### For Partners/Drivers
1. **Become a Partner**: Registration and onboarding
2. **Partner Account**: Dashboard with ride queue, earnings, settings
3. **Ride Management**: Accept/decline rides, track progress

### For Developers
1. **Components**: Organized by feature in `src/components/`
2. **Pages**: Route components in `src/pages/`
3. **Hooks**: Custom logic in `src/hooks/`
4. **Services**: External integrations in `src/services/`
5. **Types**: TypeScript definitions in `src/types/`

## Environment Setup

Required environment variables in `.env.local`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

## Animation & Scroll Effects

The application uses GSAP for advanced scroll-based animations:

### ScrollSmoother Configuration
- **Location**: `src/App.tsx` (lines 50-64)
- **Wrapper**: `#smooth-wrapper`
- **Content**: `#smooth-content`
- **Settings**: 1.2 smoothness, touch support enabled

### Important Notes
- All custom ScrollTrigger animations must specify `scroller: "#smooth-content"`
- See `SCROLL_ANIMATION_LESSONS_LEARNED.md` for detailed technical documentation
- Avoid pinning animations inside grid layouts

### Lenis Smooth Scrolling
- Alternative smooth scrolling library also available
- Used in conjunction with GSAP for enhanced scroll experience

## Recent Updates & Documentation

### Font Configuration (October 2025)
- Added **Kensington** Adobe font for display/decorative text
- Configured in `tailwind.config.ts` as `font-kensington` (was temporarily `font-brushtones`)
- Font files located in `public/fonts/`

### Lessons Learned Documentation
- `SCROLL_ANIMATION_LESSONS_LEARNED.md`: Comprehensive guide to GSAP ScrollTrigger implementation
- Documents ScrollSmoother conflicts, timeline positioning, and animation best practices
- Essential reading before implementing scroll-based animations

### Custom SVG Assets
- Three primary SVG icons in `src/components/images/SVG/`:
  - Asset 5.svg - Pin/location icon
  - Asset 6.svg - Driver/matching icon
  - Asset 7.svg - Golf cart/cruise icon

## Project Documentation Files

- `PROJECT_SPECIFICATION.md`: This file - complete project overview
- `SCROLL_ANIMATION_LESSONS_LEARNED.md`: Animation implementation guide
- `README.md`: Project readme (currently empty)
- `docs/API.md`: API documentation
- `docs/DEPLOYMENT.md`: Deployment instructions
- `docs/CONTRIBUTING.md`: Contribution guidelines
- `docs/architecture/system-overview.md`: System architecture details

---

This specification provides a comprehensive overview of the Caye Cruiser platform architecture, helping developers understand the codebase structure and locate specific components for development and maintenance.