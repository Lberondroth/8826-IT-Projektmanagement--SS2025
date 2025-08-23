# 🎓 HSRW Universitäts-App

Eine moderne, responsive Webanwendung für Studierende der **Hochschule Rhein-Waal (HSRW)** mit Echtzeit-Mensa-Integration und Universitätsdiensten.

![HSRW Logo](src/assets/HSRW_logo.png)

## ✨ Features

### 🍽️ **Echtzeit-Mensa-Integration**

- **Live-Menüdaten** von der offiziellen STW-D Website
- **Tägliche Menü-Updates** mit Preisen und Beschreibungen
- **Responsive Design** optimiert für Handy und Desktop
- **Ladezustände** und Fehlerbehandlung für nahtlose UX

### 🎨 **Moderne UI/UX**

- **Mobile-First responsive Design** mit Tailwind CSS
- **Flüssige Animationen** und Hover-Effekte
- **Touch-freundliche Oberfläche** (44px minimale Touch-Ziele)
- **HSRW Markenfarben** und professionelles Styling
- **Barrierefreiheit** mit ARIA-Labels

### 🏗️ **Technische Exzellenz**

- **TypeScript** für Typsicherheit und bessere Entwicklererfahrung
- **React 19** mit modernen Hooks und Komponentenarchitektur
- **Flask Backend** mit farbigem Logging-System
- **Echtzeit Web-Scraping** für Live-Universitätsdaten
- **Modulare Komponentenstruktur** für Wartbarkeit

## 🚀 Schnellstart

### Voraussetzungen

- **Node.js** 18+ und npm
- **Python** 3.8+ mit pip
- Moderner Webbrowser (für Hatty Chatbot)

### Automatische Installation & Start

**Option 1: Einfache Batch-Datei (empfohlen)**

```cmd
# Doppelklick auf start-app.bat oder:
start-app.bat
```

**Option 2: Kommandozeile**

```bash
# Alles in einem Befehl starten
npm run dev
```

Das war's! Beide Befehle starten automatisch:

- ✅ Frontend (Vite Dev Server)
- ✅ Backend (Flask API Server)
- ✅ Hatty Chatbot (Browser-basiert)

### URLs nach dem Start

- **Frontend**: http://localhost:5173 (oder nächster verfügbarer Port)
- **Backend API**: http://localhost:5000
- **Mensa API**: http://localhost:5000/api/mensa
- **Hatty Chat**: http://localhost:5000/api/hatty/chat

### Manuelle Installation (falls erforderlich)

1. **Repository klonen**:

   ```bash
   git clone <your-repo-url>
   cd hsrw-app
   ```

2. **Frontend-Abhängigkeiten installieren**:

   ```bash
   npm install
   ```

3. **Backend-Abhängigkeiten installieren**:

   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

4. **Entwicklungsserver starten**:
   ```bash
   npm run dev
   ```

Dieser einzelne Befehl startet automatisch:

- 🎨 **Frontend** (Vite) auf http://localhost:5173
- 🔧 **Backend** (Flask) auf http://localhost:5000

## 📱 App-Struktur

### **Willkommens-Flow**

1. **Willkommensbildschirm** → Tippen zum Fortfahren
2. **Login-Bildschirm** → Einfache Login-Oberfläche
3. **Home-Dashboard** → Universitätsdienste-Übersicht

### **Hauptfunktionen**

- 🍽️ **Mensa** - Echtzeit-Cafeteria-Menü
- 📚 **Kurse** - Kursverwaltung
- 📅 **Stundenplan** - Stundenplan mit Übersicht
- 📰 **News** - Universitätsnachrichten
- 🔔 **Kalender** - Kalender mit aktuellen Events
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

### **Technische Umsetzung**

