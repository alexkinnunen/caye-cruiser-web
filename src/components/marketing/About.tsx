import Vector1 from "@/components/images/hero/vector1.svg";
import Group2 from "@/components/images/hero/group2.svg";

const About = () => {
  return (
    <div className="w-full relative py-12 md:py-16" style={{ overflow: 'visible' }}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Text container with relative positioning */}
        <h1
          className="text-right text-cocoa font-kensington relative"
          style={{
            fontSize: 'clamp(3rem, 8.4vw, 118px)',
            lineHeight: '1.017',
            letterSpacing: '0',
            overflow: 'visible',
            zIndex: 10,
          }}
        >
          {/* DROP A PIN - with green vector behind it */}
          <span className="font-bold" style={{ display: 'inline-block', position: 'relative', zIndex: 1, overflow: 'visible' }}>
            DROP A PIN
            {/* Rotated Green Vector pinned to "DROP A PIN" */}
            <span
              className="opacity-40 pointer-events-none"
              style={{
                position: 'absolute',
                left: '-30%',
                top: '-40%',
                width: '180%',
                height: '180%',
                zIndex: -1,
                overflow: 'visible',
              }}
            >
              <img
                src={Vector1}
                alt=""
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  transform: 'rotate(310deg)',
                  objectFit: 'contain',
                }}
              />
            </span>
          </span>
          <span className="font-bold">, REQUEST A DRIVER, </span>

          {/* ENJOY THE - with yellow block behind it */}
          <span className="font-bold" style={{ display: 'inline-block', position: 'relative', zIndex: 1, overflow: 'visible' }}>
            ENJOY THE
            {/* Yellow/Lime Background Block pinned to "ENJOY THE" */}
            <span
              className="bg-[#f4f9b7] pointer-events-none"
              style={{
                position: 'absolute',
                left: '-10%',
                top: '10%',
                width: '120%',
                height: '80%',
                zIndex: -1,
              }}
            />
          </span>{" "}

          {/* CRUISE - with group decoration */}
          <span className="font-semibold text-secondary italic" style={{ display: 'inline-block', position: 'relative', zIndex: 1, overflow: 'visible' }}>
            CRUISE
            {/* Group Decoration pinned to "CRUISE" */}
            <span
              className="pointer-events-none"
              style={{
                position: 'absolute',
                left: '-50%',
                bottom: '-60%',
                width: '100%',
                height: '100%',
                zIndex: -1,
                overflow: 'visible',
              }}
            >
              <img
                src={Group2}
                alt=""
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </span>
          </span>
          <span>.</span>
        </h1>
      </div>
    </div>
  );
};

export default About;
