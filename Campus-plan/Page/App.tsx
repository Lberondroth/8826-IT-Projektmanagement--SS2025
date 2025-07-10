import React, { useState } from 'react';
import { Logo } from './components/Logo';
import { Button } from './components/Button';
import { LoginScreen } from './components/LoginScreen';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'login'>('welcome');

  const handleContinueToLogin = () => {
    setCurrentView('login');
  };

  const handleLogin = (username?: string, password?: string) => {
    // In a real application, this would handle authentication.
    console.log("Login attempt with:", { username, password });
    alert(`Login attempt with Username: ${username}`);
    // Example: setCurrentView('dashboard') or handle auth state
  };

  if (currentView === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Welcome Screen View
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
