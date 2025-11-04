import { useRef } from "react";
import { useHoverAnimation } from "@/hooks/useHoverAnimation";

const LongTermRentals = () => {
  const leftTextRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLHeadingElement>(null);

  const handleLeftHover = useHoverAnimation(leftTextRef, {
    scale: 1.1,
  });

  const handleRightHover = useHoverAnimation(rightTextRef, {
    scale: 1.1,
  });

  return (
    <div className="relative w-full overflow-hidden z-20 bg-secondary mx-auto">

      {/* CTA Buttons Section */}
      <div className="relative w-full  h-[900px] flex z-20 overflow-hidden mx-auto">
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
              className="text-sand font-black text-[90px] text-center leading-[90px] font-sans z-50"
            >
              Ready to Cruise with us?
            </h2>
            </div>
        </button>
        

        {/* Right Button - Looking for a Rental */}
        <button
          className="relative bg-sand w-[50%] flex items-center px-[100px] justify-center cursor-pointer"
          onClick={() => window.location.href = '/become-a-partner'}
          onMouseEnter={() => handleRightHover(true)}
          onMouseLeave={() => handleRightHover(false)}
        >
          <div className="z-50">
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
