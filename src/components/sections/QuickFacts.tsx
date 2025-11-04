const QuickFacts = () => {
  const facts = [
    { line1: "SECRET", line2: "BEACH" },
    { line1: "AIRPORT", line2: "PICKUP" },
    { line1: "AMBERGRIS", line2: "CAYE" },
    { line1: "SAN", line2: "PEDRO" }
  ];

  return (
    <section className="w-full bg-secondary py-8 md:py-20 mx-auto">
      <div className="w-full px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-40">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center gap-12"
            >
              <div className="font-sans font-black text-cocoa text-lg md:text-xl lg:text-[4vw] uppercase">
                {fact.line1}
              </div>
              <div className="font-sans font-black text-cocoa text-lg md:text-xl lg:text-[4vw] uppercase">
                {fact.line2}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickFacts;
