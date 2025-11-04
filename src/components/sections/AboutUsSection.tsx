import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import WiggleBgSVG from "@/components/images/figma/wiggle-bg.svg";
import MedSplat from "@/components/images/falling/md-splat.svg";
import LargeSplat from "@/components/images/falling/lg-splat.svg";
import SmallSplat from "@/components/images/falling/sm-splat.svg";

gsap.registerPlugin(ScrollTrigger);

const AboutUsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const originSectionRef = useRef<HTMLDivElement>(null);
  const valuesSectionRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const fallingContainerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Mud splatter animation with scroll-scrubbed effect
  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      if (!fallingContainerRef.current) return;

      const fallingSVGs = gsap.utils.toArray<HTMLElement>(".falling-svg");

      ctx = gsap.context(() => {
        fallingSVGs.forEach((svg, index) => {
          // Get direction from data attribute (left or right)
          const direction = svg.getAttribute('data-direction') || 'left';
          const isLeft = direction === 'left';

          // Set GPU acceleration
          gsap.set(svg, {
            willChange: "transform",
            force3D: true,
          });

          // Splatter distances
          const horizontalDistance = isLeft ? -400 - (index * 80) : 400 + (index * 80);
          const verticalArc = -100 + (index * 20); // Slight upward arc

          // Animate wrapper div (position/opacity/scale only - rotation is in CSS)
          gsap.fromTo(
            svg,
            {
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.3,
            },
            {
              x: horizontalDistance,
              y: verticalArc,
              opacity: 1,
              scale: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: fallingContainerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1.5,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  // Path drawing animation
  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      if (!pathRef.current || !sectionRef.current) return;

      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      ctx = gsap.context(() => {
        // Set initial state - path is invisible
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        // Animate the path drawing as user scrolls
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-visible">
      {/* Animated path with curves and loops spanning full width */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 3100"
        preserveAspectRatio="none"
        style={{ zIndex: 10 }}
      >
        <path
          ref={pathRef}
          d="M675.086 4C675.086 243.264 223.747 881.848 170.162 580.533C162.496 537.424 176.856 489.702 213.967 466.465C482.132 298.546 917.084 1279.14 1219.81 904.091C1259.38 855.07 1262.63 781.373 1219.1 735.837C930.522 433.987 428.59 1775.24 122.187 1747.61C-29.6272 1733.93 -61.5547 1502.19 185.185 1471.11C401.483 1443.87 409.947 1957.43 426.578 2071.08C507.945 2627.11 1233.79 2294.15 1240.36 2066.21C1241.63 2022.19 1195.8 1991.21 1152.64 2000.02C881.654 2055.32 746.594 2905.94 746.594 3007.33 L746.594 3100"
          stroke="hsl(17, 33%, 32%)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ paintOrder: "stroke" }}
        />
      </svg>

       <div className="relative col-span-2 bg-sand text-center py-20">
          <div>
            <h2 className="text-cocoa font-black font-sans text-[90px] leading-tight">
              Safe rides. Good vibes.
            </h2>
            <p className="text-cocoa font-normal text-[20px] leading-relaxed font-sans">
                   Integer congue lectus eros, in dignissim est dignissim sit amet. Integer congue lectus eros, in dignissim est dignissim sit amet.
            </p>
          </div>
        </div>

      {/* Section 1: Origin Story - Pinned with Swipe Up Animation */}
      <div
        ref={originSectionRef}
        className="relative min-h-screen -mb-24 flex items-center justify-center bg-primary overflow-hidden"
      >

        <div className="relative z-20 max-w-[1500px] text-center mx-auto  py-20">
         
          <div ref={paragraphsRef} className="space-y-6">
            <p className="text-white font-normal font-sans text-[24px] leading-relaxed">
              CayeCruiser started with a simple observation: San Pedro needed a better way to get around.
              Whether you're a local heading home after a night out or a visitor exploring our beautiful island,
              reliable transportation shouldn't be a luxury.
            </p>
            <p className="text-white font-normal font-sans text-[24px] leading-relaxed">
              Founded by island residents who understand the unique challenges of golf cart transportation,
              we created San Pedro's first organized ride-sharing service. We're not just another tech company –
              we're your neighbors, committed to making our community safer and more connected.
            </p>
          </div>
        </div>
      
      </div>

      <div
        ref={valuesSectionRef}
        className="relative bg-cocoa overflow-visible flex items-center z-20 justify-center"
        style={{
          height: '80vh',
          clipPath: 'polygon(0% 25px, 5% 35px, 10% 28px, 15% 45px, 20% 38px, 25% 55px, 30% 48px, 35% 70px, 40% 62px, 45% 80px, 50% 75px, 55% 85px, 60% 78px, 65% 70px, 70% 60px, 75% 50px, 80% 55px, 85% 48px, 90% 58px, 95% 52px, 100% 60px, 100% calc(100% - 60px), 95% calc(100% - 52px), 90% calc(100% - 58px), 85% calc(100% - 48px), 80% calc(100% - 55px), 75% calc(100% - 50px), 70% calc(100% - 60px), 65% calc(100% - 70px), 60% calc(100% - 78px), 55% calc(100% - 85px), 50% calc(100% - 75px), 45% calc(100% - 80px), 40% calc(100% - 62px), 35% calc(100% - 70px), 30% calc(100% - 48px), 25% calc(100% - 55px), 20% calc(100% - 38px), 15% calc(100% - 45px), 10% calc(100% - 28px), 5% calc(100% - 35px), 0% calc(100% - 25px))',
        }}
      >
        
            <p
            ref={subheadingRef}
            className="text-sand font-grante text-center text-[180px] uppercase tracking-[0] z-20"
          >
            CRUISE ANYWHERE
          </p>
 {/* Mud Splatter Animation - Positioned at center bottom like car wheels */}
        <div
          ref={fallingContainerRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
          style={{ zIndex: 1 }}
        >

          {/* Left-SM-Splat */}
          <div className="falling-svg absolute" data-direction="right" style={{ left: '75%', bottom: '35%' }}>
            <img src={SmallSplat} alt="mud splatter left" className="w-[100px] h-auto z-10" style={{ transform: 'rotate(180deg)' }} />
          </div>

          {/*  Left-MED-Splat */}
          <div className="falling-svg absolute" data-direction="right" style={{ left: '58%', bottom: '20%' }}>
            <img src={MedSplat} alt="mud splatter left" className="w-[220px] h-auto" style={{ transform: 'rotate(220deg)' }} />
          </div>

          {/* Left-LG-Splat */}
          <div className="falling-svg absolute" data-direction="right" style={{ left: '50%', bottom: '30%' }}>
            <img src={LargeSplat} alt="mud splatter left" className="w-[220px] h-auto" style={{ transform: 'rotate(240deg)' }} />
          </div>
             {/* Right-SM-Splat */}
          <div className="falling-svg absolute" data-direction="left" style={{ left: '32%', bottom: '45%' }}>
            <img src={SmallSplat} alt="mud splatter left" className="w-[100px] h-auto" style={{ transform: 'rotate(160deg) scaleX(-1)' }} />
          </div>

          {/*  Right-MED-Splat */}
          <div className="falling-svg absolute" data-direction="left" style={{ left: '43%', bottom: '27%' }}>
            <img src={MedSplat} alt="mud splatter left" className="w-[220px] h-auto" style={{ transform: 'rotate(130deg) scaleX(-1)' }} />
          </div>

          {/* Right-LG-Splat */}
          <div className="falling-svg absolute" data-direction="left" style={{ left: '50%', bottom: '40%' }}>
            <img src={LargeSplat} alt="mud splatter left" className="w-[220px] h-auto" style={{ transform: 'rotate(-240deg) scaleX(-1)' }} />
          </div>
        </div>

        {/* Wiggle SVG Overlay */}
        <div className="absolute inset-0 opacity-40">
          <img
            src={WiggleBgSVG} 
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        </div>

  <div className="bg-secondary -mt-[100px] h-[1000px] w-full">
<div className="relative z-20 max-w-[1500px] text-center mx-auto py-[400px]">
          <div ref={paragraphsRef} className="space-y-6">
            <p className="text-white font-normal font-sans text-[24px] leading-relaxed">
              CayeCruiser started with a simple observation: San Pedro needed a better way to get around.
              Whether you're a local heading home after a night out or a visitor exploring our beautiful island,
              reliable transportation shouldn't be a luxury.
            </p>
            <p className="text-white font-normal font-sans text-[24px] leading-relaxed">
              Founded by island residents who understand the unique challenges of golf cart transportation,
              we created San Pedro's first organized ride-sharing service. We're not just another tech company –
              we're your neighbors, committed to making our community safer and more connected.
            </p>
          </div>
        </div>
    
  </div>

    </section>
  );
};

export default AboutUsSection;
