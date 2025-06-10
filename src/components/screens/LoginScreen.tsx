import React, { useState } from "react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import type { LoginScreenProps } from "../../types";

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans antialiased">
      <div className="w-full max-w-xs space-y-8">
        <div className="flex justify-center">
          {/* Using imgClassName to control the size of the logo image */}
          <Logo imgClassName="h-16 w-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="sr-only">
              Benutzername
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Benutzername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Benutzername"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Passwort"
            />
          </div>

          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
