// src/pages/Home.tsx
import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";
import Noise from "@/components/ui/Noise";
import LongTermRentals from "@/components/sections/LongTermCTA";
import InteractiveMap from "@/components/sections/InteractiveMap";
import TaglineSection from "@/components/sections/HowToBar";
import AboutUsSection from "@/components/sections/AboutUsSection";
import Footer from "@/components/sections/Footer";

const Home = () => {

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
    <div className="overflow-x-hidden overflow-y-auto w-full max-w-full">
      <div className="fixed inset-0 z-50 pointer-events-none">
        <Noise patternAlpha={10} patternRefreshInterval={3} />
      </div>
      <div className="fixed inset-0 z-0">
        <HeroSection />
      </div>
      {/* Floating sections container - scrolls over fixed Hero */}
      <div className="relative z-10 w-full max-w-full pt-[100vh]">
        <TaglineSection />
        <InteractiveMap />
         <AboutUsSection />
        <AboutSection />
       
        <LongTermRentals />
      
        <div className="relative z-20 w-full max-w-full]">
        <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
