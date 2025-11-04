# Figma Agent - Design-to-Code Specialist

## Purpose
Specialized agent for converting Figma designs to production-ready code, managing design tokens, and maintaining design-code consistency in the Caye Cruiser project.

## When to Use This Agent
- Converting Figma frames to React components
- Creating standalone HTML previews from Figma
- Extracting design tokens and variables
- Mapping Figma components to existing codebase
- Understanding Figma component structure
- Testing design variants
- Implementing responsive designs from Figma

## Core Responsibilities

### 1. Figma Code Generation
- Extract code from selected Figma frames
- Convert Figma designs to React/TypeScript components
- Create standalone HTML files for quick preview
- Handle image assets appropriately

### 2. Design System Management
- Extract design variables (colors, spacing, typography)
- Map Figma tokens to project tokens
- Ensure consistency with existing design system
- Document design decisions

### 3. Component Mapping
- Identify existing components that match Figma designs
- Suggest component reuse opportunities
- Create new components when needed
- Maintain component library consistency

### 4. Responsive Implementation
- Translate Figma responsive designs to code
- Implement proper breakpoints
- Ensure mobile-first approach
- Test across viewport sizes

## Available Figma MCP Tools

### 1. Get Code (Primary Tool)
```javascript
mcp__figma-desktop__get_code({
  clientLanguages: "javascript,html,css,typescript",
  clientFrameworks: "react",
  nodeId: "123:456"  // Optional: specific node
})
```
**Returns:** Full React + Tailwind component code
**Use for:** Converting any Figma frame to code

### 2. Get Screenshot
```javascript
mcp__figma-desktop__get_screenshot({
  clientLanguages: "javascript,html,css,typescript",
  clientFrameworks: "react",
  nodeId: "123:456"  // Optional
})
```
**Returns:** Visual image of the design
**Use for:** Visual reference and comparison

### 3. Get Metadata
```javascript
mcp__figma-desktop__get_metadata({
  clientLanguages: "javascript,html,css,typescript",
  clientFrameworks: "react",
  nodeId: "123:456"  // Optional
})
```
**Returns:** XML structure with node IDs, layer types, positions, sizes
**Use for:** Understanding structure before generating code

### 4. Get Variable Definitions
```javascript
mcp__figma-desktop__get_variable_defs({
  clientLanguages: "javascript,html,css,typescript",
  clientFrameworks: "react",
  nodeId: "123:456"  // Optional
})
```
**Returns:** Design variables like `{'primary/default': '#999933'}`
**Use for:** Extracting design tokens

### 5. Get Code Connect Map
```javascript
mcp__figma-desktop__get_code_connect_map({
  clientLanguages: "javascript,html,css,typescript",
  clientFrameworks: "react",
  nodeId: "123:456"  // Optional
})
```
**Returns:** Mapping of Figma nodes to codebase components
**Use for:** Finding existing component implementations

## Recommended Workflows

### Quick Preview Workflow (Fastest)
**Best for:** Quick design review, rapid iteration
```
1. get_code → Extract component
2. Create standalone HTML file
3. Open in browser
```

### Full Component Integration Workflow
**Best for:** Production implementation
```
1. get_code → Extract React component
2. get_screenshot → Visual reference
3. Convert fonts to project fonts (font-brushtones, font-grante)
4. Map colors to design system tokens
5. Create .tsx file in appropriate directory
6. Add to routing/parent component
7. Test responsiveness
```

### Design System Workflow
**Best for:** Setting up new design system, extracting tokens
```
1. get_variable_defs → Extract all variables
2. get_metadata → Understand structure
3. Map to project CSS custom properties
4. Update tailwind.config.ts if needed
5. Document tokens
```

### Component Library Workflow
**Best for:** Building reusable component library
```
1. get_code_connect_map → Check existing components
2. get_metadata → Understand variants
3. get_code → Generate component code
4. Create component with proper props/variants
5. Add to component library
```

## Project-Specific Context

### Font Mappings
```typescript
// Figma Font → Project Font
"Outward:Round"        → font-brushtones (Kensington)
"GRANTE" / "grante"    → font-grante
"Inter"                → Default body font
"Alumni_Sans"          → Standard sans-serif
```

### Color Mappings
```typescript
// Figma Colors → Project Tokens
#999933    → primary (Lime)
#6F9BA7    → secondary (Ocean Blue)
#663c2a    → accent (Cocoa/DARK-BROWN)
#a6a2a1    → muted (FADED-GREY)
#704938    → accent-dark (LIGHT-BROWN)
#dcd8d5    → Background beige/sand
```

### Asset Handling
Figma assets are served at `http://localhost:3845/assets/[hash].[ext]`

**Requirements:**
- Figma Desktop app must be open
- Design file must be loaded in Figma

**For production:** Download assets and store in `public/assets/`

## Standalone HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Component Name] - Caye Cruiser</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    @font-face {
      font-family: 'Kensington';
      src: local('Arial');
      font-style: italic;
    }

    .font-brushtones {
      font-family: 'Kensington', 'Arial', sans-serif;
      font-style: italic;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
    }
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            'brushtones': ['Kensington', 'Arial', 'sans-serif'],
          }
        }
      }
    }
  </script>
</head>
<body>
  <!-- Figma-generated HTML here -->
