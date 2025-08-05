import React, { useState } from "react";
import { Logo } from "./src/components/ui/Logo";
import { Button } from "./src/components/ui/Button";
import { LoginScreen } from "./src/components/screens/LoginScreen";
import HomeScreen from "./src/components/screens/HomeScreen";
import MensaScreen from "./src/components/screens/MensaScreen";
import CampusMapScreen from "./src/components/screens/CampusMapScreen";
import CalendarScreen from "./src/components/screens/CalendarScreen";
import NewsScreen from "./src/components/screens/NewsScreen";
import KurseScreen from "./src/components/screens/KurseScreen";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    | "welcome"
    | "login"
    | "home"
    | "mensa"
    | "campus-map"
    | "calendar"
    | "news"
    | "kurse"
  >("welcome");

  const handleContinueToLogin = () => {
    setCurrentView("login");
  };

  const handleLogin = (username?: string, password?: string) => {
    console.log("Login attempt with:", { username, password });
    // For test purposes, login always works even with empty credentials
    setCurrentView("home");
  };

  const handleNavigateToMensa = () => {
    setCurrentView("mensa");
  };

  const handleNavigateToCampusMap = () => {
    setCurrentView("campus-map");
  };

  const handleNavigateToHome = () => {
    setCurrentView("home");
  };

  const handleNavigateToCalendar = () => {
    setCurrentView("calendar");
  };

  const handleNavigateToNews = () => {
    setCurrentView("news");
  };

  const handleNavigateToKurse = () => {
    setCurrentView("kurse");
  };

  if (currentView === "login") {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentView === "home") {
    return (
      <HomeScreen
        onNavigateToMensa={handleNavigateToMensa}
        onNavigateToCampusMap={handleNavigateToCampusMap}
        onNavigateToCalendar={handleNavigateToCalendar}
        onNavigateToNews={handleNavigateToNews}
        onNavigateToKurse={handleNavigateToKurse}
        onNavigateToHome={handleNavigateToHome}
      />
    );
  }

  if (currentView === "mensa") {
    return (
      <MensaScreen
        onNavigateToHome={handleNavigateToHome}
        onNavigateToMensa={handleNavigateToMensa}
        onNavigateToCalendar={handleNavigateToCalendar}
      />
    );
  }

  if (currentView === "campus-map") {
    return (
      <CampusMapScreen
        onNavigateToHome={handleNavigateToHome}
        onNavigateToMensa={handleNavigateToMensa}
        onNavigateToCalendar={handleNavigateToCalendar}
      />
    );
  }

  if (currentView === "calendar") {
    return (
      <CalendarScreen
        onNavigateToHome={handleNavigateToHome}
        onNavigateToMensa={handleNavigateToMensa}
        onNavigateToCalendar={handleNavigateToCalendar}
      />
    );
  }

  if (currentView === "news") {
    return (
      <NewsScreen
        onNavigateToHome={handleNavigateToHome}
        onNavigateToMensa={handleNavigateToMensa}
        onNavigateToCalendar={handleNavigateToCalendar}
      />
    );
  }

  if (currentView === "kurse") {
    return (
      <KurseScreen
        onNavigateToHome={handleNavigateToHome}
        onNavigateToMensa={handleNavigateToMensa}
        onNavigateToCalendar={handleNavigateToCalendar}
      />
    );
  }

  // Welcome Screen View (default)
  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-sans antialiased">
      {/* Logo container: takes up available space and centers logo */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 w-full">
        <Logo imgClassName="h-20 w-auto" />
      </div>
      {/* Button container: at the bottom */}
      <div className="w-full p-6 pb-8 sm:pb-12 md:p-8 max-w-xs sm:max-w-sm">
        <Button onClick={handleContinueToLogin} fullWidth>
          Tippen, um fortzufahren
        </Button>
      </div>
    </div>
  );
};

export default App;
