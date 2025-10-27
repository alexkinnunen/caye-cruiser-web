import { MapPin, Navigation } from "lucide-react";

const MapPlaceholder = () => {
  return (
    <div className="w-full h-full relative">
      {/* Map Placeholder Visual */}
      <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
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

        {/* Animated Map Pins */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64">
            {/* Center pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce">
              <MapPin className="w-12 h-12 text-lime drop-shadow-lg" />
            </div>

            {/* Surrounding pins */}
            <div className="absolute top-8 left-12 opacity-40">
              <MapPin className="w-6 h-6 text-ocean-blue" />
            </div>
            <div className="absolute top-16 right-8 opacity-30">
              <MapPin className="w-5 h-5 text-cocoa" />
            </div>
            <div className="absolute bottom-12 left-16 opacity-35">
              <MapPin className="w-7 h-7 text-lime" />
            </div>
            <div className="absolute bottom-8 right-12 opacity-25">
              <MapPin className="w-6 h-6 text-ocean-blue" />
            </div>
          </div>
        </div>

        {/* Center Message */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-2xl text-center max-w-md mx-4">
            <Navigation className="w-12 h-12 text-lime mx-auto mb-4" />
            <h3 className="text-2xl font-grante text-cocoa mb-2 uppercase">
              Interactive Map
            </h3>
            <p className="text-sm text-gray-600">
              Real-time golf cart tracking and ride booking will appear here
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Configure your <span className="font-mono bg-gray-100 px-1 rounded">VITE_MAPBOX_TOKEN</span> in <span className="font-mono bg-gray-100 px-1 rounded">.env.local</span> to enable
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>San Pedro, Belize</span>
          </div>
        </div>

        {/* Floating Input Section - Top Left Inset with Glassmorphism */}
        <div className="absolute top-6 left- z-20 w-full max-w-[91vw] space-y-3">
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/30">
            <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center">
              <Navigation className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 h-10 bg-white/50 backdrop-blur-sm rounded-md flex items-center px-3 text-sm text-gray-400 border border-white/40">
              Pickup location
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/30">
            <div className="w-10 h-10 rounded-md flex items-center justify-center">
              <MapPin className="h-4 w-4 text-cocoa" />
            </div>
            <div className="flex-1 h-10 bg-white/50 backdrop-blur-sm rounded-md flex items-center px-3 text-sm text-gray-400 border border-white/40">
              Dropoff location
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
