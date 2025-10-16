


const Hero = () => {


  return (
    <div className="relative w-full h-full overflow-hidden ">
      {/* Hero text content */}
      <div className="relative top-[100px] z-20">
        <div className="h-screen flex items-center justify-center">
          <div className="container mx-auto px-8 text-center">
              <h2 className="text-6xl md:text-7xl -mb-10 lg:text-8xl text-secondary text-left font-kensington px-4 tracking-[0]">
              For the Island, By the Island.
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-9xl xl:text-[20rem] text-sand font-grante tracking-[0] leading-none whitespace-nowrap">
              CAYE CRUISER
            </h1>
          </div>          
        </div>        
      </div>      
    </div>
  );
};

export default Hero;
