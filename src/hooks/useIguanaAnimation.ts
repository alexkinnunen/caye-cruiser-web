import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for animating the iguana mascot from left to right on scroll
 * Following project animation guidelines from .claude/docs/GSAP-SCROLLTRIGGER-IMPLEMENTATION.md
 */
export const useIguanaAnimation = () => {
  useEffect(() => {
    let ctx: gsap.Context | null = null;

    // Wait for layout to stabilize
    const timer = setTimeout(() => {
      const iguana = document.getElementById("iguana-mascot");

      if (!iguana) {
        console.warn("Iguana mascot element not found");
        return;
      }

      ctx = gsap.context(() => {
        // Set GPU acceleration
        gsap.set(iguana, {
          willChange: "transform",
          force3D: true,
        });

        // Animate from left to right on scroll
        gsap.fromTo(
          iguana,
          {
            x: "-100vw", // Start off-screen left
            opacity: 0,
          },
          {
            x: 0, // End at normal position
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: iguana,
              start: "top 80%", // Start when iguana is 80% down the viewport
              end: "top 20%", // End when iguana is 20% down the viewport
              scrub: 1, // Smooth scrubbing
              invalidateOnRefresh: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);
};
