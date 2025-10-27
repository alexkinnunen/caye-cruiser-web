import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollingCruise = () => {
  useEffect(() => {
    const textElement1 = document.querySelector(".sticky-text-1 .text-container h1");

    if (!textElement1) return;


    // Set up vertical stretching with scaleY
    const textEl = textElement1 as HTMLElement;
    textEl.style.transformOrigin = 'top center';
    textEl.style.willChange = 'transform';

    // Use scaleY for vertical-only scaling
    gsap.timeline({
      scrollTrigger: {
        trigger: ".sticky-text-1",
        start: "top bottom", // Start 100px before bottom to avoid nav covering text
        end: "bottom bottom-=80", // Stop when bottom of section reaches bottom of viewport (right before testimonials)
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 0.1 + (progress * 1.2);
          textEl.style.transform = `scaleY(${scale})`;
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="mt-[-30px] bg-cocoa">
      <div className="sticky-text-1 ">
        <div className="text-container">
          <h1
            className="font-grante text-primary tracking-[0]"
            style={{
              fontSize: '47.5vw',
              lineHeight: '.7',
              padding: 0,
              margin: 0,
              whiteSpace: 'nowrap',
              width: '100vw',
              height: '100vh',
              textAlign: 'center',
            }}
          >
            CRUISE
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ScrollingCruise;
