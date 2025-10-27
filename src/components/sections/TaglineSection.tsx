import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import RandomUnderline from "@/components/ui/RandomUnderline";

const TaglineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        // Animate "PIN" word - color change to Lime/Primary
        if (pinRef.current) {
          gsap.to(pinRef.current, {
            color: "#ffffff", 
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 30%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }

        // TODO: CRUISE highlight animation - removed temporarily
        // See TAGLINE_HIGHLIGHT_ANIMATION_ATTEMPTS.md for debugging history
      }, sectionRef);

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full max-w-[100vw] py-12 md:py-16 lg:py-20 overflow-hidden mx-auto bg-secondary -mt-[300px] z-30">
      <div className="w-full flex justify-center items-center px-4 md:px-8">
        <h2 className="font-sans font-black text-cocoa text-[12vw] md:text-[5vw] lg:text-[3.44vw] leading-tight tracking-tight whitespace-nowrap">
          DROP A <span ref={pinRef} className="relative inline-block transition-colors duration-300">PIN</span>, REQUEST A <RandomUnderline>DRIVER</RandomUnderline>, ENJOY THE CRUISE.
        </h2>
      </div>
    </div>
  );
};

export default TaglineSection;
