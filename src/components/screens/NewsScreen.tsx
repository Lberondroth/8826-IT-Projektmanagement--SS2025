import React from "react";
import { Logo } from "../ui/Logo";
import BottomNavigation from "../ui/BottomNavigation";
import type { NewsScreenProps } from "../../types";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "klausur" | "deadline" | "event" | "announcement";
  priority: "high" | "medium" | "low";
}

const NewsScreen: React.FC<NewsScreenProps> = ({
  onNavigateToHome,
  onNavigateToMensa,
  onNavigateToCalendar,
}) => {
  // Important news items - only announcements, no weekly modules
  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "Klausurtermine Sommersemester 2025 veröffentlicht",
      content:
        "Die Termine für alle Klausuren des Sommersemesters 2025 sind jetzt online verfügbar. Bitte überprüfen Sie Ihre Termine und melden Sie sich rechtzeitig an.",
      date: "2025-06-20",
      type: "klausur",
      priority: "high",
    },
    {
      id: "2",
      title: "Campus-Festival am 28. Juni 2025",
      content:
        "Das jährliche Campus-Festival findet am 28. Juni ganztägig auf dem Campus statt. Alle Studierenden sind herzlich eingeladen! Es gibt Musik, Food-Trucks und verschiedene Aktivitäten.",
      date: "2025-06-18",
      type: "event",
      priority: "medium",
    },
    {
      id: "3",
      title: "Anmeldung für Wahlpflichtfächer bis 30. Juni",
      content:
        "Die Anmeldung für Wahlpflichtfächer des nächsten Semesters läuft bis zum 30. Juni 2025. Verpassen Sie nicht die Deadline!",
      date: "2025-06-15",
      type: "deadline",
      priority: "high",
    },
    {
      id: "4",
      title: "Bibliothek: Erweiterte Öffnungszeiten in der Klausurphase",
      content:
        "Während der Klausurphase (1. Juli - 31. Juli) hat die Bibliothek erweiterte Öffnungszeiten: Montag-Sonntag 7:00-24:00 Uhr.",
      date: "2025-06-12",
      type: "announcement",
      priority: "medium",
    },
    {
      id: "5",
      title: "IT-Support: Wartungsarbeiten am 2. Juli",
      content:
        "Am 2. Juli zwischen 8:00-12:00 Uhr finden Wartungsarbeiten am IT-System statt. Moodle und andere Online-Dienste können zeitweise nicht verfügbar sein.",
      date: "2025-06-10",
      type: "announcement",
      priority: "medium",
    },
    {
      id: "6",
      title: "Studienberatung: Zusätzliche Sprechstunden",
      content:
        "Aufgrund der hohen Nachfrage bietet die Studienberatung zusätzliche Sprechstunden montags 14:00-16:00 Uhr an. Terminvereinbarung erforderlich.",
      date: "2025-06-08",
      type: "announcement",
      priority: "low",
    },
  ];

  const getNewsTypeColor = (type: NewsItem["type"]) => {
    switch (type) {
      case "klausur":
        return "bg-red-50 border-red-200 text-red-800";
      case "deadline":
        return "bg-orange-50 border-orange-200 text-orange-800";
      case "event":
        return "bg-purple-50 border-purple-200 text-purple-800";
      case "announcement":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getNewsTypeIcon = (type: NewsItem["type"]) => {
    switch (type) {
      case "klausur":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm2 0a1 1 0 100 2h.01a1 1 0 100-2H11z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "deadline":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "event":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "announcement":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getNewsTypeLabel = (type: NewsItem["type"]) => {
    switch (type) {
      case "klausur":
        return "Klausur";
      case "deadline":
        return "Deadline";
      case "event":
        return "Event";
      case "announcement":
        return "Ankündigung";
      default:
        return "News";
    }
  };

  const getPriorityBadge = (priority: NewsItem["priority"]) => {
    switch (priority) {
      case "high":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Wichtig
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Normal
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Info
          </span>
        );
      default:
        return null;
    }
  };
  // Sort news by priority and date
  const sortedNews = [...newsItems].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased">
      {/* Header */}
      <header className="flex items-center p-4 sm:p-6 md:p-8 bg-white sticky top-0 z-10 border-b border-slate-200 shadow-sm">
        <button
          onClick={onNavigateToHome}
          className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Zurück zur Startseite"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <Logo imgClassName="h-8 sm:h-10 md:h-12 w-auto mr-3 sm:mr-4" />
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
          News
        </h1>
      </header>
      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {sortedNews.map((news) => (
            <article
              key={news.id}
              className={`p-4 sm:p-6 rounded-xl border-2 shadow-sm hover:shadow-md transition-shadow ${getNewsTypeColor(
                news.type
              )}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getNewsTypeIcon(news.type)}
                  <span className="text-sm font-medium capitalize">
                    {getNewsTypeLabel(news.type)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {getPriorityBadge(news.priority)}
                  <time className="text-sm text-gray-600">
                    {new Date(news.date).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                {news.title}
              </h2>

              <p className="text-gray-700 leading-relaxed">{news.content}</p>
            </article>
          ))}
        </div>
        {/* Empty state if no news */}
        {sortedNews.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Keine News verfügbar
            </h3>
            <p className="text-gray-600">
              Aktuell gibt es keine wichtigen Ankündigungen.
            </p>
          </div>
        )}{" "}
      </main>{" "}
      {/* Bottom Navigation */}
      <BottomNavigation
        currentPage="home"
        onNavigateToHome={onNavigateToHome}
        onNavigateToMensa={onNavigateToMensa}
        onNavigateToCalendar={onNavigateToCalendar}
      />
      {/* Spacer for bottom navigation */}
      <div className="h-20 sm:h-24 md:h-28"></div>
    </div>
  );
};

export default NewsScreen;
