import React from "react";

interface CookieBannerProps {
  onAccept: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div className="p-6 text-center">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Cookie-Einstellungen
            </h3>
            <p className="text-sm text-slate-700 mb-2">
              Diese Website verwendet Cookies, um Ihnen das beste Nutzererlebnis zu bieten. 
              Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.
            </p>
            <p className="text-xs text-slate-500">
              We like cookies 🍪
            </p>
          </div>
          <button
            onClick={onAccept}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 w-full"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
