import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP ScrollTrigger animations
 * Handles the common pattern of setting up animations with proper cleanup
 *
 * @param animationCallback - Function that sets up GSAP animations within a context
 * @param dependencies - Array of dependencies that trigger animation recreation
 * @param delay - Optional delay before initializing animations (default: 100ms)
 */
export const useScrollAnimation = (
  animationCallback: () => void,
  dependencies: React.DependencyList = [],
  delay: number = 100
) => {
  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        animationCallback();
      });

      ScrollTrigger.refresh();
    }, delay);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
