- **HSRW Markenfarben** und professionelles Styling
- **Barrierefreiheit** mit ARIA-Labels

### 🏗️ **Technische Exzellenz**
### 🌟 **Erweiterte Features**

- **🍪 GDPR-Compliance** - Cookie-Banner mit benutzerfreundlicher Zustimmung
- **🧭 Bottom-Navigation** - Mobile-optimierte Haupt-Navigation mit Touch-Feedback
- **📱 Progressive Responsive Design** - Mobile-First mit Tablet- und Desktop-Optimierung
- **🎯 Tooltip-System** - Interaktive Hilfestellungen in der Campus-Navigation
- **⚡ Scene-Management** - Dynamisches Laden und Wechseln zwischen 360°-Ansichten
- **🔄 Auto-Scroll** - Chat-Verlauf scrollt automatisch zu neuen Nachrichten
- **🎨 Hover-States** - Professionelle UI-Animationen für alle interaktiven Elemente

- **TypeScript** für Typsicherheit und bessere Entwicklererfahrung
- **React 19** mit modernen Hooks und Komponentenarchitektur
@@ -39,25 +47,34 @@ Eine moderne, responsive Webanwendung für Studierende der **Hochschule Rhein-Wa

### Automatische Installation & Start

**Option 1: Einfache Batch-Datei (empfohlen)**
### Automatische Installation & Start

**Option 1: Windows Batch-Datei (empfohlen für Windows)**

```cmd
# Doppelklick auf start-app.bat oder:
start-app.bat
```

**Option 2: Kommandozeile**
**Option 2: PowerShell-Script (erweiterte Windows-Funktionalität)**

```powershell
# Farbkodierte Ausgabe und detaillierte Informationen:
start-app.ps1
```

**Option 3: Plattformübergreifende Kommandozeile**

```bash
# Alles in einem Befehl starten
# Ein-Befehl-Start für alle Plattformen
npm run dev
```

Das war's! Beide Befehle starten automatisch:
Das war's! Alle drei Optionen starten automatisch:

- ✅ Frontend (Vite Dev Server)
- ✅ Backend (Flask API Server)
- ✅ Hatty Chatbot (Browser-basiert)
- ✅ **Frontend** (Vite Dev Server) auf http://localhost:5173
- ✅ **Backend** (Flask API Server) auf http://localhost:5000  
- ✅ **Hatty Chatbot** (Browser-basiert mit Auto-Launch)

### URLs nach dem Start

@@ -114,38 +131,106 @@ Dieser einzelne Befehl startet automatisch:
- 📅 **Stundenplan** - Stundenplan mit Übersicht
- 📰 **News** - Universitätsnachrichten
- 🔔 **Kalender** - Kalender mit aktuellen Events
- 🗺️ **Campus-Navigator** - Interaktive 360° Campus-Karte
- 🗺️ **Campus-Navigator** - Interaktive 360° Campus-Karte mit Panorama-Ansichten und Raumfinder
- 🌐 **Hatty** - Hochschul-Chatbot

## 🗺️ Campus Navigator - Erweiterte Features

### **360° Panorama-Navigation**

Das Campus-Navigator System bietet eine immersive 360° Erkundung des HSRW Campus:

- **🏢 Interaktive Gebäude-Ansichten** - Hochauflösende Panorama-Bilder von jedem Campus-Gebäude
- **🎯 Präzise Hotspot-Navigation** - Klickbare Bereiche für nahtlose Szenenübergänge
- **📍 Intelligente Karten-Pointer** - Visuelle Campus-Karte mit klickbaren Gebäude-Markierungen
- **🎮 Intuitive Steuerung** - Maus/Touch-Navigation mit Zoom und Orientierung

### **Raumfinder-System**

Intelligente Raumerkennung und -zuordnung für Stundenplan-Integration:

- **🔍 Automatische Raumanalyse** - Verarbeitung verschiedener Raumformaten (GSR-Nummer, Komma-separiert)
- **📱 Online/TBA-Behandlung** - Spezielle Anzeige für digitale und noch unbestimmte Räume
- **🏗️ Gebäude-Mapping** - Automatische Zuordnung von Räumen zu Campus-Gebäuden
- **📊 Echtzeit-Terminintegration** - Direkte Verbindung zum Stundenplan-System

