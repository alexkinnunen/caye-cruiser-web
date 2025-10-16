import Vector1 from "@/components/images/hero/vector1.svg";
import Group2 from "@/components/images/hero/group2.svg";

const About = () => {
  return (

      <div className="overflow-visible w-full relative min-h-[200px]">
        <div className="relative">
        {/* Yellow/Lime Background Block - Fixed position */}
        <div
          className="absolute bg-[#f4f9b7] z-10"
          style={{
            width: '240px',
            height: '133px',
            right: '0px',
            bottom: '-250px',
          }}
        />
        {/* Rotated Green Vector - Fixed position and rotation */}
        <div
          className="absolute z-10 opacity-40"
          style={{
            left: '320px',
            top: '-95px',
            width: '350px',
            height: '230px',
            transform: "rotate(310deg)",
            transformOrigin: "center center",
          }}
        >
          <img
            src={Vector1}
            alt=""
            className="w-full h-full"
            style={{ display: 'block' }}
          />
        </div>

        <div
          className="absolute z-20 overflow-visible"
          style={{
            right: '0px',
            top: '-20%',
            maxWidth: '1161px',
          }}
        >
          <h1
            className="text-right text-cocoa font-kensington"
            style={{
              fontSize: 'clamp(4rem, 8vw, 118px)',
              lineHeight: '1.017',
              letterSpacing: '0',
            }}
          >
            <span className="font-bold" style={{ display: 'inline' }}>
              DROP A PIN, REQUEST A DRIVER, ENJOY THE
            </span>{" "}
            <span className="font-semibold text-secondary italic" style={{ display: 'inline' }}>CRUISE</span>
            <span style={{ display: 'inline' }}>.</span>
          </h1>
        </div>

        {/* Group Decoration - Fixed position */}
        <div
          className="absolute z-10"
          style={{
            left: '670px',
            bottom: '-250px',
            width: '119px',
            height: '109px',
          }}
        >
          <img
            src={Group2}
            alt=""
            className="w-full h-full"
            style={{ display: 'block' }}
          />
        </div>
         </div>
      </div>

  );
};

export default About;
