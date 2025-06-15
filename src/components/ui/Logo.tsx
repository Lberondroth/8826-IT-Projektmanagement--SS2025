import React from "react";
import type { LogoProps } from "../../types";
import hsrwLogo from "../../assets/HSRW_logo.png";

export const Logo: React.FC<LogoProps> = ({
  containerClassName = "",
  imgClassName = "h-14 w-auto",
}) => {
  return (
    <div className={`flex items-center justify-center ${containerClassName}`}>
      <img
        src={hsrwLogo}
        alt="HSRW Logo"
        className={imgClassName}
        loading="lazy"
      />
    </div>
  );
};
