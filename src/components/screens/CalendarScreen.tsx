import React, { useState } from "react";
import { Logo } from "../ui/Logo";
import BottomNavigation from "../ui/BottomNavigation";
import type { CalendarScreenProps } from "../../types";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  type: "klausur" | "vorlesung" | "seminar" | "event";
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({
  onNavigateToHome,
  onNavigateToMensa,
  onNavigateToCalendar,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample events for the current month (June 2025)
  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Projektmanagement Gruppe 4",
      date: "2025-06-26",
      time: "8:15 - 9:45",
      location: "Seminarraum 7",
      type: "vorlesung",
    },
    {
      id: "2",
      title: "Algorithmen und Datenstrukturen",
      date: "2025-06-26",
      time: "10:00 - 11:30",
      location: "PC-Pool 3",
      type: "vorlesung",
    },
    {
      id: "3",
      title: "Lineare Algebra und Operations Research",
      date: "2025-06-27",
      time: "12:15 - 13:45",
      location: "Hörsaal 3",
      type: "vorlesung",
    },
    {
      id: "4",
      title: "Medienkonzeption und -gestaltung",
      date: "2025-06-27",
      time: "17:45 - 19:15",
      location: "digital/online",
      type: "vorlesung",
    },
    {
      id: "5",
      title: "Campus-Festival",
      date: "2025-06-28",
      time: "ganztägig",
      location: "Campus",
      type: "event",
    },
    {
      id: "6",
      title: "Algorithmen und Datenstrukturen Klausur",
      date: "2025-07-07",
      time: "Klausur in Präsenz",
      location: "Prof. Dr. Siebenlist",
      type: "klausur",
    },
    {
      id: "7",
      title: "Projektmanagement Klausur",
      date: "2025-07-15",
      time: "Klausur in Präsenz",
      location: "Prof. Dr. Reintjes",
      type: "klausur",
    },
  ];

  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const dayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

    const days = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };
  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const getShortEventTitle = (title: string) => {
    // Short versions for calendar display only
    if (title.includes("Projektmanagement")) return "PM";
    if (title.includes("Algorithmen und Datenstrukturen")) return "AlguD";
    if (title.includes("Fortgeschrittene Programmierung")) return "FP";
    if (title.includes("Lineare Algebra und Operations Research"))
      return "Mathe II";
    if (title.includes("Medienkonzeption")) return "Medienkonz.";
    return title; // Return full title for other events
  };

  const getEventTypeColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "klausur":
        return "bg-red-100 text-red-800 border-red-200";
      case "vorlesung":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "seminar":
        return "bg-green-100 text-green-800 border-green-200";
      case "event":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const days = getDaysInMonth(currentDate);
  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .slice(0, 4)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
          Kalender
        </h1>
      </header>
      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 max-w-6xl mx-auto w-full space-y-6">
        {/* Calendar Header */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={previousMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Vorheriger Monat"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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

            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>

            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Nächster Monat"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={day ? `day-${day}` : `empty-${index}`}
                className={`min-h-[40px] p-1 text-center text-sm border border-gray-100 ${
                  day ? "bg-white hover:bg-gray-50" : "bg-gray-50"
                } ${
                  day && isToday(day)
                    ? "bg-blue-50 border-blue-200 text-blue-600 font-semibold"
                    : ""
                }`}
              >
                {day && (
                  <>
                    <div className="font-medium">{day}</div>
                    <div className="space-y-1 mt-1">
                      {getEventsForDate(day)
                        .slice(0, 2)
                        .map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs px-1 py-0.5 rounded text-center truncate ${getEventTypeColor(
                              event.type
                            )}`}
                            title={event.title}
                          >
                            {getShortEventTitle(event.title)}
                          </div>
                        ))}
                      {getEventsForDate(day).length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{getEventsForDate(day).length - 2} mehr
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Anstehende Termine
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg border ${getEventTypeColor(
                  event.type
                )}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm mt-1">
                      {new Date(event.date).toLocaleDateString("de-DE", {
                        weekday: "long",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    {event.time && <p className="text-sm">{event.time}</p>}
                    {event.location && (
                      <p className="text-sm">{event.location}</p>
                    )}
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50 capitalize">
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>{" "}
      </main>{" "}
      {/* Bottom Navigation */}
      <BottomNavigation
        currentPage="calendar"
        onNavigateToHome={onNavigateToHome}
        onNavigateToMensa={onNavigateToMensa}
        onNavigateToCalendar={onNavigateToCalendar}
      />
      {/* Spacer for bottom navigation */}
      <div className="h-20 sm:h-24 md:h-28"></div>
    </div>
  );
};

export default CalendarScreen;
