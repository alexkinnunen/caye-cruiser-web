import { useCallback } from "react";
import { gsap } from "gsap";

/**
 * Configuration for hover animations
 */
export interface HoverAnimationConfig {
  /** Scale applied on hover (default: 1.1) */
  scale?: number;
  /** Rotation applied on hover in degrees (default: 0) */
  rotation?: number;
  /** Duration of hover-in animation in seconds (default: 0.4) */
  durationIn?: number;
  /** Duration of hover-out animation in seconds (default: 0.3) */
  durationOut?: number;
  /** Easing function for hover-in (default: "back.out(2)") */
  easeIn?: string;
  /** Easing function for hover-out (default: "power2.out") */
  easeOut?: string;
}

/**
 * Custom hook for GSAP hover animations
 * Provides a reusable hover handler with configurable scale and rotation effects
 *
 * @param ref - React ref to the element to animate
 * @param config - Configuration object for animation properties
 * @returns Callback function to be used in onMouseEnter/onMouseLeave handlers
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const handleHover = useHoverAnimation(ref, { scale: 1.05, rotation: 2 });
 *
 * <div
 *   ref={ref}
 *   onMouseEnter={() => handleHover(true)}
 *   onMouseLeave={() => handleHover(false)}
 * />
 */
export const useHoverAnimation = (
  ref: React.RefObject<HTMLElement>,
  config: HoverAnimationConfig = {}
) => {
  const {
    scale = 1.1,
    rotation = 0,
    durationIn = 0.4,
    durationOut = 0.3,
    easeIn = "back.out(2)",
    easeOut = "power2.out",
  } = config;

  const handleHover = useCallback(
    (isHovering: boolean) => {
      if (!ref.current) return;

      if (isHovering) {
        gsap.to(ref.current, {
          scale,
          rotation,
          duration: durationIn,
          ease: easeIn,
        });
      } else {
        gsap.to(ref.current, {
          scale: 1,
          rotation: 0,
          duration: durationOut,
          ease: easeOut,
        });
      }
    },
    [ref, scale, rotation, durationIn, durationOut, easeIn, easeOut]
  );

  return handleHover;
};
