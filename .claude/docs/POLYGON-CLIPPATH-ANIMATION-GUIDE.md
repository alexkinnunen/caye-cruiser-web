# Polygon Clip-Path Animation Guide

> **Pattern**: Dynamic polygon clip-path synced with GSAP scroll animations
> **Use Case**: ShutterOverlay text reveal synchronized with shutter positions
> **Difficulty**: Advanced
> **Status**: Working Solution

---

## Overview

This guide documents the successful implementation of a polygon clip-path animation that dynamically reveals/hides text in perfect sync with animated shutter elements.

### The Challenge

Create a text overlay that:
1. Stays ABOVE shutter elements (z-index layering)
2. Uses clip-path animation (not opacity)
3. Clips in perfect sync with shutter positions
4. Animates smoothly with scroll

### The Solution

Use **polygon clip-path** with **dynamic calculation** via GSAP's `onUpdate` callback, calculating polygon points based on animation progress and using viewport height units.

---

## Implementation

### Complete Code

```typescript
import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ShutterOverlayProps {
  children?: ReactNode;
}

const ShutterOverlay = ({ children }: ShutterOverlayProps) => {
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maxScroll = window.innerHeight * 0.5;

    // Animate top shutter - moves up
    const topTrigger = gsap.to(topBarRef.current, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: `+=${maxScroll}`,
        scrub: true,
      },
    });

    // Animate bottom shutter - moves down
    const bottomTrigger = gsap.to(bottomBarRef.current, {
      yPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: `+=${maxScroll}`,
        scrub: true,
      },
    });

    // Animate text overlay clip-path - syncs with shutters
    const textTrigger = gsap.to(textOverlayRef.current, {
      onUpdate: function () {
        const progress = this.progress(); // 0 to 1

        // Calculate shutter edge positions
        const topShutterBottom = 50 - progress * 50;    // 50vh → 0vh
        const bottomShutterTop = 50 + progress * 50;    // 50vh → 100vh

        // Create polygon that reveals text between shutters
        const clipPath = `polygon(
          0 0,
          100% 0,
          100% ${topShutterBottom}vh,
          0 ${topShutterBottom}vh,
          0 ${bottomShutterTop}vh,
          100% ${bottomShutterTop}vh,
          100% 100%,
          0 100%
        )`;

        if (textOverlayRef.current) {
          textOverlayRef.current.style.clipPath = clipPath;
        }
      },
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: `+=${maxScroll}`,
        scrub: true,
      },
    });

    // Cleanup
    return () => {
      topTrigger.scrollTrigger?.kill();
      bottomTrigger.scrollTrigger?.kill();
      textTrigger.scrollTrigger?.kill();
      topTrigger.kill();
      bottomTrigger.kill();
      textTrigger.kill();
    };
  }, []);

  return (
    <>
      {/* Text overlay - z-100 (ABOVE shutters) */}
      <div
        ref={textOverlayRef}
        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
      >
        <div className="text-center">
          <h1>YOUR TEXT HERE</h1>
        </div>
      </div>

      {/* Top shutter - z-90 */}
      <div
        ref={topBarRef}
        className="fixed top-0 left-0 w-full bg-sand z-[90]"
        style={{ height: "50vh" }}
      >
        {/* Shutter content */}
      </div>

      {/* Bottom shutter - z-90 */}
      <div
        ref={bottomBarRef}
        className="fixed left-0 w-full bg-sand z-[90]"
        style={{ height: "50vh", top: "50vh" }}
      >
        {/* Shutter content */}
      </div>

      {children}
    </>
  );
};

export default ShutterOverlay;
```

---

## How It Works

### 1. Polygon Clip-Path

A polygon clip-path defines a shape using coordinate points. We create an "H" shape that reveals text only in the middle section between the shutters.

**8-Point Polygon**:
```
1. (0, 0)                    - Top-left corner
2. (100%, 0)                 - Top-right corner
3. (100%, topShutterBottom)  - Top shutter bottom-right
4. (0, topShutterBottom)     - Top shutter bottom-left
5. (0, bottomShutterTop)     - Bottom shutter top-left
6. (100%, bottomShutterTop)  - Bottom shutter top-right
7. (100%, 100%)              - Bottom-right corner
8. (0, 100%)                 - Bottom-left corner
```

