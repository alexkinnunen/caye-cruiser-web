import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface AnimatedHighlightProps {
  children: React.ReactNode;
  color?: "lime" | "ocean" | "cocoa" | "sand";
  animationType?: "slide" | "fade" | "underline" | "box";
  delay?: number;
}

const AnimatedHighlight = ({
  children,
  color = "lime",
  animationType = "slide",
  delay = 0,
}: AnimatedHighlightProps) => {
  const highlightRef = useRef<HTMLSpanElement>(null);

  // Color mapping
  const colorMap = {
    lime: "#8fa542", // Lime/Primary
    ocean: "#6FA8B8", // Ocean Blue/Secondary
    cocoa: "#4D3C2E", // Cocoa
    sand: "#F2E5D4", // Sand
  };

  useEffect(() => {
    if (!highlightRef.current) return;

    const element = highlightRef.current;

    // Animation configurations based on type
    const animations = {
      slide: {
        from: { scaleX: 0, transformOrigin: "left" },
        to: {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          delay,
        },
      },
      fade: {
        from: { opacity: 0 },
        to: {
          opacity: 0.3,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          delay,
        },
      },
      underline: {
        from: { width: "0%" },
        to: {
          width: "100%",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          delay,
        },
      },
      box: {
        from: { scale: 0 },
        to: {
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          delay,
        },
      },
    };

    const selectedAnimation = animations[animationType];
    const highlightElement = element.querySelector(".highlight-bg");

    if (highlightElement) {
      gsap.fromTo(highlightElement, selectedAnimation.from, selectedAnimation.to);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animationType, delay]);

  // Get animation-specific classes
  const getAnimationClass = () => {
    switch (animationType) {
      case "underline":
        return "highlight-underline";
      case "box":
        return "highlight-box";
      default:
        return "highlight-slide";
    }
  };

  return (
    <span ref={highlightRef} className="relative inline-block">
      <span
        className={`highlight-bg ${getAnimationClass()}`}
        style={{ backgroundColor: colorMap[color] }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
};

export default AnimatedHighlight;
