import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  speed?: number; // 0.1 (slow) to 1.0 (fast) - lower = more parallax effect
  direction?: "up" | "down";
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

/**
 * Multi-speed parallax hook inspired by decriminalizepoverty.org
 *
 * Usage:
 * const ref = useRef<HTMLDivElement>(null);
 * useParallax(ref, { speed: 0.3 }); // Background layer
 * useParallax(ref, { speed: 0.5 }); // Mid layer
 * useParallax(ref, { speed: 0.7 }); // Foreground layer
 */
export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const {
    speed = 0.5,
    direction = "up",
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Set GPU acceleration
        gsap.set(element, {
          willChange: "transform",
          force3D: true,
        });

        // Calculate movement based on viewport height and speed
        const movement = window.innerHeight * speed;
        const yValue = direction === "up" ? -movement : movement;

        gsap.fromTo(
          element,
          {
            y: direction === "up" ? 0 : -movement,
          },
          {
            y: direction === "up" ? -movement : 0,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start,
              end,
              scrub,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, [ref, speed, direction, start, end, scrub]);
};

export default useParallax;
