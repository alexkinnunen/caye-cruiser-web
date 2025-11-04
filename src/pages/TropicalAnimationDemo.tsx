import { useState } from "react";
import TropicalAnimation from "@/components/animations/TropicalAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const TropicalAnimationDemo = () => {
  const [showBirds, setShowBirds] = useState(true);
  const [showPalmTrees, setShowPalmTrees] = useState(true);
  const [showWaves, setShowWaves] = useState(true);
  const [showClouds, setShowClouds] = useState(true);
  const [showSun, setShowSun] = useState(true);
  const [parallaxIntensity, setParallaxIntensity] = useState(0.5);
  const [enableScrollParallax, setEnableScrollParallax] = useState(true);

  const presets = {
    full: {
      name: "Full Scene",
      config: {
        showBirds: true,
        showPalmTrees: true,
        showWaves: true,
        showClouds: true,
        showSun: true,
        parallaxIntensity: 0.5,
      },
    },
    minimal: {
      name: "Minimal",
      config: {
        showBirds: false,
        showPalmTrees: true,
        showWaves: true,
        showClouds: false,
        showSun: true,
        parallaxIntensity: 0.3,
      },
    },
    ocean: {
      name: "Ocean Focus",
      config: {
        showBirds: true,
        showPalmTrees: false,
        showWaves: true,
        showClouds: true,
        showSun: true,
        parallaxIntensity: 0.7,
      },
    },
    sunset: {
      name: "Sunset Vibes",
      config: {
        showBirds: true,
        showPalmTrees: true,
        showWaves: true,
        showClouds: true,
        showSun: true,
        parallaxIntensity: 0.4,
      },
    },
  };

  const applyPreset = (preset: keyof typeof presets) => {
    const config = presets[preset].config;
    setShowBirds(config.showBirds);
    setShowPalmTrees(config.showPalmTrees);
    setShowWaves(config.showWaves);
    setShowClouds(config.showClouds);
    setShowSun(config.showSun);
    setParallaxIntensity(config.parallaxIntensity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-200">
      {/* Fixed Controls Panel */}
      <div className="fixed top-4 right-4 z-50 w-80">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Tropical Animation Controls</CardTitle>
            <CardDescription>Customize your tropical scene</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Presets */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(presets).map(([key, { name }]) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(key as keyof typeof presets)}
                  >
                    {name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Element Toggles */}
            <div className="space-y-3 pt-3 border-t">
              <Label className="text-sm font-semibold">Elements</Label>

              <div className="flex items-center justify-between">
                <Label htmlFor="birds" className="text-sm">Flying Birds</Label>
                <Switch
                  id="birds"
                  checked={showBirds}
                  onCheckedChange={setShowBirds}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="palms" className="text-sm">Palm Trees</Label>
                <Switch
                  id="palms"
                  checked={showPalmTrees}
                  onCheckedChange={setShowPalmTrees}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="waves" className="text-sm">Ocean Waves</Label>
                <Switch
                  id="waves"
                  checked={showWaves}
                  onCheckedChange={setShowWaves}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="clouds" className="text-sm">Clouds</Label>
                <Switch
                  id="clouds"
                  checked={showClouds}
                  onCheckedChange={setShowClouds}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sun" className="text-sm">Sun</Label>
                <Switch
                  id="sun"
                  checked={showSun}
                  onCheckedChange={setShowSun}
                />
              </div>
            </div>

            {/* Parallax Controls */}
            <div className="space-y-3 pt-3 border-t">
              <Label className="text-sm font-semibold">Parallax Settings</Label>

              <div className="flex items-center justify-between">
                <Label htmlFor="scroll-parallax" className="text-sm">Scroll Parallax</Label>
                <Switch
                  id="scroll-parallax"
                  checked={enableScrollParallax}
                  onCheckedChange={setEnableScrollParallax}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="intensity" className="text-sm">Intensity</Label>
                  <span className="text-xs text-muted-foreground">
                    {parallaxIntensity.toFixed(1)}
                  </span>
                </div>
                <Slider
                  id="intensity"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[parallaxIntensity]}
                  onValueChange={(value) => setParallaxIntensity(value[0])}
                  disabled={!enableScrollParallax}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Animation Container with Content */}
      <div className="relative">
        {/* Tropical Animation Background */}
        <TropicalAnimation
          showBirds={showBirds}
          showPalmTrees={showPalmTrees}
          showWaves={showWaves}
          showClouds={showClouds}
          showSun={showSun}
          parallaxIntensity={parallaxIntensity}
          height="300vh"
          enableScrollParallax={enableScrollParallax}
        />

        {/* Content Sections */}
        <div className="relative z-10 pointer-events-auto">
          {/* Hero Section */}
          <section className="h-screen flex items-center justify-center">
            <div className="text-center space-y-6 px-8">
              <h1 className="text-7xl md:text-9xl font-bold text-white drop-shadow-2xl">
                Tropical Paradise
              </h1>
              <p className="text-2xl md:text-3xl text-white/90 drop-shadow-lg">
                Scroll down to experience parallax magic
              </p>
            </div>
          </section>

          {/* Content Section 1 */}
          <section className="min-h-screen flex items-center justify-center px-8">
            <Card className="max-w-2xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-3xl">Playful & Bold Animation</CardTitle>
                <CardDescription className="text-lg">
                  This tropical animation features multiple layers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-lg">
                <p>
                  <strong>Parallax Scrolling:</strong> Each element moves at different speeds creating depth
                </p>
                <p>
                  <strong>Animated Elements:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Swaying palm trees with natural wind movement</li>
                  <li>Flying birds crossing the sky periodically</li>
                  <li>Gentle wave animations in the foreground</li>
                  <li>Floating clouds drifting across</li>
                  <li>Pulsing sun with a warm glow effect</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Content Section 2 */}
          <section className="min-h-screen flex items-center justify-center px-8">
            <Card className="max-w-2xl shadow-2xl bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardHeader>
                <CardTitle className="text-3xl">How to Use</CardTitle>
                <CardDescription className="text-lg">
                  Easy integration into your site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`import TropicalAnimation from '@/components/animations/TropicalAnimation';

// Full scene
<TropicalAnimation />

// Customized
<TropicalAnimation
  showBirds={true}
  showPalmTrees={true}
  parallaxIntensity={0.7}
  height="100vh"
/>`}</pre>
                </div>
                <p className="text-sm text-muted-foreground">
                  The component is fully customizable and works great as a hero background,
                  section overlay, or full-page animation.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TropicalAnimationDemo;
