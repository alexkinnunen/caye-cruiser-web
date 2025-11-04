import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import TestImage2 from "@/components/images/custom/three-birds.webp";
import BottomNav from "@/components/sections/BottomNav";
import Footer from "@/components/sections/Footer";
import wiggleBg from "@/components/images/figma/wiggle-bg.svg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useHoverAnimation } from "@/hooks/useHoverAnimation";
import { gsap } from "gsap";

const BecomeAPartner = () => {
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
  const leftButtonRef = useRef<HTMLDivElement>(null);
  const middleButtonRef = useRef<HTMLDivElement>(null);
  const rightButtonRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
      const valuesSectionRef = useRef<HTMLDivElement>(null);



  const partnerTypes = [
    {
      title: "INDIVIDUAL DRIVERS",
      description: "Local residents with golf carts looking to earn flexible income",
      benefits: [
        "70% commission on every ride",
        "Flexible scheduling around your life",
        "Use your own golf cart",
        "Community engagement opportunities",
        "Tourist interaction and local pride",
      ],
      requirements: [
        "Valid driver's license (18+ years)",
        "Local San Pedro residency",
        "Golf cart with current insurance",
        "Clean driving record",
        "Smartphone with WhatsApp",
      ],
      cta: "START DRIVING",
      ctaMessage: "I'm interested in becoming a Caye Cruiser driver",
      bgColor: "bg-sand",
      textColor: "text-cocoa",
      headerColor:"text-cocoa",
    },
    {
      title: "RENTAL COMPANIES",
      description: "Established rental businesses seeking additional revenue streams",
      benefits: [
        "Additional income from idle inventory",
        "Reduced wear on premium rental carts",
        "Data insights on demand patterns",
        "Marketing reach to new customers",
        "Revenue sharing: 70% partner, 30% platform",
      ],
      requirements: [
        "Established golf cart rental business",
        "Fleet of 5+ available carts",
        "Current business licenses",
        "Comprehensive insurance coverage",
        "Commitment to training drivers",
      ],
      cta: "PARTNER WITH US",
      ctaMessage: "I represent a golf cart rental company interested in partnering",
     bgColor: "bg-secondary",
      textColor: "text-sand",
            headerColor: "text-sand",

 
 

    },
    {
      title: "HOTELS & RESORTS",
      description: "Accommodation providers wanting to enhance guest services",
      benefits: [
        "Enhanced guest transportation services",
        "Reduced front desk coordination",
        "Commission sharing opportunities",
        "Preferred booking status for guests",
        "Improved guest satisfaction scores",
      ],
      requirements: [
        "Licensed accommodation business",
        "Guest capacity of 20+ rooms",
        "Concierge or front desk services",
        "Commitment to promoting service",
        "Guest feedback participation",
      ],
      cta: "ENHANCE GUEST EXPERIENCE",
      ctaMessage: "I'm interested in a hotel partnership with Caye Cruiser",
  
      bgColor: "bg-cocoa",
      textColor: "text-sand",
            headerColor: "text-sand",

    },
  ];

  const handlePartnerContact = (message: string) => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleLeftButtonHover = useHoverAnimation(leftButtonRef, { scale: 1.05 });
  const handleMiddleButtonHover = useHoverAnimation(middleButtonRef, { scale: 1.05 });
  const handleRightButtonHover = useHoverAnimation(rightButtonRef, { scale: 1.05 });

  // Hero image animation - slide in from right to left
  useScrollAnimation(() => {
    if (!heroImageRef.current) return;

    gsap.fromTo(
      heroImageRef.current,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      }
    );
  }, []);

  return (
    <div className="overflow-x-hidden pb-20">
      {/* Parallax Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Fixed Parallax Background */}
        <div className="fixed top-0 left-0 w-full h-screen bg-cocoa" style={{ zIndex: 0 }}>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${wiggleBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* Fixed Hero Content */}
        <div className="fixed top-0 left-0 w-full h-screen flex justify-between px-10" style={{ zIndex: 1 }}>
          <div className="w-1/2 mt-60 text-left">
            <h1
              className="font-grante uppercase leading-none tracking-[0] text-secondary"
              style={{
                fontSize: "clamp(3rem, 12vw, 12rem)",
              }}
            >
              PARTNER WITH US
            </h1>
            <p className="text-sand max-w-2x1 text-xl font-medium leading-relaxed">
              Join our network of local drivers and businesses to earn more,
              serve the community, and help us provide San Pedro's first
              organized ride-sharing service.
            </p>
          <img
            ref={imageRef}
            src={TestImage2}
            className="absolute w-full h-full flex bottom-0 left-[450px] justify-between"
            alt="Beach drinks"
          />

          </div>

        </div>
      </div>

      {/* Partnership Types - Three Column Layout */}
           <div
        ref={valuesSectionRef}
        className="relative bg-cocoa overflow-visible flex items-center z-20 justify-center"
        style={{
          height: '120vh',
          clipPath: 'polygon(0% 25px, 5% 35px, 10% 28px, 15% 45px, 20% 38px, 25% 55px, 30% 48px, 35% 70px, 40% 62px, 45% 80px, 50% 75px, 55% 85px, 60% 78px, 65% 70px, 70% 60px, 75% 50px, 80% 55px, 85% 48px, 90% 58px, 95% 52px, 100% 60px, 100% calc(100% - 60px), 95% calc(100% - 52px), 90% calc(100% - 58px), 85% calc(100% - 48px), 80% calc(100% - 55px), 75% calc(100% - 50px), 70% calc(100% - 60px), 65% calc(100% - 70px), 60% calc(100% - 78px), 55% calc(100% - 85px), 50% calc(100% - 75px), 45% calc(100% - 80px), 40% calc(100% - 62px), 35% calc(100% - 70px), 30% calc(100% - 48px), 25% calc(100% - 55px), 20% calc(100% - 38px), 15% calc(100% - 45px), 10% calc(100% - 28px), 5% calc(100% - 35px), 0% calc(100% - 25px))',
        }}
      >

    
      <div className="relative w-full max-w-[100vw] flex flex-col lg:flex-row z-20 overflow-hidden mx-auto">
        {partnerTypes.map((partner, index) => {
          const ref =
            index === 0
              ? leftButtonRef
              : index === 1
              ? middleButtonRef
              : rightButtonRef;

          return (
            <div
              key={partner.title}
              className={`partner-card relative ${partner.bgColor} w-full  lg:w-[33.33%] flex flex-col items-center px-8 lg:px-12 py-16 lg:py-20 min-h-[500px]`}
            >
              <div className="flex-grow pt-[100px]">
                {/* Title */}
                <h2
                  className={`${partner.headerColor} font-black text-4xl lg:text-5xl leading-tight mb-4 font-sans`}
                >
                  {partner.title}
                </h2>

                {/* Description */}
                <p
                  className={`${partner.textColor} opacity-80 text-base mb-12 font-sans leading-relaxed`}
                >
                  {partner.description}
                </p>

                {/* Benefits */}
                <div className="mb-12">
                  <h3
                    className={`${partner.headerColor} font-bold text-xl text-left mb-6 font-sans`}
                  >
                    BENEFITS
                  </h3>
                  <ul className="space-y-4">
                    {partner.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className={`flex items-start ${partner.textColor}`}
                      >
                        <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-sans leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="mb-12">
                  <h3
                    className={`${partner.headerColor} font-bold text-xl text-left  mb-6 font-sans`}
                  >
                    REQUIREMENTS
                  </h3>
                  <ul className="space-y-3">
                    {partner.requirements.map((req) => (
                      <li
                        key={req}
                        className={`flex items-start ${partner.textColor} opacity-80`}
                      >
                        <div className="w-2 h-2 bg-current rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span className="text-sm font-sans leading-relaxed">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <div className="w-full ">
                <div
                  ref={ref}
                  onMouseEnter={() => {
                    if (index === 0) handleLeftButtonHover(true);
                    else if (index === 1) handleMiddleButtonHover(true);
                    else handleRightButtonHover(true);
                  }}
                  onMouseLeave={() => {
                    if (index === 0) handleLeftButtonHover(false);
                    else if (index === 1) handleMiddleButtonHover(false);
                    else handleRightButtonHover(false);
                  }}
                >
                  <button
                    className={`w-full ${
                      partner.bgColor === "bg-sand"
                        ? "bg-sand text-cocoa"
                        : "bg-sand text-cocoa"
                    } py-6 px-8 font-black text-lg font-sans tracking-wide hover:transition-colors transition-colors`}
                    onClick={() => handlePartnerContact(partner.ctaMessage)}
                  >
                    {partner.cta}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
        </div>


      {/* Bottom Navigation */}
      <BottomNav />

      {/* Footer */}
      <div className="relative" style={{ zIndex: 20 }}>
        <Footer />
      </div>
    </div>

  );
};

export default BecomeAPartner;
