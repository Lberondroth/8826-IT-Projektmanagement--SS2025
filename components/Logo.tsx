import React from "react";
import hsrwLogo from "../src/assets/HSRW_logo.png";

interface LogoProps {
  containerClassName?: string; // For the outer div
  imgClassName?: string; // For the img tag itself, e.g., "h-14 w-auto"
}

export const Logo: React.FC<LogoProps> = ({
  containerClassName,
  imgClassName = "h-14 w-auto",
}) => {
  return (
    <div
      className={`flex items-center justify-center ${containerClassName || ""}`}
    >
      <img
        src={hsrwLogo}
        alt="HSRW Logo"
        className={imgClassName} // Apply dynamic class for size, etc.
      />
    </div>
  );
};
