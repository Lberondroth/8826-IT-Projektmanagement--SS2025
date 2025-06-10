import React from "react";

interface LogoImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6 sm:w-7 sm:h-7",
  lg: "w-10 h-10 sm:w-12 sm:h-12",
  xl: "w-16 h-16 sm:w-20 sm:h-20",
};

export const LogoImage: React.FC<LogoImageProps> = ({
  src,
  alt,
  className,
  size = "md",
}) => {
  const sizeClass = className ?? sizeClasses[size];

  return <img src={src} alt={alt} className={sizeClass} loading="lazy" />;
};
