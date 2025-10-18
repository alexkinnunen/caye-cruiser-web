# .claude Directory - Documentation Hub

> **Purpose**: Central repository for all Claude Code project documentation, configuration, and specialized agent guides.

---

## Quick Navigation

### 🚀 Start Here
- **[MASTER_PROMPT.md](MASTER_PROMPT.md)** - Quick reference guide (read this first!)
- **[PROJECT_STATUS.md](PROJECT_STATUS.md)** - Current implementation status & what's done vs. in progress
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - Complete 1100+ line customization guide

### 📋 Core Documentation
- **[PROJECT_SPECIFICATION.md](PROJECT_SPECIFICATION.md)** - Technical specification
- **[settings.local.json](settings.local.json)** - Claude Code permissions config

### 🎨 Design & Workflows
- **[figma-to-standalone-workflow.md](figma-to-standalone-workflow.md)** - Convert Figma designs to standalone HTML

### 🐛 Debugging & Lessons Learned
- **[SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md](SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md)** - 11 animation attempts documented (clip-path debugging)

### 📚 Technical Guides (`docs/`)
- **[GSAP-SCROLLTRIGGER-IMPLEMENTATION.md](docs/GSAP-SCROLLTRIGGER-IMPLEMENTATION.md)** - Complete GSAP + Lenis implementation guide
- **[POLYGON-CLIPPATH-ANIMATION-GUIDE.md](docs/POLYGON-CLIPPATH-ANIMATION-GUIDE.md)** - Dynamic polygon clip-path synced animations
- **[HOWITWORKS-CUSTOMIZATION-GUIDE.md](docs/HOWITWORKS-CUSTOMIZATION-GUIDE.md)** - Horizontal scroll component customization

### 🤖 Specialized Agents (`docs/agents/`)
- **[README.md](docs/agents/README.md)** - Agent system overview
- **[animation-agent.md](docs/agents/animation-agent.md)** - GSAP & ScrollTrigger specialist
- **[component-agent.md](docs/agents/component-agent.md)** - shadcn/ui & React components
- **[supabase-agent.md](docs/agents/supabase-agent.md)** - Database, auth & real-time
- **[figma-agent.md](docs/agents/agent-agent.md)** - Design-to-code conversion

---

## Documentation Structure

```
.claude/
├── README.md                              # This file - documentation hub
├── settings.local.json                    # Claude Code permissions
│
├── MASTER_PROMPT.md                       # Quick reference (START HERE)
├── PROJECT_STATUS.md                      # Implementation status & architecture
├── PROJECT_SPECIFICATION.md               # Technical specification
├── DEVELOPER_GUIDE.md                     # Complete customization guide
│
├── figma-to-standalone-workflow.md        # Figma workflow
├── SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md  # Animation debugging log
│
└── docs/
    ├── GSAP-SCROLLTRIGGER-IMPLEMENTATION.md   # Animation guide
    ├── HOWITWORKS-CUSTOMIZATION-GUIDE.md      # Component guide
    └── agents/
        ├── README.md                          # Agent overview
        ├── animation-agent.md                 # Animation specialist
        ├── component-agent.md                 # Component specialist
        ├── supabase-agent.md                  # Backend specialist
        └── figma-agent.md                     # Design specialist
```

---

## File Descriptions

### Configuration

#### `settings.local.json`
Claude Code permission settings. Currently auto-approves:
- `npm install` commands

### Core Guides

#### `MASTER_PROMPT.md`
**READ THIS FIRST!** Quick reference containing:
- Project identity & purpose
- Tech stack overview
- Features list
- Design system colors/fonts
- Critical animation rules (NO ScrollSmoother!)
- Code standards
- Current priorities
- Resource links

**When to use**: Quick lookup, onboarding new developers

---

#### `PROJECT_STATUS.md`
**NEW!** Comprehensive status document containing:
- ✅ Completed features (with checkboxes)
- 🚧 In-progress features
- ❌ Not yet implemented
- Technical architecture breakdown
- File structure with descriptions
- Current animation system
- Environment configuration
- Routes table
- Design tokens
- Known issues & limitations
- Recommended next steps

**When to use**: Understanding what's done, planning work, architecture reference

---

