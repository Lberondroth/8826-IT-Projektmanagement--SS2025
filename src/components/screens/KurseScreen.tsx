import React, { useState } from "react";
import { Logo } from "../ui/Logo";
import BottomNavigation from "../ui/BottomNavigation";
import type { KurseScreenProps } from "../../types";

interface CourseModule {
  id: string;
  name: string;
  fullName: string;
  semester: number; // Changed to number for easier comparison
  credits: number;
  lecturer: string;
  type: "vorlesung" | "seminar" | "praktikum" | "projekt";
  description: string;
}

const KurseScreen: React.FC<KurseScreenProps> = ({
  onNavigateToHome,
  onNavigateToMensa,
  onNavigateToCalendar,
}) => {
  const [selectedSemester, setSelectedSemester] = useState<number>(2); // All modules for Medieninformatik program
  const modules: CourseModule[] = [
    {
      id: "8826",
      name: "Projektmanagement",
      fullName: "Projektmanagement",
      semester: 2,
      credits: 5,
      lecturer: "Prof. Dr. Reintjes",
      type: "seminar",
      description:
        "Grundlagen des Projektmanagements, Projektplanung und -durchführung",
    },
    {
      id: "8823",
      name: "Algorithmen und Datenstrukturen",
      fullName: "Algorithmen und Datenstrukturen",
      semester: 2,
      credits: 5,
      lecturer: "Prof. Dr. Siebenlist",
      type: "vorlesung",
      description:
        "Grundlegende Algorithmen und Datenstrukturen der Informatik",
    },
    {
      id: "8821",
      name: "Fortgeschrittene Programmierung",
      fullName: "Fortgeschrittene Programmierung",
      semester: 2,
      credits: 5,
      lecturer: "Hr. Schmidl",
      type: "praktikum",
      description:
        "Vertiefung der Programmierkenntnisse und erweiterte Konzepte",
    },
    {
      id: "8825",
      name: "Lineare Algebra und Operations Research",
      fullName: "Lineare Algebra und Operations Research",
      semester: 2,
      credits: 5,
      lecturer: "Prof. Dr. Zimmer",
      type: "vorlesung",
      description: "Mathematische Grundlagen für die Informatik",
    },
    {
      id: "8524",
      name: "Medienkonzeption und -gestaltung",
      fullName: "Medienkonzeption und -gestaltung",
      semester: 2,
      credits: 5,
      lecturer: "Fr. Bierwolf",
      type: "vorlesung",
      description:
        "Konzeptionelle und gestalterische Grundlagen digitaler Medien",
    },
    {
      id: "8822",
      name: "Technische Informatik",
      fullName: "Technische Informatik",
      semester: 2,
      credits: 5,
      lecturer: "Dr. Maas",
      type: "vorlesung",
      description: "Hardware-nahe Programmierung und Systemarchitektur",
    },
    {
      id: "10241",
      name: "Multimediale Technologien",
      fullName: "Multimediale Technologien",
      semester: 1,
      credits: 5,
      lecturer: "Prof. Dr. Iurgel",
      type: "vorlesung",
      description: "Grundlagen multimedialer Systeme und Technologien",
    },
    {
      id: "85431",
      name: "Digital Media Technologien",
      fullName: "Digital Media Technologien",
      semester: 1,
      credits: 5,
      lecturer: "Prof. Dr. Iurgel",
      type: "vorlesung",
      description: "Digitale Medientechnologien und deren Anwendung",
    },
    {
      id: "106041",
      name: "3D-Modellierung und Animation",
      fullName: "3D-Modellierung und Animation",
      semester: 1,
      credits: 5,
      lecturer: "Dr. Dießenbacher",
      type: "praktikum",
      description: "Erstellung und Animation von 3D-Modellen",
    },
    {
      id: "88251",
      name: "Lineare Algebra und Operations Research",
      fullName: "Lineare Algebra und Operations Research",
      semester: 1,
      credits: 5,
      lecturer: "Prof. Dr. Zimmer",
      type: "vorlesung",
      description: "Mathematische Grundlagen Teil 1",
    },
    {
      id: "106061",
      name: "Innovative Ansätze in der Softwareentwicklung",
      fullName:
        "Innovative Ansätze der Informatik I: Behördliche IT-Strategien",
      semester: 1,
      credits: 5,
      lecturer: "Prof. Dr. Reintjes",
      type: "seminar",
      description: "Moderne Ansätze in der Softwareentwicklung",
    },
    {
      id: "10073",
      name: "Fortgeschrittene Programmierung",
      fullName: "Fortgeschrittene Programmierung",
      semester: 3,
      credits: 5,
      lecturer: "Prof. Dr. Richter",
      type: "praktikum",
      description: "Vertiefung der Programmierkenntnisse",
    },
    {
      id: "88611",
      name: "Innovative Ansätze der Informatik I",
      fullName:
        "Innovative Ansätze der Informatik I: Behördliche IT-Strategien",
      semester: 3,
      credits: 5,
      lecturer: "Prof. Dr. Reintjes",
      type: "seminar",
      description: "Innovative IT-Strategien im behördlichen Umfeld",
    },
    {
      id: "10201",
      name: "Software Engineering",
      fullName: "Software Engineering",
      semester: 3,
      credits: 5,
      lecturer: "Prof. Dr. Richter",
      type: "vorlesung",
      description: "Methoden der Softwareentwicklung",
    },
    {
      id: "88421",
      name: "Software Engineering",
      fullName: "Software Engineering",
      semester: 4,
      credits: 5,
      lecturer: "Prof. Dr. Richter",
      type: "vorlesung",
      description: "Professionelle Softwareentwicklung",
    },
    {
      id: "88411",
      name: "IT-Sicherheit",
      fullName: "IT-Sicherheit",
      semester: 4,
      credits: 5,
      lecturer: "Prof. Dr. Greveler",
      type: "vorlesung",
      description: "Grundlagen der IT-Sicherheit",
    },
    {
      id: "88221",
      name: "Technische Informatik",
      fullName: "Technische Informatik",
      semester: 5,
      credits: 5,
      lecturer: "Dr. Maas",
      type: "vorlesung",
      description: "Hardware und Systemarchitektur",
    },
  ];

  const getModuleTypeColor = (type: CourseModule["type"]) => {
    switch (type) {
      case "vorlesung":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "seminar":
        return "bg-green-50 border-green-200 text-green-800";
      case "praktikum":
        return "bg-purple-50 border-purple-200 text-purple-800";
      case "projekt":
        return "bg-orange-50 border-orange-200 text-orange-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getModuleTypeIcon = (type: CourseModule["type"]) => {
    switch (type) {
      case "vorlesung":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "seminar":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
          </svg>
        );
      case "praktikum":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "projekt":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getModuleTypeLabel = (type: CourseModule["type"]) => {
    switch (type) {
      case "vorlesung":
        return "Vorlesung";
      case "seminar":
        return "Seminar";
      case "praktikum":
        return "Praktikum";
      case "projekt":
        return "Projekt";
      default:
        return "Kurs";
    }
  };
  const getSemesterColor = (semester: number) => {
    if (semester === selectedSemester) {
      return "bg-green-100 text-green-800";
    } else if (semester <= 2) {
      return "bg-blue-100 text-blue-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const getSemesterLabel = (semester: number) => {
    return `${semester}. Semester`;
  };

  // Group modules by semester
  const modulesBySemester = modules.reduce((acc, module) => {
    const semesterLabel = getSemesterLabel(module.semester);
    if (!acc[semesterLabel]) {
      acc[semesterLabel] = [];
    }
    acc[semesterLabel].push(module);
    return acc;
  }, {} as Record<string, CourseModule[]>);

  // Get available semesters for selector
  const availableSemesters = Array.from(
    new Set(modules.map((m) => m.semester))
  ).sort((a, b) => a - b);

  const openMoodlePortal = () => {
    window.open(
      "https://sso.hochschule-rhein-waal.de/idp/profile/SAML2/Redirect/SSO?execution=e1s1#module-365853",
      "_blank"
    );
  };

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
          Kurse
        </h1>
      </header>{" "}
      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 max-w-6xl mx-auto w-full">
        {/* Semester Selector */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Aktuelles Semester
              </h2>
              <p className="text-gray-600">
                Wählen Sie das Semester aus, das als aktuell angezeigt werden
                soll
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="semester-select"
                className="text-sm font-medium text-gray-700"
              >
                Semester:
              </label>
              <select
                id="semester-select"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {availableSemesters.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}. Semester
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Quick Access to Moodle */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Moodle Portal
              </h2>
              <p className="text-gray-600">
                Direkter Zugang zu allen Kursmaterialien und Online-Inhalten
              </p>
            </div>
            <button
              onClick={openMoodlePortal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span>Zu Moodle</span>
            </button>
          </div>
        </div>
        {/* Module Overview by Semester */}{" "}
        <div className="space-y-6">
          {Object.entries(modulesBySemester)
            .sort(([a], [b]) => {
              // Sort semesters: current semester first, then by number
              const semA = parseInt(a.split(".")[0]);
              const semB = parseInt(b.split(".")[0]);

              if (semA === selectedSemester) return -1;
              if (semB === selectedSemester) return 1;

              return semA - semB;
            })
            .map(([semester, semesterModules]) => (
              <section
                key={semester}
                className="bg-white rounded-xl shadow-md p-4 sm:p-6"
              >
                {" "}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {semester}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getSemesterColor(
                      semesterModules[0].semester
                    )}`}
                  >
                    {semesterModules.length} Module
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {semesterModules.map((module) => (
                    <div
                      key={module.id}
                      className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${getModuleTypeColor(
                        module.type
                      )}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getModuleTypeIcon(module.type)}
                          <span className="text-sm font-medium">
                            {getModuleTypeLabel(module.type)}
                          </span>
                        </div>
                        <span className="text-xs font-medium bg-white bg-opacity-50 px-2 py-1 rounded">
                          {module.credits} ECTS
                        </span>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-1">
                        {module.name}
                      </h3>

                      <p className="text-sm text-gray-700 mb-2">
                        {module.lecturer}
                      </p>

                      <p className="text-xs text-gray-600 mb-3">
                        {module.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Modul {module.id}
                        </span>
                        <button
                          onClick={openMoodlePortal}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center space-x-1"
                        >
                          <span>Zu Moodle</span>
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>{" "}
              </section>
            ))}
        </div>{" "}
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

export default KurseScreen;
