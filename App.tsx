import React, { useState, useEffect } from "react";
import { Logo } from "./src/components/ui/Logo";
import { Button } from "./src/components/ui/Button";
import { LoginScreen } from "./src/components/screens/LoginScreen";
import HomeScreen from "./src/components/screens/HomeScreen";
import MensaScreen from "./src/components/screens/MensaScreen";
import CampusMapScreen from "./src/components/screens/CampusMapScreen";
import CalendarScreen from "./src/components/screens/CalendarScreen";
import NewsScreen from "./src/components/screens/NewsScreen";
import KurseScreen from "./src/components/screens/KurseScreen";
import ProfileScreen from "./src/components/screens/ProfileScreen";
import CookieBanner from "./src/components/ui/CookieBanner";

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
    | "profile"
  >("welcome");

  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  // Check if cookies were already accepted on component mount
  useEffect(() => {
    // Only check localStorage if we're not coming from login
    const fromLogin = sessionStorage.getItem('fromLogin');
    if (fromLogin !== 'true') {
      // Check if cookies were previously accepted
      const cookiesAcceptedFromStorage = localStorage.getItem('cookiesAccepted');
      if (cookiesAcceptedFromStorage === 'true') {
        setCookiesAccepted(true);
      }
    }
    // If coming from login, don't check localStorage - show cookie banner
  }, []);

  const handleAcceptCookies = () => {
    setCookiesAccepted(true);
    // Save to localStorage so it persists for future visits
    localStorage.setItem('cookiesAccepted', 'true');
    // Clear the fromLogin flag after accepting cookies
    sessionStorage.removeItem('fromLogin');
  };

  const handleContinueToLogin = () => {
    setCurrentView("login");
  };

  const handleLogin = (username?: string, password?: string) => {
    console.log("Login attempt with:", { username, password });
    // For test purposes, login always works even with empty credentials
    // Set flag to show cookie banner after login
    sessionStorage.setItem('fromLogin', 'true');
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

  const handleNavigateToProfile = () => {
    setCurrentView("profile");
  };

  if (currentView === "login") {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentView === "home") {
    return (
      <>
        {/* Global Cookie Banner - shown over all screens when needed */}
        {!cookiesAccepted && sessionStorage.getItem('fromLogin') === 'true' && (
          <CookieBanner onAccept={handleAcceptCookies} />
        )}
        <HomeScreen
          onNavigateToMensa={handleNavigateToMensa}
          onNavigateToCampusMap={handleNavigateToCampusMap}
          onNavigateToCalendar={handleNavigateToCalendar}
          onNavigateToNews={handleNavigateToNews}
          onNavigateToKurse={handleNavigateToKurse}
          onNavigateToHome={handleNavigateToHome}
          onNavigateToProfile={handleNavigateToProfile}
        />
      </>
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

  if (currentView === "profile") {
    return (
      <ProfileScreen
        onNavigateToHome={handleNavigateToHome}
        onNavigateToMensa={handleNavigateToMensa}
        onNavigateToCalendar={handleNavigateToCalendar}
      />
    );
  }

  // Welcome Screen View (default)
  return (
    <>
      {/* Global Cookie Banner - shown over all screens when needed */}
      {!cookiesAccepted && sessionStorage.getItem('fromLogin') === 'true' && (
        <CookieBanner onAccept={handleAcceptCookies} />
      )}

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
    </>
  );
};

export default App;
