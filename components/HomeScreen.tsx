import React from "react";
import { Logo } from "./Logo";
import { HouseIcon } from "./icons/HouseIcon";
import { UserIcon } from "./icons/UserIcon";

// Import actual logo images
import mensaLogo from "../src/assets/mensa_logo.png";
import stundenplanLogo from "../src/assets/stundenplan_logo.png";
import kurseLogo from "../src/assets/kurse_logo.png";
import newsLogo from "../src/assets/news_logo.png";
import benachrichtigungenLogo from "../src/assets/benachrichtigungen_logo.png";
import campusPlanLogo from "../src/assets/campus_plan_logo.png";

const HomeScreen: React.FC = () => {
  const userName = "user"; // This could be dynamic in a real app

  // Component for rendering logo images
  const LogoImage: React.FC<{
    src: string;
    alt: string;
    className?: string;
  }> = ({ src, alt, className }) => (
    <img
      src={src}
      alt={alt}
      className={className || "w-10 h-10 sm:w-12 sm:h-12"}
    />
  );

  const gridItems = [
    {
      id: "mensa",
      label: "Mensa",
      Icon: () => (
        <LogoImage
          src={mensaLogo}
          alt="Mensa"
          className="w-10 h-10 sm:w-12 sm:h-12 mb-1 sm:mb-2"
        />
      ),
      action: () => console.log("Mensa clicked"),
    },
    {
      id: "stundenplan",
      label: "Stundenplan",
      Icon: () => (
        <LogoImage
          src={stundenplanLogo}
          alt="Stundenplan"
          className="w-10 h-10 sm:w-12 sm:h-12 mb-1 sm:mb-2"
        />
      ),
      action: () => console.log("Stundenplan clicked"),
    },
    {
      id: "kurse",
      label: "Kurse",
      Icon: () => (
        <LogoImage
          src={kurseLogo}
          alt="Kurse"
          className="w-10 h-10 sm:w-12 sm:h-12 mb-1 sm:mb-2"
        />
      ),
      action: () => console.log("Kurse clicked"),
    },
    {
      id: "news",
      label: "News",
      Icon: () => (
        <LogoImage
          src={newsLogo}
          alt="News"
          className="w-10 h-10 sm:w-12 sm:h-12 mb-1 sm:mb-2"
        />
      ),
      action: () => console.log("News clicked"),
    },
    {
      id: "benachrichtigungen",
      label: "Benachrichtig-\nungen",
      Icon: () => (
        <LogoImage
          src={benachrichtigungenLogo}
          alt="Benachrichtigungen"
          className="w-10 h-10 sm:w-12 sm:h-12 mb-1 sm:mb-2"
        />
      ),
      action: () => console.log("Benachrichtigungen clicked"),
    },
    {
      id: "campusplan",
      label: "Campus-Plan",
      Icon: () => (
        <LogoImage
          src={campusPlanLogo}
          alt="Campus-Plan"
          className="w-10 h-10 sm:w-12 sm:h-12 mb-1 sm:mb-2"
        />
      ),
      action: () => console.log("Campus-Plan clicked"),
    },
  ];

  const navItems = [
    {
      id: "home",
      label: "Home",
      Icon: HouseIcon,
      active: true,
      action: () => console.log("Nav Home clicked"),
    },
    {
      id: "calendar",
      label: "Stundenplan",
      Icon: () => (
        <LogoImage
          src={stundenplanLogo}
          alt="Stundenplan"
          className="w-6 h-6 sm:w-7 sm:h-7"
        />
      ),
      active: false,
      action: () => console.log("Nav Calendar clicked"),
    },
    {
      id: "mensa-nav",
      label: "Mensa",
      Icon: () => (
        <LogoImage
          src={mensaLogo}
          alt="Mensa"
          className="w-6 h-6 sm:w-7 sm:h-7"
        />
      ),
      active: false,
      action: () => console.log("Nav Mensa clicked"),
    },
    {
      id: "profile",
      label: "Profil",
      Icon: UserIcon,
      active: false,
      action: () => console.log("Nav Profile clicked"),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased">
      {/* Header */}
      <header className="flex items-center p-4 sm:p-5 bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
        <Logo imgClassName="h-7 sm:h-8 w-auto mr-3" />
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Willkommen, {userName}!
        </h1>
      </header>

      {/* Main Content Grid */}
      <main className="flex-grow p-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {gridItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={item.action}
              aria-label={item.label.replace("-\n", " ")}
              className="bg-white rounded-xl shadow-md hover:shadow-lg p-3 sm:p-4 flex flex-col items-center justify-center aspect-square focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out active:scale-95"
            >
              <item.Icon />
              <span className="text-xs sm:text-sm font-medium text-slate-700 text-center whitespace-pre-line">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </main>

      {/* Spacer for bottom navigation to prevent content overlap */}
      <div className="h-16 sm:h-20"></div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] flex justify-around items-center p-2 fixed bottom-0 left-0 right-0 w-full z-10">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.action}
            aria-label={item.label}
            className={`p-2 rounded-lg flex flex-col items-center justify-center w-1/4 focus:outline-none focus:bg-slate-100 transition-colors duration-150
                        ${
                          item.active
                            ? "text-blue-600"
                            : "text-slate-500 hover:text-blue-500"
                        }`}
          >
            <item.Icon className="w-6 h-6 sm:w-7 sm:h-7" />
            {/* Optional: Text label for bottom nav icons - not present in the provided image
             <span className={`mt-1 text-xs ${item.active ? 'font-semibold' : ''}`}>{item.label}</span> 
             */}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default HomeScreen;
