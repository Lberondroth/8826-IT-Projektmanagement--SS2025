import React, { useState, useEffect } from "react";
import { Logo } from "../ui/Logo";
import { HouseIcon } from "../icons/HouseIcon";
import { UserIcon } from "../icons/UserIcon";
import BottomNavigation from "../ui/BottomNavigation";
import HattyChatbot from "../ui/HattyChatbot";
import StundenplanModal from "../ui/StundenplanModal";
import type { HomeScreenProps } from "../../types";

// Import actual logo images
import mensaLogo from "../../assets/mensa_logo.png";
import stundenplanLogo from "../../assets/stundenplan_logo.png";
import kurseLogo from "../../assets/kurse_logo.png";
import newsLogo from "../../assets/news_logo.png";
import benachrichtigungenLogo from "../../assets/benachrichtigungen_logo.png";
import campusPlanLogo from "../../assets/campus_plan_logo.png";

// Reusable logo image component with better scaling
const LogoImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={className ?? "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"}
    loading="lazy"
  />
);

// Grid item icon components for better performance
const MensaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <LogoImage src={mensaLogo} alt="Mensa" className={className} />
);

const StundenplanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <LogoImage src={stundenplanLogo} alt="Kalender" className={className} />
);

const KurseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <LogoImage src={kurseLogo} alt="Kurse" className={className} />
);

const NewsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <LogoImage src={newsLogo} alt="News" className={className} />
);

const BenachrichtigungenIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <LogoImage
    src={benachrichtigungenLogo}
    alt="Benachrichtigungen"
    className={className}
  />
);

const CampusPlanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <LogoImage src={campusPlanLogo} alt="Campus-Plan" className={className} />
);

// Navigation icon components
const NavStundenplanIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <LogoImage
    src={stundenplanLogo}
    alt="Kalender"
    className={className ?? "w-6 h-6 sm:w-7 sm:h-7"}
  />
);

const NavMensaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <LogoImage
    src={mensaLogo}
    alt="Mensa"
    className={className ?? "w-6 h-6 sm:w-7 sm:h-7"}
  />
);

const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToMensa,
  onNavigateToCampusMap,
  onNavigateToCalendar,
  onNavigateToNews,
  onNavigateToKurse,
  onNavigateToHome,
}) => {
  const userName = "user"; // This could be dynamic in a real app
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isStundenplanOpen, setIsStundenplanOpen] = useState(false);

  const gridItems = [
    {
      id: "mensa",
      label: "Mensa",
      Icon: MensaIcon,
      action: onNavigateToMensa,
    },
    {
      id: "stundenplan",
      label: "Kalender",
      Icon: StundenplanIcon,
      action: onNavigateToCalendar,
    },
    {
      id: "kurse",
      label: "Kurse",
      Icon: KurseIcon,
      action: onNavigateToKurse,
    },
    {
      id: "news",
      label: "News",
      Icon: NewsIcon,
      action: onNavigateToNews,
    },
    {
      id: "benachrichtigungen",
      label: "Stundenplan",
      Icon: BenachrichtigungenIcon,
      action: () => setIsStundenplanOpen(true),
    },
    {
      id: "campusplan",
      label: "Campus-Plan",
      Icon: CampusPlanIcon,
      action: onNavigateToCampusMap,
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
      label: "Kalender",
      Icon: NavStundenplanIcon,
      active: false,
      action: onNavigateToCalendar,
    },
    {
      id: "mensa-nav",
      label: "Mensa",
      Icon: NavMensaIcon,
      active: false,
      action: onNavigateToMensa,
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
      <header className="flex items-center p-4 sm:p-6 md:p-8 bg-slate-50 sticky top-0 z-10 border-b border-slate-200 shadow-sm">
        <Logo imgClassName="h-8 sm:h-10 md:h-12 w-auto mr-3 sm:mr-4" />
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
          Willkommen, {userName}!
        </h1>
      </header>

      {/* Main Content Grid */}
      <main className="flex-grow p-4 sm:p-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {gridItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={item.action}
              aria-label={item.label.replace("-\n", " ")}
              className="bg-white rounded-xl shadow-md hover:shadow-xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center aspect-square focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out active:scale-95 hover:scale-105 min-h-[120px] sm:min-h-[140px] md:min-h-[160px] touch-manipulation"
            >
              <item.Icon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 sm:mb-3" />
              <span className="text-xs sm:text-sm md:text-base font-medium text-slate-700 text-center whitespace-pre-line leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </main>

      {/* Spacer for bottom navigation to prevent content overlap */}
      <div className="h-20 sm:h-24 md:h-28"></div>

      {/* Bottom Navigation */}
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

      {/* Bottom Navigation */}
      <BottomNavigation
        currentPage="home"
        onNavigateToHome={onNavigateToHome}
        onNavigateToMensa={onNavigateToMensa}
        onNavigateToCalendar={onNavigateToCalendar}
      />

      {/* Spacer for bottom navigation */}
      <div className="h-20 sm:h-24 md:h-28"></div>

      {/* Hatty Chatbot */}
      <HattyChatbot
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
      />

      {/* Stundenplan Modal */}
      <StundenplanModal
        isOpen={isStundenplanOpen}
        onClose={() => setIsStundenplanOpen(false)}
      />
    </div>
  );
};

export default HomeScreen;
