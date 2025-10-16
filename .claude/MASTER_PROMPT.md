# Caye Cruiser - Master Project Prompt

## Project Identity
**Caye Cruiser** is a modern golf cart ride-sharing platform designed for San Pedro, Belize. It connects riders with golf cart drivers for on-demand transportation around the island.

## Current State: MVP Development Phase

### What We Have Built
A functional React/TypeScript web application with:
- **Authentication system** - User and driver login via Supabase Auth
- **Dual dashboards** - Separate interfaces for riders and partners (drivers)
- **Real-time mapping** - Mapbox integration for location tracking
- **UI component library** - Complete shadcn/ui implementation (51 components)
- **Smooth animations** - GSAP ScrollSmoother for enhanced UX
- **Design system** - Custom color palette (lime, ocean blue, cocoa) with Kensington font
- **Backend infrastructure** - Supabase database with real-time capabilities
- **Payment integration** - Stripe setup for ride payments
- **Notification system** - WhatsApp integration via n8n workflows

### Core User Flows Implemented
1. **Rider Flow**: Browse → Request Ride → Track Driver → Complete Payment
2. **Partner Flow**: Onboard → Accept Rides → Navigate → Earn Money
3. **Admin Flow**: Monitor rides, manage partners, view analytics

### Tech Foundation
- **Frontend**: React 18.3, TypeScript 5.4, Vite 7.1
- **Styling**: TailwindCSS + Radix UI + shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Real-time, Storage)
- **Animation**: GSAP ScrollTrigger/ScrollSmoother + Lenis
- **State**: React Context + TanStack Query v5
- **External APIs**: Stripe, Mapbox, WhatsApp (via n8n)

## Project Goal

### Primary Objective
Create a **reliable, delightful, and accessible** golf cart ride-sharing platform that becomes the preferred transportation method for both tourists and locals in San Pedro, Belize.

### Success Metrics
- Fast, intuitive booking (under 30 seconds from open to confirmed ride)
- Real-time driver tracking with accurate ETAs
- High partner satisfaction (easy earnings, clear dashboard)
- Mobile-responsive design (works on all devices)
- Smooth, polished animations without performance issues

## Current Focus Areas

### Immediate Priorities
1. **Complete ride booking flow** - End-to-end ride request and fulfillment
2. **Partner onboarding refinement** - Streamline driver registration
3. **Real-time tracking polish** - Ensure accurate location updates
4. **Payment processing** - Full Stripe integration for ride payments
5. **WhatsApp notifications** - Reliable ride status updates

### Quality Standards
- **Performance**: Page loads under 2 seconds, smooth 60fps animations
- **Accessibility**: WCAG 2.1 AA compliance via Radix UI primitives
- **Mobile-first**: Responsive design for all screen sizes
- **Type safety**: Full TypeScript coverage, no `any` types
- **Code quality**: Clean, documented, maintainable code

## Key Design Decisions

### Why These Technologies?
- **Supabase**: Real-time capabilities essential for live tracking
- **GSAP**: Premium animation quality for brand differentiation
- **shadcn/ui**: Accessible, customizable, production-ready components
- **Mapbox**: Superior mapping for Caribbean region
- **n8n**: Flexible workflow automation for WhatsApp integration

### What Makes This Different?
- **Local-first**: Built specifically for San Pedro's unique geography
- **Dual-sided platform**: Equally focused on rider and partner experience
- **Visual delight**: Smooth animations and island-inspired design
- **WhatsApp integration**: Uses preferred communication method in Belize

## Development Guidelines

### Code Patterns
- Use `@/` alias for all imports
- React Hook Form + Zod for all forms
- TanStack Query for server state
- Custom hooks for reusable logic
- Component-first architecture

### Animation Rules (Critical)
- All ScrollTriggers MUST specify `scroller: "#smooth-content"`
- Use 0-1 scale for timeline positions with scrub
- Read `SCROLL_ANIMATION_LESSONS_LEARNED.md` before implementing animations
- No pinning inside grid layouts

### File Organization
```
Feature-based structure:
- Components in src/components/[feature]/
- Hooks in src/hooks/
- Services in src/services/
- Types in src/types/
```

## What's Next

### Near-term Roadmap
1. Complete and test full ride flow (rider + partner)
2. Implement payment processing and earnings tracking
3. Enhance real-time notifications (WhatsApp + in-app)
4. Add ride history and ratings system
5. Polish onboarding flows for both users and partners
6. Performance optimization and testing
7. Beta launch with local partners

### Known Limitations
- Cart rental (long-term) feature is placeholder only
- Analytics dashboard needs completion
- Mobile app (native) not yet planned
- Multi-language support (Spanish) not implemented

## Resources & Documentation

### Essential Reading
- `PROJECT_SPECIFICATION.md` - Complete technical specification
- `SCROLL_ANIMATION_LESSONS_LEARNED.md` - Animation best practices
- `figma-to-standalone-workflow.md` - Process for creating standalone HTML from Figma designs
- `docs/agents/` - Specialized agent documentation for development

### Quick Links
- Supabase Project: [Configure in .env.local]
- Stripe Dashboard: [Configure in .env.local]
- Mapbox Account: [Configure in .env.local]
- n8n Workflows: `n8n-workflow/` directory

## Project Tone & Philosophy

**User-centric, not tech-centric**: Technology should be invisible. Focus on delightful experiences.

**Island pace, modern execution**: Embrace the relaxed Belizean vibe while delivering professional, reliable service.

**Partner empowerment**: Drivers are partners, not contractors. Build tools that help them succeed.

**Honest development**: Document what doesn't work (see animation lessons learned). Save future time.

---

## For AI Assistants & Developers

When working on this project:
1. **Check agent docs first** - Use specialized agents for focused tasks
2. **Respect animation rules** - ScrollSmoother conflicts are real
3. **Test on mobile** - This is primarily a mobile experience
4. **Think real-time** - Supabase subscriptions for live updates
5. **Validate everything** - Use Zod schemas for all data
6. **Ask when unsure** - Better to clarify than waste time on wrong approach
7. **Figma workflow** - When generating components from Figma for testing, create standalone HTML files (see `figma-to-standalone-workflow.md`)

**Current version**: 1.0.0 (MVP Development)
**Last updated**: October 2025
