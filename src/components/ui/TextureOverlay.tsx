import { CSSProperties } from "react";

interface TextureOverlayProps {
  opacity?: number;
  blendMode?: CSSProperties["mixBlendMode"];
  pattern?:
    | "gradient"
    | "radial-gradient"
    | "mesh-gradient"
    | "organic-shapes"
    | "brush-strokes"
    | "waves"
    | "paper"
    | "canvas"
    | "crosshatch"
    | "stipple";
  color?: string;
  secondaryColor?: string;
  className?: string;
}

const TextureOverlay = ({
  opacity = 0.3,
  blendMode = "multiply",
  pattern = "gradient",
  color = "hsl(var(--cocoa))",
  secondaryColor,
  className = "",
}: TextureOverlayProps) => {
  const getPatternStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      position: "absolute",
      inset: 0,
      opacity,
      mixBlendMode: blendMode,
      pointerEvents: "none",
      zIndex: 1,
    };

    const secondary = secondaryColor || color;

    switch (pattern) {
      case "gradient":
        // Simple radial vignette - smooth and clean
        return {
          ...baseStyle,
          background: `radial-gradient(circle at 50% 50%, transparent 0%, ${color} 100%)`,
        };

      case "radial-gradient":
        // Multi-stop radial for more control
        return {
          ...baseStyle,
          background: `radial-gradient(circle at 50% 40%, transparent 0%, transparent 40%, ${color} 100%)`,
        };

      case "mesh-gradient":
        // Complex mesh gradient (CSS only)
        return {
          ...baseStyle,
          background: `
            radial-gradient(at 20% 30%, ${color} 0px, transparent 50%),
            radial-gradient(at 80% 70%, ${secondary} 0px, transparent 50%),
            radial-gradient(at 40% 80%, ${color} 0px, transparent 50%)
          `,
        };

      case "organic-shapes":
        // Organic blob shapes using SVG
        return {
          ...baseStyle,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M400,200 Q500,300 400,400 Q300,500 200,400 Q100,300 200,200 Q300,100 400,200 Z' fill='${encodeURIComponent(color)}' opacity='0.3'/%3E%3Cpath d='M600,400 Q650,500 550,550 Q450,600 400,500 Q350,400 450,350 Q550,300 600,400 Z' fill='${encodeURIComponent(secondary)}' opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: "800px 800px",
          backgroundPosition: "center",
        };

      case "brush-strokes":
        // Painterly brush stroke texture
        return {
          ...baseStyle,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='600' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.15'%3E%3Cpath d='M50,100 Q150,80 250,120 T450,100' stroke='${encodeURIComponent(color)}' stroke-width='30' fill='none' opacity='0.4'/%3E%3Cpath d='M100,300 Q200,280 300,320 T500,300' stroke='${encodeURIComponent(color)}' stroke-width='25' fill='none' opacity='0.3'/%3E%3Cpath d='M80,500 Q180,480 280,520 T480,500' stroke='${encodeURIComponent(color)}' stroke-width='35' fill='none' opacity='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "600px 600px",
        };

      case "waves":
        // Wavy organic texture
        return {
          ...baseStyle,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,200 Q250,150 500,200 T1000,200 L1000,0 L0,0 Z' fill='${encodeURIComponent(color)}' opacity='0.1'/%3E%3Cpath d='M0,400 Q250,350 500,400 T1000,400 L1000,0 L0,0 Z' fill='${encodeURIComponent(color)}' opacity='0.08'/%3E%3Cpath d='M0,600 Q250,550 500,600 T1000,600 L1000,0 L0,0 Z' fill='${encodeURIComponent(color)}' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          backgroundPosition: "top",
        };

      case "paper":
        // Subtle paper texture using fine noise
        return {
          ...baseStyle,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' result='noise'/%3E%3CfeColorMatrix type='saturate' values='0' in='noise' result='desaturate'/%3E%3CfeComponentTransfer in='desaturate' result='contrast'%3E%3CfeFuncA type='linear' slope='0.5'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        };

      case "canvas":
        // Canvas fabric texture
        return {
          ...baseStyle,
          backgroundImage: `
            repeating-linear-gradient(0deg, ${color} 0px, transparent 1px, transparent 2px, ${color} 3px),
            repeating-linear-gradient(90deg, ${color} 0px, transparent 1px, transparent 2px, ${color} 3px)
          `,
          backgroundSize: "3px 3px",
        };

      case "crosshatch":
        // Artistic crosshatch pattern
        return {
          ...baseStyle,
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 10px, ${color} 10px, ${color} 11px),
            repeating-linear-gradient(-45deg, transparent, transparent 10px, ${color} 10px, ${color} 11px)
          `,
        };

      case "stipple":
        // Stippled/pointillism effect
        return {
          ...baseStyle,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${encodeURIComponent(color)}'%3E%3Ccircle cx='10' cy='10' r='0.8' opacity='0.4'/%3E%3Ccircle cx='25' cy='18' r='0.6' opacity='0.3'/%3E%3Ccircle cx='45' cy='12' r='0.7' opacity='0.5'/%3E%3Ccircle cx='65' cy='8' r='0.5' opacity='0.3'/%3E%3Ccircle cx='85' cy='15' r='0.9' opacity='0.4'/%3E%3Ccircle cx='15' cy='35' r='0.6' opacity='0.3'/%3E%3Ccircle cx='35' cy='40' r='0.8' opacity='0.5'/%3E%3Ccircle cx='55' cy='32' r='0.7' opacity='0.4'/%3E%3Ccircle cx='75' cy='38' r='0.5' opacity='0.3'/%3E%3Ccircle cx='90' cy='42' r='0.9' opacity='0.5'/%3E%3Ccircle cx='20' cy='60' r='0.7' opacity='0.4'/%3E%3Ccircle cx='40' cy='65' r='0.6' opacity='0.3'/%3E%3Ccircle cx='60' cy='58' r='0.8' opacity='0.5'/%3E%3Ccircle cx='80' cy='62' r='0.5' opacity='0.3'/%3E%3Ccircle cx='12' cy='85' r='0.9' opacity='0.4'/%3E%3Ccircle cx='30' cy='88' r='0.6' opacity='0.3'/%3E%3Ccircle cx='50' cy='82' r='0.7' opacity='0.5'/%3E%3Ccircle cx='70' cy='90' r='0.8' opacity='0.4'/%3E%3Ccircle cx='88' cy='85' r='0.5' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        };

      default:
        return baseStyle;
    }
  };

  return <div className={className} style={getPatternStyle()} />;
};

export default TextureOverlay;
