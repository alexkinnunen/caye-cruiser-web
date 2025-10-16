# GSAP ScrollTrigger Implementation Guide

## Overview
This document outlines the correct approach for implementing GSAP ScrollTrigger animations in a React application, based on lessons learned from debugging the HowItWorksJourney component.

---

## Key Principles

### 1. **Avoid ScrollSmoother in React Applications**

**Problem**: ScrollSmoother creates significant complexity with React's lifecycle:
- Race conditions between component mounting and ScrollSmoother initialization
- React StrictMode runs effects twice, causing double initialization
- Requires complex polling/timeout mechanisms to ensure DOM elements exist
- Creates dependencies between components that are hard to manage

**Solution**: Use standard ScrollTrigger without ScrollSmoother

```tsx
// ❌ AVOID - ScrollSmoother complexity
useEffect(() => {
  let smoother: ScrollSmoother | null = null;
  const initTimeout = setTimeout(() => {
    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");
    if (wrapper && content) {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        smoothTouch: 0.1,
      });
    }
  }, 50);
  return () => {
    clearTimeout(initTimeout);
    smoother?.kill();
  };
}, []);

// ✅ PREFER - Standard ScrollTrigger
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        // NO scroller property needed
      },
    });
  }, containerRef);

  return () => ctx.revert();
}, []);
```

---

## Standard ScrollTrigger Implementation Pattern

### Component Structure

```tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MyComponent = () => {
  // Step 1: Create refs for all elements you'll animate
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Step 2: Get current values from refs
    const container = containerRef.current;
    const element = elementRef.current;

    // Step 3: Guard clause - exit if refs aren't ready
    if (!container || !element) return;

    // Step 4: Create GSAP context for automatic cleanup
    const ctx = gsap.context(() => {
      // Step 5: Define all animations within context
      gsap.to(element, {
        x: 500,
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          // Do NOT use 'scroller' property unless using ScrollSmoother
        },
      });
    }, container); // Pass container as scope

    // Step 6: Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Step 7: Return cleanup function
    return () => {
      ctx.revert(); // Kills all animations and ScrollTriggers in context
    };
  }, []); // Empty dependency array - run once on mount

  return (
    <div ref={containerRef}>
      <div ref={elementRef}>Animated content</div>
    </div>
  );
};
```

---

## Common Patterns

### Horizontal Scroll Animation

```tsx
const HorizontalScroll = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          end: () => "+=" + (track.scrollWidth - window.innerWidth),
          anticipatePin: 1,
        },
      });
    }, wrapper);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ overflow: "hidden" }}>
      <div ref={trackRef} style={{ display: "flex", width: "300vw" }}>
        {/* Horizontal content */}
      </div>
    </div>
  );
};
```

### Staggered Animations

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>(".item").forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    });
  }, containerRef);

  ScrollTrigger.refresh();
  return () => ctx.revert();
}, []);
```

### SVG Path Animation

```tsx
const pathRef = useRef<SVGPathElement>(null);

