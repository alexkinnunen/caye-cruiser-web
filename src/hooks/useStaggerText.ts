import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StaggerTextOptions {
  staggerDelay?: number; // Delay between each element (in seconds)
  yOffset?: number; // How far elements move from (in pixels)
  duration?: number;
  ease?: string;
  triggerStart?: string;
  scrub?: boolean;
}

/**
 * Staggered text entrance animation hook
 * Inspired by decriminalizepoverty.org's text reveal patterns
 *
 * Usage:
 * const containerRef = useRef<HTMLDivElement>(null);
 * useStaggerText(containerRef, ".word", { staggerDelay: 0.1, yOffset: 80 });
 */
export const useStaggerText = (
  containerRef: RefObject<HTMLElement>,
  selector: string,
  options: StaggerTextOptions = {}
) => {
  const {
    staggerDelay = 0.1,
    yOffset = 80,
    duration = 0.8,
    ease = "power2.out",
    triggerStart = "top 80%",
    scrub = false,
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      const elements = container.querySelectorAll(selector);
      if (elements.length === 0) return;

      ctx = gsap.context(() => {
        // Set GPU acceleration
        elements.forEach((el) => {
          gsap.set(el, {
            willChange: "transform, opacity",
            force3D: true,
          });
        });

        gsap.from(elements, {
          y: yOffset,
          opacity: 0,
          stagger: staggerDelay,
          duration,
          ease,
          scrollTrigger: {
            trigger: container,
            start: triggerStart,
            toggleActions: "play none none reverse",
            scrub: scrub,
          },
        });
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, [containerRef, selector, staggerDelay, yOffset, duration, ease, triggerStart, scrub]);
};

export default useStaggerText;
