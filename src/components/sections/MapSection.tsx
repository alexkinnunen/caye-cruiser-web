import { lazy, Suspense, useMemo } from "react";
import MapPlaceholder from "@/components/sections/MapPlaceholder";

// Lazy load InteractiveMap
const InteractiveMap = lazy(() => import("@/components/sections/InteractiveMap"));

const MapSection = () => {
  // Check if Mapbox token is properly configured
  const hasValidMapboxToken = useMemo(() => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    return (
      token && token !== "your-mapbox-token-here" && token.startsWith("pk.")
    );
  }, []);

  return (
    <div className="relative w-full max-w-[100vw] mx-auto z-20" style={{ marginTop: '0px' }}>
      {/* Map Container - Full screen, no rounded corners */}
      <div className="overflow-hidden relative bg-white w-screen h-screen">
        {hasValidMapboxToken ? (
          <Suspense fallback={<MapPlaceholder />}>
            <InteractiveMap
              pickup={null}
              dropoff={null}
              isLoading={false}
              onMapClick={() => {}}
              onRequestRide={() => {}}
            />
          </Suspense>
        ) : (
          <MapPlaceholder />
        )}
      </div>
    </div>
  );
};

export default MapSection;