useEffect(() => {
  const path = pathRef.current;
  if (!path) return;

  const ctx = gsap.context(() => {
    const pathLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: path,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, path);

  ScrollTrigger.refresh();
  return () => ctx.revert();
}, []);
```

---

## Debugging Checklist

When ScrollTrigger animations aren't working:

### 1. **Check Browser Console**
- [ ] Are there "Element not found" errors?
- [ ] Are there GSAP-related errors?
- [ ] Are there timing/race condition errors?

### 2. **Verify Element References**
- [ ] Do all refs have `.current` values?
- [ ] Are elements rendered in the DOM when useEffect runs?
- [ ] Add guard clauses: `if (!element) return;`

### 3. **Check ScrollTrigger Configuration**
- [ ] Is `scroller` property removed (unless using ScrollSmoother)?
- [ ] Are `trigger`, `start`, `end` values correct?
- [ ] Is `scrub` or `toggleActions` set appropriately?

### 4. **Verify GSAP Context**
- [ ] Is `gsap.context()` being used?
- [ ] Is cleanup function returning `ctx.revert()`?
- [ ] Is `ScrollTrigger.refresh()` called after setup?

### 5. **Clear Caches**
```bash
# Kill dev server
lsof -ti:5173 | xargs kill -9

# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

---

## Common Errors and Solutions

### Error: "Element not found: #smooth-content"

**Cause**: Using `scroller: "#smooth-content"` without ScrollSmoother

**Solution**: Remove the `scroller` property from ScrollTrigger config

```tsx
// ❌ WRONG
scrollTrigger: {
  trigger: wrapper,
  scroller: "#smooth-content", // Remove this
  scrub: 1,
}

// ✅ CORRECT
scrollTrigger: {
  trigger: wrapper,
  scrub: 1,
}
```

### Error: "Cannot read properties of undefined (reading '_gsap')"

**Cause**: ScrollTrigger trying to animate element that doesn't exist

**Solution**: Add proper null checks

```tsx
useEffect(() => {
  const element = elementRef.current;
  if (!element) return; // Add this guard clause

  const ctx = gsap.context(() => {
    gsap.to(element, { ... });
  }, element);

  return () => ctx.revert();
}, []);
```

### Error: "ScrollSmoother needs a valid content element"

**Cause**: Trying to use ScrollSmoother in React

**Solution**: Remove ScrollSmoother entirely, use standard ScrollTrigger

---

## Best Practices

### 1. **Use TypeScript for Type Safety**
```tsx
const elementRef = useRef<HTMLDivElement>(null);
const pathRef = useRef<SVGPathElement>(null);
```

### 2. **Always Use gsap.context()**
- Provides automatic cleanup
- Scopes selectors to specific elements
- Prevents memory leaks

### 3. **Register Plugins Once**
```tsx
// At top of file, outside component
gsap.registerPlugin(ScrollTrigger);
```

### 4. **Refresh ScrollTrigger After Setup**
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // animations...
  }, container);

  ScrollTrigger.refresh(); // Important!
  return () => ctx.revert();
}, []);
```

### 5. **Use Empty Dependency Array**
```tsx
useEffect(() => {
  // GSAP setup
}, []); // Run once on mount
```

### 6. **Keep Layout Component Simple**

```tsx
// ✅ GOOD - Simple layout wrapper
const Main = () => {
  return (
    <div className="relative z-10 flex flex-grow flex-col">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

// ❌ AVOID - Complex layout with GSAP dependencies
const Main = () => {
  useEffect(() => {
    // Complex ScrollSmoother setup...
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {/* ... */}
      </div>
    </div>
  );
};
```

---

## Implementation Workflow

### Step 1: Plan Your Animation
- Identify what elements will animate
- Determine scroll trigger points
- Decide on animation type (scrub, toggle, etc.)

### Step 2: Set Up Component Structure
```tsx
const MyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation setup will go here
  }, []);

  return (
    <div ref={containerRef}>
      <div ref={elementRef}>Content</div>
    </div>
  );
};
```

### Step 3: Implement GSAP Animation
```tsx
useEffect(() => {
  const container = containerRef.current;
  const element = elementRef.current;
  if (!container || !element) return;

  const ctx = gsap.context(() => {
    gsap.to(element, {
      // animation properties
      scrollTrigger: {
        trigger: container,
        // ScrollTrigger properties
      },
    });
  }, container);

  ScrollTrigger.refresh();
  return () => ctx.revert();
}, []);
```

### Step 4: Test in Browser
- Open DevTools console
- Check for errors
- Verify animations trigger at correct scroll positions
- Test on different screen sizes

### Step 5: Debug if Needed
- Use ScrollTrigger markers: `markers: true`
- Check element dimensions
- Verify trigger points with DevTools

---

## Example: Complete Working Component

```tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowItWorksJourney = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const path = pathRef.current;

    if (!wrapper || !track || !path) return;

    const ctx = gsap.context(() => {
      // Horizontal scroll
      gsap.to(track, {
        x: () => -(window.innerWidth * 2),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          end: () => "+=" + (window.innerWidth * 2),
          anticipatePin: 1,
        },
      });

      // Word animations
      gsap.utils.toArray<HTMLElement>(".step-text").forEach((text) => {
        const words = text.textContent?.split(" ") || [];
        text.innerHTML = words
          .map((word) => `<span class="word inline-block mr-4">${word}</span>`)
          .join("");

        gsap.from(text.querySelectorAll(".word"), {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: text.closest(".step"),
            start: "left 70%",
            end: "left 30%",
            scrub: 1,
          },
        });
      });

      // Icon animations
      gsap.utils.toArray<HTMLImageElement>(".step-icon").forEach((icon) => {
        gsap.fromTo(
          icon,
          { opacity: 0 },
          {
            opacity: 0.8,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: icon.closest(".step"),
              start: "left 60%",
              end: "left 40%",
              scrub: 1,
            },
          }
        );
      });

      // SVG path animation
      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, wrapper);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative overflow-hidden bg-sand"
      style={{ height: "100vh" }}
    >
      <svg
        className="absolute top-1/2 left-0 w-full pointer-events-none"
        style={{ transform: "translateY(-50%)" }}
        viewBox="0 0 2400 400"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M0,300 C200,200 400,400 800,300 C1200,200 1400,400 1600,300 C2000,200 2200,400 2400,300"
          stroke="hsl(193, 24%, 55%)"
          strokeWidth="3"
          fill="none"
          opacity="0.3"
        />
      </svg>

      <div ref={trackRef} className="flex" style={{ width: "300vw" }}>
        <div className="step w-screen h-screen flex flex-col items-center justify-center">
          <h2 className="step-text text-6xl lg:text-8xl font-brushtones text-cocoa text-center uppercase px-8">
            Drop A Pin
          </h2>
          <img
            src="/mapicon.svg"
            alt=""
            className="step-icon mt-[-40px] w-48 md:w-64 lg:w-80"
            style={{ opacity: 0 }}
          />
        </div>

        <div className="step w-screen h-screen flex flex-col items-center justify-center">
          <h2 className="step-text text-6xl lg:text-8xl font-brushtones text-cocoa text-center uppercase px-8">
            We Match You
          </h2>
          <img
            src="/chaticon.svg"
            alt=""
            className="step-icon mt-[-40px] w-48 md:w-64 lg:w-80"
            style={{ opacity: 0 }}
          />
        </div>

        <div className="step w-screen h-screen flex flex-col items-center justify-center">
          <h2 className="step-text text-6xl lg:text-8xl font-brushtones text-cocoa text-center uppercase px-8">
            You Enjoy The Cruise
          </h2>
          <img
            src="/squiggleicon.svg"
            alt=""
            className="step-icon mt-[-40px] w-64 md:w-80 lg:w-96"
            style={{ opacity: 0 }}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksJourney;
