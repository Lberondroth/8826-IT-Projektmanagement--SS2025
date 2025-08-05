import React from "react";
import { HouseIcon } from "../icons/HouseIcon";
import { UserIcon } from "../icons/UserIcon";

// Import actual logo images for navigation
import mensaLogo from "../../assets/mensa_logo.png";
import stundenplanLogo from "../../assets/stundenplan_logo.png";

interface BottomNavigationProps {
  currentPage: "home" | "calendar" | "mensa" | "profile";
  onNavigateToHome: () => void;
  onNavigateToMensa: () => void;
  onNavigateToCalendar: () => void;
}

// Reusable logo image component for navigation
const NavLogoImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={className ?? "w-6 h-6 sm:w-7 sm:h-7"}
    loading="lazy"
  />
);

// Navigation icon components
const NavStundenplanIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <NavLogoImage
    src={stundenplanLogo}
    alt="Stundenplan"
    className={className ?? "w-6 h-6 sm:w-7 sm:h-7"}
  />
);

const NavMensaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <NavLogoImage
    src={mensaLogo}
    alt="Mensa"
    className={className ?? "w-6 h-6 sm:w-7 sm:h-7"}
  />
);

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentPage,
  onNavigateToHome,
  onNavigateToMensa,
  onNavigateToCalendar,
}) => {
  const navItems = [
    {
      id: "home",
      label: "Home",
      Icon: HouseIcon,
      active: currentPage === "home",
      action: onNavigateToHome,
    },
    {
      id: "calendar",
      label: "Kalender",
      Icon: NavStundenplanIcon,
      active: currentPage === "calendar",
      action: onNavigateToCalendar,
    },
    {
      id: "mensa",
      label: "Mensa",
      Icon: NavMensaIcon,
      active: currentPage === "mensa",
      action: onNavigateToMensa,
    },
    {
      id: "profile",
      label: "User",
      Icon: UserIcon,
      active: currentPage === "profile",
      action: () => console.log("Profile not implemented"),
    },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around items-center p-3 sm:p-4 md:p-5 fixed bottom-0 left-0 right-0 w-full z-20">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={item.action}
          aria-label={item.label}
          className={`p-3 sm:p-4 md:p-5 rounded-xl flex flex-col items-center justify-center min-w-[60px] min-h-[60px] sm:min-w-[70px] sm:min-h-[70px] md:min-w-[80px] md:min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation
                      ${
                        item.active
                          ? "text-blue-600 bg-blue-50 shadow-md"
                          : "text-slate-500 hover:text-blue-500 hover:bg-blue-50"
                      }`}
        >
          <item.Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          <span className="text-xs mt-1 font-medium hidden sm:block">
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
