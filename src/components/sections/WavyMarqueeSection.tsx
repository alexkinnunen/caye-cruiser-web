import WavyMarquee from "@/components/ui/WavyMarquee";

const WavyMarqueeSection = () => {
  return (
    <section className="w-full max-w-[100vw] relative overflow-hidden flex flex-col justify-center mx-auto bg-primary">

      {/* Third Marquee - Right to Left (Reverse) */}
      <div className="relative z-10">
        <WavyMarquee
          text="YOU DRINK . WE DRIVE . DONT RISK THE RENTAL ."
          fontSize={100}
          textColor="#F2E5D4" // Sand
          accentColor="#F2E5D4" // Sand
          backgroundColor="transparent" // Use bg-primary from parent instead
          useScrollTrigger={true}
          reverse={false}
          pathData="M0 140 L2400 140"
        />
      </div>
    </section>
  );
};

export default WavyMarqueeSection;
