import Vector1 from "@/components/images/hero/vector1.svg";
import Group2 from "@/components/images/hero/group2.svg";
import BeachRoad from "@/components/images/beachroad.jpg";
import Elvis from "@/components/images/elvis.jpg";
import Asset7 from "@/components/images/hero/Asset 7.svg";

const About = () => {
  return (
    <div
      className="w-full relative py-12 md:py-16  mx-auto"
      style={{ overflow: "visible" }}
    >
      <div className="container">
        {/* Text container with relative positioning */}
        <h1
          className="text-center text-cocoa font-kensington relative whitespace-nowrap"
          style={{
            fontSize: "clamp(3rem, 8vw, 100px)",
            lineHeight: "1.017",
            letterSpacing: "0",
            overflow: "visible",
            zIndex: 10,
          }}
        >
          {/* DROP A PIN - with green vector behind it */}
          <span
            className="font-bold"
            style={{
              display: "inline-block",
              position: "relative",
              zIndex: 1,
              overflow: "visible",
            }}
          >
            DROP A PIN
            {/* Rotated Green Vector pinned to "DROP A PIN" */}
            <span
              className="opacity-2  0 pointer-events-none"
              style={{
                position: "absolute",
                left: "-15%",
                top: "-90%",
                width: "200%",
                height: "200%",
                zIndex: -1,
                overflow: "visible",
              }}
            >
              <img
                src={Vector1}
                alt=""
                style={{
                  display: "block",
                  width: "45%",
                  height: "100%",
                  transform: "rotate(290deg)",
                  objectFit: "contain",
                }}
              />
            </span>
          </span>
          <span className="font-bold">, REQUEST A DRIVER, </span>
          <span
            className="font-bold"
            style={{
              display: "inline-block",
              position: "relative",
              zIndex: 1,
              overflow: "visible",
            }}
          >
            <span className=""></span>
            ENJOY THE
            {/* Group Decoration pinned to ENJOY*/}
            <span
              className="pointer-events-none"
              style={{
                position: "absolute",
                left: "-35%",
                bottom: "-20%",
                width: "35%",
                height: "100%",
                zIndex: -1,
                overflow: "visible",
              }}
            >
              <img
                src={Group2}
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </span>
            {/* CRUISE - with group decoration */}
            <span
              className="font-semibold text-secondary italic"
              style={{
                display: "inline-block",
                position: "relative",
                zIndex: 1,
                overflow: "visible",
              }}
            >
              CRUISE
              {/* Yellow/Lime Background Block pinned to "CRUSIE" */}
              <span
                className="bg-[#f4f9b7] pointer-events-none"
                style={{
                  position: "absolute",
                  left: "100%",
                  top: "10%",
                  width: "100%",
                  height: "80%",
                  zIndex: -1,
                }}
              />
            </span>{" "}
          </span>
          <span>.</span>
        </h1>
      </div>
      <div className="container pt-20 mx-auto px-4 md:px-8">
        {/* Main Grid Layout - Asymmetric Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* LEFT SIDE - Text Content with Geometric Elements */}
          <div className="lg:col-span-7 relative z-10">
            {/* Main Headline with Geometric Overlay */}
            <div className="relative mb-8">
              <h2 className="font-kensington text-cocoa text-3xl md:text-5xl lg:text-7xl leading-none mb-4">
                FOR THE ISLAND,
                <span className="text-primary">BY THE ISLAND.</span>
              </h2>
            </div>

            {/* Body Text */}
            <div className="space-y-6 text-lg md:text-xl text-foreground max-w-2xl">
              <p className="leading-relaxed">
                Caye Cruiser was born from a simple idea: San Pedro deserves a
                ride-sharing service that understands the island way of life.
                We're not just drivers. We're your neighbors, your friends, and
                fellow island lovers.
              </p>
              <p className="leading-relaxed">
                Every ride supports local families and keeps our community
                thriving. When you cruise with us, you're not just getting from
                point A to point B. You're part of the island's story.
              </p>
            </div>

            {/* Stats Section - Brutalist Blocks */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {/* Stat 1 - Ocean Blue Block */}
              <div className="relative group">
                <div className="absolute inset-0 color-block-ocean opacity-90 geometric-rotate-3" />
                <div className="relative p-6 text-white">
                  <div className="font-grante text-4xl md:text-5xl mb-2">
                    500+
                  </div>
                  <div className="text-sm md:text-base font-semibold uppercase tracking-wide">
                    Rides
                  </div>
                </div>
              </div>

              {/* Stat 2 - Cocoa Block */}
              <div className="relative group">
                <div className="absolute inset-0 color-block-cocoa opacity-90 geometric-rotate-minus-3" />
                <div className="relative p-6 text-white">
                  <div className="font-grante text-4xl md:text-5xl mb-2">
                    24/7
                  </div>
                  <div className="text-sm md:text-base font-semibold uppercase tracking-wide">
                    Service
                  </div>
                </div>
              </div>

              {/* Stat 3 - Lime Block */}
              <div className="relative group">
                <div className="absolute inset-0 color-block-lime opacity-90 geometric-rotate-3" />
                <div className="relative p-6 text-white">
                  <div className="font-grante text-4xl md:text-5xl mb-2">
                    100%
                  </div>
                  <div className="text-sm md:text-base font-semibold uppercase tracking-wide">
                    Local
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Image with Geometric Frame */}
          <div className="lg:col-span-5 relative">
            {/* Large Geometric Circle Background */}
            <div className="absolute -right-16 -bottom-16 w-96 h-96 color-block-ocean opacity-20 geometric-circle -z-10" />

            {/* Main Image Container */}
            <div className="relative">
              {/* Brutalist Border Frame */}
              <div className="relative brutalist-border-thick overflow-hidden geometric-rotate-3">
                <img
                  src={BeachRoad}
                  alt="San Pedro Beach Road"
                  className="w-full h-[500px] object-cover brutalist-image"
                />
              </div>

              {/* Overlapping Small Image */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 md:w-64 md:h-64 brutalist-border overflow-hidden geometric-rotate-minus-3 bg-white">
                <img
                  src={Elvis}
                  alt="Local driver"
                  className="w-full h-full object-cover brutalist-image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Typography as Design */}
        <div className="mt-24 relative">
          <div className="relative">
            {/* Large Background Text */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-5">
              <img
                src={Asset7}
                alt=""
                className="w-full max-w-4xl object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
