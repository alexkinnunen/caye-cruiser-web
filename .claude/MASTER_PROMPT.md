# Caye Cruiser - Master Prompt

## Project Identity
Golf cart ride-sharing platform for San Pedro, Belize. Connects riders with drivers for on-demand transportation.

## Tech Stack
- **Frontend**: React 18.3, TypeScript 5.4, Vite, TailwindCSS + shadcn/ui
- **Backend**: Supabase (Auth, Real-time DB, Storage)
- **Animation**: GSAP ScrollTrigger + Lenis (smooth scrolling)
- **State**: React Context + TanStack Query v5
- **APIs**: Stripe, Mapbox, WhatsApp (n8n)

## Features
- Dual dashboards (riders + partners)
- Real-time ride tracking
- Stripe payments
- WhatsApp notifications
- 51 UI components (shadcn/ui)

## Design System
- **Colors**: Lime, Ocean Blue, Cocoa
- **Fonts**: Kensington (display), Inter (body)
- **Mobile-first**, accessible (Radix UI)

## Critical Animation Rules
- ❌ NO ScrollSmoother (removed - causes React conflicts)
- ✅ Use Lenis for smooth scrolling (initialized in App.tsx via `useLenis()`)
- ✅ Use standard ScrollTrigger (no `scroller` property needed)
- ✅ Always use `gsap.context()` for proper cleanup
- ✅ Timeline positions: 0-1 scale with scrub
- ✅ No pinning inside grid layouts
- ✅ Add `will-change` and `force3D` for GPU acceleration
- ✅ Use `invalidateOnRefresh: true` for responsive behavior
- See `docs/GSAP-SCROLLTRIGGER-IMPLEMENTATION.md` for complete guide

## Code Standards
- Use `@/` import alias
- React Hook Form + Zod for forms
- Custom hooks for reusable logic
- No `any` types
- Component-first architecture

## File Structure
```
src/
├── components/[feature]/
├── hooks/
├── services/
└── types/
```

## Current Priorities
1. Complete ride booking flow
2. Stripe payment integration
3. Real-time tracking polish
4. Partner onboarding refinement
5. WhatsApp notifications

## Resources
- `PROJECT_STATUS.md` - Current implementation status & architecture
- `PROJECT_SPECIFICATION.md` - Full tech spec
- `DEVELOPER_GUIDE.md` - Complete customization guide (1100+ lines)
- `docs/GSAP-SCROLLTRIGGER-IMPLEMENTATION.md` - Animation guide
- `docs/HOWITWORKS-CUSTOMIZATION-GUIDE.md` - HowItWorks component guide
- `figma-to-standalone-workflow.md` - Figma component workflow
- `SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md` - Animation debugging log
- `docs/agents/` - Specialized agent documentation (Animation, Component, Supabase, Figma)
