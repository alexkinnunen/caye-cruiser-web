import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import IguanaSVG from "@/components/images/figma/iguana.svg";
import Plantleft from "@/components/images/figma/left-plants.svg";
import Plantright from "@/components/images/figma/left-plants.svg";
import WiggleBgSVG from "@/components/images/figma/wiggle-bg.svg";
import MapSection from "./MapSection";
import TaglineSection from "./TaglineSection";
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      const iguana = document.getElementById("iguana-hero");

      if (!iguana) return;

      ctx = gsap.context(() => {
        // Set GPU acceleration
        gsap.set(iguana, {
          willChange: "transform",
          force3D: true,
        });

        // Animate iguana from left to right on scroll
        gsap.fromTo(
          iguana,
          {
            x: "-550vw",
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: iguana,
              start: "top 80%",
              end: "top 40%",
              scrub: 3,
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
    <div className="relative w-full max-w-[100vw] overflow-visible bg-cocoa mx-auto pb-0">
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
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
        {/* Left Leaves */}
        <div
          className="absolute"
          style={{
            top: "15%",
            left: "-25%",
            width: "1000px",
            height: "auto",
          }}
        >
          <img
            src={Plantleft}
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
               {/*Right Leaves */}
        <div
          className="absolute"
          style={{
            top: "15%",
            right: "-25%",
            width: "1000px",
            height: "auto",
            transform: "scaleX(-1)",
          }}
        >
          <img
            src={Plantright}
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-screen pt-[300px] pb-0 flex flex-col justify-center">
        <div className="w-screen px-4 mt-52">
          {/* Iguana and Text Layout */}
          <div className="relative w-screen flex justify-center">
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
          className="font-grante uppercase leading-none tracking-[0] text-center w-screen text-sand"
          style={{
            fontSize: "clamp(6rem, 23.1vw, 29rem)",
          }}
        >
          CAYECRUISER
        </h1>
      </div>
      <div className="mt-80">
      <TaglineSection />

      </div>
            <MapSection />
    </div>
  );
};

export default HeroSection;
