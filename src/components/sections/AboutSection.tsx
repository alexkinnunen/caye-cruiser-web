import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import rightLeaf from "@/components/images/figma/right-leaf.svg";

const AboutSection = () => {
  const leafRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leafRef.current) return;

    // Create swaying animation for the leaf
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(leafRef.current, {
      rotation: 3,
      transformOrigin: "top center",
      duration: 3,
      ease: "sine.inOut",
    }).to(leafRef.current, {
      rotation: -3,
      transformOrigin: "top center",
      duration: 3,
      ease: "sine.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[100vw] overflow-visible z-20 bg-secondary mx-auto mt-0">

      {/* About Section - Main Content */}
      <div className="relative w-full max-w-[100vw] h-[766px] flex z-20 overflow-hidden mx-auto">
        {/* Left Side - Brown Background with Text */}
        <div className="relative bg-sand w-[65.5%] flex items-center px-[130px] z-10">
         


          <div>
            <h2 className="text-cocoa font-black text-[96px] leading-[101px] mb-8 font-sans">
              HEADER
            </h2>
            <p className="text-cocoa font-normal text-[20px] leading-relaxed max-w-[867px] font-sans">
              Integer congue lectus eros, in dignissim est dignissim sit amet. In nec purus ligula. Praesent
              ac cursus mi. Morbi sit amet aliquet nisi. Proin nec ultrices enim. Cras ut elit non quam
              condimentum tristique quis vitae erat. Aliquam cursus nulla lorem, a rhoncus massa volutpat a.
              Mauris vitae lacus in odio cursus tempor. Fusce aliquam ac tortor quis hendrerit. Integer rutrum
              eleifend urna, et lacinia sem luctus vitae. Phasellus tincidunt, lacus nec maximus sodales, neque
              lectus viverra massa, non aliquet justo elit non mi.
            </p>
          </div>
        </div>

        {/* Right Side - Lime/Green Background with Image */}
        <div className="relative bg-primary w-[34.5%] flex items-center justify-center">
          {/* Right Leaf Decoration - Behind image, swaying animation */}
          <div
            ref={leafRef}
            className="absolute z-0"
            style={{
              top: "-0%",
              right: "-50%",
              width: "150%",
              height: "150%",
            }}
          >
            <img
              src={rightLeaf}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          {/* Image Placeholder - Above leaf */}
          <div className="bg-[#d9d9d9] w-[425px] h-[577px] rounded-[20px] relative z-10" /> {/* Light gray placeholder */}
        </div>
      </div>

    </div>
  );
};

export default AboutSection;