### 2. Dynamic Calculation

The `onUpdate` callback runs on every animation frame:

```typescript
const progress = this.progress(); // 0 to 1
const topShutterBottom = 50 - progress * 50;    // 50vh → 0vh
const bottomShutterTop = 50 + progress * 50;    // 50vh → 100vh
```

**Progress 0 (Start)**:
- Top shutter bottom edge: `50vh` (center)
- Bottom shutter top edge: `50vh` (center)
- Text clipped to middle (shutters covering top/bottom)

**Progress 0.5 (Midpoint)**:
- Top shutter bottom edge: `25vh` (quarter down)
- Bottom shutter top edge: `75vh` (three-quarters down)
- Text partially revealed

**Progress 1 (End)**:
- Top shutter bottom edge: `0vh` (top of screen)
- Bottom shutter top edge: `100vh` (bottom of screen)
- Text fully revealed (shutters off-screen)

### 3. Viewport Height Units

Using `vh` (viewport height) ensures the clip-path always matches the shutter positions exactly, regardless of screen size.

### 4. Visual Representation

```
Progress 0 (Start):           Progress 1 (End):
┌─────────────────┐          ┌─────────────────┐
│   TOP SHUTTER   │          │                 │ ← Top shutter (off-screen)
│─────────────────│← 50vh    │                 │
│   TEXT HIDDEN   │          │                 │
│─────────────────│← 50vh    │   TEXT VISIBLE  │
│  BOTTOM SHUTTER │          │                 │
└─────────────────┘          │                 │
                             │                 │ ← Bottom shutter (off-screen)
                             └─────────────────┘
```

---

## Key Insights

### Why Polygon Instead of Inset?

**Inset clip-path**:
```css
clip-path: inset(50% 0% 50% 0%);
/* Clips from all edges uniformly - too simple */
```

**Polygon clip-path**:
```css
clip-path: polygon(0 0, 100% 0, 100% 25vh, 0 25vh, 0 75vh, 100% 75vh, 100% 100%, 0 100%);
/* Creates complex "H" shape - precise control */
```

The polygon allows us to create a shape that reveals text only in the middle section, perfectly matching the shutter positions.

### Why onUpdate Callback?

GSAP's `onUpdate` callback runs on every animation frame, allowing us to:
1. Get current animation progress (0 to 1)
2. Calculate dynamic values based on progress
3. Update DOM directly (clip-path)
4. Ensure perfect sync with shutter animations

### Why Viewport Height Units?

Using `vh` instead of `%` or `px`:
- ✅ Always matches shutter positions (shutters use `height: 50vh`)
- ✅ Responsive across all screen sizes
- ✅ Simple math: `50vh ± progress * 50vh`
- ✅ No need to measure element heights

---

## Common Patterns

### Pattern 1: Synced Clip-Path Animation

```typescript
const progress = this.progress();
const value = startValue + (progress * range);
const clipPath = `polygon(...${value}vh...)`;
element.style.clipPath = clipPath;
```

### Pattern 2: Tween Reference Cleanup

```typescript
const tween = gsap.to(element, { /* ... */ });

return () => {
  tween.scrollTrigger?.kill();  // Kill ScrollTrigger
  tween.kill();                 // Kill tween
};
```

### Pattern 3: Multiple Synchronized Animations

```typescript
const anim1 = gsap.to(el1, { /* same start/end/scrub */ });
const anim2 = gsap.to(el2, { /* same start/end/scrub */ });
const anim3 = gsap.to(el3, { /* same start/end/scrub */ });
// All progress() values will match
```

---

## Customization

### Adjust Animation Distance

```typescript
const maxScroll = window.innerHeight * 0.5;  // Change multiplier
// 0.5 = half screen height
// 1.0 = full screen height
// 2.0 = two screen heights
```

### Change Clip Direction

```typescript
// Current: Text clips TO middle (starts visible)
const topShutterBottom = 50 - progress * 50;

// Reverse: Text clips FROM middle (starts hidden)
const topShutterBottom = progress * 50;
```

### Adjust Clip Speed