```

---

## When to Use ScrollSmoother

ScrollSmoother can be used in React applications, but only if:
1. You understand the complexity and timing challenges
2. You implement proper polling/waiting mechanisms
3. You handle React StrictMode double-mounting
4. You really need smooth scrolling (most sites don't)

**Recommendation**: For 99% of use cases, standard ScrollTrigger is sufficient and much simpler.

---

## Resources

- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP React Guide](https://greensock.com/react/)
- [ScrollTrigger Examples](https://greensock.com/st-demos/)

---

## Troubleshooting Process (From This Project)

### Issue Encountered
- Site preview not displaying
- "Element not found: #smooth-content" errors
- "Cannot read properties of undefined (reading '_gsap')" errors
- "ScrollSmoother needs a valid content element" errors

### Root Causes Identified
1. ScrollSmoother initialization racing with component mounting
2. React StrictMode running effects twice
3. HowItWorksJourney depending on ScrollSmoother's #smooth-content element
4. Vite cache holding old code versions

### Solution Applied
1. **Removed ScrollSmoother completely** from Main.tsx
2. **Simplified Main component** to basic layout wrapper
3. **Updated HowItWorksJourney** to use standard ScrollTrigger (no `scroller` property)
4. **Cleared Vite cache** and restarted dev server
5. **Moved InteractiveMap** to Home.tsx as standalone section

### Result
- ✅ Site preview working
- ✅ No console errors
- ✅ All animations working correctly
- ✅ Simpler, more maintainable code

---

## Document Version
- **Created**: 2025-10-11
- **Last Updated**: 2025-10-11
- **Project**: Caye Cruiser
- **Author**: Development Team
