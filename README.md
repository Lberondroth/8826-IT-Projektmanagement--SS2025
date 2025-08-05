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
Für Verwendung von Hatty wird ein API-Key von Google AI Studios benötigt, dieser muss im backend .venv Ordner, hinzugefügt werden.

   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

5. **Entwicklungsserver starten**:
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
- 📅 **Stundenplan** - Stundenplan-Übersicht
- 📰 **News** - Universitätsnachrichten
- 🔔 **Benachrichtigungen** - Benachrichtigungen
- 🗺️ **Campus-Plan** - Interaktive Campus-Karte

## 🛠️ Technische Architektur

### **Frontend (React + TypeScript)**

```
src/
├── components/
│   ├── icons/          # SVG-Icon-Komponenten
│   ├── screens/        # Seitenebene-Komponenten
│   └── ui/             # Wiederverwendbare UI-Komponenten
├── services/           # API-Integrationsschicht
├── styles/             # Tailwind CSS-Konfiguration
└── types/              # TypeScript-Definitionen
```

### **Backend (Flask + Python)**

```
backend/
├── app.py             # Haupt-Flask-Anwendung
└── requirements.txt   # Python-Abhängigkeiten
```

### **Schlüsseltechnologien**

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Flask, Python, BeautifulSoup (Web-Scraping)
- **Build**: Vite mit PostCSS und Tailwind
- **Entwicklung**: Concurrently für Auto-Start-Workflow

## 🎯 Mensa-Integration Details

### **Datenquelle**

- **Offizielle Website**: https://www.stw-d.de/gastronomie/speiseplaene/mensa-kamp-lintfort/
- **Update-Häufigkeit**: Echtzeit bei jeder Anfrage
- **Datentypen**: Menükategorien, Beschreibungen, Preise

### **API-Endpunkte**

```http
GET /api/mensa    # Aktuelle Menüdaten abrufen
GET /api/health   # Backend-Gesundheitsprüfung
```

### **Beispiel-Antwort**

```json
{
  "date": "10.06.2025",
  "day": "Dienstag",
  "items": [
    {
      "title": "Essen I",
      "description": ["Pasta (20a)", "Sauce bolognaise [R] (22)"],
      "price": "1,50 €"
    }
  ]
}
```

## 🧩 Komponentenarchitektur

### **Bildschirm-Komponenten**

- `HomeScreen.tsx` - Haupt-Dashboard mit Service-Raster
- `LoginScreen.tsx` - Benutzerauthentifizierungs-Oberfläche
- `MensaScreen.tsx` - Live-Menü-Anzeige mit Ladezuständen

### **UI-Komponenten**

- `Button.tsx` - Erweiterte Schaltfläche mit Hover-Effekten
- `LoadingSpinner.tsx` - Animierter Ladeindikator
- `ErrorMessage.tsx` - Fehleranzeige mit Wiederholungsfunktion
- `LogoImage.tsx` - Responsive HSRW-Logo-Komponente

### **Icon-System**

- `HouseIcon`, `UtensilsIcon`, `UserIcon` etc.
- Konsistente SVG-Icons mit TypeScript-Interfaces
- Skalierbar und barrierefrei

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
- **17+ neue Komponenten** mit ordnungsgemäßen TypeScript-Interfaces
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

- **Build-Zeit**: < 1 Sekunde (985ms)
- **Bundle-Größe**: 201.40 kB (gzipped: 63.10 kB)
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
