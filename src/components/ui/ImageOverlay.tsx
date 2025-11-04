import { ReactNode, CSSProperties } from "react";

interface ImageOverlayProps {
  children: ReactNode;
  overlayColor?: string;
  overlayOpacity?: number;
  vignette?: boolean;
  vignetteStrength?: number;
  className?: string;
}

const ImageOverlay = ({
  children,
  overlayColor = "hsl(var(--cocoa))",
  overlayOpacity = 0.3,
  vignette = true,
  vignetteStrength = 0.4,
  className = "",
}: ImageOverlayProps) => {
  const vignetteStyle: CSSProperties = vignette
    ? {
        background: `radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, ${vignetteStrength}) 100%)`,
      }
    : {};

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Image content */}
      {children}

      {/* Color overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
          mixBlendMode: "multiply",
          zIndex: 2,
        }}
      />

      {/* Vignette overlay */}
      {vignette && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...vignetteStyle,
            zIndex: 3,
          }}
        />
      )}
    </div>
  );
};

export default ImageOverlay;
