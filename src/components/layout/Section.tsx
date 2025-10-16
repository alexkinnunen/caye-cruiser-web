import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "beige" | "white" | "transparent";
  fullWidth?: boolean;
  noPadding?: boolean;
}

/**
 * Section wrapper component that enforces consistent spacing between page sections
 *
 * @param spacing - Controls vertical padding (py):
 *   - none: py-0
 *   - sm: py-8
 *   - md: py-16 (default)
 *   - lg: py-24
 *   - xl: py-32
 *
 * @param background - Background color
 * @param fullWidth - If true, removes container max-width constraint
 * @param noPadding - If true, removes horizontal padding (px)
 */
const Section = ({
  children,
  id,
  className = "",
  spacing = "md",
  background = "transparent",
  fullWidth = false,
  noPadding = false,
}: SectionProps) => {
  // Spacing map
  const spacingClasses = {
    none: "py-0",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  // Background map
  const backgroundClasses = {
    beige: "bg-beige",
    white: "bg-white",
    transparent: "bg-transparent",
  };

  return (
    <section
      id={id}
      className={`
        w-full
        ${spacingClasses[spacing]}
        ${backgroundClasses[background]}
        ${className}
      `.trim()}
    >
      <div className={`${fullWidth ? "w-full" : "container mx-auto"} ${noPadding ? "" : "px-4"}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
