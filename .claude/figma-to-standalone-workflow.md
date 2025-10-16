# Figma to Standalone Component Workflow

## Purpose
This document outlines the process for generating standalone HTML files from Figma designs for quick testing and preview, completely isolated from the main React application.

## Process Overview

### 1. Generate Code from Figma
Use the Figma MCP to extract code from the selected frame:

```javascript
mcp__figma-desktop__get_code({
  clientLanguages: "javascript,html,css,typescript",
  clientFrameworks: "react"
})
```

**This returns:** Full React/Tailwind component code with inline styles and image URLs

### 2. Alternative: Get Metadata Only (Faster, No Screenshot Needed)
If you want to understand the structure without full code generation:

```javascript
mcp__figma-desktop__get_metadata({
  clientLanguages: "javascript,html,css,typescript",
  clientFrameworks: "react",
  nodeId: "307:2325"  // Optional: specific node ID
})
```

**This returns:** XML format with node IDs, layer types, names, positions, and sizes
**Use case:** Quick overview of structure, then call `get_code` on specific node IDs

### 3. Optional: Get Screenshot for Visual Context
Use this if you need to see what the design looks like:

```javascript
mcp__figma-desktop__get_screenshot({
  clientLanguages: "javascript,html,css,typescript",
  clientFrameworks: "react"
})
```

**When to skip:** If you trust the generated code and want to work faster without visual reference

### 4. Additional Tools Available

#### Get Design Variables
Extract design tokens (colors, spacing, etc.):

```javascript
mcp__figma-desktop__get_variable_defs({
  clientLanguages: "javascript,html,css,typescript",
  clientFrameworks: "react",
  nodeId: "307:2325"  // Optional
})
```

**Returns:** Variable definitions like `{'icon/default/secondary': '#949494'}`

#### Get Code Connect Mapping
Find connections between Figma components and your codebase:

```javascript
mcp__figma-desktop__get_code_connect_map({
  clientLanguages: "javascript,html,css,typescript",
  clientFrameworks: "react",
  nodeId: "307:2325"  // Optional
})
```

**Returns:** Mapping like `{'1:2': {codeConnectSrc: 'Button.tsx', codeConnectName: 'Button'}}`

### 5. Create Standalone HTML File
Instead of integrating into the React app, create a standalone HTML file with:

- **CDN Tailwind CSS** for styling (not npm package)
- **Direct HTML markup** (not JSX/React components)
- **Inline styles** where needed
- **All fonts** loaded via CDN or web fonts
- **No dependencies** on the main application

## Recommended Workflows

### Quick Workflow (Without Screenshot)
**Best for:** Trusted designs, faster iteration
1. `get_code` → Extract full component code
2. Convert to standalone HTML
3. Open in browser

### Full Workflow (With Screenshot)
**Best for:** Complex designs, visual verification needed
1. `get_code` → Extract full component code
2. `get_screenshot` → Get visual reference
3. Convert to standalone HTML
4. Open in browser and compare with screenshot

### Metadata-First Workflow
**Best for:** Large designs, need to understand structure first
1. `get_metadata` → Get XML overview of structure
2. Identify specific node IDs of interest
3. `get_code` with specific nodeId → Get code for that section only
4. Convert to standalone HTML

### Design System Workflow
**Best for:** Setting up design tokens, understanding variables
1. `get_variable_defs` → Extract all design variables
2. `get_code_connect_map` → Find existing component mappings
3. `get_code` → Generate component code
4. Convert with proper variable usage

### 6. File Structure
Save the standalone file at the project root:
```
/Users/highcountryfarm/Desktop/working-caye-cruiser copy/[component-name]-standalone.html
```

### Example Template

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

    /* Custom font definitions */
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
    // Tailwind config for custom theme
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
  <!-- Generated Figma HTML goes here -->
</body>
</html>
```

## Key Conversions

### From React/JSX to HTML

| React/JSX | HTML |
|-----------|------|
| `className` | `class` |
| `style={{ key: value }}` | `style="key: value"` |
| CSS custom properties in React style objects | Inline CSS custom properties |
| Self-closing tags `<div />` | `<div></div>` |

### Font Mappings for Caye Cruiser Project

| Figma Font | Project Class | Fallback |
|-----------|---------------|----------|
| Outward:Round | `font-brushtones` | Kensington, Arial |
| Alumni_Sans:SemiBold | Standard sans-serif | Inter |

## Asset Handling

### Figma Localhost Assets
Images from Figma are served at: `http://localhost:3845/assets/[hash].[ext]`

**Requirements:**
- Figma Desktop app must be open
- Design file must be loaded
- Assets load dynamically from Figma's local server

### Alternative: Local Assets
For production or if Figma assets don't load:
1. Create `public/assets/[component-name]/` directory
2. Download assets from Figma
3. Update image src paths to `/assets/[component-name]/[filename]`

## Usage

### Opening the Standalone File
Users can view the standalone HTML by:
1. Double-clicking the file in Finder
2. Dragging and dropping into a browser
3. Running: `open [component-name]-standalone.html`

### Benefits of Standalone Files
- ✅ No integration with existing codebase
- ✅ No build process required
- ✅ Instant preview in any browser
- ✅ No dependencies on React, router, or layout components
- ✅ Perfect for quick design review and testing
- ✅ Can be shared easily with designers/stakeholders

## Integration Later

Once approved, the component can be:
1. Converted back to React/TypeScript (`.tsx`)
2. Integrated into the routing system
3. Assets moved to proper directories
4. Component styled with project's Tailwind config

## Design Tokens Captured

Always note design tokens from Figma in the standalone file:
```html
<!-- Design Tokens:
  DARK-BROWN: #663c2a
  FADED-GREY: #a6a2a1
  LIGHT-BROWN: #704938
-->
```

## Checklist

When creating a standalone component:
- [ ] Use Figma MCP to generate code
- [ ] Get screenshot for visual context
- [ ] Convert React/JSX to pure HTML
- [ ] Use CDN Tailwind (not npm)
- [ ] Load fonts via CDN/web fonts
- [ ] Map project fonts correctly
- [ ] Save as `[name]-standalone.html` at project root
- [ ] Document design tokens in comments
- [ ] Test by opening in browser
- [ ] Verify all assets load (Figma localhost or local)

## Notes

- This workflow is for **testing and preview only**
- Final components should be properly integrated into the React app
- Standalone files are not meant for production deployment
- Keep standalone files at project root for easy access and cleanup
