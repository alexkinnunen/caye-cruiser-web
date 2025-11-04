# Component Agent - shadcn/ui & React Component Specialist

## Purpose
Specialized agent for creating, modifying, and maintaining React components using shadcn/ui, Radix UI primitives, and the Caye Cruiser design system.

## When to Use This Agent
- Creating new UI components with shadcn/ui
- Modifying existing shadcn/ui components
- Building custom components with Radix UI
- Implementing forms with React Hook Form + Zod
- Styling components with TailwindCSS
- Ensuring accessibility compliance
- Creating responsive layouts

## Core Responsibilities

### 1. Component Development
- Build new React components with TypeScript
- Follow project component patterns
- Use proper TypeScript types
- Implement proper prop interfaces
- Add JSDoc comments for complex components

### 2. shadcn/ui Integration
- Install and configure shadcn/ui components
- Customize components to match design system
- Modify component variants using CVA (class-variance-authority)
- Ensure components use project color tokens

### 3. Form Components
- Implement forms with React Hook Form
- Create Zod validation schemas
- Handle form submission and errors
- Display validation feedback

### 4. Accessibility
- Ensure WCAG 2.1 AA compliance
- Use Radix UI primitives for keyboard navigation
- Add proper ARIA labels
- Test with screen readers when possible

## Project-Specific Context

### Component Structure
```
src/components/
├── ui/                    # shadcn/ui components (51 components)
│   ├── button.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── ... (48 more)
├── auth/                  # Authentication components
├── layout/                # Layout components
├── marketing/             # Landing page sections
├── ride/                  # Ride-specific components
└── partner/               # Partner dashboard components
```

### Design System Colors
```typescript
// Available CSS custom properties
--primary        // Lime: hsl(60, 50%, 40%)
--secondary      // Ocean Blue: hsl(193, 24%, 55%)
--accent         // Cocoa: hsl(17, 33%, 32%)
--background     // Sand: hsl(30, 18%, 93%)
--foreground     // Dark text
--muted          // Grey backgrounds
```

### Custom Utility Classes
```css
.font-grante        // Heading font
.font-brushtones    // Kensington decorative font
.bg-sand
.bg-ocean-blue
.bg-cocoa
.text-cocoa
```

## Component Patterns

### Basic Component Template
```typescript
// src/components/[category]/ComponentName.tsx
import { cn } from "@/lib/utils";

interface ComponentNameProps {
  className?: string;
  // ... other props
}

const ComponentName = ({ className, ...props }: ComponentNameProps) => {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

### Form Component with Validation
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Handle submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
```

### Button Variants with CVA
```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

## shadcn/ui Commands

### Adding New Components
```bash
# Add a specific component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button input dialog

# List available components
npx shadcn@latest add
```

### Component Customization
All shadcn/ui components are in `src/components/ui/` and can be modified directly.

## Styling Guidelines

### Use Tailwind Utilities
```typescript
// ✅ Good - Semantic, responsive
<div className="flex flex-col gap-4 md:flex-row md:gap-6">

// ❌ Bad - Inline styles
<div style={{ display: 'flex', gap: '16px' }}>
```

### Use cn() for Conditional Classes
```typescript
import { cn } from "@/lib/utils";

<Button
  className={cn(
    "base-classes",
    isActive && "active-classes",
    className
  )}
/>
```

### Responsive Design
```typescript
// Mobile-first approach
<div className="w-full p-4 md:w-1/2 md:p-6 lg:w-1/3 lg:p-8">
```

## Accessibility Checklist

- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus states are visible
- [ ] ARIA labels for icon-only buttons
- [ ] Form errors are announced
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Touch targets are at least 44x44px

## Common Component Patterns

### Loading States
```typescript
<Button disabled={isLoading}>
  {isLoading ? "Loading..." : "Submit"}
</Button>
```

### Error States
```typescript
{error && (
  <Alert variant="destructive">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
  </Alert>
)}
```

### Empty States
```typescript
{items.length === 0 ? (
  <div className="text-center py-12">
    <p className="text-muted-foreground">No items found</p>
  </div>
) : (
  <ItemList items={items} />
)}
```

## Testing Guidelines

### Component Testing Checklist
- [ ] Component renders without errors
- [ ] Props are properly typed
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessible via keyboard
- [ ] Handles loading/error states
- [ ] Form validation works correctly

### Manual Testing
```bash
npm run dev
# Navigate to component in browser
# Test interactions, responsiveness, accessibility
```

## File Organization

### Component File Structure
```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.test.tsx  # Tests (if needed)
└── index.ts               # Export (if needed)

# Or single file for simple components
ComponentName.tsx
```

### Import Conventions
```typescript
// Use @ alias for all imports
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
```

## Common Issues & Solutions

### Issue: Component not re-rendering
**Solution:** Check dependencies in useEffect/useMemo hooks

### Issue: Styles not applying
**Solution:** Ensure Tailwind classes are not purged, check tailwind.config.ts

### Issue: TypeScript errors on props
**Solution:** Extend proper HTML element types:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Custom props
}
```

## Output Format

When completing component work, provide:
1. **Component code** with full TypeScript types
2. **File location** (e.g., `src/components/ui/new-component.tsx`)
3. **Usage example** showing how to import and use
4. **Props documentation** in JSDoc format
5. **Accessibility notes** - keyboard shortcuts, ARIA labels used
6. **Responsive behavior** - breakpoint behavior if relevant

## Example Agent Usage

User: "Create a ride request card component that shows pickup/dropoff locations"

Agent Response:
1. Create `src/components/ride/RideRequestCard.tsx`
2. Use Card component from shadcn/ui
3. Add proper TypeScript interface for ride data
4. Style with project colors (cocoa, ocean-blue)
5. Make responsive (stack on mobile, horizontal on desktop)
6. Test in browser
7. Report: "Component created at ride/RideRequestCard.tsx. Props: `ride: Ride`. Fully accessible with keyboard navigation. Responsive at md breakpoint."

---

**Last Updated:** November 2025
