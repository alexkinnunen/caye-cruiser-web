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
    const topBar = topBarRef.current;
    const bottomBar = bottomBarRef.current;
    const textOverlay = textOverlayRef.current;

    if (!topBar || !bottomBar || !textOverlay) return;

    const maxScroll = window.innerHeight * 0.5;

    // Use gsap.context for better cleanup and scoping
    const ctx = gsap.context(() => {
      // Optimize: Use will-change for GPU acceleration
      gsap.set([topBar, bottomBar, textOverlay], {
        willChange: "transform",
        force3D: true
      });

      // Animate top shutter
      gsap.to(topBar, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: `+=${maxScroll}`,
          scrub: 1, // Add smoothing
          invalidateOnRefresh: true,
        }
      });

      // Animate bottom shutter
      gsap.to(bottomBar, {
        yPercent: 100,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: `+=${maxScroll}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Animate text overlay fade out (simpler than clip-path)
      gsap.to(textOverlay, {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: `+=${maxScroll}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Text overlay that scrolls away */}
      <div
        ref={textOverlayRef}
        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
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
        style={{ height: '50vh' }}
      >
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={5}
          patternAlpha={20}
        />
      </div>

      {/* Bottom shutter */}
      <div
        ref={bottomBarRef}
        className="fixed left-0 w-full bg-sand z-[90] overflow-hidden"
        style={{ height: '50vh', top: '50vh' }}
      >
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={5}
          patternAlpha={20}
        />
      </div>

      {/* App content underneath */}
      {children}
    </>
  );
};

export default ShutterOverlay;