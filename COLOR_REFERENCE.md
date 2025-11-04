# Caye Cruiser Color Reference Guide

This document provides a complete reference for all colors used in the Caye Cruiser website.

## Color Palette

### Primary Colors

#### Lime (Primary)
- **Tailwind Class**: `bg-primary`, `text-primary`, `border-primary`
- **HSL**: `hsl(60, 50%, 40%)`
- **Hex**: `#8fa542`
- **Usage**: Accent color, CTA buttons, highlights
- **CSS Variable**: `--primary`

#### Ocean Blue (Secondary)
- **Tailwind Class**: `bg-secondary`, `text-secondary`, `border-secondary`
- **HSL**: `hsl(193, 24%, 55%)`
- **Hex**: `#6FA8B8`
- **Usage**: Secondary accents, sections
- **CSS Variable**: `--secondary`

#### Cocoa (Accent/Dark Brown)
- **Tailwind Class**: `bg-cocoa`, `text-cocoa`, `border-cocoa`
- **HSL**: `hsl(17, 33%, 32%)`
- **Hex**: `#4D3C2E`
- **Usage**: Text, headings, dark sections
- **CSS Variable**: `--accent`

#### Sand (Background/Beige)
- **Tailwind Class**: `bg-sand`, `text-sand`, `border-sand`
- **HSL**: `hsl(30, 18%, 93%)`
- **Hex**: `#F2E5D4`
- **Usage**: Main background, light sections
- **CSS Variable**: `--background`

### Neutral Colors

#### White
- **Tailwind Class**: `bg-white`, `text-white`
- **Hex**: `#FFFFFF`
- **Usage**: Cards, overlays, text on dark backgrounds

#### Beige (Alternative sand tone)
- **Tailwind Class**: `text-beige`
- **HSL**: `hsl(30, 18%, 93%)`
- **Hex**: `#F2E5D4`
- **Usage**: Text on colored backgrounds

### Specific Use Cases

#### Lime Variant (Used in TaglineSection)
- **Hex**: `#8fa542`
- **Usage**: PIN text color change, underlines
- **Tailwind Equivalent**: `text-primary`

#### Cocoa Text (Used in multiple sections)
- **Hex**: `#4D3C2E`
- **Tailwind Equivalent**: `text-cocoa`

## Quick Reference Table

| Color Name | Tailwind Class | Hex Code | HSL | Common Uses |
|------------|---------------|----------|-----|-------------|
| Lime | `bg-primary` | #8fa542 | hsl(60, 50%, 40%) | Buttons, accents, highlights |
| Ocean Blue | `bg-secondary` | #6FA8B8 | hsl(193, 24%, 55%) | Section backgrounds, accents |
| Cocoa | `bg-cocoa` | #4D3C2E | hsl(17, 33%, 32%) | Text, dark sections, hero |
| Sand | `bg-sand` | #F2E5D4 | hsl(30, 18%, 93%) | Main background, light sections |
| White | `bg-white` | #FFFFFF | hsl(0, 0%, 100%) | Cards, overlays |

## Usage Guidelines

### Background Colors
```tsx
// Use Tailwind classes
<div className="bg-primary">Lime background</div>
<div className="bg-secondary">Ocean blue background</div>
<div className="bg-cocoa">Cocoa background</div>
<div className="bg-sand">Sand background</div>
```

### Text Colors
```tsx
// Use Tailwind classes
<h1 className="text-primary">Lime text</h1>
<h2 className="text-cocoa">Cocoa text</h2>
<p className="text-sand">Sand text (use on dark backgrounds)</p>
```

### Inline Styles (Use only when Tailwind classes don't work)
```tsx
// If you MUST use inline styles, use hex codes with a comment
<div style={{ color: "#8fa542" }}> {/* Lime/Primary */}
```

## Color Combinations

### Best Practices
- **Cocoa text** on **Sand background** ✅ (Main body text)
- **White/Sand text** on **Cocoa background** ✅ (Hero section)
- **Cocoa/White text** on **Lime background** ✅ (Buttons, CTAs)
- **White text** on **Ocean Blue background** ✅ (Secondary sections)

### Avoid
- Lime text on Sand background ❌ (Poor contrast)
- Ocean Blue text on Cocoa background ❌ (Poor readability)

## Section-Specific Colors

### HeroSection
- Background: Cocoa (`bg-cocoa`)
- Main text: Sand/White (`text-sand` or custom `#F2E5D4`)
- Accent text: Lime variant (`#ADAD50`)

### TaglineSection
- Background: Sand (`bg-sand`)
- Text: Cocoa (`text-cocoa`)
- Accent: Lime (`#8fa542` for underline)

### AboutSection
- Left side: Cocoa (`bg-cocoa`)
- Right side: Lime (`bg-primary`)
- Text: White/Sand

### QuickFacts
- Background: Ocean Blue (`bg-secondary`)
- Text: Sand (`text-sand`)

### Testimonials
- Card 1: Sand (`bg-sand`)
- Card 2: Lime (`bg-primary`)
- Card 3: Ocean Blue (`bg-secondary`)
- Text: Cocoa (`text-cocoa`)

### WavyMarqueeSection
- Background: Lime (`bg-primary`)
- Text: Sand

### LongTermRentals
- Background: Cocoa (`bg-cocoa`)
- Text: Lime (`text-primary`)

## Updating Colors

When you need to change a color:

1. **For global changes**: Update the CSS variable in `src/index.css`
2. **For component-specific changes**: Use Tailwind classes
3. **Never hardcode**: Always reference the color by name, not hex/HSL

## Notes

- All color variables are defined in `src/index.css` under `:root`
- Tailwind classes are configured in `tailwind.config.ts`
- Custom color utilities (`.bg-cocoa`, `.text-sand`) are in `src/index.css`
