import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  return (
    <div
      className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
