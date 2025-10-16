# Caye Cruiser Specialized Agents

This directory contains documentation for specialized AI agents that can assist with specific aspects of the Caye Cruiser project.

## Available Agents

### 1. Animation Agent
**File:** `animation-agent.md`
**Specialty:** GSAP, ScrollTrigger, ScrollSmoother, and animation effects

**Use for:**
- Implementing scroll-based animations
- Creating timeline animations
- Debugging ScrollTrigger conflicts
- Hero section animations
- Page transitions
- Parallax effects

**Key Rules:**
- Always use `scroller: "#smooth-content"` with ScrollTrigger
- Use 0-1 timeline positioning with scrub
- No pinning in grid/flex layouts
- Read `SCROLL_ANIMATION_LESSONS_LEARNED.md` before implementing

---

### 2. Component Agent
**File:** `component-agent.md`
**Specialty:** React components, shadcn/ui, Radix UI, forms, and styling

**Use for:**
- Creating new UI components
- Modifying shadcn/ui components
- Building forms with React Hook Form + Zod
- Implementing responsive layouts
- Ensuring accessibility compliance
- Component patterns and best practices

**Key Features:**
- shadcn/ui component integration
- CVA variants system
- Form validation patterns
- Accessibility checklist
- Responsive design guidelines

---

### 3. Supabase Agent
**File:** `supabase-agent.md`
**Specialty:** Database, authentication, real-time subscriptions, and storage

**Use for:**
- Database queries and mutations
- Authentication flows
- Real-time subscriptions
- Row Level Security (RLS) policies
- File storage operations
- Database schema design
- Performance optimization

**Key Features:**
- Complete query patterns
- Auth flow examples
- Real-time subscription setup
- RLS policy templates
- Error handling strategies

---

### 4. Figma Agent
**File:** `figma-agent.md`
**Specialty:** Design-to-code conversion, design tokens, and Figma MCP integration

**Use for:**
- Converting Figma frames to React components
- Creating standalone HTML previews
- Extracting design variables
- Mapping Figma to existing components
- Testing design variants
- Implementing responsive designs

**Key Features:**
- All Figma MCP tools documented
- Multiple workflow options
- Font and color mapping
- Standalone HTML template
- Asset handling strategies

---

## How to Use These Agents

### Option 1: Read Documentation
Reference these files when working on related tasks. They contain:
- Best practices
- Code patterns
- Common pitfalls
- Project-specific context
- Testing guidelines

### Option 2: Task Tool with Context
When using the Task tool, mention the relevant agent:

```
"Use the animation-agent guidelines to implement a scroll-triggered fade effect on the About section"
```

### Option 3: Manual Reference
Keep these docs open while coding for quick reference to:
- Code snippets
- Configuration examples
- Troubleshooting tips
- Project conventions

## Agent Selection Guide

| Task | Recommended Agent |
|------|-------------------|
| Add scroll animation | Animation Agent |
| Create new button component | Component Agent |
| Set up user authentication | Supabase Agent |
| Implement real-time ride tracking | Supabase Agent |
| Convert Figma design to code | Figma Agent |
| Build form with validation | Component Agent |
| Debug ScrollTrigger issue | Animation Agent |
| Configure database security | Supabase Agent |
| Extract design tokens | Figma Agent |
| Add shadcn/ui dialog | Component Agent |

## Cross-Agent Workflows

Some tasks require multiple agents:

### Implement New Feature from Figma
1. **Figma Agent**: Extract design and tokens
2. **Component Agent**: Build React components
3. **Supabase Agent**: Set up database tables and queries
4. **Animation Agent**: Add scroll effects and transitions

### Build Complete User Flow
1. **Component Agent**: Create form components
2. **Supabase Agent**: Handle authentication and data
3. **Animation Agent**: Add loading states and transitions
4. **Figma Agent**: Ensure design consistency

## Keeping Agents Updated

When you discover new patterns or solutions:
1. Document them in the relevant agent file
2. Add to the "Common Issues & Solutions" section
3. Update code examples if patterns change
4. Add to checklists if new steps are needed

## Questions?

If you're unsure which agent to use:
1. Check the "When to Use This Agent" section in each file
2. Look at the Agent Selection Guide above
3. Read the task description - keywords often match agent specialties
4. When in doubt, start with Component Agent for UI work or Supabase Agent for backend work

## Related Documentation

- **Project Overview**: `.claude/MASTER_PROMPT.md`
- **Technical Specs**: `.claude/PROJECT_SPECIFICATION.md`
- **Animation Guidelines**: `SCROLL_ANIMATION_LESSONS_LEARNED.md`
- **Figma Workflow**: `.claude/figma-to-standalone-workflow.md`

---

**Last Updated:** October 2025
**Agents Version:** 1.0.0