```python
# Beispiel der Raumanalyse-Logik
def _parse_raum_detail(self, raum_string_original):
    # Unterstützt verschiedene Raumformate:
    # - Numerisch (GSR): "0100001" → Gebäude 01, Stock 00, Raum 001
    # - Komma-separiert: "01, 00, 001" 
    # - Online: "digital/online"
    # - TBA: "tba" (To Be Announced)
```

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
│   ├── icons/          # SVG-Icon-Komponenten (10+ Icons)
│   ├── screens/        # Seitenebene-Komponenten (7 Hauptscreens)
│   └── ui/             # Wiederverwendbare UI-Komponenten
├── services/           # API-Integrationsschicht (ApiService, hattyService)
├── styles/             # Tailwind CSS-Konfiguration
├── types/              # TypeScript-Definitionen
└── assets/             # Bilder und statische Ressourcen
```

### **Backend (Flask + Python)**

```
backend/
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

- **Frontend**: React 19, TypeScript, Tailwind CSS 4.1, Vite 6.x
- **Backend**: Flask, Python 3.8+, BeautifulSoup4 (Web-Scraping), CORS
- **3D/Panorama**: Pannellum.js für 360° Campus-Navigation
- **AI-Integration**: Hatty Chatbot (Browser-automatisiert, Google AI Studio)
- **Build-Tools**: Vite mit PostCSS, Autoprefixer, Tailwind-Compiler
- **Entwicklung**: Concurrently für parallelen Frontend/Backend-Start
- **Logging**: Farb-kodiertes Python-Logging-System für besseres Debugging

## 🎯 Mensa-Integration Details

### **Datenquelle**

- **Offizielle Website**: https://www.stw-d.de/gastronomie/speiseplaene/mensa-kamp-lintfort/
- **Update-Häufigkeit**: Echtzeit bei jeder Anfrage
- **Datentypen**: Menükategorien, Beschreibungen, Preise

### **API-Endpunkte**

### **API-Endpunkte**

Das Backend bietet folgende REST-API-Endpunkte:

```http
# Mensa-Integration
GET  /api/mensa          # Aktuelle Menüdaten mit Echtzeit-Scraping
GET  /api/health         # Backend-Gesundheitsprüfung

# Hatty Chatbot
POST /api/hatty/chat     # Chat mit Hatty Bot (JSON: {message: string})
GET  /api/hatty/status   # Bot-Status und Verfügbarkeit prüfen
```

### **Erweiterte API-Antwortformate**

