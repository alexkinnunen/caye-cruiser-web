import { useState, useCallback, useRef } from "react";
import type { MapMouseEvent } from "mapbox-gl";
import Map, { Marker, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRight, Loader2, MapPin, Navigation, Target, Plus, Minus, AlertTriangle } from "lucide-react";
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
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<MapRef>(null);
  const canRequest = pickup && dropoff;

  const handleZoomIn = useCallback(() => {
    mapRef.current?.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    mapRef.current?.zoomOut();
  }, []);

  // In development, show placeholder if Mapbox token is missing
  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === 'pk.your-mapbox-token-here') {
    if (import.meta.env.DEV) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="max-w-md p-8 text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Map Preview</h3>
            <p className="text-gray-600 mb-4">
              Add your Mapbox token to .env.local to see the interactive map here.
            </p>
            <code className="text-xs bg-white px-3 py-2 rounded border text-gray-700 block">
              VITE_MAPBOX_TOKEN=pk.your-token...
            </code>
          </div>
        </div>
      );
    }

    // In production, show error
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Map Configuration Error</AlertTitle>
          <AlertDescription>
            Mapbox token is missing or invalid. Please configure VITE_MAPBOX_TOKEN.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleMapClick = (event: MapMouseEvent) => {
    if (pinMode !== 'none') {
      onMapClick(event);
      setPinMode('none'); // Reset pin mode after a location is selected
    }
  };

  const handlePinModeToggle = (mode: 'pickup' | 'dropoff') => {
    setPinMode(pinMode === mode ? 'none' : mode);
  };

  return (

   <>
      <TooltipProvider>
        <div className="w-full h-full relative">
          {/* Map Error Alert */}
          {mapError && (
            <Alert variant="destructive" className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 max-w-md">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Map Error</AlertTitle>
              <AlertDescription>{mapError}</AlertDescription>
            </Alert>
          )}

          {/* Map Section - Full size */}
          <div className="w-full h-full relative">
              <Map
                ref={mapRef}
                initialViewState={{ latitude: 17.9163, longitude: -87.9665, zoom: 14 }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
                onClick={handleMapClick}
                onError={(e) => setMapError(e.error?.message || 'Failed to load map')}
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
                    <div className="bg-primary text-white p-2 rounded-full shadow-lg">
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

              {/* Floating Input Section - Top Left Inset with Glassmorphism */}
              <div className="absolute top-6 left-6 z-20 w-full max-w-md space-y-3">
                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/30">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={pinMode === 'pickup' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => handlePinModeToggle('pickup')}
                        className={pinMode === 'pickup' ? 'bg-primary hover:bg-primary/90' : ''}
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
                    className="bg-white/50 backdrop-blur-sm border-white/40 flex-1"
                  />
                </div>

                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/30">
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
                    className="bg-white/50 backdrop-blur-sm border-white/40 flex-1"
                  />
                </div>
              </div>

              {/* Zoom Controls - Top Right Overlay */}
              <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
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

              {/* Request Ride Button - Bottom Right Overlay */}
              <div className="absolute bottom-6 right-6 z-10">
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
        </div>
      </TooltipProvider>
    </>
  );
};

export default InteractiveMap;