### **Intelligente Raumerkennung**

```python
# Beispiel der erweiterten Raumanalyse-Logik
def _parse_raum_detail(self, raum_string_original):
    """
    Unterstützt verschiedene HSRW-Raumformate:
    - Numerisch (GSR): "0100001" → Gebäude 01, Stock 00, Raum 001
    - Komma-separiert: "01, 00, 001" 
    - Online-Kurse: "digital/online" → Keine Campus-Ansicht
    - TBA-Räume: "tba" (To Be Announced) → Fallback-Darstellung
    """
```

**Features des Room-Parsing-Systems:**
- 🏢 **Gebäude-Zuordnung** - Automatische Erkennung des Campus-Gebäudes
- 📊 **Stock-Identifikation** - Präzise Stockwerk-Zuordnung für Navigation  
- 🎯 **Raum-Lokalisation** - Exakte Raumnummer-Extraktion
- 🌐 **Online-Behandlung** - Spezielle Logik für digitale Veranstaltungen
- ⏳ **TBA-Management** - Elegante Behandlung noch unbestimmter Räume

### **Gebäude-Datenbank**

Umfassende Campus-Abdeckung mit detaillierten Gebäudeinformationen:

- **Gebäude 01** - Hörsaalzentrum (Haupteingang und Innenansichten)
- **Gebäude 02** - Bibliothek und Usability-Labor
- **Gebäude 03** - FabLab und AIS-Labor  
- **Gebäude 08** - Green FabLab (Außen- und Innenbereich)
- **Campus Mitte** - Zentrale Übersichts-Perspektive


## 🛠️ Technische Architektur

### **Frontend (React + TypeScript)**

```
src/
├── components/
│   ├── icons/          # SVG-Icon-Komponenten
│   ├── screens/        # Seitenebene-Komponenten
│   ├── icons/          # SVG-Icon-Komponenten (10+ Icons)
│   ├── screens/        # Seitenebene-Komponenten (7 Hauptscreens)
│   └── ui/             # Wiederverwendbare UI-Komponenten
├── services/           # API-Integrationsschicht
├── services/           # API-Integrationsschicht (ApiService, hattyService)
├── styles/             # Tailwind CSS-Konfiguration
└── types/              # TypeScript-Definitionen
├── types/              # TypeScript-Definitionen
└── assets/             # Bilder und statische Ressourcen
```

### **Backend (Flask + Python)**

```
backend/
├── app.py             # Haupt-Flask-Anwendung
└── requirements.txt   # Python-Abhängigkeiten
├── app.py                    # Haupt-Flask-Anwendung mit farbigem Logging
├── hatty_gemini.py          # Hatty-Chatbot Integration
├── requirements.txt         # Python-Abhängigkeiten
└── test_*.py               # Umfassende Test-Suite für alle Features
```

### **Campus-Plan System**

```
Campus-plan/
├── interactiveMap.py        # Stundenplan-Manager und Gebäude-Mapping
├── interactive_map_2025.html # 360° Panorama-Viewer (Pannellum.js)
├── Bilder/                  # Hochauflösende Panorama-Bilder
└── Page/                    # Zusätzliche Kartenressourcen
```

### **Schlüsseltechnologien**

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Flask, Python, BeautifulSoup (Web-Scraping)
- **Build**: Vite mit PostCSS und Tailwind
- **Entwicklung**: Concurrently für Auto-Start-Workflow
- **Frontend**: React 19, TypeScript, Tailwind CSS 4.1, Vite 6.x
- **Backend**: Flask, Python 3.8+, BeautifulSoup4 (Web-Scraping), CORS
- **3D/Panorama**: Pannellum.js für 360° Campus-Navigation
- **AI-Integration**: Hatty Chatbot (Browser-automatisiert, Google AI Studio)
- **Build-Tools**: Vite mit PostCSS, Autoprefixer, Tailwind-Compiler
- **Entwicklung**: Concurrently für parallelen Frontend/Backend-Start
- **Logging**: Farb-kodiertes Python-Logging-System für besseres Debugging

## 🎯 Mensa-Integration Details

@@ -157,65 +242,150 @@ backend/

### **API-Endpunkte**

### **API-Endpunkte**

