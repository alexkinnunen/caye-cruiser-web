const InteractiveMap = () => {
  return (
    <div className="w-full h-[800px] relative bg-white">
      {/* Map Placeholder Visual */}
      <div className="w-full h-[800px] relative flex items-center justify-center overflow-hidden">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(#6FA8B8 1px, transparent 1px),
              linear-gradient(90deg, #6FA8B8 1px, transparent 1px)
            `, // Ocean Blue/Secondary
            backgroundSize: '40px 40px'
          }}
        />

        {/* Floating Input Section - Top Left Inset with Glassmorphism */}
        <div className="absolute top-6 left- z-20 w-full max-w-[91vw] space-y-3">
            <div className="flex-1 h-10 bg-white/50 backdrop-blur-sm rounded-md flex items-center px-3 text-sm text-gray-400 border border-white/40">
              Dropoff location
            </div>
          </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
