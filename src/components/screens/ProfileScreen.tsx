import React from "react";
import { Logo } from "../ui/Logo";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import BottomNavigation from "../ui/BottomNavigation";
import type { ProfileScreenProps } from "../../types";

// Types
interface ProfileInfo {
  name: string;
  email: string;
  matriculationNumber: string;
}

// Constants
const PROFILE_DATA: ProfileInfo = {
  name: "User!",
  email: "User.Nachname@hsrw.org",
  matriculationNumber: "12345",
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
    "Anschrift: Friedrich-Heinrich-Allee 25, 47475 Kamp-Lintfort ",
  ],
};

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
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" />
  </svg>
);

const ProfileInformation: React.FC = () => (
  <div className="space-y-4 mb-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Persönliche Informationen
    </h3>
    <ProfileInfoItem
      icon={<EmailIcon className="w-6 h-6 text-gray-500" />}
      label="E-Mail"
      value={PROFILE_DATA.email}
    />
    <ProfileInfoItem
      icon={<IdIcon className="w-6 h-6 text-gray-500" />}
      label="Matrikelnummer"
      value={PROFILE_DATA.matriculationNumber}
    />
  </div>
);

const Impressum: React.FC = () => (
  <>
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {IMPRESSUM_DATA.title}
      </h3>
      <p className="text-sm text-gray-600 space-y-2">
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

// Main Component
const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigateToHome,
  onNavigateToMensa,
  onNavigateToCalendar,
  onNavigateToProfile,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased">
      {/* Header */}
      <header className="flex items-center justify-center p-4 sm:p-6 md:p-8 bg-white border-b border-slate-200 relative">
        <button
          onClick={onNavigateToHome}
          className="absolute left-4 sm:left-6 md:left-8 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Zurück"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <Logo imgClassName="absolute left-1/2 transform -translate-x-1/2 h-8 sm:h-10 md:h-12 w-auto" />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Profil
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 max-w-md mx-auto w-full">
        <ProfileAvatar />
        <ProfileInformation />
        <Impressum />
      </main>

      {/* Spacer for bottom navigation */}
      <div className="h-20 sm:h-24" />

      {/* Bottom Navigation */}
      <BottomNavigation
        currentPage="profile"
        onNavigateToHome={onNavigateToHome}
        onNavigateToMensa={onNavigateToMensa}
        onNavigateToCalendar={onNavigateToCalendar}
        onNavigateToProfile={onNavigateToProfile}
      />
    </div>
  );
};

export default ProfileScreen;
