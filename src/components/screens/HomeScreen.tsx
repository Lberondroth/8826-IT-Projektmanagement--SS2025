import React, { useState, useEffect } from "react";
import { Logo } from "../ui/Logo";
import BottomNavigation from "../ui/BottomNavigation";
import HattyChatbot from "../ui/HattyChatbot";
import StundenplanModal from "../ui/StundenplanModal";
import type { HomeScreenProps } from "../../types";

// Import actual logo images
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
  <LogoImage src={kurseLogo} alt="Mensa" className={className} />
);

const StundenplanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <LogoImage src={kurseLogo} alt="Kalender" className={className} />
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



const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToMensa,
  onNavigateToCampusMap,
  onNavigateToCalendar,
  onNavigateToNews,
  onNavigateToKurse,
  onNavigateToHome,
  onNavigateToProfile,
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
      <BottomNavigation
        currentPage="home"
        onNavigateToHome={onNavigateToHome}
        onNavigateToMensa={onNavigateToMensa}
        onNavigateToCalendar={onNavigateToCalendar}
        onNavigateToProfile={onNavigateToProfile}
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
