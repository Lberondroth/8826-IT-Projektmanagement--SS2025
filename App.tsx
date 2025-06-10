import React, { useState } from 'react';
import { Logo } from './components/Logo';
import { Button } from './components/Button';
import { LoginScreen } from './components/LoginScreen';
import HomeScreen from './components/HomeScreen'; // Import the new HomeScreen

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'login' | 'home'>('welcome');

  const handleContinueToLogin = () => {
    setCurrentView('login');
  };

  const handleLogin = (username?: string, password?: string) => {
    console.log("Login attempt with:", { username, password });
    // For test purposes, login always works even with empty credentials
    setCurrentView('home');
  };

  if (currentView === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentView === 'home') {
    return <HomeScreen />;
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