#### `DEVELOPER_GUIDE.md`
**1100+ lines!** Complete guide for designers & developers:
- Table of contents with links
- Project overview
- Complete file structure
- Routing & pages breakdown
- Design system (colors, fonts, spacing)
- Component guide (all 51+ components)
- Styling & customization
- Animation system
- State management
- Common customizations (with exact file locations)
- Quick find reference table
- Tips for designers

**When to use**: Making changes, customizing design, understanding components

---

#### `PROJECT_SPECIFICATION.md`
Technical specification containing:
- Tech stack
- Project structure
- Design system
- Routes
- Key components list
- Hooks & services
- State management
- Development commands
- Environment variables
- Animation overview
- Integrations

**When to use**: Technical reference, architecture decisions

---

### Design & Workflows

#### `figma-to-standalone-workflow.md`
Workflow for converting Figma designs:
- Figma MCP tools reference
- Multiple workflows (Quick, Full, Design System, Component Library)
- HTML template
- JSX → HTML conversion rules
- Font mappings
- Asset handling
- Usage instructions

**When to use**: Converting Figma designs to code

---

### Debugging & Lessons

#### `SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md`
Detailed log of 11 animation attempts:
- User requirements
- Each attempt with feedback
- Mistakes made
- Lessons learned
- Final working solution

**When to use**: Understanding clip-path animations, debugging similar issues, learning from past mistakes

---

### Technical Guides

#### `docs/GSAP-SCROLLTRIGGER-IMPLEMENTATION.md`
**CRITICAL GUIDE** for animations:
- Why NO ScrollSmoother in React
- Standard ScrollTrigger patterns
- Common patterns (horizontal scroll, stagger, SVG path)
- Complete debugging checklist
- Error solutions
- Best practices
- Implementation workflow
- Complete working examples

**When to use**: Implementing ANY animation with GSAP

---

#### `docs/POLYGON-CLIPPATH-ANIMATION-GUIDE.md`
**NEW!** Advanced clip-path animation pattern:
- Polygon clip-path with dynamic calculation
- Syncing animations via `onUpdate` callback
- Viewport height unit techniques
- Visual diagrams of polygon shapes
- Customization options
- Performance optimization
- Testing checklist
- Complete working implementation

**When to use**: Creating synced reveal animations, scroll-based clipping effects, layered animations

---

#### `docs/HOWITWORKS-CUSTOMIZATION-GUIDE.md`
Customization guide for horizontal scroll component:
- Static positioning (Tailwind)
- Animated positioning (GSAP)
- Text styling
- Icon/SVG styling
- Wavy path customization
- Common adjustments
- Complete example
- Quick reference tables

**When to use**: Customizing the HowItWorks journey component

---

### Specialized Agents

#### `docs/agents/README.md`
Agent system overview:
- Available agents
- How to use agents
- Agent selection guide
- Cross-agent workflows
- Keeping agents updated

**When to use**: Choosing the right agent for a task

---

#### `docs/agents/animation-agent.md`
GSAP & ScrollTrigger specialist:
- When to use
- Core responsibilities
- Critical rules (scroller property, timeline scale)
- Project-specific context
- Common patterns
- Testing checklist
- Debug strategies

**When to use**: Animation tasks, scroll effects

---

#### `docs/agents/component-agent.md`
shadcn/ui & React component specialist:
- When to use
- Component development
- shadcn/ui integration
- Form components (React Hook Form + Zod)
- Accessibility checklist
- Component patterns
- Testing guidelines

**When to use**: Creating/modifying UI components, forms

---

#### `docs/agents/supabase-agent.md`
Database, auth & real-time specialist:
- When to use
- Database operations
- Authentication flows
- Real-time subscriptions
- Row Level Security (RLS)
- Storage operations
- Error handling
- Performance optimization

**When to use**: Backend integration, database, auth

---

#### `docs/agents/figma-agent.md`
Design-to-code conversion specialist:
- When to use
- Figma code generation
- Design system management
- Component mapping
- All Figma MCP tools
- Recommended workflows
- Font/color mappings
- Conversion checklist

**When to use**: Converting Figma designs to React components

---

## Common Workflows

### 🎯 New Feature Implementation
1. Read **PROJECT_STATUS.md** - Understand current state
2. Check **DEVELOPER_GUIDE.md** - Find relevant components
3. Review **agent docs** - Choose specialist (Component, Supabase, etc.)
4. Implement following patterns
5. Update **PROJECT_STATUS.md** when done