Das Backend bietet folgende REST-API-Endpunkte:

```http
GET /api/mensa    # Aktuelle Menüdaten abrufen
GET /api/health   # Backend-Gesundheitsprüfung
# Mensa-Integration
GET  /api/mensa          # Aktuelle Menüdaten mit Echtzeit-Scraping
GET  /api/health         # Backend-Gesundheitsprüfung

# Hatty Chatbot
POST /api/hatty/chat     # Chat mit Hatty Bot (JSON: {message: string})
GET  /api/hatty/status   # Bot-Status und Verfügbarkeit prüfen
```

### **Beispiel-Antwort**
### **Erweiterte API-Antwortformate**

**Mensa API Response:**
```json
{
"date": "10.06.2025",
  "day": "Dienstag",
  "day": "Dienstag", 
  "lastUpdated": "2025-06-10T10:30:00.123Z",
"items": [
{
"title": "Essen I",
"description": ["Pasta (20a)", "Sauce bolognaise [R] (22)"],
      "price": "1,50 €"
      "price": "1,50 €",
      "image": "https://example.com/menu-image.jpg"
}
]
}
```

**Hatty Chat Response:**
```json
{
  "response": "Das heutige Mensamenü enthält...",
  "status": "success",
  "timestamp": "2025-06-10T10:30:00.123Z"
}
```

## 🧩 Komponentenarchitektur

### **Bildschirm-Komponenten**
### **Bildschirm-Komponenten (7 Hauptscreens)**

- `HomeScreen.tsx` - Haupt-Dashboard mit Service-Raster
- `HomeScreen.tsx` - Haupt-Dashboard mit Service-Raster und Navigation
- `LoginScreen.tsx` - Benutzerauthentifizierungs-Oberfläche
- `MensaScreen.tsx` - Live-Menü-Anzeige mit Ladezuständen
- `MensaScreen.tsx` - Live-Menü-Anzeige mit Echtzeit-Scraping
- `CampusMapScreen.tsx` - 360° Panorama-Navigation und Gebäude-Exploration
- `NewsScreen.tsx` - Universitätsnachrichten mit Prioritäts-System
- `CalendarScreen.tsx` - Kalender mit Event-Management
- `KurseScreen.tsx` - Kursverwaltung und Stundenplan-Integration

### **UI-Komponenten**
### **UI-Komponenten (9 Wiederverwendbare Komponenten)**

- `Button.tsx` - Erweiterte Schaltfläche mit Hover-Effekten
- `LoadingSpinner.tsx` - Animierter Ladeindikator
- `Button.tsx` - Erweiterte Schaltfläche mit Hover-Effekten und Varianten
- `LoadingSpinner.tsx` - Animierter Ladeindikator mit Smooth-Rotation
- `ErrorMessage.tsx` - Fehleranzeige mit Wiederholungsfunktion
- `LogoImage.tsx` - Responsive HSRW-Logo-Komponente
- `HattyChatbot.tsx` - Integrierter AI-Chatbot mit Echtzeitfeedback
- `BottomNavigation.tsx` - Mobile-optimierte Haupt-Navigation
- `StundenplanModal.tsx` - Modal für Stundenplan-Details
- `CookieBanner.tsx` - GDPR-konforme Cookie-Zustimmung
- `Logo.tsx` - Zusätzliche Logo-Darstellungskomponente

### **Icon-System (10 Skalierbare SVG-Icons)**

- `HouseIcon`, `UtensilsIcon`, `UserIcon`, `BookOpenIcon`, `NewspaperIcon`
- `CalendarDaysIcon`, `MapMarkerAltIcon`, `BullhornIcon`, `ArrowLeftIcon`
- `IconProps.tsx` - Konsistente TypeScript-Interfaces für alle Icons
- Skalierbar, barrierefrei und performant-optimiert

## 📰 Intelligentes News-System

### **Icon-System**
### **Kategorisierte Universitätsnachrichten**

- `HouseIcon`, `UtensilsIcon`, `UserIcon` etc.
- Konsistente SVG-Icons mit TypeScript-Interfaces
- Skalierbar und barrierefrei
Das News-System bietet eine strukturierte Informationsverteilung mit intelligenter Priorisierung:

