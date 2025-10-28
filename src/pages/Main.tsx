// src/pages/Home.tsx
import { useEffect, useMemo } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import About from "@/components/sections/About";
import LongTermRentals from "@/components/sections/LongTermRentals";
import Hero from "@/components/sections/Hero";
import InteractiveMap from "@/components/layout/InteractiveMap";
import MapPlaceholder from "@/components/layout/MapPlaceholder";
import ShutterOverlay from "@/components/ui/ShutterOverlay";
import Section from "@/components/layout/Section";
import TropicalAnimation from "@/components/animations/TropicalAnimation";
import VectorBg from "@/components/images/hero/vector-bg.svg";
import Asset1 from "@/components/images/hero/asset1.svg";
import LeftBird from "@/components/images/about/left.svg";
import { HERO_LAYOUT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // Check if Mapbox token is properly configured
  const hasValidMapboxToken = useMemo(() => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    return (
      token && token !== "your-mapbox-token-here" && token.startsWith("pk.")
    );
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
          {/* Tropical Animation Layer - Behind everything */}
          <div className="absolute top-0 left-0 right-0" style={{ height: "3000px", opacity: 0.4 }}>
            <TropicalAnimation
              height="3000px"
              parallaxIntensity={0.3}
              showBirds={true}
              showPalmTrees={true}
              showWaves={true}
              showClouds={true}
              showSun={true}
              enableScrollParallax={true}
              zIndex={0}
            />
          </div>

          {/* Hero background - pins to top of page */}
          <div className="absolute top-0 left-0 right-0 h-screen"></div>

          {/* === BIRD RIGHT - pins to hero section === */}
          <div
            className="absolute z-10 overflow-visible hidden sm:block"
            style={{
              top: `${HERO_LAYOUT.BIRD_RIGHT_TOP}px`,
              right: `${HERO_LAYOUT.BIRD_RIGHT_RIGHT}px`,
              width: "600px",
              height: "600px",
            }}
          >
            <img
              src={Asset1}
              alt="bird"
              className="image-transform w-full h-full object-contain will-change-transform"
            />
          </div>

          {/* Wave background - ENLARGED to cover everything */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: `${HERO_LAYOUT.WAVE_BG_TOP}px`,
              height: "3000px"  // Enlarged to cover all sections
            }}
          >
            <img src={VectorBg} alt="" className="w-full h-full object-cover" />
          </div>

          {/* === TOUCAN LEFT - pins to About section === */}
          <div
            className="absolute left-[-50%] lg:left-[-50%] md:w-[1000px] lg:w-[1200px] h-[800px] sm:h-[800px] lg:h-[1800px] hidden sm:block z-10"
            style={{ top: `${HERO_LAYOUT.TOUCAN_LEFT_TOP}px` }}
          >
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
        <div style={{ marginTop: `${HERO_LAYOUT.MAP_NEGATIVE_MARGIN}px` }}>
          <Section spacing="md" background="transparent" className="relative">
            <div
              className="rounded-2xl shadow-2xl overflow-hidden relative bg-white z-20"
              style={{ height: `${HERO_LAYOUT.MAP_HEIGHT}px` }}
            >
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
        </div>

        {/* Original About Section - DROP A PIN, REQUEST A DRIVER, ENJOY THE CRUISE */}
        <Section spacing="md" background="beige" id="about">
          <div className="absolute inset-0 bg-beige -z-10" />
          <About />
        </Section>

        {/* Long-Term Rentals Section - Brutalist Asymmetric Design */}
        <Section spacing="none" background="transparent" id="rentals">
          <LongTermRentals />
        </Section>
      </div>
    </>
  );
};

export default Home;
