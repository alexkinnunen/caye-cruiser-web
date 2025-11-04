import WavyMarquee from "@/components/ui/WavyMarquee";

const WavyMarqueeSection = () => {
  return (
    <section className="w-full relative overflow-hidden flex flex-col justify-center mx-auto bg-primary">

      {/* Third Marquee - Right to Left (Reverse) */}
      <div className="relative z-10">
        <WavyMarquee
          text="CAYECRUISER . SAN PEDRO ."
          fontSize={75}
          textColor="hsl(17, 33%, 32%)" // Cocoa
          accentColor="hsl(17, 33%, 32%)" // Cocoa
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