- **🔴 Klausur-Nachrichten** - Wichtige Termine und Prüfungsinfos (Priorität: Hoch)
- **📅 Deadline-Benachrichtigungen** - Anmeldefristen und wichtige Termine (Priorität: Hoch) 
- **🎉 Campus-Events** - Veranstaltungen und Aktivitäten (Priorität: Mittel)
- **📢 Allgemeine Ankündigungen** - Universitätsnachrichten (Priorität: Niedrig-Mittel)

### **TypeScript-Interface für News-Management**

```typescript
interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "klausur" | "deadline" | "event" | "announcement";
  priority: "high" | "medium" | "low";
}
```

### **Beispiel-Nachrichten aus dem System**

- **Klausurtermine Sommersemester 2025 veröffentlicht** (Priorität: Hoch)
- **Campus-Festival am 28. Juni 2025** (Event, Priorität: Mittel)
- **Anmeldung für Wahlpflichtfächer bis 30. Juni** (Deadline, Priorität: Hoch)
- **Bibliothek: Erweiterte Öffnungszeiten in der Klausurphase** (Ankündigung)

## 🤖 Hatty Chatbot Integration

### **Browser-basierte KI ohne API-Schlüssel**

Das CampusHub System integriert den **Hatty Chatbot** - einen intelligenten Universitätsassistenten, der automatisch mit dem Backend startet:
Das CampusHub System integriert den **Hatty Chatbot** - einen intelligenten Universitätsassistenten:

- ✅ **Keine API-Schlüssel erforderlich** - nutzt Browser-Automation mit Google AI Studio
- ✅ **Automatischer Start** - Browser wird beim Backend-Start geöffnet
- ✅ **Echtzeit-Kommunikation** - Direkte Integration in die App-Oberfläche
- ✅ **Keine API-Schlüssel erforderlich** - Browser-Automation mit Google AI Studio
- ✅ **Automatischer Start** - Browser wird beim Backend-Start geöffnet  
- ✅ **Echtzeit-Kommunikation** - React-Integration mit TypeScript-Interfaces
- ✅ **Persistente Chat-Historie** - Nachrichtenverlauf mit Zeitstempel
- ✅ **Universitätsspezifisch** - Optimiert für HSRW-Themen und Studentenfragen

### **Hatty Features**
### **React-Integration mit TypeScript**

```typescript
interface HattyMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Hatty Service für API-Kommunikation
const sendMessage = async (message: string) => {
  const response = await fetch("/api/hatty/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return response.json();
};
```

### **Erweiterte Features**

- 🎓 **Universitätsfragen** - Informationen zu Kursen, Campus, Services
- 📚 **Akademische Unterstützung** - Hilfe bei Studium und Universitätsleben
- 🍽️ **Mensa-Integration** - Fragen zum aktuellen Menü und Essenszeiten
- 🎓 **Universitätsfragen** - Kurse, Campus, Services, Stundenplan
- 📚 **Akademische Unterstützung** - Studium und Universitätsleben
- 🍽️ **Mensa-Integration** - Aktuelles Menü und Essenszeiten
- 🗺️ **Campus-Navigation** - Wegbeschreibungen und Raumfindung
- 💬 **Persistente Chats** - Nahtlose Gesprächsverläufe mit Scroll-to-Bottom

### **API-Endpunkte**

@@ -285,50 +455,53 @@ npm run preview         # Produktions-Build Vorschau

## 🏆 Haupterfolge

### ✅ **Code-Organisation**
### ✅ **Code-Organisation & Architektur**

- **Refaktorierung** der gesamten Codebasis mit logischer Struktur
- **17+ neue Komponenten** mit ordnungsgemäßen TypeScript-Interfaces
- **Eliminierung von Code-Duplikation** und Legacy-Dateien
- **Zentralisierung** von API-Services und Typdefinitionen
- **Vollständige Refaktorierung** - Logische TypeScript-Komponentenstruktur
- **30+ professionelle Komponenten** - Icons, Screens, UI-Komponenten mit Interfaces
- **Zero-Legacy-Code** - Eliminierung von Code-Duplikation und veralteten Dateien
- **Service-Layer-Architektur** - Zentralisierte API-Services und Typdefinitionen
- **Modulare Entwicklung** - Wiederverwendbare Komponenten für alle Screens

