import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Noise from "./Noise";

gsap.registerPlugin(ScrollTrigger);

interface ShutterOverlayProps {
  children?: ReactNode;
}

const ShutterOverlay = ({ children }: ShutterOverlayProps) => {
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maxScroll = window.innerHeight * 0.5;

    // Animate top shutter
    const topTrigger = gsap.to(topBarRef.current, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: `+=${maxScroll}`,
        scrub: true,
      },
    });

    // Animate bottom shutter
    const bottomTrigger = gsap.to(bottomBarRef.current, {
      yPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: `+=${maxScroll}`,
        scrub: true,
      },
    });

    // Animate text overlay clip-path
    const textTrigger = gsap.to(textOverlayRef.current, {
      onUpdate: function () {
        const progress = this.progress();
        const topShutterBottom = 50 - progress * 50;
        const bottomShutterTop = 50 + progress * 50;
        const clipPath = `polygon(0 0, 100% 0, 100% ${topShutterBottom}vh, 0 ${topShutterBottom}vh, 0 ${bottomShutterTop}vh, 100% ${bottomShutterTop}vh, 100% 100%, 0 100%)`;

        if (textOverlayRef.current) {
          textOverlayRef.current.style.clipPath = clipPath;
        }
      },
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: `+=${maxScroll}`,
        scrub: true,
      },
    });

    // Cleanup
    return () => {
      topTrigger.scrollTrigger?.kill();
      bottomTrigger.scrollTrigger?.kill();
      textTrigger.scrollTrigger?.kill();
      topTrigger.kill();
      bottomTrigger.kill();
      textTrigger.kill();
    };
  }, []);

  return (
    <>
      {/* Text overlay that scrolls away */}
      <div
        ref={textOverlayRef}
        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        style={{
          opacity: 1,
          transform: "translateY(0px)",
        }}
      >
        <div className="text-center text-cocoa -mt-12">
          <h1 className="text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] font-grante tracking-[0] leading-none whitespace-nowrap -mb-4">
            YOU BETTER BELIZE IT
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-8xl text-cocoa font-kensington tracking-[0] leading-none -mt-4 -mb-8">
            ISLAND RIDES, INSTANTLY.
          </h2>
        </div>
      </div>

      {/* Top shutter */}
      <div
        ref={topBarRef}
        className="fixed top-0 left-0 w-full bg-sand z-[90] overflow-hidden"
        style={{ height: "50vh", transform: "translateY(0vh)" }}
      >
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={25}
        />
      </div>

      {/* Bottom shutter */}
      <div
        ref={bottomBarRef}
        className="fixed left-0 w-full bg-sand z-[90] overflow-hidden"
        style={{ height: "50vh", top: "50vh", transform: "translateY(0vh)" }}
      >
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={25}
        />
      </div>

      {/* App content underneath */}
      {children}
    </>
  );
};

export default ShutterOverlay;
