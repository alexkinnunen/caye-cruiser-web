// src/pages/Home.tsx
import { useEffect } from 'react';
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import About from "@/components/marketing/About";
import Hero from "@/components/marketing/Hero";
import InteractiveMap from "@/components/layout/InteractiveMap";
import ShutterOverlay from "@/components/ui/ShutterOverlay";
import Section from "@/components/layout/Section";
import VectorBg from "@/components/images/hero/vector-bg.svg";
import Asset1 from "@/components/images/hero/asset1.svg";
import LeftBird from "@/components/images/about/left.svg";

gsap.registerPlugin(ScrollTrigger);


const Home = () => {
  useEffect(() => {
    const elements = gsap.utils.toArray<HTMLElement>(".image-transform");
    const animations: gsap.core.Tween[] = [];

    elements.forEach((el, index) => {
      const anim = gsap.fromTo(
        el,
        {
          rotation: index % 2 === 0 ? -30 : 30,
          transformOrigin: "center center",
        },
        {
          rotation: 0,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      animations.push(anim);
    });

    // Refresh ScrollTrigger after layout stabilizes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // CRITICAL: Cleanup function to prevent memory leaks and scroll conflicts
    return () => {
      clearTimeout(timer);
      animations.forEach(anim => {
        anim.scrollTrigger?.kill();
        anim.kill();
      });
    };
  }, []);

  return (
    <>
      <ShutterOverlay />
      <div className="w-full bg-beige relative overflow-x-hidden">
        {/* Global Background Container - Absolute positioned to specific parts */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Hero background - pins to top of page */}
          <div className="absolute top-0 left-0 right-0 h-screen bg-cocoa"></div>

          {/* === BIRD RIGHT - pins to hero section === */}
          <div className="absolute top-[675px] right-[-20%] lg:right-[-25%] w-[600px] md:w-[800px] lg:w-[1000px] h-[600px] md:h-[800px] lg:h-[1000px] rotate-[20deg] z-10 overflow-visible hidden sm:block">
            <img
              src={Asset1}
              alt="bird"
              className="image-transform w-full h-full object-contain will-change-transform"
            />
          </div>

          {/* Wave background - pins behind map section */}
          <div className="absolute top-[800px] left-0 right-0 h-[1200px]">
            <img
              src={VectorBg}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* === TOUCAN LEFT - pins to About section === */}
          <div className="absolute top-[1400px] left-[-50%] lg:left-[-40%] w-[800px] lg:w-[1200px] h-[800px] lg:h-[1800px] hidden md:block z-10">
            <img
              src={LeftBird}
              alt="toucan"
              className="image-transform w-full h-full object-contain will-change-transform"
            />
          </div>
        </div>

        {/* Hero Section - No spacing needed at top */}
        <Section spacing="xl" background="transparent" fullWidth noPadding>
          <Hero />
        </Section>

        {/* Interactive Map Section - Overlays Hero with negative margin */}
        <Section spacing="md" background="transparent" className="-mt-[475px] relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden relative b-biege z-20" style={{ height: '700px' }}>
            <InteractiveMap
              pickup={null}
              dropoff={null}
              isLoading={false}
              onMapClick={() => {}}
              onRequestRide={() => {}}
            />
          </div>
        </Section>

        {/* About Section - Standard spacing */}
        <Section spacing="md" background="beige" id="about">
          <div className="absolute inset-0 bg-beige -z-10"/> 
          <About />
        </Section>

       
      </div>
    </>
  );
};

export default Home;