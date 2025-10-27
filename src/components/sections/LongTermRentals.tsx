import { useRef } from "react";
import { gsap } from "gsap";

const LongTermRentals = () => {
  const leftTextRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLHeadingElement>(null);

  const handleLeftHover = (isHovering: boolean) => {
    if (!leftTextRef.current) return;

    if (isHovering) {
      gsap.to(leftTextRef.current, {
        rotation: 2,
        scale: 1.1,
        duration: 0.4,
        ease: "back.out(2)",
      });
    } else {
      gsap.to(leftTextRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleRightHover = (isHovering: boolean) => {
    if (!rightTextRef.current) return;

    if (isHovering) {
      gsap.to(rightTextRef.current, {
        rotation: -2,
        scale: 1.1,
        duration: 0.4,
        ease: "back.out(2)",
      });
    } else {
      gsap.to(rightTextRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div className="relative w-full max-w-[100vw] overflow-visible z-20 bg-secondary mx-auto">

      {/* CTA Buttons Section */}
      <div className="relative w-full max-w-[100vw] h-[766px] flex z-20 overflow-hidden mx-auto">
        {/* Left Button - Ready to Cruise */}
        <button
          className="relative bg-cocoa w-[50%] flex items-center px-[100px] justify-center cursor-pointer"
          onClick={() => window.location.href = '/'}
          onMouseEnter={() => handleLeftHover(true)}
          onMouseLeave={() => handleLeftHover(false)}
        >
          <div>
            <h2
              ref={leftTextRef}
              className="text-sand font-black text-[90px] text-center leading-[90px] font-sans"
            >
              Ready to Cruise with us?
            </h2>
          </div>
        </button>

        {/* Right Button - Looking for a Rental */}
        <button
          className="relative bg-sand w-[50%] flex items-center px-[100px] justify-center z-10 cursor-pointer"
          onClick={() => window.location.href = '/cart-rentals'}
          onMouseEnter={() => handleRightHover(true)}
          onMouseLeave={() => handleRightHover(false)}
        >
          <div>
            <h2
              ref={rightTextRef}
              className="text-cocoa font-black text-center text-[90px] leading-[90px] mb-8 font-sans"
            >
              looking for
              <br />
              a rental?
            </h2>
          </div>
        </button>
      </div>

    </div>
  );
};

export default LongTermRentals;
