# Tropical Animation - Usage Examples

A playful and bold tropical animation system with parallax scrolling, animated palm trees, flying birds, ocean waves, and more!

## Quick Start

```tsx
import TropicalAnimation from '@/components/animations/TropicalAnimation';

// Basic usage - Full scene
export const MyPage = () => {
  return (
    <div className="relative">
      <TropicalAnimation />
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </div>
  );
};
```

## Example 1: Hero Background

```tsx
import TropicalAnimation from '@/components/animations/TropicalAnimation';

const HeroWithTropical = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Tropical animation as background */}
      <TropicalAnimation
        height="100vh"
        parallaxIntensity={0.3}
        enableScrollParallax={false}
      />

      {/* Hero content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <h1 className="text-8xl font-bold text-white drop-shadow-2xl">
          Welcome to Paradise
        </h1>
      </div>
    </section>
  );
};
```

## Example 2: Subtle Background (Minimal)

```tsx
<TropicalAnimation
  showBirds={false}
  showClouds={false}
  showWaves={true}
  showPalmTrees={true}
  showSun={true}
  parallaxIntensity={0.2}
  height="100vh"
/>
```

## Example 3: Ocean Focus

```tsx
<TropicalAnimation
  showBirds={true}
  showClouds={true}
  showWaves={true}
  showPalmTrees={false}
  showSun={true}
  parallaxIntensity={0.8}
  height="150vh"
/>
```

## Example 4: Full Page Scroll Experience

```tsx
const FullPageTropical = () => {
  return (
    <div className="relative">
      {/* Animation spans entire page */}
      <TropicalAnimation
        height="300vh"
        parallaxIntensity={0.6}
        enableScrollParallax={true}
      />

      {/* Content sections */}
      <div className="relative z-10">
        <section className="h-screen">Section 1</section>
        <section className="h-screen">Section 2</section>
        <section className="h-screen">Section 3</section>
      </div>
    </div>
  );
};
```

## Example 5: Integration with Existing Hero

Replace your current Hero component background:

```tsx
// Before
const Hero = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative top-[100px] z-20">
        {/* content */}
      </div>
    </div>
  );
};

// After
const Hero = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Add tropical animation */}
      <TropicalAnimation
        height="100vh"
        parallaxIntensity={0.4}
        enableScrollParallax={true}
      />

      <div className="relative top-[100px] z-20">
        {/* content */}
      </div>
    </div>
  );
};
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `parallaxIntensity` | number | 0.5 | Parallax effect strength (0-1) |
| `showBirds` | boolean | true | Show flying birds |
| `showPalmTrees` | boolean | true | Show swaying palm trees |
| `showWaves` | boolean | true | Show ocean waves |
| `showClouds` | boolean | true | Show floating clouds |
| `showSun` | boolean | true | Show glowing sun |
| `height` | string | "100vh" | Container height (e.g., "100vh", "500px") |
| `zIndex` | number | 0 | z-index of animation container |
| `enableScrollParallax` | boolean | true | Enable scroll-based parallax |

## Animation Features

### Continuous Animations
- **Palm Trees**: Gentle swaying motion with different speeds
- **Waves**: Multi-layer wave movement
- **Birds**: Periodic flying across the screen with wing flapping
- **Clouds**: Slow horizontal drift
- **Sun**: Pulsing glow effect

### Parallax Layers (back to front)
1. Clouds (slowest)
2. Birds
3. Sun
4. Palm Trees
5. Waves (fastest)

## Performance Tips

- Use `enableScrollParallax={false}` for static backgrounds
- Lower `parallaxIntensity` for subtle effects
- Disable unused elements to reduce render load
- The component uses GSAP with GPU acceleration for smooth performance

## Demo Page

Visit `/tropical-animation-demo` to see the animation in action with live controls!
