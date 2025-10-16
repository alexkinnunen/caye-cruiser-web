# HowItWorksJourney Customization Guide

This guide explains how to adjust the size, positioning, and animations of elements in the HowItWorksJourney horizontal scroll component.

---

## Table of Contents
1. [Static Positioning (Tailwind CSS)](#static-positioning-tailwind-css)
2. [Animated Positioning (GSAP)](#animated-positioning-gsap)
3. [Text Styling](#text-styling)
4. [Icon/SVG Styling](#iconsvg-styling)
5. [Wavy Path Customization](#wavy-path-customization)
6. [Common Adjustments](#common-adjustments)

---

## Static Positioning (Tailwind CSS)

These styles are applied directly in the JSX and control the initial/static appearance.

### Step Container

```tsx
<div className="step w-screen h-screen flex flex-col items-center justify-center relative">
```

**Adjustable Classes:**
- `w-screen` - Width (100% of viewport width)
- `h-screen` - Height (100% of viewport height)
- `flex flex-col` - Vertical layout
- `items-center` - Horizontal centering
  - Change to `items-start` to align left
  - Change to `items-end` to align right
- `justify-center` - Vertical centering
  - Change to `justify-start` to align top
  - Change to `justify-end` to align bottom
  - Change to `justify-between` to spread elements

**Example - Align content to top-left:**
```tsx
<div className="step w-screen h-screen flex flex-col items-start justify-start relative pl-20 pt-20">
```

### Text Positioning

```tsx
<h2 className="step-text text-6xl lg:text-8xl font-brushtones text-cocoa text-center px-8">
  DROP YOUR PIN
</h2>
```

**Size Adjustments:**
- `text-6xl` - Base size (60px)
- `lg:text-8xl` - Large screen size (96px)
- Add `md:text-7xl` for medium screens
- Available sizes: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` through `text-9xl`

**Spacing Adjustments:**
- `px-8` - Horizontal padding (32px)
- `py-4` - Vertical padding (16px)
- `mt-10` - Margin top
- `mb-10` - Margin bottom

**Alignment:**
- `text-center` - Centered text
- `text-left` - Left-aligned
- `text-right` - Right-aligned

**Example - Larger text with more spacing:**
```tsx
<h2 className="step-text text-7xl md:text-8xl lg:text-9xl font-brushtones text-cocoa text-center px-12 py-6">
  DROP YOUR PIN
</h2>
```

### Icon/SVG Positioning

```tsx
<img
  src={mapIcon}
  alt=""
  className="step-icon mt-[-300px] w-48 md:w-64 lg:w-20"
  style={{ opacity: 0 }}
/>
```

**Size Adjustments:**
- `w-48` - Width 192px (base/mobile)
- `md:w-64` - Width 256px (medium screens)
- `lg:w-20` - Width 80px (large screens)
- Use `h-48`, `h-64`, etc. to control height
- Available sizes: `w-4` (16px) through `w-96` (384px)

**Position Adjustments:**
- `mt-[-300px]` - Negative margin moves icon UP by 300px
- `mt-[300px]` - Positive margin moves icon DOWN
- `ml-[-100px]` - Move left
- `mr-[-100px]` - Move right
- `absolute top-0 left-0` - Absolute positioning

**Example - Icon below text, larger size:**
```tsx
<img
  src={mapIcon}
  alt=""
  className="step-icon mt-8 w-64 md:w-80 lg:w-96"
  style={{ opacity: 0 }}
/>
```

**Example - Icon positioned absolutely in top-right corner:**
```tsx
<img
  src={mapIcon}
  alt=""
  className="step-icon absolute top-10 right-10 w-32"
  style={{ opacity: 0 }}
/>
```

---

## Animated Positioning (GSAP)

Add dynamic animations that happen during scroll.

### Current Icon Animation (Fade In)

```tsx
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
```

### Add Scale Animation (Grow as it appears)

```tsx
gsap.utils.toArray<HTMLImageElement>(".step-icon").forEach((icon) => {
  gsap.fromTo(
    icon,
    {
      opacity: 0,
      scale: 0.5,  // Start at 50% size
      y: 100       // Start 100px below
    },
    {
      opacity: 0.8,
      scale: 1,    // End at 100% size
      y: 0,        // End at original position
      duration: 1,
      ease: "back.out(1.5)",  // Bouncy easing
      scrollTrigger: {
        trigger: icon.closest(".step"),
        start: "left 60%",
        end: "left 40%",
        scrub: 1,
      },
    }
  );
});
```

### Add Rotation Animation

```tsx
gsap.utils.toArray<HTMLImageElement>(".step-icon").forEach((icon) => {
  gsap.fromTo(
    icon,
    {
      opacity: 0,
      rotation: -180  // Start rotated -180 degrees
    },
    {
      opacity: 0.8,
      rotation: 0,     // End at 0 degrees (normal)
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
```

### Float Animation (Continuous motion)

```tsx
// Add AFTER the existing icon animation
gsap.utils.toArray<HTMLImageElement>(".step-icon").forEach((icon) => {
  // Continuous floating motion
  gsap.to(icon, {
    y: -20,
    duration: 2,
    ease: "power1.inOut",
    yoyo: true,      // Reverse animation
    repeat: -1,      // Repeat forever
  });
});
```

---

## Text Styling

### Current Word Animation

```tsx
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
```

### Customization Options

**Change animation direction:**
```tsx
gsap.from(text.querySelectorAll(".word"), {
  x: -100,        // Slide from left
  // or
  x: 100,         // Slide from right
  // or
  y: -100,        // Slide from top
  // or
  scale: 0,       // Scale from 0
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: text.closest(".step"),
    start: "left 70%",
    end: "left 30%",
    scrub: 1,
  },
});
```

**Change stagger timing:**
```tsx
stagger: 0.05,  // Faster (words appear quickly)
// or
stagger: 0.3,   // Slower (more dramatic)
// or
stagger: {
  amount: 1,    // Total time for all words
  from: "center", // Start from center word
  // Options: "start", "center", "end", "edges", "random"
}
```

**Change easing:**
```tsx
ease: "elastic.out(1, 0.3)",  // Bouncy
// or
ease: "bounce.out",            // Bouncy
// or
ease: "power4.out",            // Smooth
// or
ease: "expo.out",              // Very dramatic
```

**Add color animation:**
```tsx
gsap.from(text.querySelectorAll(".word"), {
  y: 100,
  opacity: 0,
  color: "#ffffff",  // Start white
  scrollTrigger: {
    trigger: text.closest(".step"),
    start: "left 70%",
    end: "left 30%",
    scrub: 1,
  },
});
// Will animate to the original color (text-cocoa)
```

---

## Icon/SVG Styling

### Individual Icon Customization

You can target specific icons by index:

```tsx
// In the useEffect, after the forEach loop
gsap.utils.toArray<HTMLImageElement>(".step-icon").forEach((icon, index) => {
  let animProps = { opacity: 0 };
  let endProps: any = {
    opacity: 0.8,
    duration: 1,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: icon.closest(".step"),
      start: "left 60%",
      end: "left 40%",
      scrub: 1,
    },
  };

  // Different animation for each icon
  if (index === 0) {
    // First icon - bounce in
    animProps = { opacity: 0, scale: 0, rotation: -360 };
    endProps.scale = 1;
    endProps.rotation = 0;
    endProps.ease = "elastic.out(1, 0.5)";
  } else if (index === 1) {
    // Second icon - slide from right
    animProps = { opacity: 0, x: 200 };
    endProps.x = 0;
  } else if (index === 2) {
    // Third icon - fade and scale
    animProps = { opacity: 0, scale: 0.3 };
    endProps.scale = 1;
  }

  gsap.fromTo(icon, animProps, endProps);
});
```

---

## Wavy Path Customization

### Current Path

```tsx
<path
  ref={pathRef}
  d="M0,300 C200,200 400,400 800,300 C1200,200 1400,400 1600,300 C2000,200 2200,400 2400,300"
  stroke="hsl(193, 24%, 55%)"
  strokeWidth="10"
  fill="none"
  opacity="0.3"
/>
```

### Adjustments

**Stroke Width:**
```tsx
strokeWidth="3"   // Thinner line
strokeWidth="20"  // Thicker line
```

**Stroke Color:**
```tsx
stroke="hsl(193, 24%, 55%)"  // Teal (current)
stroke="#FF6B6B"              // Red
stroke="hsl(45, 100%, 50%)"  // Yellow
stroke="rgba(255, 255, 255, 0.5)" // Semi-transparent white
```

**Opacity:**
```tsx
opacity="0.1"  // Very faint
opacity="0.8"  // More visible
opacity="1"    // Fully opaque
```

**Wave Pattern (d attribute):**

The `d` attribute defines the path shape. Format: `M x,y C x1,y1 x2,y2 x,y ...`

```tsx
// Gentle waves
d="M0,300 C400,250 800,350 1200,300 C1600,250 2000,350 2400,300"

// Extreme waves
d="M0,300 C200,100 400,500 800,300 C1200,100 1400,500 1600,300 C2000,100 2200,500 2400,300"

// Straight line
d="M0,300 L2400,300"
```

### Path Animation Customization

```tsx
// Current animation
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

// Reverse direction (draw from right to left)
const pathLength = path.getTotalLength();
gsap.set(path, {
  strokeDasharray: pathLength,
  strokeDashoffset: 0,
});
gsap.to(path, {
  strokeDashoffset: pathLength,  // Animate to full offset
  ease: "none",
  scrollTrigger: {
    trigger: wrapper,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
});

// Add color change during draw
gsap.to(path, {
  strokeDashoffset: 0,
  stroke: "#FF6B6B",  // Change to red as it draws
  ease: "none",
  scrollTrigger: {
    trigger: wrapper,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
});
```

---

## Common Adjustments

### 1. Make Icons Larger

**In JSX:**
```tsx
<img
  src={mapIcon}
  alt=""
  className="step-icon mt-[-40px] w-64 md:w-80 lg:w-96"  // Changed from w-48 md:w-64 lg:w-20
  style={{ opacity: 0 }}
/>
```

### 2. Position Icon Above Text

**Change the order in JSX:**
```tsx
<div className="step w-screen h-screen flex flex-col items-center justify-center relative">
  {/* Icon FIRST */}
  <img
    src={mapIcon}
    alt=""
    className="step-icon mb-8 w-48 md:w-64 lg:w-80"  // mb-8 adds margin below
    style={{ opacity: 0 }}
  />
  {/* Text SECOND */}
  <h2 className="step-text text-6xl lg:text-8xl font-brushtones text-cocoa text-center px-8">
    DROP YOUR PIN
  </h2>
</div>
```

### 3. Position Icon to Side of Text

**Use flex-row instead of flex-col:**
```tsx
<div className="step w-screen h-screen flex flex-row items-center justify-center relative gap-12">
  <h2 className="step-text text-6xl lg:text-8xl font-brushtones text-cocoa text-center px-8">
    DROP YOUR PIN
  </h2>
  <img
    src={mapIcon}
    alt=""
    className="step-icon w-48 md:w-64 lg:w-80"
    style={{ opacity: 0 }}
  />
</div>
```

### 4. Add Background to Each Step

```tsx
<div className="step w-screen h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-sand to-beige">
  {/* ... */}
</div>
```

### 5. Different Colors for Each Step

```tsx
{/* Step 1 */}
<div className="step w-screen h-screen flex flex-col items-center justify-center relative bg-blue-100">

{/* Step 2 */}
<div className="step w-screen h-screen flex flex-col items-center justify-center relative bg-green-100">

{/* Step 3 */}
<div className="step w-screen h-screen flex flex-col items-center justify-center relative bg-purple-100">
```

### 6. Slower Scroll Speed

**Increase the end value in horizontal scroll:**
```tsx
gsap.to(track, {
  x: () => -(window.innerWidth * 2),
  ease: "none",
  scrollTrigger: {
    trigger: wrapper,
    pin: true,
    scrub: 1,
    end: () => "+=" + (window.innerWidth * 4),  // Changed from *2 to *4 (slower)
    anticipatePin: 1,
  },
});
```

### 7. Faster Word Animation

**Reduce stagger time:**
```tsx
gsap.from(text.querySelectorAll(".word"), {
  y: 100,
  opacity: 0,
  rotateX: -90,
  stagger: 0.05,  // Changed from 0.15 (faster)
  duration: 0.5,  // Changed from 0.8 (faster)
  ease: "back.out(1.5)",
  scrollTrigger: {
    trigger: text.closest(".step"),
    start: "left 70%",
    end: "left 30%",
    scrub: 1,
  },
});
```

### 8. Change Section Height

**In JSX:**
```tsx
<section
  ref={wrapperRef}
  className="how-it-works-wrapper relative overflow-hidden bg-beige"
  style={{ height: "75vh" }}  // Changed from "50vh" - options: 100vh, 50vh, 75vh, 120vh
>
```

---

## Complete Example: Customized Version

Here's a fully customized example with larger icons, different positioning, and enhanced animations:

```tsx
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

    // Word-by-word animation
    gsap.utils.toArray<HTMLElement>(".step-text").forEach((text) => {
      const words = text.textContent?.split(" ") || [];
      text.innerHTML = words
        .map((word) => `<span class="word inline-block mr-4">${word}</span>`)
        .join("");

      gsap.from(text.querySelectorAll(".word"), {
        x: -50,           // Slide from left instead of up
        opacity: 0,
        stagger: 0.1,     // Faster stagger
        duration: 0.6,    // Faster duration
        ease: "power2.out",
        scrollTrigger: {
          trigger: text.closest(".step"),
          start: "left 70%",
          end: "left 30%",
          scrub: 1,
        },
      });
    });

    // Enhanced icon animations with scale and rotation
    gsap.utils.toArray<HTMLImageElement>(".step-icon").forEach((icon, index) => {
      gsap.fromTo(
        icon,
        {
          opacity: 0,
          scale: 0.3,
          rotation: -90
        },
        {
          opacity: 1,        // Full opacity
          scale: 1.2,        // Slightly larger than original
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",  // Bouncy
          scrollTrigger: {
            trigger: icon.closest(".step"),
            start: "left 60%",
            end: "left 40%",
            scrub: 1,
          },
        }
      );

      // Add continuous floating
      gsap.to(icon, {
        y: -15,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    // Wavy path draws in with color change
    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      stroke: "hsl(193, 60%, 45%)",  // Darker teal
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

// JSX with larger icons and better spacing
return (
  <section
    ref={wrapperRef}
    className="how-it-works-wrapper relative overflow-hidden bg-beige"
    style={{ height: "100vh" }}
  >
    <svg
      className="wavy-path absolute top-1/2 left-0 w-full pointer-events-none"
      style={{ transform: "translateY(-50%)" }}
      viewBox="0 0 2400 400"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M0,300 C200,200 400,400 800,300 C1200,200 1400,400 1600,300 C2000,200 2200,400 2400,300"
        stroke="hsl(193, 24%, 55%)"
        strokeWidth="15"
        fill="none"
        opacity="0.4"
      />
    </svg>

    <div ref={trackRef} className="journey-track flex" style={{ width: "300vw" }}>
      {/* Step 1 */}
      <div className="step w-screen h-screen flex flex-col items-center justify-center relative">
        <h2 className="step-text text-7xl md:text-8xl lg:text-9xl font-brushtones text-cocoa text-center px-8 mb-12">
          DROP YOUR PIN
        </h2>
        <img
          src={mapIcon}
          alt=""
          className="step-icon w-64 md:w-80 lg:w-96"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Step 2 */}
      <div className="step w-screen h-screen flex flex-col items-center justify-center relative">
        <h2 className="step-text text-7xl md:text-8xl lg:text-9xl font-brushtones text-cocoa text-center px-8 mb-12">
          PICK A DRIVER
        </h2>
        <img
          src={chatIcon}
          alt=""
          className="step-icon w-64 md:w-80 lg:w-96"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Step 3 */}
      <div className="step w-screen h-screen flex flex-col items-center justify-center relative">
        <h2 className="step-text text-7xl md:text-8xl lg:text-9xl font-brushtones text-cocoa text-center px-8 mb-12">
          ENJOY THE CRUISE
        </h2>
        <img
          src={squiggleIcon}
          alt=""
          className="step-icon w-64 md:w-80 lg:w-96"
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  </section>
);
```

---

## Quick Reference

### Tailwind Size Classes
- `w-4` = 16px
- `w-8` = 32px
- `w-16` = 64px
- `w-24` = 96px
- `w-32` = 128px
- `w-48` = 192px
- `w-64` = 256px
- `w-80` = 320px
- `w-96` = 384px

### Tailwind Spacing Classes
- `m-4` = 16px margin all sides
- `mt-4` = 16px margin top
- `mb-4` = 16px margin bottom
- `ml-4` = 16px margin left
- `mr-4` = 16px margin right
- `p-4` = 16px padding
- `gap-4` = 16px gap between flex items

### GSAP Easing Options
- `"none"` - Linear
- `"power1.out"` - Gentle
- `"power2.out"` - Medium
- `"power4.out"` - Strong
- `"back.out(1.5)"` - Overshoot
- `"elastic.out(1, 0.3)"` - Bouncy
- `"bounce.out"` - Bouncing

### GSAP Animation Properties
- `x` - Horizontal position
- `y` - Vertical position
- `scale` - Size (1 = 100%)
- `rotation` - Rotate in degrees
- `opacity` - 0 (invisible) to 1 (visible)
- `skewX`, `skewY` - Skew effect

---

## Need Help?

If you want to make a specific change and aren't sure how, just describe what you want and I can provide the exact code!