### ✅ **Responsive Design**
### ✅ **360° Campus-Experience**

- **Mobile-First-Ansatz** mit Tailwind-Breakpoints
- **Touch-freundliche Oberfläche** mit ordnungsgemäßen Zielgrößen
- **Flüssige Animationen** für professionelle Benutzererfahrung
- **Barrierefreiheits-Compliance** mit ARIA-Labels
- **Immersive Navigation** - Pannellum.js-basierte 360° Panorama-Ansichten
- **Intelligente Raumfindung** - Automatisches Parsing verschiedener Raumformate  
- **Interactive Hotspots** - Klickbare Campus-Karte mit Echtzeit-Szenen-Wechsel
- **Gebäude-Mapping** - Vollständige HSRW-Campus-Abdeckung mit 5+ Gebäuden

### ✅ **Backend-Verbesserung**
### ✅ **Backend-Engineering**

- **Farbiges Logging-System** für besseres Debugging
- **Echtzeit-Daten-Scraping** von der Universitäts-Website
- **Umfassende Fehlerbehandlung** und API-Antworten
- **CORS aktiviert** für nahtlose Frontend-Integration
- **Production-Ready Logging** - Farbkodiertes System für alle Entwicklungsphasen
- **Robustes Web-Scraping** - Fehlertolerante STW-D Mensa-Integration
- **RESTful API-Design** - 4 dokumentierte Endpoints mit JSON-Response-Standards
- **Browser-AI-Integration** - Hatty-Chatbot ohne externe API-Dependencies

### ✅ **Entwicklererfahrung**
### ✅ **Frontend-Excellence**

- **Ein-Befehl-Start** mit `npm run dev`
- **Null TypeScript-Fehler** im Produktions-Build
- **Farbkodierte Terminal-Ausgabe** für einfaches Debugging
- **Hot Reload** für Frontend und Backend
- **React 19 + TypeScript** - Moderne Hook-Architektur mit vollständiger Typsicherheit
- **Tailwind 4.1 Design-System** - HSRW-Markenkonformes UI mit responsiver Skalierung
- **Performance-Optimiert** - 1.13s Build-Zeit, 73.35kB gzipped Bundle
- **Accessibility-First** - ARIA-Labels, Touch-Targets, Kontrast-Compliance

## 📊 Leistungsmetriken

- **Build-Zeit**: < 1 Sekunde (985ms)
- **Bundle-Größe**: 201.40 kB (gzipped: 63.10 kB)
- **Build-Zeit**: ~1.13 Sekunden
- **Bundle-Größe**: 255.33 kB (gzipped: 73.35 kB)
- **API-Antwort**: Unter-Sekunden Mensa-Daten-Abruf
- **TypeScript**: Null Kompilierungsfehler
- **Lighthouse-Score**: Optimiert für Leistung und Barrierefreiheit

## 🌟 Zukünftige Verbesserungen

- 🔐 **Authentifizierungssystem** mit Universitätszugangsdaten
- 📱 **Progressive Web App** (PWA) Fähigkeiten
- 🔔 **Push-Benachrichtigungen** für Menü-Updates
- 📊 **Analytics-Dashboard** für Nutzungsverfolgung
- 🌐 **Mehrsprachige Unterstützung** (Deutsch/Englisch)
- 🗓️ **Kalender-Integration** für Kurspläne
- 🔐 **Benutzer-Authentifizierung** - Login-Integration mit HSRW-Zugangsdaten
- 📱 **Progressive Web App** (PWA) - Offline-Funktionalität und App-Installation
- 🔔 **Push-Benachrichtigungen** - Echtzeitbenachrichtigungen für Neuigkeiten und Mensa-Updates
- 🌐 **Mehrsprachige Unterstützung** - Deutsch/Englisch Toggle für internationale Studierende
- 🗓️ **Kalendar-Synchronisation** - Integration mit externen Kalender-Apps
- 📊 **Analytics & Insights** - Nutzungsstatistiken für Campus-Services
- 🔍 **Erweiterte Suche** - Globale Suchfunktion über alle App-Bereiche  
- 🎨 **Theming-System** - Dunkler Modus und anpassbare UI-Themes

## 🤝 Mitwirken
