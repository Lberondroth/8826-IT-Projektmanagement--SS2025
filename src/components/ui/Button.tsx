import React from "react";
import type { ButtonProps } from "../../types";

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  fullWidth = false,
  className = "",
  type = "button",
}) => {
  const baseClasses = `
    bg-white hover:bg-gray-50 active:bg-gray-100
    text-blue-700 border border-blue-700 
    font-semibold py-3 px-8 rounded-lg shadow-md 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
    transition-all duration-200 ease-in-out 
    transform hover:scale-105 active:scale-95
    text-sm sm:text-base
    min-h-[44px] touch-manipulation
  `
    .replace(/\s+/g, " ")
    .trim();

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};
