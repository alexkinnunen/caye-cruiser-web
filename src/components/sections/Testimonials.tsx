import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import mariaImg from "@/components/images/custom/maria.webp";
import tomImg from "@/components/images/custom/tom.webp";
import sarahImg from "@/components/images/custom/sarah.webp";

gsap.registerPlugin(ScrollTrigger);

interface TestimonialCardProps {
  text: string;
  backgroundText: string;
  bgColorClass: string; // CSS class for background (e.g., "bg-sand", "bg-lime")
  bgTextColorClass?: string; // CSS class for background text (e.g., "text-cocoa", "text-white")
  textColorClass?: string; // CSS class for quote text
  image?: string; // Path to testimonial image
  index: number;
}

// Individual Testimonial Card Component - Fully Customizable
const TestimonialCard = ({
  text,
  backgroundText,
  bgColorClass,
  textColorClass = "text-cocoa",
  image,
  index
}: TestimonialCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!cardRef.current || !bgTextRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(bgTextRef.current, { opacity: 0.1 });

      // Animate based on card index with different entrance animations
      if (index === 0) {
        // Card 1 (Maria): Image slides in from left, quote fades up
        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, x: -100 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "left center",
                toggleActions: "play none none none",
              },
            }
          );
        }
        gsap.fromTo(
          contentRef.current?.querySelector("p"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "left center",
              toggleActions: "play none none none",
            },
          }
        );
      } else if (index === 1) {
        // Card 2 (Tom): Image scales in from center, quote with back.out ease
        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "left center",
                toggleActions: "play none none none",
              },
            }
          );
        }
        gsap.fromTo(
          contentRef.current?.querySelector("p"),
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "left center",
              toggleActions: "play none none none",
            },
          }
        );
      } else if (index === 2) {
        // Card 3 (Sarah): Image rotates in, quote fades with rotation
        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, rotationY: -30, x: 100 },
            {
              opacity: 1,
              rotationY: 0,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "left center",
                toggleActions: "play none none none",
              },
            }
          );
        }
        gsap.fromTo(
          contentRef.current?.querySelector("p"),
          { opacity: 0, rotationY: 15 },
          {
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "left center",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`relative h-screen w-screen flex items-center justify-center px-16 ${bgColorClass}`}
    >
      {/* Image - Positioned absolutely in corners as background */}
      {image && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            ref={imageRef}
            src={image}
            alt={backgroundText}
            className="w-auto h-auto max-w-[80%] max-h-[80%] object-contain opacity-20"
          />
        </div>
      )}

      {/* Testimonial Content - Centered Quote */}
      <div ref={contentRef} className="relative z-10 max-w-4xl w-full px-16 text-center">
        <p className={`font-black text-3xl md:text-4xl lg:text-5xl leading-tight ${textColorClass}`}>
          &quot;{text}&quot;
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Testimonial data - easily customizable with CSS classes
  const testimonials = [
    {
      text: "Always on time, always professional. The drivers know every corner of the island!",
      backgroundText: "MARIA",
      bgColorClass: "bg-cocoa", // Background color
      bgTextColorClass: "text-sand", // Large background text color
      textColorClass: "text-sand", // Quote text color
      image: mariaImg,
    },
    {
      text: "Best way to get around San Pedro. Drivers are so knowledgeable and friendly!",
      backgroundText: "TOM",
      bgColorClass: "bg-lime", // Background color
      bgTextColorClass: "text-sand", // Large background text color
      textColorClass: "text-sand", // Quote text color
      image: tomImg,
    },
    {
      text: "Safe, convenient, and affordable. I wouldn't explore the island any other way!",
      backgroundText: "SARAH",
      bgColorClass: "bg-ocean-blue", // Background color
      bgTextColorClass: "text-white", // Large background text color
      textColorClass: "text-white", // Quote text color
      image: sarahImg,
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Horizontal scroll animation
        const scrollWidth = scrollContainerRef.current!.scrollWidth - window.innerWidth;

        gsap.to(scrollContainerRef.current, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollWidth * 1.5}`, // Extended scroll duration to fully show all cards
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full max-w-[100vw] h-screen relative overflow-hidden mx-auto"
    >
      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="absolute inset-0 flex items-center z-10"
        style={{ width: "max-content" }}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            text={testimonial.text}
            backgroundText={testimonial.backgroundText}
            bgColorClass={testimonial.bgColorClass}
            bgTextColorClass={testimonial.bgTextColorClass}
            textColorClass={testimonial.textColorClass}
            image={testimonial.image}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
