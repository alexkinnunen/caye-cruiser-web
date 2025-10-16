import { useState, useCallback, useRef } from "react";
import type { MapMouseEvent } from "mapbox-gl";
import Map, { Marker, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, Loader2, MapPin, Navigation, Target, Plus, Minus } from "lucide-react";
import { LocationPoint } from "@/lib/constants";

// Ensure your Mapbox token is correctly set in your .env file (VITE_MAPBOX_TOKEN)
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

type PinMode = 'none' | 'pickup' | 'dropoff';

type InteractiveMapProps = {
  pickup: LocationPoint | null;
  dropoff: LocationPoint | null;
  isLoading: boolean;
  onMapClick: (event: MapMouseEvent) => void;
  onRequestRide: () => void;
};

const InteractiveMap = ({
  pickup,
  dropoff,
  isLoading,
  onMapClick,
  onRequestRide,
}: InteractiveMapProps) => {
  const [pinMode, setPinMode] = useState<PinMode>('none');
  const mapRef = useRef<MapRef>(null);
  const canRequest = pickup && dropoff;

  const handleMapClick = (event: MapMouseEvent) => {
    if (pinMode !== 'none') {
      onMapClick(event);
      setPinMode('none'); // Reset pin mode after a location is selected
    }
  };

  const handlePinModeToggle = (mode: 'pickup' | 'dropoff') => {
    setPinMode(pinMode === mode ? 'none' : mode);
  };

  const handleZoomIn = useCallback(() => {
    mapRef.current?.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    mapRef.current?.zoomOut();
  }, []);

  return (
  
   <>
      <TooltipProvider>
        <div className="w-full h-full relative flex flex-col">
          {/* Map Section - Grows to fill available space */}
          <div className="w-full flex-1 relative">
              <Map
                ref={mapRef}
                initialViewState={{ latitude: 17.9163, longitude: -87.9665, zoom: 14 }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
                onClick={handleMapClick}
                cursor={pinMode !== 'none' ? 'crosshair' : 'pointer'}
                style={{ width: '100%', height: '100%' }}
                scrollZoom={false}
                dragPan={true}
                dragRotate={false}
                doubleClickZoom={false}
              >
                {/* Pickup Marker */}
                {pickup && typeof pickup.latitude === 'number' && typeof pickup.longitude === 'number' && (
                  <Marker longitude={pickup.longitude} latitude={pickup.latitude}>
                    <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </Marker>
                )}

                {/* Dropoff Marker */}
                {dropoff && typeof dropoff.latitude === 'number' && typeof dropoff.longitude === 'number' && (
                  <Marker longitude={dropoff.longitude} latitude={dropoff.latitude}>
                    <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </Marker>
                )}
              </Map>

              {/* Zoom Controls - Top Right Overlay */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomIn}
                      className="bg-white hover:bg-gray-100 shadow-lg"
                      aria-label="Zoom in"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zoom in</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomOut}
                      className="bg-white hover:bg-gray-100 shadow-lg"
                      aria-label="Zoom out"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zoom out</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Request Ride Button - Top Right Overlay (moved to avoid overlap with input section) */}
              <div className="absolute bottom-10 right-4 z-10">
                <Button
                  size="lg"
                  className="shadow-lg bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
                  disabled={!canRequest || isLoading}
                  onClick={onRequestRide}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Finding...
                    </>
                  ) : (
                    <>
                      Confirm Cruise
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>

              {/* Pin Mode Indicator */}
              {pinMode !== 'none' && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Click on map to set {pinMode} location
                  </div>
                </div>
              )}
            </div>

          {/* Bottom Input Section - Now part of flex layout instead of overlay */}
          <div className="w-full border-t border-gray-200 p-4 space-y-3 shadow-lg z-20">
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={pinMode === 'pickup' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => handlePinModeToggle('pickup')}
                      className={pinMode === 'pickup' ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to pin pickup location on map</p>
                  </TooltipContent>
                </Tooltip>
                <Input
                  placeholder="Enter pickup address or click map"
                  value={pickup ? `Pickup: ${pickup.latitude.toFixed(4)}, ${pickup.longitude.toFixed(4)}` : ''}
                  readOnly
                  className="bg-white flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={pinMode === 'dropoff' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => handlePinModeToggle('dropoff')}
                      className={pinMode === 'dropoff' ? 'bg-red-500 hover:bg-red-600' : ''}
                    >
                      <Target className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to pin dropoff location on map</p>
                  </TooltipContent>
                </Tooltip>
                <Input
                  placeholder="Enter dropoff address, click map, or select destination above"
                  value={dropoff ? `Drop-off: ${dropoff.latitude.toFixed(4)}, ${dropoff.longitude.toFixed(4)}` : ''}
                  readOnly
                  className="bg-white flex-1"
                />
              </div>
          </div>
        </div>
      </TooltipProvider>
    </>
    
    
  );
};

export default InteractiveMap;