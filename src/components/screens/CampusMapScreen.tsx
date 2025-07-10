import React, { useEffect, useRef, useState } from "react";
import { Logo } from "../ui/Logo";
import BottomNavigation from "../ui/BottomNavigation";
import type { CampusMapScreenProps } from "../../types";
import "../../styles/campus-map.css";

// Simple Arrow Left Icon Component
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" />
  </svg>
);

declare global {
  interface Window {
    pannellum: any;
  }
}

const CampusMapScreen: React.FC<CampusMapScreenProps> = ({
  onNavigateToHome,
  onNavigateToMensa,
  onNavigateToCalendar,
}) => {
  const panoramaRef = useRef<HTMLDivElement>(null);
  const pannellumViewerRef = useRef<any>(null);
  const [currentScene, setCurrentScene] = useState<string>("haus1eingang");

  useEffect(() => {
    // Load Pannellum CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
    document.head.appendChild(link);

    // Load Pannellum JS
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
    script.onload = () => {
      initializePannellum();
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.head.removeChild(script);
      if (pannellumViewerRef.current) {
        try {
          pannellumViewerRef.current.destroy();
        } catch (e) {
          console.warn("Error destroying pannellum viewer:", e);
        }
      }
    };
  }, []);

  const initializePannellum = () => {
    if (!panoramaRef.current || !window.pannellum) return;

    // Backend data from the original HTML file
    const backendData = {
      viewer_config: {
        default: {
          firstScene: "haus1eingang",
          sceneFadeDuration: 1000,
          hfov: 100,
          yaw: 39,
          pitch: 0,
          autoLoad: true,
        },
        scenes: {
          campusmitte: {
            title: "Campus Mitte",
            hfov: 100,
            pitch: 0,
            yaw: -94,
            type: "equirectangular",
            panorama:
              "/Campus-plan/Bilder/Campusmitte_IMG_20231023_103219_00_124-1.jpg",
            hotSpots: [],
          },
          haus1eingang: {
            title: "Gebäude 01 - Hörsaalzentrum",
            hfov: 100,
            pitch: 0,
            yaw: 39,
            type: "equirectangular",
            panorama:
              "/Campus-plan/Bilder/01-Eingang_IMG_20231023_103432_00_127-1.jpg",
            hotSpots: [],
          },
          haus2eingang: {
            title: "Gebäude 02 - Bibliothek / Usabilitylabor",
            hfov: 100,
            pitch: 0,
            yaw: 103,
            type: "equirectangular",
            panorama:
              "/Campus-plan/Bilder/01-Eingang-aussen_IMG_20231023_095048_00_083-1.jpg",
            hotSpots: [],
          },
          haus2linksusabilitylab: {
            title: "Gebäude 02 - Usabilitylabor Innenansicht",
            hfov: 100,
            pitch: -9,
            yaw: 141,
            type: "equirectangular",
            panorama:
              "/Campus-plan/Bilder/01-Eingang-aussen_IMG_20231023_095048_00_083-1.jpg",
            hotSpots: [],
          },
          haus3eingang: {
            title: "Gebäude 03 - FabLab / AIS Lab",
            hfov: 100,
            pitch: 0,
            yaw: -43,
            type: "equirectangular",
            panorama: "/Campus-plan/Bilder/03_u-FabLab_GS__0079-1.jpg",
            hotSpots: [],
          },
          FabLabEingang: {
            title: "Gebäude 03 - Eingangsbereich",
            hfov: 100,
            pitch: -7,
            yaw: -137,
            type: "equirectangular",
            panorama:
              "/Campus-plan/Bilder/01-Eingang_IMG_20231023_104134_00_130.jpg",
            hotSpots: [],
          },
          AISLabor1: {
            title: "AIS Labor",
            hfov: 100,
            pitch: -1,
            yaw: -28,
            type: "equirectangular",
            panorama:
              "/Campus-plan/Bilder/06_o-AIS-Labor_IMG_20231023_100343_00_096.jpg",
            hotSpots: [],
          },
          haus4eingang: {
            title: "Gebäude 04 - Verwaltung / Mensa",
            hfov: 100,
            pitch: 0,
            yaw: -53,
            type: "equirectangular",
            panorama:
              "/Campus-plan/Bilder/01-Eingang_IMG_20231023_103526_00_128.jpg",
            hotSpots: [],
          },
          GFL07: {
            title: "Gebäude 08 - Green FabLab Aussen",
            hfov: 100,
            pitch: -10,
            yaw: -134,
            type: "equirectangular",
            panorama:
              "/Campus-plan/Bilder/07-Eingang-Green-FabLab_IMG_20231023_105842_00_148.jpg",
            hotSpots: [],
          },
          GFL08: {
            title: "Gebäude 08 - Green FabLab Innen",
            hfov: 100,
            pitch: 0,
            yaw: 11,
            type: "equirectangular",
            panorama: "/Campus-plan/Bilder/08-Green-FabLab_GS__0084.jpg",
            hotSpots: [],
          },
        },
        showControls: true,
        orientationOnByDefault: false,
        draggable: true,
        mouseZoom: true,
        compass: true,
      },
      map_data: {
        pointers: [
          {
            id: "haus1eingang_map_pointer",
            x: "46",
            y: "36",
            label: "Gebäude 01 - Hörsaalzentrum / Bibliothek",
            sceneId: "haus1eingang",
            isCurrent: false,
          },
          {
            id: "campusmitte_map_pointer",
            x: "42.5",
            y: "46.87",
            label: "Campus Mitte",
            sceneId: "campusmitte",
            isCurrent: false,
          },
          {
            id: "haus2eingang_map_pointer",
            x: "59.5",
            y: "44",
            label: "Gebäude 02 - Usabilitylabor",
            sceneId: "haus2eingang",
            isCurrent: false,
          },
          {
            id: "haus2linksusabilitylab_map_pointer",
            x: "53.5",
            y: "44.37",
            label: "Gebäude 02 - Usabilitylabor Innenansicht",
            sceneId: "haus2linksusabilitylab",
            isCurrent: false,
          },
          {
            id: "haus3eingang_map_pointer",
            x: "46.0",
            y: "70",
            label: "Gebäude 03 - FabLab",
            sceneId: "haus3eingang",
            isCurrent: false,
          },
          {
            id: "FabLabEingang_map_pointer",
            x: "40",
            y: "62.5",
            label: "Gebäude 03 - Eingangsbereich",
            sceneId: "FabLabEingang",
            isCurrent: false,
          },
          {
            id: "AISLabor1_map_pointer",
            x: "45.5",
            y: "62.5",
            label: "Gebäude 03 - AIS Labor",
            sceneId: "AISLabor1",
            isCurrent: false,
          },
          {
            id: "haus4eingang_map_pointer",
            x: "34",
            y: "42.81",
            label: "Gebäude 04 - Verwaltung / Mensa",
            sceneId: "haus4eingang",
            isCurrent: false,
          },
          {
            id: "GFL07_map_pointer",
            x: "77",
            y: "86",
            label: "Gebäude 08 - Green FabLab Aussen",
            sceneId: "GFL07",
            isCurrent: false,
          },
          {
            id: "GFL08_map_pointer",
            x: "73.6",
            y: "82",
            label: "Gebäude 08 - Green FabLab Innen",
            sceneId: "GFL08",
            isCurrent: false,
          },
        ],
      },
    };
    try {
      pannellumViewerRef.current = window.pannellum.viewer(
        panoramaRef.current,
        backendData.viewer_config
      );

      // Add scene change listener
      pannellumViewerRef.current.on("scenechange", (sceneId: string) => {
        setCurrentScene(sceneId);
        updateActivePointer(sceneId);
      });

      // Initialize map pointers
      initializeMapPointers(backendData.map_data);
    } catch (error) {
      console.error("Error initializing Pannellum:", error);
    }
  };
  const updateActivePointer = (activeSceneId: string) => {
    const mapContainer = document.getElementById("topDownMapContainer");
    if (!mapContainer) return;

    // Remove 'current' class from all pointers
    const allPointers = mapContainer.querySelectorAll(".map-pointer");
    allPointers.forEach((pointer) => {
      pointer.classList.remove("current");
    });

    // Add 'current' class to the active pointer
    const activePointer = mapContainer.querySelector(
      `[data-scene-id="${activeSceneId}"]`
    );
    if (activePointer) {
      activePointer.classList.add("current");
    }
  };

  const initializeMapPointers = (mapData: any) => {
    const mapContainer = document.getElementById("topDownMapContainer");
    if (!mapContainer) return;

    // Clear existing pointers
    mapContainer.innerHTML = "";
    const createPointer = (pointerData: any, isCurrentEvent = false) => {
      if (!pointerData || pointerData.x === null || pointerData.y === null)
        return;

      const pointer = document.createElement("div");
      pointer.classList.add("map-pointer");
      // Check if this pointer corresponds to the current scene
      if (pointerData.sceneId === currentScene || isCurrentEvent) {
        pointer.classList.add("current");
      }
      pointer.style.left = pointerData.x + "%";
      pointer.style.top = pointerData.y + "%";
      pointer.dataset.sceneId = pointerData.sceneId;
      pointer.dataset.tooltip = pointerData.label; // Add tooltip data attribute

      const label = document.createElement("span");
      label.classList.add("map-pointer-label");
      label.textContent = pointerData.label;
      pointer.appendChild(label);

      pointer.addEventListener("click", () => {
        if (pointerData.sceneId && pannellumViewerRef.current) {
          pannellumViewerRef.current.loadScene(pointerData.sceneId);
          setCurrentScene(pointerData.sceneId);
          updateActivePointer(pointerData.sceneId);
        }
      });

      mapContainer.appendChild(pointer);
    }; // Create all pointers
    mapData.pointers.forEach((pData: any) => createPointer(pData));
  };
  // Function to get current scene title
  const getCurrentSceneTitle = () => {
    const sceneMapping: { [key: string]: string } = {
      campusmitte: "Campus Mitte",
      haus1eingang: "Gebäude 01 - Hörsaalzentrum",
      haus2eingang: "Gebäude 02 - Bibliothek / Usabilitylabor",
      haus2linksusabilitylab: "Gebäude 02 - Usabilitylabor Innenansicht",
      haus3eingang: "Gebäude 03 - FabLab / AIS Lab",
      FabLabEingang: "Gebäude 03 - Eingangsbereich",
      AISLabor1: "AIS Labor",
      haus4eingang: "Gebäude 04 - Verwaltung / Mensa",
      GFL07: "Gebäude 08 - Green FabLab Aussen",
      GFL08: "Gebäude 08 - Green FabLab Innen",
    };
    return sceneMapping[currentScene] || currentScene;
  };

  // Function to get current building number
  const getCurrentBuilding = () => {
    const buildingMapping: { [key: string]: string } = {
      campusmitte: "none",
      haus1eingang: "01",
      haus2eingang: "02",
      haus2linksusabilitylab: "02",
      haus3eingang: "03",
      FabLabEingang: "03",
      AISLabor1: "03",
      haus4eingang: "04",
      GFL07: "08",
      GFL08: "08",
    };
    return buildingMapping[currentScene] || "none";
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased">
      {/* Header */}
      <header className="flex items-center p-4 sm:p-6 md:p-8 bg-slate-50 sticky top-0 z-10 border-b border-slate-200 shadow-sm">
        <button
          onClick={onNavigateToHome}
          className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
          aria-label="Zurück zur Startseite"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
        </button>
        <Logo imgClassName="h-8 sm:h-10 md:h-12 w-auto mr-3 sm:mr-4" />
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
          Campus Navigator
        </h1>
      </header>
      {/* Main Content */}
      <main className="flex-grow flex">
        {/* Left Panel */}
        <div className="w-80 h-full flex flex-col p-4 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Campus-Navigation
          </h2>{" "}
          {/* Map Container */}
          <div
            id="topDownMapContainer"
            className="relative w-full border border-gray-300 rounded-lg mb-5 campus-map-container"
          ></div>
          {/* Event Info */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
              Campus Bereiche:
            </h3>{" "}
            <div className="space-y-2 text-sm text-gray-600">
              <p
                className={
                  getCurrentBuilding() === "01" ? "current-building" : ""
                }
              >
                <strong>Gebäude 01:</strong> Hörsaalzentrum
              </p>
              <p
                className={
                  getCurrentBuilding() === "02" ? "current-building" : ""
                }
              >
                <strong>Gebäude 02:</strong> Bibliothek / Usabilitylabor
              </p>
              <p
                className={
                  getCurrentBuilding() === "03" ? "current-building" : ""
                }
              >
                <strong>Gebäude 03:</strong> FabLab / AIS Lab
              </p>
              <p
                className={
                  getCurrentBuilding() === "04" ? "current-building" : ""
                }
              >
                <strong>Gebäude 04:</strong> Verwaltung / Mensa
              </p>
              <p
                className={
                  getCurrentBuilding() === "08" ? "current-building" : ""
                }
              >
                <strong>Gebäude 08:</strong> Green FabLab
              </p>
            </div>
          </div>
        </div>{" "}
        {/* Panorama Container */}
        <div className="flex-grow relative bg-gray-900">
          <div
            ref={panoramaRef}
            id="panoramaContainer"
            className="w-full h-full"
          ></div>
          {/* Current Scene Display */}
          <div className="current-scene-display">
            {getCurrentSceneTitle()}
          </div>{" "}
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

export default CampusMapScreen;
