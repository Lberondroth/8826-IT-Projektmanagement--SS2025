import React, { useState, useEffect } from "react";
import { LogoImage } from "../ui/LogoImage";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorMessage } from "../ui/ErrorMessage";
import BottomNavigation from "../ui/BottomNavigation";
import { ApiService } from "../../services/ApiService";
import type { MenuItem, MensaScreenProps } from "../../types";
import mensaLogo from "../../assets/mensa_logo.png";

const MensaScreen: React.FC<MensaScreenProps> = ({
  onNavigateToHome,
  onNavigateToMensa,
  onNavigateToCalendar,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const loadMensaData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await ApiService.getMensaData();
        setMenuItems(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Ein unbekannter Fehler ist aufgetreten"
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadMensaData();
  }, []);

  const handleRetry = () => {
    const loadMensaData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await ApiService.getMensaData();
        setMenuItems(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Ein unbekannter Fehler ist aufgetreten"
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadMensaData();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased">
      {/* Header */}
      <header className="flex items-center p-4 sm:p-6 bg-slate-50 sticky top-0 z-10 border-b border-slate-200 shadow-sm">
        <LogoImage
          src={mensaLogo}
          alt="Mensa"
          className="h-8 sm:h-10 w-auto mr-4"
        />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Mensa
        </h1>
      </header>
      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 max-w-4xl mx-auto w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <LoadingSpinner size="lg" className="mb-6" />
            <p className="text-lg sm:text-xl text-gray-600 font-medium">
              Lade Mensa-Daten...
            </p>
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {menuItems.map((item, index) => (
              <div
                key={`menu-item-${item.title
                  .replace(/\s+/g, "-")
                  .toLowerCase()}-${index}`}
                className="bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-blue-600 mb-3">
                      {item.title}
                    </h3>
                    <div className="space-y-2">
                      {item.description.map((desc, descIndex) => (
                        <p
                          key={`${desc.substring(0, 15)}-${descIndex}`}
                          className="text-sm sm:text-base text-gray-700 leading-relaxed"
                        >
                          {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                  {item.price && (
                    <div className="flex-shrink-0 text-right">
                      <span className="inline-block bg-green-100 text-green-800 text-lg sm:text-xl font-bold px-3 py-1 rounded-lg">
                        {item.price}
                      </span>
                    </div>
                  )}
                </div>
                {item.image && (
                  <div className="mt-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 sm:h-48 object-cover rounded-xl shadow-sm"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

            {menuItems.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium">
                  Heute sind keine Menüs verfügbar.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Schauen Sie später wieder vorbei.
                </p>
              </div>
            )}
          </div>
        )}
      </main>{" "}
      {/* Spacer for bottom navigation */}
      <div className="h-20 sm:h-24"></div> {/* Bottom Navigation */}
      <BottomNavigation
        currentPage="mensa"
        onNavigateToHome={onNavigateToHome}
        onNavigateToMensa={onNavigateToMensa}
        onNavigateToCalendar={onNavigateToCalendar}
      />
    </div>
  );
};

export default MensaScreen;
