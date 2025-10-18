// src/pages/Home.tsx
import { useEffect, useMemo } from 'react';
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import About from "@/components/marketing/About";
import Hero from "@/components/marketing/Hero";
import InteractiveMap from "@/components/layout/InteractiveMap";
import MapPlaceholder from "@/components/layout/MapPlaceholder";
import ShutterOverlay from "@/components/ui/ShutterOverlay";
import Section from "@/components/layout/Section";
import VectorBg from "@/components/images/hero/vector-bg.svg";
import Asset1 from "@/components/images/hero/asset1.svg";
import LeftBird from "@/components/images/about/left.svg";

gsap.registerPlugin(ScrollTrigger);


const Home = () => {
  // Check if Mapbox token is properly configured
  const hasValidMapboxToken = useMemo(() => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    return token && token !== 'your-mapbox-token-here' && token.startsWith('pk.');
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
            force3D: true
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
                scrub: 1, // Add smoothing factor
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      ctx?.revert(); // Automatically kills all animations and ScrollTriggers
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
          <div className="rounded-2xl shadow-2xl overflow-hidden relative bg-white z-20" style={{ height: '700px' }}>
            {hasValidMapboxToken ? (
              <InteractiveMap
                pickup={null}
                dropoff={null}
                isLoading={false}
                onMapClick={() => {}}
                onRequestRide={() => {}}
              />
            ) : (
              <MapPlaceholder />
            )}
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