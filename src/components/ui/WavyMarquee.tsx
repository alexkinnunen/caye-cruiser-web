import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WavyMarqueeProps {
  text?: string;
  speed?: number;
  pathData?: string;
  fontSize?: number;
  textColor?: string;
  accentColor?: string;
  autoPlay?: boolean;
  useScrollTrigger?: boolean;
  reverse?: boolean; // Reverse the animation direction
  className?: string;
  backgroundColor?: string; // Background color for the marquee
}

const WavyMarquee = ({
  text = "",
  speed = 1,
  pathData = "",
  fontSize = 0,
  textColor = "",
  accentColor = "#4D3C2E", // Cocoa
  autoPlay = true,
  useScrollTrigger = false,
  reverse = false,
  className = "",
  backgroundColor,
}: WavyMarqueeProps) => {
  const textPathRef = useRef<SVGTextPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textPathRef.current || !containerRef.current) return;

    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        if (useScrollTrigger) {
          // Scroll-based animation - larger range for visible movement
          const startOffset = reverse ? "-100%" : "0%";
          const endOffset = reverse ? "0%" : "-100%";

          gsap.fromTo(
            textPathRef.current,
            {
              attr: { startOffset },
            },
            {
              attr: { startOffset: endOffset },
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        } else {
          // Time-based infinite loop animation
          const startOffset = reverse ? "50%" : "0%";
          const endOffset = reverse ? "0%" : "100%";

          gsap.fromTo(textPathRef.current, {
            attr: { startOffset },
          },
          {
            attr: { startOffset: endOffset },
            duration: speed,
            ease: "none",
            repeat: -1,
          });

          if (!autoPlay) {
            gsap.getTweensOf(textPathRef.current).forEach(t => t.pause());
          }
        }
      }, containerRef);

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, [speed, autoPlay, useScrollTrigger, reverse]);

  // Massively repeat text to ensure no gaps with alternating colors
  const renderText = () => {
    const words = text.split(" ");
    const result: JSX.Element[] = [];

    // Repeat 80 times
    for (let i = 0; i < 80; i++) {
      words.forEach((word, wordIndex) => {
        const globalIndex = i * words.length + wordIndex;
        result.push(
          <tspan key={`${i}-${wordIndex}`} fill={globalIndex % 2 === 0 ? textColor : accentColor}>
            {word}{" "}
          </tspan>
        );
      });
    }

    return result;
  };

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-visible ${className}`}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2400 250"
        className="w-full h-auto block"
        preserveAspectRatio="none"
        style={{ overflow: "visible", display: "block" }}
      >
        {backgroundColor && (
          <rect
            x="0"
            y="0"
            width="2400"
            height="200"
            fill={backgroundColor}
          />
        )}
        <defs>
          <path
            id="wavePath"
            d={pathData}
            stroke="transparent"
            fill="none"
          />
        </defs>
        <text
          className="font-sans"
          dominantBaseline="middle"
          textAnchor="start"
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: 750,
            letterSpacing: "-0.04em",
          }}
        >
          <textPath
            ref={textPathRef}
            xlinkHref="#wavePath"
            startOffset="0%"
            method="align"
            spacing="auto"
          >
            {renderText()}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default WavyMarquee;
