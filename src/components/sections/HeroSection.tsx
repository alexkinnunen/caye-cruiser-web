import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import IguanaSVG from "@/components/images/figma/iguana.svg";
import PlantsSVG from "@/components/images/figma/left-plants.svg";
import WiggleBgSVG from "@/components/images/figma/wiggle-bg.svg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      const iguana = document.getElementById("iguana-hero");

      if (!iguana) return;

      ctx = gsap.context(() => {
        // Set GPU acceleration and initial position (fully off-screen to the left)
        gsap.set(iguana, {
          willChange: "transform",
          force3D: true,
          x: "-100%",
          opacity: 1, // Fully visible, no fade
        });

        // Animate iguana sliding in from the left to stop at letter C on page load
        gsap.to(iguana, {
          x: "0%", // Stop at the first letter C
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
        });

        // Scroll-triggered animation: iguana continues across the word as user scrolls
        gsap.fromTo(
          iguana,
          {
            x: "0%", // Start from letter C (where initial animation stopped)
          },
          {
            x: "100%", // Move across to the end of the word
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-section-wrapper",
              start: "top top", // Start moving when hero hits top of viewport
              end: "bottom top", // Finish when hero exits viewport
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <div className="hero-section-wrapper relative overflow-hidden bg-cocoa mx-auto w-full h-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <img
          src={WiggleBgSVG}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        />
      </div>

      {/* Decorative Leaves - Corners */}
      <div className="absolute w-full h-full pointer-events-none overflow-hidden">
        {/* Left Leaves */}
        <div
          className="absolute"
          style={{
            top: "0%",
            left: "-25%",
            width: "1000px",
            height: "auto",
          }}
        >
          <img
            src={PlantsSVG}
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
               {/*Right Leaves */}
        <div
          className="absolute"
          style={{
            top: "0%",
            right: "-25%",
            width: "1000px",
            height: "auto",
            transform: "scaleX(-1)",
          }}
        >
          <img
            src={PlantsSVG}
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center">
        <div className="w-full px-4 mt-52">
          {/* Iguana and Text Layout */}
          <div className="relative w-full flex justify-center">
            {/* Iguana Mascot - Positioned above C in CAYECRUISER*/}
            <div
              id="iguana-hero"
              className="absolute"
              style={{
                width: "250px",
                height: "auto",
                top: "-90px",
                left: "5%",
              }}
            >
              <img
                src={IguanaSVG}
                alt="Caye Cruiser iguana mascot"
                className="w-full h-auto object-contain"
                style={{ width: "100%", height: "auto" }}
              />
            </div>       
          </div>
        </div>
  
       {/* CAYECRUISER - Large Text - Full Width */}
        <h1
          className="font-grante uppercase leading-none tracking-[0] text-center w-full text-sand"
          style={{
            fontSize: "clamp(6rem, 23.1vw, 29rem)",
          }}
        >
          CAYECRUISER
        </h1>
      </div>        
    </div>
  
  );
};

export default HeroSection;
