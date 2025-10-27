import React from 'react';

interface CustomWaveBackgroundProps {
  waveColor?: string;
  /** Height of the background container */
  height?: string;
  /** CSS class for additional styling */
  className?: string;
  /** Top position offset */
  top?: string;
}

const CustomWaveBackground: React.FC<CustomWaveBackgroundProps> = ({
  waveColor = 'hsl(var(--accent))',
  height = '800px',
  className = '',
  top = '0px',
}) => {
  return (
    <div
      className={`absolute left-0 right-0 ${className}`}
      style={{
        top,
        height,
      }}
    >
      {/* Custom Background with wave on bottom edge */}
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1733 550"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Single path creating rectangle with wavy bottom edge */}
        <path
          d="M0 0 H1733 V364 L1660.79 364C1588.58 364 1444.17 364 1299.75 372.667C1155.33 381.333 1010.92 398.667 866.5 364C722.083 329.333 577.667 242.667 433.25 251.333C288.833 260 144.417 364 72.2083 416 L0 468 V0 Z"
          fill={waveColor}
        />
      </svg>
    </div>
  );
};

export default CustomWaveBackground;