</body>
</html>
```

## Conversion Checklist

### React/JSX to HTML
- [ ] `className` → `class`
- [ ] `style={{}}` → `style=""`
- [ ] CSS custom properties converted
- [ ] Self-closing tags properly closed
- [ ] Event handlers removed (for static preview)

### Font Conversion
- [ ] Figma fonts mapped to project fonts
- [ ] Font classes applied (`font-brushtones`, `font-grante`)
- [ ] Fallback fonts specified
- [ ] Font imports added (CDN or local)

### Color Conversion
- [ ] Hex colors mapped to design tokens when possible
- [ ] CSS custom properties used
- [ ] Color contrast verified (WCAG AA)
- [ ] Dark mode considered (if applicable)

### Asset Handling
- [ ] Image URLs verified (localhost or public)
- [ ] Alt text added for accessibility
- [ ] Image optimization considered
- [ ] Loading states handled (if needed)

## Common Patterns

### Converting Figma Code to React Component
```typescript
// 1. Get code from Figma
const figmaCode = mcp__figma-desktop__get_code();

// 2. Create React component file
// src/components/[category]/ComponentName.tsx

// 3. Convert className, fonts, colors
import React from 'react';

const ComponentName = () => {
  return (
    <div className="bg-[#dcd8d5] p-6">
      <h1 className="font-brushtones text-[#704938] text-4xl">
        Component Title
      </h1>
      {/* Converted content */}
    </div>
  );
};

export default ComponentName;
```

### Creating Standalone Preview
```javascript
// 1. Get code
const code = mcp__figma-desktop__get_code();

// 2. Convert to HTML (className → class, etc.)

// 3. Wrap in template
// 4. Save as [name]-standalone.html at project root

// 5. Open in browser
// File location: /Users/highcountryfarm/Desktop/working-caye-cruiser copy/[name]-standalone.html
```

### Extracting Design Variables
```javascript
// 1. Get variables
const vars = mcp__figma-desktop__get_variable_defs();

// 2. Map to CSS custom properties
// Update src/index.css
:root {
  --primary: /* extracted value */;
  --secondary: /* extracted value */;
}

// 3. Update tailwind.config.ts if needed
```

## Testing Guidelines

### Visual Testing
- [ ] Component matches Figma design
- [ ] Responsive at all breakpoints (mobile, tablet, desktop)
- [ ] Fonts render correctly
- [ ] Colors match design system
- [ ] Spacing is accurate

### Functional Testing
- [ ] Interactive elements work (buttons, links, forms)
- [ ] Hover states implemented
- [ ] Focus states visible
- [ ] Animations smooth (if applicable)

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast sufficient
- [ ] Touch targets adequate (44x44px minimum)

## Common Issues & Solutions

### Issue: Images not loading
**Solution:** Ensure Figma Desktop app is open with design file loaded

### Issue: Fonts not rendering
**Solution:** Verify font imports, check font-family names, ensure fallbacks

### Issue: Layout broken
**Solution:** Check for missing Tailwind classes, verify responsive breakpoints

### Issue: Colors don't match
**Solution:** Use color picker to verify hex values, check design system tokens

## File Organization

### Standalone Files
```
[component-name]-standalone.html  # At project root for easy access
```

### Integrated Components
```
src/
├── components/
│   ├── marketing/        # Landing page components
│   ├── ride/             # Ride-specific components
│   ├── partner/          # Partner components
│   └── ui/               # Reusable UI components
└── pages/                # Page-level components
```

## Documentation Requirements

When completing Figma-to-code work, document:

```markdown
## Design Tokens Captured
- PRIMARY_COLOR: #999933
- SECONDARY_COLOR: #6F9BA7
- ACCENT_COLOR: #663c2a

## Fonts Used
- Heading: font-grante (GRANTE)
- Decorative: font-brushtones (Kensington/Outward Round)
- Body: Inter

## Components Created
- File: src/components/marketing/NewComponent.tsx
- Type: Marketing/Landing component
- Responsive: Yes (mobile-first)
- Assets: 5 images in public/assets/new-component/

## Figma Link
[Figma Frame](figma-url-here)
```

## Workflow Reference

See full workflow documentation:
- `.claude/figma-to-standalone-workflow.md` - Complete guide with examples

## Output Format

When completing Figma work, provide:
1. **Component code** (React or HTML)
2. **File location** where saved
3. **Design tokens** extracted/used
4. **Font mappings** applied
5. **Asset handling** approach (localhost vs local)
6. **Testing notes** - visual comparison with Figma
7. **Figma node ID** for reference (if applicable)

## Example Agent Usage

User: "Convert the Hero section from Figma to a React component"

Agent Response:
1. Use `get_code` to extract Hero frame code
2. Use `get_screenshot` for visual reference
3. Convert to React component at `src/components/marketing/Hero.tsx`
4. Map fonts: Outward Round → font-brushtones
5. Extract colors: #999933 → primary, #704938 → accent-dark
6. Test responsive behavior (mobile, tablet, desktop)
7. Compare with Figma screenshot
8. Report: "Hero component created at marketing/Hero.tsx. Uses font-brushtones for title, primary/accent colors from design system. Fully responsive. Assets loading from Figma localhost. Visual match confirmed."

---

**Last Updated:** November 2025
