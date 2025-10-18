# Figma to Standalone HTML Workflow

## Purpose
Generate standalone HTML files from Figma designs for quick testing, isolated from the React app.

## Figma MCP Tools

**1. Get Code** (Full component):
```javascript
mcp__figma-desktop__get_code({
  clientLanguages: "javascript,html,css,typescript",
  clientFrameworks: "react"
})
```

**2. Get Metadata** (Structure only):
```javascript
mcp__figma-desktop__get_metadata({nodeId: "307:2325"})  // Optional nodeId
```

**3. Get Screenshot** (Visual reference):
```javascript
mcp__figma-desktop__get_screenshot()
```

**4. Get Variables** (Design tokens):
```javascript
mcp__figma-desktop__get_variable_defs()
```

## Workflows

**Quick**: `get_code` → Convert to HTML → Open in browser
**Full**: `get_code` + `get_screenshot` → Convert → Compare visually
**Metadata-First**: `get_metadata` → Identify nodeIds → `get_code` for specific nodes
**Design System**: `get_variable_defs` + `get_code_connect_map` → `get_code`

## File Location
Save at project root: `[component-name]-standalone.html`

## HTML Template
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
    @font-face { font-family: 'Kensington'; src: local('Arial'); font-style: italic; }
    body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
  </style>
</head>
<body>
  <!-- Generated HTML -->
</body>
</html>
```

## JSX → HTML Conversions
- `className` → `class`
- `style={{key: value}}` → `style="key: value"`
- `<div />` → `<div></div>`

## Font Mappings
- **Outward:Round** → `font-kensington` (Kensington, Arial)
- **Alumni_Sans** → Inter

## Assets
- Figma localhost: `http://localhost:3845/assets/[hash].[ext]` (requires Figma Desktop open)
- Local: Save to `public/assets/[component-name]/`

## Usage
Open file directly in browser or run: `open [component-name]-standalone.html`

## Notes
- For testing/preview only
- No build process needed
- Integrate into React app after approval