### 🐛 Debugging Animations
1. Check **SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md** - Similar issues?
2. Read **GSAP-SCROLLTRIGGER-IMPLEMENTATION.md** - Follow debugging checklist
3. Consult **animation-agent.md** - Review critical rules
4. Use `markers: true` for debugging
5. Document solution if novel

### 🎨 Design Changes
1. Check **DEVELOPER_GUIDE.md** - File location reference table
2. Read design system section
3. Make changes following patterns
4. Test responsive behavior

### 🤝 Onboarding New Developer
1. Start with **MASTER_PROMPT.md**
2. Read **PROJECT_STATUS.md** - Understand what's done
3. Browse **DEVELOPER_GUIDE.md** - Get familiar with structure
4. Review **agent docs** - Understand specialized areas
5. Read **GSAP-SCROLLTRIGGER-IMPLEMENTATION.md** - Critical for animations

---

## Key Learnings Documented

### Animation System
- ❌ **Don't use ScrollSmoother** - Causes React conflicts
- ✅ **Use Lenis + standard ScrollTrigger** - Works perfectly
- ✅ **Always use `gsap.context()`** - Proper cleanup
- ✅ **No `scroller` property needed** - Lenis handles scrolling
- See: `GSAP-SCROLLTRIGGER-IMPLEMENTATION.md`

### Clip-Path Animations
- **Polygon > Inset** - Use polygon clip-path for complex shapes
- **Dynamic Calculation** - Use `onUpdate` for frame-by-frame updates
- **Viewport Units** - Use `vh` to match element positions
- **Tween References** - Store references for proper cleanup
- Text must stay ABOVE shutters (z-index layering)
- See: `SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md` (debugging log)
- See: `docs/POLYGON-CLIPPATH-ANIMATION-GUIDE.md` (complete guide)

### Development Environment
- All env vars are optional in development
- App shows placeholders when not configured
- Warnings in console, but no crashes
- See: `src/lib/env.ts`, `PROJECT_STATUS.md`

---

## Maintenance Guidelines

### When to Update Documentation

#### Update `PROJECT_STATUS.md` when:
- Completing a feature (move from "In Progress" to "Completed")
- Starting new feature work (add to "In Progress")
- Discovering architectural patterns
- Adding new dependencies
- Changing file structure

#### Update `DEVELOPER_GUIDE.md` when:
- Adding new components
- Changing design tokens
- Modifying layout structure
- Adding new pages/routes
- Creating new utility classes

#### Update `MASTER_PROMPT.md` when:
- Changing critical rules
- Updating priorities
- Major tech stack changes

#### Add to debugging docs when:
- Solving complex issues (like ShutterOverlay attempts)
- Discovering common pitfalls
- Finding non-obvious solutions

### Documentation Review Schedule
- **Weekly**: Update PROJECT_STATUS.md with progress
- **After major features**: Update DEVELOPER_GUIDE.md
- **When solving tricky bugs**: Add to debugging docs
- **Monthly**: Review and consolidate learnings

---

## Quick Reference

### Critical Rules
1. **NO ScrollSmoother** - Use Lenis + standard ScrollTrigger
2. **Always use `@/` alias** - For imports
3. **Environment vars optional** - In development
4. **Fonts**: GRANTE (headings), Kensington (decorative), Oswald (body)
5. **Colors**: Lime (primary), Ocean Blue (secondary), Cocoa (accent)

### File Locations
- Components: `src/components/[category]/`
- Pages: `src/pages/`
- Hooks: `src/hooks/`
- Lib/Utils: `src/lib/`
- Styles: `src/index.css`
- Config: `tailwind.config.ts`, `vite.config.ts`

### Common Tasks
- Add component: See `DEVELOPER_GUIDE.md` Section 9.4
- Add route: See `DEVELOPER_GUIDE.md` Section 9.4
- Change colors: See `DEVELOPER_GUIDE.md` Section 9.6
- Add animation: See `GSAP-SCROLLTRIGGER-IMPLEMENTATION.md`

---

## Contributing to Documentation

When adding new documentation:
1. Follow existing format and tone
2. Include practical examples
3. Add to this README's navigation
4. Update relevant cross-references
5. Use clear section headings
6. Include "When to use" guidance

---

**Last Updated**: October 2025
**Maintained by**: Development Team
**Questions?** Check the relevant doc or create an issue
