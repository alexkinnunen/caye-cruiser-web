import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import rightLeaf from "@/components/images/figma/right-leaf.svg";
import TestImage2 from "@/components/images/beach-drinks.jpg";


gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  color: string;
  textColor: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Best way to get around the island! The drivers know all the shortcuts and the prices are super reasonable. Used it every day of our vacation.",
    name: "Mike & Jennifer",
    role: "Tourists from Colorado",
    color: "bg-primary",
    textColor: "text-white",
  },
  {
    quote: "As a local, I use CayeCruiser at least 3 times a week. The drivers are respectful, always on time, and I can rely on them day or night.",
    name: "Carlos",
    role: "San Pedro Local",
    color: "bg-secondary",
    textColor: "text-white",
  },
  {
    quote: "Game changer for island life! The app is easy to use, drivers arrive within minutes, and it's so convenient. Highly recommend to anyone visiting or living here.",
    name: "Emma",
    role: "Island Resident",
    color: "bg-cocoa",
    textColor: "text-white",
  },
];

const AboutSection = () => {
  const leafRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!leafRef.current) return;

    // Create swaying animation for the leaf
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(leafRef.current, {
      rotation: 1,
      transformOrigin: "top center",
      duration: 3,
      ease: "sine.inOut",
    }).to(leafRef.current, {
      rotation: -2,
      transformOrigin: "top center",
      duration: 2,
      ease: "sine.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      const container = document.querySelector(".testimonial-image-container");
      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");

      if (!container || cards.length === 0) return;

      ctx = gsap.context(() => {
        // Set GPU acceleration for all cards with alternating rotation
        cards.forEach((card, index) => {
          // Alternate rotation: even cards rotate left, odd cards rotate right
          const rotation = index % 2 === 0 ? -2 : 2;
          gsap.set(card, {
            willChange: "transform",
            force3D: true,
            y: window.innerHeight, // Start completely off-screen below viewport
            rotation: rotation,
          });
        });

        // Pin the image container while testimonials reveal
        // Duration: each card gets one viewport height of scroll + extra viewport for last card to settle
        const pinDuration = window.innerHeight * (cards.length + 1);

        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${pinDuration}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        });

        // Create individual ScrollTrigger for each card
        // Reverse order: bottom card (last in DOM, lowest z-index) animates first
        cards.forEach((card, index) => {
          const reverseIndex = cards.length - 1 - index;
          const cardStart = window.innerHeight * reverseIndex;
          const cardEnd = window.innerHeight * (reverseIndex + 1);

          // Keep the alternating rotation for each card
          const rotation = index % 2 === 0 ? -2 : 2;

          ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: `+=${pinDuration}`,
            scrub: 1,
            onUpdate: (self) => {
              // Calculate which card should be visible based on scroll progress
              const scrollDistance = self.progress * pinDuration;

              if (scrollDistance >= cardStart && scrollDistance < cardEnd) {
                // Card is currently revealing - slide up from off-screen
                const cardProgress = (scrollDistance - cardStart) / window.innerHeight;
                gsap.to(card, {
                  y: window.innerHeight - (cardProgress * window.innerHeight),
                  rotation: rotation,
                  duration: 0.1,
                  ease: "none",
                });
              } else if (scrollDistance >= cardEnd) {
                // Card is fully revealed
                gsap.to(card, {
                  y: 0,
                  rotation: rotation,
                  duration: 0.1,
                  ease: "none",
                });
              }
            },
          });
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
    <section className="relative w-full overflow-visible">
      {/* Combined Grid System */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-0 w-full">


        {/* Second Row: Sand bg with "don't risk" text (2 cols) */}
        <div className="relative col-span-2 bg-cocoa text-center py-20">
          <div>
            <h2 className="text-sand font-black font-sans mx-auto text-[90px]">
                         you drink. we drive.
            </h2>
               <p className="text-sand font-normal text-[20px] leading-relaxed font-sans">
                   Integer congue lectus eros, in dignissim est dignissim sit amet. Integer congue lectus eros, in dignissim est dignissim sit amet.

            </p>
          </div>
        </div>

        {/* Fourth Row: Full-width image with overlapping testimonials (3 cols) */}
        <div className="testimonial-image-container relative col-span-3 h-screen bg-cocoa cursor-pointer overflow-visible">
          <img
            ref={imageRef}
            src={TestImage2}
            className="absolute inset-0 w-full h-full grayscale object-cover object-center"
            alt="Beach drinks"
          />

          {/* Overlapping Testimonial Cards */}
          <div className="testimonials-container absolute bottom-0 left-0 right-0 h-full pointer-events-none">
            <div className="relative w-full h-full flex items-end justify-center">
              {testimonials.map((testimonial, index) => {
                // First card (index 0) should be on top with highest z-index
                const zIndex = (testimonials.length - index) * 10;
                // Tighter stacking with smaller offset
                const bottomOffset = index * 5;
                // Alternate rotation for card container
                const cardRotation = index % 2 === 0 ? -2 : 2;

                return (
                  <div
                    key={testimonial.name}
                    className={`testimonial-card absolute ${testimonial.color} ${testimonial.textColor} shadow-2xl pointer-events-auto`}
                    style={{
                      bottom: `${bottomOffset}%`,
                      zIndex: zIndex,
                      width: '110%',
                      left: '-5%',
                      marginBottom: '-60px',
                      clipPath: 'polygon(0% 60px, 100% 0%, 100% 100%, 0% 100%)',
                    }}
                  >
                    {/* Inner wrapper to counter-rotate and keep text straight */}
                    <div
                      className="testimonial-card-content px-12 py-10 md:px-10 md:py-18 flex items-center justify-center min-h-[600px]"
                      style={{
                        transform: `rotate(${-cardRotation}deg)`,
                      }}
                    >
                      {/* Centered content wrapper */}
                      <div className="max-w-6xl mx-auto w-full">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                          {/* Attribution - Left */}
                          <div className="flex-shrink-0 flex items-center gap-4">
                            <div className="h-16 w-1 bg-current"></div>
                            <div className="text-center md:text-left">
                              <p className="font-black text-lg uppercase tracking-wide">
                                {testimonial.name}
                              </p>
                              {testimonial.role && (
                                <p className="text-sm uppercase tracking-wider mt-1 opacity-80">
                                  {testimonial.role}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Quote - Right */}
                          <blockquote className="flex-1 text-center md:text-left">
                            <p className="text-xl md:text-2xl font-medium leading-relaxed">
                              {testimonial.quote}
                            </p>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