```typescript
// Faster clip (clips before shutters finish)
const topShutterBottom = 50 - progress * 60;  // Clips faster

// Slower clip (clips after shutters finish)
const topShutterBottom = 50 - progress * 40;  // Clips slower
```

### Add Easing to Clip Animation

```typescript
const textTrigger = gsap.to(textOverlayRef.current, {
  onUpdate: function () {
    const progress = this.progress();
    // Apply easing function to progress
    const easedProgress = gsap.parseEase("power2.inOut")(progress);
    const topShutterBottom = 50 - easedProgress * 50;
    // ...
  },
  ease: "none", // Keep ScrollTrigger easing as "none"
  // ...
});
```

---

## Troubleshooting

### Issue: Text Not Clipping

**Check**:
1. Is `onUpdate` firing? Add `console.log(this.progress())`
2. Is element ref valid? Check `textOverlayRef.current`
3. Is clip-path being set? Inspect element in DevTools

### Issue: Clip-Path Not Syncing with Shutters

**Check**:
1. Same ScrollTrigger config for all animations?
2. Same `start`, `end`, and `scrub` values?
3. Using `vh` units (not `%` or `px`)?

### Issue: Jumpy Animation

**Possible causes**:
1. Using `scrub: 1` instead of `scrub: true`
2. Lenis not initialized
3. Browser performance issues

**Solution**:
```typescript
scrub: true,  // Use boolean, not number
```

### Issue: Text Visible When It Shouldn't Be

**Check z-index layering**:
```typescript
// Text overlay
className="... z-[100]"  // Above shutters

// Shutters
className="... z-[90]"   // Below text
```

---

## Best Practices

### ✅ Do

1. **Store tween references** for proper cleanup
2. **Use viewport height units** for responsive clipping
3. **Match ScrollTrigger configs** across synced animations
4. **Check element refs** before accessing
5. **Use `scrub: true`** for smooth scrubbing

### ❌ Don't

1. **Don't use gsap.context()** - not needed for this pattern
2. **Don't use percentage values** - viewport units work better
3. **Don't forget cleanup** - memory leaks from ScrollTriggers
4. **Don't mix units** - stick to `vh` throughout
5. **Don't use different ScrollTrigger configs** - breaks sync

---

## Performance Considerations

### GPU Acceleration

```typescript
// Add to shutter elements
className="... will-change-transform"

// Or in GSAP
gsap.set(element, { force3D: true });
```

### Reduce onUpdate Calculations

```typescript
// Cache calculations outside onUpdate if possible
const halfViewport = window.innerHeight / 2;

onUpdate: function() {
  // Reuse cached value
}
```

### Limit Clip-Path Complexity

- 8 points is optimal for this effect
- More points = slower rendering
- Simpler polygons = better performance

---

## Related Patterns

### Circular Clip-Path Animation

```typescript
const clipPath = `circle(${progress * 50}% at 50% 50%)`;
```

### Horizontal Clip Animation

```typescript
const leftEdge = progress * 50;
const rightEdge = 100 - (progress * 50);
const clipPath = `polygon(${leftEdge}% 0, ${rightEdge}% 0, ${rightEdge}% 100%, ${leftEdge}% 100%)`;
```

### Multi-Step Clip Animation

```typescript
const step1 = Math.min(progress * 2, 1);      // 0-0.5 → 0-1
const step2 = Math.max((progress - 0.5) * 2, 0); // 0.5-1 → 0-1
```

---

## Testing Checklist

- [ ] Text starts fully visible
- [ ] Text clips in sync with shutters
- [ ] Text stays above shutters (z-index)
- [ ] Animation is smooth (no jumps)
- [ ] Works across different screen sizes
- [ ] Cleanup runs on unmount (no memory leaks)
- [ ] Performance is acceptable (60fps)

---

## References

- **Implementation**: `src/components/ui/ShutterOverlay.tsx`
- **Debugging Log**: `.claude/SHUTTER_OVERLAY_ANIMATION_ATTEMPTS.md`
- **GSAP onUpdate**: https://gsap.com/docs/v3/GSAP/Tween/eventCallback()
- **CSS Clip-Path**: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path

---

**Created**: October 2025
**Status**: Production-ready
**Difficulty**: Advanced
**Use Cases**: Synced reveal animations, scroll-based clipping effects, layered animations
