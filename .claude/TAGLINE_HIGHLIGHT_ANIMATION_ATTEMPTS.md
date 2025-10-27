# Tagline Highlight Animation - Debugging Log

> **Date**: October 24, 2025
> **Component**: `src/components/sections/TaglineSection.tsx`
> **Goal**: Animate a lime green background highlight behind the word "CRUISE" on scroll

---

## Design Requirements

From Figma design (node 391:167):
- **Default state**: All text in cocoa brown
- **Animated state**:
  - "PIN" changes color to lime green (#8fa542)
  - "CRUISE" has lime green background highlight appearing behind text
- Text uses `font-sans font-black` (matching About section header)
- Animation triggered on scroll

---

## What Works

✅ **PIN color animation** - Successfully animates from cocoa to lime green on scroll
- Uses GSAP `color` property animation
- ScrollTrigger with `scrub: 1` for smooth scroll-linked animation
- Working perfectly

---

## What Doesn't Work

❌ **CRUISE background highlight animation** - Element found, animation triggered, but not visible

### Console Evidence
Animation IS triggering:
```
Highlight element found: <span class="absolute inset-0 bg-primary -z-10">
Highlight animation progress: 0.013559322033898305
Highlight animation progress: 0.07796610169491526
...
Highlight animation progress: 1
```

The ScrollTrigger is working, the element exists, but the visual highlight doesn't appear.

---

## Attempts Made

### Attempt 1: Transform scaleX with z-index
```tsx
<span ref={cruiseRef} className="relative inline-block px-2">
  <div
    ref={cruiseHighlightRef}
    className="absolute inset-0 bg-primary"
    style={{ transformOrigin: "left center", zIndex: -1 }}
  />
  CRUISE
</span>

// Animation
gsap.to(cruiseHighlightRef.current, {
  scaleX: 1,
  scrollTrigger: { ... }
});
```
**Result**: ❌ Not visible

---

### Attempt 2: Width animation with fixed positioning
```tsx
<div
  ref={cruiseHighlightRef}
  className="absolute left-0 top-0 bottom-0 bg-primary"
  style={{ zIndex: -1, width: 0 }}
/>

// Animation
gsap.to(cruiseHighlightRef.current, {
  width: "100%",
  ease: "none",
  scrollTrigger: { ... }
});
```
**Result**: ❌ Not visible

---

### Attempt 3: Clip-path inset animation
```tsx
<div
  ref={cruiseHighlightRef}
  className="absolute inset-0 bg-primary"
  style={{ zIndex: -1 }}
/>

// Animation
gsap.set(cruiseHighlightRef.current, {
  clipPath: "inset(0 100% 0 0)",
  willChange: "clip-path",
  force3D: true,
});

gsap.to(cruiseHighlightRef.current, {
  clipPath: "inset(0 0% 0 0)",
  ease: "none",
  scrollTrigger: { ... }
});
```
**Result**: ❌ Not visible

---

### Attempt 4: Changed to span element with Tailwind -z-10
```tsx
<span ref={cruiseRef} className="relative inline-block px-1">
  <span
    ref={cruiseHighlightRef}
    className="absolute inset-0 bg-primary -z-10"
  />
  CRUISE
</span>

// Animation
gsap.fromTo(cruiseHighlightRef.current,
  { scaleX: 0 },
  {
    scaleX: 1,
    transformOrigin: "left center",
    ease: "none",
    scrollTrigger: { ... }
  }
);
```
**Result**: ❌ Animation triggers (confirmed in console), but not visible

---

### Attempt 5: Width animation on span with left/top/bottom positioning
```tsx
<span
  ref={cruiseHighlightRef}
  className="absolute left-0 top-0 bottom-0 bg-primary -z-10"
  style={{ width: 0 }}
/>

// Animation
gsap.fromTo(cruiseHighlightRef.current,
  { width: "0%" },
  { width: "100%", ease: "none", scrollTrigger: { ... } }
);
```
**Result**: ❌ Not visible (final attempt before removal)

---

## Observations

1. **Element exists**: Console confirms element is found and referenced correctly
2. **Animation runs**: Progress logs show 0 → 1, animation is executing
3. **ScrollTrigger works**: Same trigger pattern works for PIN color animation
4. **CSS classes applied**: DevTools shows classes are on the element
5. **z-index set**: Tried both `style={{zIndex: -1}}` and Tailwind `-z-10`

### Possible Issues

**Theory 1: Inline element stacking context**
- The parent `<span>` is `inline-block`, which might affect z-index layering
- The absolute positioned child might not be rendering behind the text

**Theory 2: Transform conflicts**
- Multiple transform-based animations (scaleX, width) might conflict with GSAP
- `force3D: true` might be causing GPU rendering issues

**Theory 3: Background color not rendering**
- `bg-primary` uses CSS variable `--primary`
- Might not be applying in this context (though same class works elsewhere)

**Theory 4: Position/overflow issues**
- Parent overflow settings might be clipping the highlight
- The `overflow-hidden` on the section might affect nested absolute elements

---

## Working Animation Pattern (from ShutterOverlay)

For reference, the ShutterOverlay uses this pattern successfully:
```tsx
// Polygon clip-path with dynamic calculation
gsap.to(element, {
  clipPath: `polygon(...)`, // Dynamic polygon points
  scrollTrigger: { ... }
});
```

This works because it's animating SVG-like shapes, not background elements.

---

## Recommendations for Next Attempt

### Option A: Use CSS background-image with gradient
Instead of an animated element, try animating a CSS gradient:
```tsx
gsap.to(cruiseRef.current, {
  backgroundImage: "linear-gradient(90deg, #8fa542 0%, #8fa542 100%)",
  backgroundSize: "100% 100%",
  scrollTrigger: { ... }
});
```

### Option B: Use pseudo-element via CSS
Create the highlight as a `::before` pseudo-element:
```css
.cruise-highlight::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--primary);
  z-index: -1;
  transform: scaleX(0);
  transform-origin: left center;
}
```
Then animate the class or inline style.

### Option C: Use SVG rect element
Create an actual SVG rectangle behind the text:
```tsx
<svg className="absolute inset-0 -z-10">
  <rect ref={highlightRef} fill="#8fa542" width="0%" height="100%" />
</svg>
```

### Option D: Investigate stacking context
- Try `z-index: 0` on parent span to create stacking context
- Use `isolation: isolate` on parent
- Try `position: relative` with explicit `z-index` values

---

## Current State

**Status**: Highlight animation removed, TODO added in code
**Working**: PIN color change animation only
**Removed**: All CRUISE highlight elements and animations

**Code location**: `src/components/sections/TaglineSection.tsx:30-31`
```tsx
// TODO: CRUISE highlight animation - removed temporarily
// See TAGLINE_HIGHLIGHT_ANIMATION_ATTEMPTS.md for debugging history
```

---

## Related Files

- Component: `src/components/sections/TaglineSection.tsx`
- Figma design: https://www.figma.com/design/JEIVs1nKju3Fnm3YmdcTR0/Caye-Cruiser-Deisgn?node-id=391-167
- Similar working pattern: `src/components/ui/ShutterOverlay.tsx`

---

**Last Updated**: October 24, 2025
