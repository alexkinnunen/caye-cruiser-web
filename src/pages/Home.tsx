// src/pages/Home.tsx
import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";
import Testimonials from "@/components/sections/Testimonials";
import Noise from "@/components/ui/Noise";
import LongTermRentals from "@/components/sections/LongTermRentals";
import WavyMarqueeSection from "@/components/sections/WavyMarqueeSection";
import QuickFacts from "@/components/sections/QuickFacts";
import ShutterOverlay from "@/components/ui/ShutterOverlay";

const Home = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    // Wait for layout to stabilize before initializing animations
    const timer = setTimeout(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".image-transform");

      ctx = gsap.context(() => {
        elements.forEach((el, index) => {
          // Optimize: Use will-change and GPU acceleration
          gsap.set(el, {
            willChange: "transform",
            force3D: true,
          });

          gsap.fromTo(
            el,
            {
              rotation: index % 2 === 0 ? -30 : 30,
              transformOrigin: "center center",
            },
            {
              rotation: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 150);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      ctx?.revert(); // Automatically kills all animations and ScrollTriggers
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
    <ShutterOverlay />
      <div className="fixed inset-0 z-50 pointer-events-none">
        <Noise patternAlpha={10} patternRefreshInterval={3} />
      </div>
        {/* Spacer for Shutter Animation */}
        <div className="h-32" />
        <HeroSection />
        <AboutSection />
        <QuickFacts />
        <Testimonials />
        <WavyMarqueeSection />
        <LongTermRentals />
    </div>
  );
};

export default Home;
