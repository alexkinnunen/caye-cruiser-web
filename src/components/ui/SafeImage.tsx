import { useState, ImgHTMLAttributes } from "react";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Fallback image URL to display if the main image fails to load */
  fallbackSrc?: string;
  /** Fallback content to render instead of image if both fail */
  fallbackContent?: React.ReactNode;
}

/**
 * SafeImage component with built-in error handling
 *
 * Provides graceful fallback when images fail to load:
 * 1. Tries to load the primary image
 * 2. Falls back to fallbackSrc if provided
 * 3. Renders fallbackContent if both images fail
 * 4. Shows a neutral gray placeholder by default
 *
 * @example
 * <SafeImage
 *   src="/image.jpg"
 *   fallbackSrc="/backup.jpg"
 *   alt="Description"
 * />
 */
const SafeImage = ({
  src,
  fallbackSrc,
  fallbackContent,
  alt = "",
  className = "",
  ...props
}: SafeImageProps) => {
  const [error, setError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  const handleError = () => {
    if (!error && fallbackSrc) {
      // First error: try fallback image
      setError(true);
    } else {
      // Second error or no fallback: show fallback content
      setFallbackError(true);
    }
  };

  // Both images failed - show fallback content
  if (fallbackError || (error && !fallbackSrc)) {
    if (fallbackContent) {
      return <>{fallbackContent}</>;
    }

    // Default fallback: neutral placeholder
    return (
      <div
        className={`bg-muted flex items-center justify-center ${className}`}
        role="img"
        aria-label={alt}
        {...(props as any)}
      >
        <svg
          className="w-12 h-12 text-muted-foreground opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  // Show fallback image if primary failed
  const imageSrc = error && fallbackSrc ? fallbackSrc : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default SafeImage;
