import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Placeholder image to show while loading (optional) */
  placeholderSrc?: string;
  /** Fallback image if main image fails to load */
  fallbackSrc?: string;
  /** Root margin for intersection observer (default: "50px") */
  rootMargin?: string;
}

/**
 * LazyImage component with intersection observer
 *
 * Features:
 * - Only loads images when they're near the viewport
 * - Reduces initial page load time
 * - Shows optional placeholder while loading
 * - Handles loading errors with fallback
 * - Native lazy loading as backup
 *
 * @example
 * <LazyImage
 *   src="/large-image.jpg"
 *   placeholderSrc="/tiny-placeholder.jpg"
 *   alt="Description"
 *   className="w-full"
 * />
 */
const LazyImage = ({
  src,
  placeholderSrc,
  fallbackSrc,
  alt = "",
  rootMargin = "50px",
  className = "",
  ...props
}: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(placeholderSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Use native lazy loading if IntersectionObserver not supported
    if (!("IntersectionObserver" in window)) {
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Image is near viewport - start loading
            setImageSrc(src);
            if (imgRef.current) {
              observer.unobserve(imgRef.current);
            }
          }
        });
      },
      {
        rootMargin,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, rootMargin]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    if (fallbackSrc && !hasError) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    } else {
      // No fallback or fallback also failed
      setHasError(true);
      setIsLoaded(true);
    }
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isLoaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy" // Native lazy loading as backup
      {...props}
    />
  );
};

export default LazyImage;
