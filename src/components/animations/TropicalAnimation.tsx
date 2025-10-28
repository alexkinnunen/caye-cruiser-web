import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TropicalAnimationProps {
  /** Control the intensity of parallax (0-1, default 0.5) */
  parallaxIntensity?: number;
  /** Show/hide specific elements */
  showBirds?: boolean;
  showPalmTrees?: boolean;
  showWaves?: boolean;
  showClouds?: boolean;
  showSun?: boolean;
  /** Container height */
  height?: string;
  /** z-index of the animation */
  zIndex?: number;
  /** Enable scroll-based parallax */
  enableScrollParallax?: boolean;
}

const TropicalAnimation = ({
  parallaxIntensity = 0.5,
  showBirds = true,
  showPalmTrees = true,
  showWaves = true,
  showClouds = true,
  showSun = true,
  height = "100vh",
  zIndex = 0,
  enableScrollParallax = true,
}: TropicalAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const palmTreesRef = useRef<SVGGElement>(null);
  const wavesRef = useRef<SVGGElement>(null);
  const birdsRef = useRef<SVGGElement>(null);
  const cloudsRef = useRef<SVGGElement>(null);
  const sunRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Continuous wave animation
      if (wavesRef.current) {
        gsap.to(wavesRef.current.children, {
          y: "+=15",
          duration: 2,
          ease: "sine.inOut",
          stagger: {
            each: 0.3,
            repeat: -1,
            yoyo: true,
          },
        });
      }

      // Palm tree swaying
      if (palmTreesRef.current) {
        const palms = palmTreesRef.current.querySelectorAll(".palm-tree");
        palms.forEach((palm, i) => {
          gsap.to(palm, {
            rotation: i % 2 === 0 ? 3 : -3,
            transformOrigin: "bottom center",
            duration: 2.5 + i * 0.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });
      }

      // Flying birds animation
      if (birdsRef.current) {
        const birds = birdsRef.current.querySelectorAll(".bird");
        birds.forEach((bird, i) => {
          const tl = gsap.timeline({ repeat: -1 });

          // Start position (off-screen left)
          const startX = -100;
          const endX = window.innerWidth + 100;
          const yVariation = Math.random() * 200 - 100;

          tl.set(bird, { x: startX, y: yVariation, opacity: 0 })
            .to(bird, { opacity: 1, duration: 0.5 })
            .to(bird, {
              x: endX,
              y: yVariation + Math.sin(i) * 50,
              duration: 15 + i * 5,
              ease: "none",
            })
            .to(bird, { opacity: 0, duration: 0.5 }, "-=1");

          // Delay each bird
          tl.delay(i * 4);

          // Wing flapping
          const wings = bird.querySelectorAll(".wing");
          gsap.to(wings, {
            scaleY: 0.8,
            duration: 0.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.1,
          });
        });
      }

      // Clouds floating
      if (cloudsRef.current) {
        const clouds = cloudsRef.current.querySelectorAll(".cloud");
        clouds.forEach((cloud, i) => {
          gsap.to(cloud, {
            x: "+=100",
            duration: 20 + i * 10,
            ease: "none",
            repeat: -1,
            yoyo: true,
          });
        });
      }

      // Sun glow pulse
      if (sunRef.current) {
        gsap.to(sunRef.current, {
          opacity: 0.8,
          scale: 1.05,
          transformOrigin: "center center",
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Scroll-based parallax
      if (enableScrollParallax) {
        const layers = [
          { element: cloudsRef.current, speed: 0.2 },
          { element: birdsRef.current, speed: 0.4 },
          { element: sunRef.current?.parentElement, speed: 0.3 },
          { element: palmTreesRef.current, speed: 0.6 },
          { element: wavesRef.current, speed: 0.8 },
        ];

        layers.forEach(({ element, speed }) => {
          if (element) {
            gsap.to(element, {
              y: () => window.innerHeight * speed * parallaxIntensity,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });
          }
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [parallaxIntensity, enableScrollParallax]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ height, zIndex }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E0F6FF" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="sunGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFA500" stopOpacity="0.6" />
          </linearGradient>

          <radialGradient id="sunGradient">
            <stop offset="0%" stopColor="#FFE66D" />
            <stop offset="100%" stopColor="#FF6B35" />
          </radialGradient>
        </defs>

        {/* Sky Background */}
        <rect width="1920" height="1080" fill="url(#skyGradient)" />

        {/* Sun */}
        {showSun && (
          <g>
            <circle
              ref={sunRef}
              cx="1600"
              cy="200"
              r="80"
              fill="url(#sunGradient)"
              opacity="0.9"
            />
            <circle
              cx="1600"
              cy="200"
              r="100"
              fill="url(#sunGlow)"
              opacity="0.3"
            />
          </g>
        )}

        {/* Clouds */}
        {showClouds && (
          <g ref={cloudsRef}>
            {/* Cloud 1 */}
            <g className="cloud" opacity="0.6">
              <ellipse cx="300" cy="150" rx="60" ry="30" fill="#FFFFFF" />
              <ellipse cx="340" cy="140" rx="70" ry="35" fill="#FFFFFF" />
              <ellipse cx="380" cy="150" rx="60" ry="30" fill="#FFFFFF" />
            </g>
            {/* Cloud 2 */}
            <g className="cloud" opacity="0.5">
              <ellipse cx="800" cy="100" rx="50" ry="25" fill="#FFFFFF" />
              <ellipse cx="830" cy="95" rx="60" ry="28" fill="#FFFFFF" />
              <ellipse cx="870" cy="100" rx="50" ry="25" fill="#FFFFFF" />
            </g>
            {/* Cloud 3 */}
            <g className="cloud" opacity="0.7">
              <ellipse cx="1400" cy="180" rx="70" ry="35" fill="#FFFFFF" />
              <ellipse cx="1450" cy="170" rx="80" ry="40" fill="#FFFFFF" />
              <ellipse cx="1500" cy="180" rx="70" ry="35" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {/* Flying Birds */}
        {showBirds && (
          <g ref={birdsRef}>
            {[...Array(5)].map((_, i) => (
              <g key={i} className="bird" opacity="0.8">
                {/* Simple V-shaped bird */}
                <path
                  className="wing"
                  d="M 0,0 Q -8,-8 -15,-5"
                  stroke="#2C3E50"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  className="wing"
                  d="M 0,0 Q 8,-8 15,-5"
                  stroke="#2C3E50"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            ))}
          </g>
        )}

        {/* Palm Trees - Background Layer */}
        {showPalmTrees && (
          <g ref={palmTreesRef}>
            {/* Left Palm Tree */}
            <g className="palm-tree">
              {/* Trunk */}
              <path
                d="M 150,1080 Q 160,900 150,700 Q 145,500 150,300"
                stroke="#8B4513"
                strokeWidth="25"
                fill="none"
                strokeLinecap="round"
              />
              {/* Palm Fronds */}
              <g transform="translate(150, 300)">
                <path d="M 0,0 Q -80,-100 -120,-180" stroke="#228B22" strokeWidth="12" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q -40,-120 -40,-200" stroke="#228B22" strokeWidth="12" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q 0,-130 20,-210" stroke="#228B22" strokeWidth="12" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q 40,-120 40,-200" stroke="#228B22" strokeWidth="12" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q 80,-100 120,-180" stroke="#228B22" strokeWidth="12" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q 100,-60 150,-80" stroke="#228B22" strokeWidth="12" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q -100,-60 -150,-80" stroke="#228B22" strokeWidth="12" fill="none" strokeLinecap="round" />
              </g>
            </g>

            {/* Right Palm Tree */}
            <g className="palm-tree">
              {/* Trunk */}
              <path
                d="M 1770,1080 Q 1760,900 1770,700 Q 1775,500 1770,350"
                stroke="#8B4513"
                strokeWidth="30"
                fill="none"
                strokeLinecap="round"
              />
              {/* Palm Fronds */}
              <g transform="translate(1770, 350)">
                <path d="M 0,0 Q -100,-80 -150,-140" stroke="#2F8B2F" strokeWidth="15" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q -50,-100 -60,-180" stroke="#2F8B2F" strokeWidth="15" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q 0,-110 10,-190" stroke="#2F8B2F" strokeWidth="15" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q 50,-100 60,-180" stroke="#2F8B2F" strokeWidth="15" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q 100,-80 150,-140" stroke="#2F8B2F" strokeWidth="15" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q 120,-40 170,-50" stroke="#2F8B2F" strokeWidth="15" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q -120,-40 -170,-50" stroke="#2F8B2F" strokeWidth="15" fill="none" strokeLinecap="round" />
              </g>
            </g>

            {/* Center Palm Tree (Smaller) */}
            <g className="palm-tree">
              <path
                d="M 960,1080 Q 955,950 960,800 Q 965,650 960,550"
                stroke="#A0522D"
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
              />
              <g transform="translate(960, 550)">
                <path d="M 0,0 Q -60,-70 -90,-120" stroke="#32CD32" strokeWidth="10" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q -30,-90 -30,-150" stroke="#32CD32" strokeWidth="10" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q 0,-95 15,-155" stroke="#32CD32" strokeWidth="10" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q 30,-90 30,-150" stroke="#32CD32" strokeWidth="10" fill="none" strokeLinecap="round" />
                <path d="M 0,0 Q 60,-70 90,-120" stroke="#32CD32" strokeWidth="10" fill="none" strokeLinecap="round" />
              </g>
            </g>
          </g>
        )}

        {/* Waves - Foreground Layer */}
        {showWaves && (
          <g ref={wavesRef}>
            {/* Wave Layer 1 - Back */}
            <path
              d="M 0,900 Q 480,850 960,900 T 1920,900 L 1920,1080 L 0,1080 Z"
              fill="#4A90E2"
              opacity="0.3"
            />
            {/* Wave Layer 2 - Middle */}
            <path
              d="M 0,950 Q 480,920 960,950 T 1920,950 L 1920,1080 L 0,1080 Z"
              fill="#5BA3F5"
              opacity="0.4"
            />
            {/* Wave Layer 3 - Front */}
            <path
              d="M 0,980 Q 480,950 960,980 T 1920,980 L 1920,1080 L 0,1080 Z"
              fill="#6FB6FF"
              opacity="0.5"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export default TropicalAnimation;
