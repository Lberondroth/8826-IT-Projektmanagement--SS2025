import React from "react";

interface ButtonProps {
  onClick?: () => void; // onClick is optional if type is 'submit'
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  fullWidth = false,
  className = "",
  type = "button",
}) => {
  const buttonBaseClasses = `bg-white hover:bg-gray-100 text-blue-700 border border-blue-700 font-semibold py-3 px-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out transform active:scale-95`;
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonBaseClasses} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};