**Mensa API Response:**
```json
{
  "date": "10.06.2025",
  "day": "Dienstag", 
  "lastUpdated": "2025-06-10T10:30:00.123Z",
  "items": [
    {
      "title": "Essen I",
      "description": ["Pasta (20a)", "Sauce bolognaise [R] (22)"],
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

### **Bildschirm-Komponenten (7 Hauptscreens)**

- `HomeScreen.tsx` - Haupt-Dashboard mit Service-Raster und Navigation
- `LoginScreen.tsx` - Benutzerauthentifizierungs-Oberfläche
- `MensaScreen.tsx` - Live-Menü-Anzeige mit Echtzeit-Scraping
- `CampusMapScreen.tsx` - 360° Panorama-Navigation und Gebäude-Exploration
- `NewsScreen.tsx` - Universitätsnachrichten mit Prioritäts-System
- `CalendarScreen.tsx` - Kalender mit Event-Management
- `KurseScreen.tsx` - Kursverwaltung und Stundenplan-Integration

### **UI-Komponenten (9 Wiederverwendbare Komponenten)**

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

## 🤖 Hatty Chatbot Integration

### **Browser-basierte KI ohne API-Schlüssel**

Das CampusHub System integriert den **Hatty Chatbot** - einen intelligenten Universitätsassistenten, der automatisch mit dem Backend startet:

- ✅ **Keine API-Schlüssel erforderlich** - nutzt Browser-Automation mit Google AI Studio
- ✅ **Automatischer Start** - Browser wird beim Backend-Start geöffnet
- ✅ **Echtzeit-Kommunikation** - Direkte Integration in die App-Oberfläche
- ✅ **Universitätsspezifisch** - Optimiert für HSRW-Themen und Studentenfragen

### **Hatty Features**

- 🎓 **Universitätsfragen** - Informationen zu Kursen, Campus, Services
- 📚 **Akademische Unterstützung** - Hilfe bei Studium und Universitätsleben
- 🍽️ **Mensa-Integration** - Fragen zum aktuellen Menü und Essenszeiten
- 🗺️ **Campus-Navigation** - Wegbeschreibungen und Raumfindung

### **API-Endpunkte**

```http
POST /api/hatty/chat     # Chat mit Hatty Bot
GET  /api/hatty/status   # Bot-Status prüfen
```

### **Verwendung**

```javascript
// Chat mit Hatty
const response = await fetch("/api/hatty/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "Wie ist das Mensa-Menü heute?" }),
});
```

## 🎨 Design-System

### **Farben**

- **Primär-Blau**: #003f7f (HSRW-Marke)
- **Helles Blau**: #0066cc
- **Erfolg-Grün**: #10b981
- **Warnung-Gelb**: #f59e0b
- **Fehler-Rot**: #ef4444

### **Typografie**

- **Schriftfamilie**: Inter (Google Fonts)
- **Responsive Skalierung** über Breakpoints
- **Barrierefreie Kontrastverhältnisse**

### **Animationen**

- **Hover-Effekte**: `scale(1.05)` Transform
- **Aktive Zustände**: `scale(0.95)` Feedback
- **Lade-Spinner**: Flüssige Rotationsanimationen
- **Übergänge**: 200ms Dauer für professionelles Gefühl

## 🔧 Entwicklungsworkflow

### **Verfügbare Scripts**

```bash
npm run dev              # Frontend und Backend starten
npm run dev:frontend-only # Nur Vite starten
npm run build           # Produktions-Build
npm run preview         # Produktions-Build Vorschau
```

### **Farbige Entwicklungs-Logs**

- 🎨 **[FRONTEND]** in cyan - Vite-Entwicklungsserver
- 🔧 **[BACKEND]** in grün - Flask mit farbigem Logging
- ✅ **INFO** in grün - Erfolgreiche Operationen
- ⚠️ **WARNING** in gelb - Wichtige Hinweise
- ❌ **ERROR** in rot - Fehlerbedingungen

### **Hot Reload**

- **Frontend**: Sofortige React-Komponenten-Updates
- **Backend**: Auto-Neustart bei Python-Datei-Änderungen
- **Styles**: Live-Tailwind-CSS-Kompilierung

## 🏆 Haupterfolge

### ✅ **Code-Organisation**

- **Refaktorierung** der gesamten Codebasis mit logischer Struktur
- **30+ neue Komponenten** mit ordnungsgemäßen TypeScript-Interfaces
- **Eliminierung von Code-Duplikation** und Legacy-Dateien
- **Zentralisierung** von API-Services und Typdefinitionen

### ✅ **Responsive Design**

- **Mobile-First-Ansatz** mit Tailwind-Breakpoints
- **Touch-freundliche Oberfläche** mit ordnungsgemäßen Zielgrößen
- **Flüssige Animationen** für professionelle Benutzererfahrung
- **Barrierefreiheits-Compliance** mit ARIA-Labels

### ✅ **Backend-Verbesserung**

- **Farbiges Logging-System** für besseres Debugging
- **Echtzeit-Daten-Scraping** von der Universitäts-Website
- **Umfassende Fehlerbehandlung** und API-Antworten
- **CORS aktiviert** für nahtlose Frontend-Integration

### ✅ **Entwicklererfahrung**

- **Ein-Befehl-Start** mit `npm run dev`
- **Null TypeScript-Fehler** im Produktions-Build
- **Farbkodierte Terminal-Ausgabe** für einfaches Debugging
- **Hot Reload** für Frontend und Backend

## 📊 Leistungsmetriken

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

## 🤝 Mitwirken

1. Repository forken
2. Feature-Branch erstellen: `git checkout -b feature/amazing-feature`
3. Änderungen committen: `git commit -m 'Add amazing feature'`
4. Zum Branch pushen: `git push origin feature/amazing-feature`
5. Pull Request öffnen

## 📄 Lizenz

Dieses Projekt ist Teil des **IT-Projektmanagement** Kurses an der **Hochschule Rhein-Waal**.

## 👥 Autoren

**IT-Projektmanagement Team SS2025**  
**Hochschule Rhein-Waal**
**Programmierer**: Louis 36636 xD, bei Fragen kontaktieren glaube am besten über die HSRW Seite

---

**Mit ❤️ für HSRW-Studierende gebaut** 🎓
