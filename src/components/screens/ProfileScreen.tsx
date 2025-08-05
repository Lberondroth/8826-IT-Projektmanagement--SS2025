import React from "react";
import { Logo } from "../ui/Logo";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { HouseIcon } from "../icons/HouseIcon";
import { UserIcon } from "../icons/UserIcon";

// Import actual logo images for navigation
import mensaLogo from "../../assets/mensa_logo.png";
import stundenplanLogo from "../../assets/stundenplan_logo.png";

// Types
interface ProfileScreenProps {
  onNavigateToHome: () => void;
  onNavigateToMensa: () => void;
  onNavigateToCalendar: () => void;
}

interface NavItem {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  action: () => void;
}

interface ProfileInfo {
  name: string;
  email: string;
  matriculationNumber: string;
}

// Constants
const PROFILE_DATA: ProfileInfo = {
  name: "User!",
  email: "User.Nachname@hsrw.org",
  matriculationNumber: "12345"
};

const IMPRESSUM_DATA = {
  title: "IMPRESSUM",
  content: [
    "Studienprojekt: CampusHub",
    "Adam, Lena Sophie    35241",
    "Berndroth, Louis    36636",
    "Bozçelik, Ismail Samet    35242",
    "Çapacı, Ulaş-Arda    35796",
    "Srikumar, Riyashan    35287",
    "Hochschule: Hochschule Rhein-Waal",
    "Kontakt: info@hochschule-rhein-waal.de ",
    "Anschrift: Friedrich-Heinrich-Allee 25, 47475 Kamp-Lintfort "
  ]
};

// Reusable Components
const NavLogoImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = "w-6 h-6 sm:w-7 sm:h-7" }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
  />
);

const NavStundenplanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <NavLogoImage
    src={stundenplanLogo}
    alt="Kalender"
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

// Profile Components
const ProfileAvatar: React.FC = () => (
  <div className="flex flex-col items-center mb-8">
    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gray-300 rounded-full flex items-center justify-center mb-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-500 rounded-full" />
    </div>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
      {PROFILE_DATA.name}
    </h2>
    <div className="w-full max-w-xs h-0.5 bg-gray-300" />
  </div>
);

const ProfileInfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
    {icon}
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-blue-600 font-medium">{value}</span>
  </div>
);

const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const IdIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const ProfileInformation: React.FC = () => (
  <div className="space-y-6">
    <ProfileInfoItem
      icon={<EmailIcon className="w-5 h-5 text-gray-600" />}
      label="EMAIL"
      value={PROFILE_DATA.email}
    />
    <ProfileInfoItem
      icon={<IdIcon className="w-5 h-5 text-gray-600" />}
      label="MATRIKELNUMMER"
      value={PROFILE_DATA.matriculationNumber}
    />
  </div>
);

const Impressum: React.FC = () => (
  <>
  <br/> <br/>
    <div className="w-full max-w-xs h-0.5 bg-gray-300 mx-auto mb-6" />
    <div className="text-center mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{IMPRESSUM_DATA.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {IMPRESSUM_DATA.content.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < IMPRESSUM_DATA.content.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
  </>
);

const NavigationButton: React.FC<{
  item: NavItem;
}> = ({ item }) => (
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
);

// Custom Hook für Navigation Items
const useNavigationItems = (
  onNavigateToHome: () => void,
  onNavigateToMensa: () => void,
  onNavigateToCalendar: () => void
): NavItem[] => [
  {
    id: "home",
    label: "Home",
    Icon: HouseIcon,
    active: false,
    action: onNavigateToHome,
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
    active: true,
    action: () => console.log("Already on profile"),
  },
];

// Main Component
const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigateToHome,
  onNavigateToMensa,
  onNavigateToCalendar,
}) => {
  const navItems = useNavigationItems(onNavigateToHome, onNavigateToMensa, onNavigateToCalendar);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased">
      {/* Header */}
      <header className="flex items-center justify-between p-4 sm:p-6 md:p-8 bg-white border-b border-slate-200">
        <Logo imgClassName="h-8 sm:h-10 md:h-12 w-auto" />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Profil
        </h1>
        <button
          onClick={onNavigateToHome}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Zurück"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 max-w-md mx-auto w-full">
        <ProfileAvatar />
        <ProfileInformation />
        <Impressum />
      </main>

      {/* Spacer for bottom navigation */}
      <div className="h-20 sm:h-24 md:h-28" />

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around items-center p-3 sm:p-4 md:p-5 fixed bottom-0 left-0 right-0 w-full z-20">
        {navItems.map((item) => (
          <NavigationButton key={item.id} item={item} />
        ))}
      </nav>
    </div>
  );
};

export default ProfileScreen;