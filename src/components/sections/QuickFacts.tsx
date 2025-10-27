const QuickFacts = () => {
  const facts = [
    { line1: "ISLAND", line2: "WIDE" },
    { line1: "ON", line2: "DEMAND" },
    { line1: "LOCAL", line2: "Expertise" },
    { line1: "NO", line2: "WORRIES" }
  ];

  return (
    <section className="w-full max-w-[100vw] bg-secondary py-8 md:py-20 mx-auto">
      <div className="w-full max-w-[100vw] px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center gap-6"
            >
              <div className="font-sans font-black text-sand text-lg md:text-xl lg:text-[3vw] uppercase">
                {fact.line1}
              </div>
              <div className="font-sans font-black text-sand text-lg md:text-xl lg:text-[3vw] uppercase">
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
