# 🎓 HSRW Campus App

<div align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/AI-Gemini%20API-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini API">
</div>

<br>

<div align="center">
  <h3>🏫 Moderne Campus-App für die Hochschule Rhein-Waal</h3>
  <p><em>Eine umfassende Webanwendung mit Echtzeit-Mensa-Integration, KI-Chatbot und 360° Campus-Navigator</em></p>
</div>

---

## ✨ Hauptfeatures

### 🍽️ **Live Mensa-Integration**

- **Echtzeit-Daten** direkt von der offiziellen STW-D Website
- **Tägliche Updates** mit Preisen, Beschreibungen und Allergenen
- **Mobile-optimiert** mit Touch-freundlicher Benutzeroberfläche

### 🤖 **"Hatty" KI-Chatbot**

- **Gemini API-Integration** für intelligente Konversationen
- **Universitätsspezifisch** - beantwortet HSRW-bezogene Fragen
- **Persistente Chat-Historie** mit Echtzeit-Feedback
- **Zero-Configuration** - keine API-Schlüssel erforderlich

### 🗺️ **360° Campus-Navigator**

- **Immersive Panorama-Ansichten** aller Campus-Gebäude
- **Intelligenter Raumfinder** mit automatischer Gebäude-Zuordnung
- **Interaktive Hotspots** für nahtlose Navigation
- **Stundenplan-Integration** mit direkter Raumverlinkung

### 📰 **Intelligentes News-System**

- **Priorisierte Nachrichten** (Klausuren, Deadlines, Events)
- **Kategorisierte Anzeige** mit Smart-Filtering
- **Mobile-First Design** für optimale Lesbarkeit

---

## 🚀 Schnellstart

### Voraussetzungen

- **Node.js** 18+ mit npm
- **Python** 3.8+ mit pip
- Moderner Webbrowser

### ⚡ Ein-Klick-Installation

**Windows (Empfohlen):**

```bash
# Doppelklick auf die Batch-Datei
start-app.bat
```

**PowerShell (Erweitert):**

```powershell
# Farbkodierte Ausgabe mit Details
./start-app.ps1
```

**Cross-Platform:**

```bash
# Startet Frontend und Backend parallel
npm run dev
```

### 🌐 URLs nach dem Start

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Mensa API:** http://localhost:5000/api/mensa
- **Hatty Chat:** http://localhost:5000/api/hatty/chat

---

## 🏗️ Architektur

### Frontend Stack

```
React 19 + TypeScript + Vite + Tailwind CSS 4.1
├── components/
│   ├── icons/          # 10+ SVG-Icons (skalierbar & barrierefrei)
│   ├── screens/        # 7 Hauptscreens (Home, Mensa, Campus, etc.)
│   └── ui/             # 9 wiederverwendbare UI-Komponenten
├── services/           # API-Integration (ApiService, hattyService)
├── types/              # TypeScript-Definitionen
└── styles/             # Tailwind-Konfiguration
```

### Backend Stack

```
Flask + Python 3.8+
├── app.py              # Haupt-API mit farbigem Logging
├── hatty_gemini.py     # Gemini API Integration
├── requirements.txt    # Dependencies
└── tests/              # Umfassende Test-Suite
```

### 360° Campus System

```
Pannellum.js + Hochauflösende Panoramas
├── interactive_map.html    # 360° Viewer
├── interactiveMap.py      # Raumfinder-Backend
└── Bilder/                # Campus-Panoramas (5+ Gebäude)
```

---

## 🛠️ API-Dokumentation

### Mensa API

```javascript
// GET /api/mensa - Aktuelles Menü abrufen
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

### Hatty Chatbot API

```javascript
// POST /api/hatty/chat - Chat mit KI-Bot
const response = await fetch("/api/hatty/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "Wie ist das Mensa-Menü heute?" })
});

// Response Format
{
  "response": "Das heutige Mensamenü enthält...",
  "status": "success",
  "timestamp": "2025-06-10T10:30:00.123Z"
}
```

---

## 🎨 Design-System

### Farbschema (HSRW-Branding)

- **Primär-Blau:** `#003f7f` (Corporate Identity)
- **Akzent-Blau:** `#0066cc` (Interactive Elements)
- **Erfolg:** `#10b981` | **Warnung:** `#f59e0b` | **Fehler:** `#ef4444`

### Typografie & Animationen

- **Schriftart:** Inter (Google Fonts)
- **Hover-Effekte:** `scale(1.05)` mit 200ms Transition
- **Touch-Targets:** Minimum 44px für mobile Barrierefreiheit
- **Responsive:** Mobile-First mit Tablet/Desktop-Optimierung

---

## 🧭 Campus-Navigator Features

### Intelligente Raumanalyse

```python
def _parse_raum_detail(self, raum_string_original):
    """
    Unterstützt verschiedene HSRW-Raumformate:
    - GSR-Nummer: "0100001" → Gebäude 01, Stock 00, Raum 001
    - Komma-separiert: "01, 00, 001"
    - Online-Kurse: "digital/online" → Spezielle Behandlung
    - TBA-Räume: "tba" → Fallback-Darstellung
    """
```

### Campus-Abdeckung

- **Gebäude 01** - Hörsaalzentrum (Haupteingang & Innenansichten)
- **Gebäude 02** - Bibliothek & Usability-Labor
- **Gebäude 03** - FabLab & AIS-Labor
- **Gebäude 08** - Green FabLab (Außen & Innen)
- **Campus Mitte** - Zentrale Übersichtsperspektive

---

## 📱 App-Screens

| Screen       | Beschreibung                    | Features                            |
| ------------ | ------------------------------- | ----------------------------------- |
| **Home**     | Dashboard mit Service-Übersicht | 8 Hauptfunktionen, HSRW-Branding    |
| **Mensa**    | Live-Menü mit Echtzeit-Updates  | Preise, Allergene, responsive Cards |
| **Campus**   | 360° Panorama-Navigation        | Hotspots, Zoom, Touch-Steuerung     |
| **News**     | Priorisierte Universitätsnews   | Kategorien, Smart-Filter            |
| **Kalender** | Event-Management                | Termine, Deadlines                  |
| **Kurse**    | Stundenplan-Integration         | Raumfinder, Terminübersicht         |
| **Chatbot**  | KI-Assistant "Hatty"            | Gemini-powered, Persistent Chat     |

---

## 🏆 Performance & Qualität

### Build-Metriken

- **Build-Zeit:** ~1.13 Sekunden
- **Bundle-Größe:** 255.33 kB (73.35 kB gzipped)
- **TypeScript:** Zero Compilation Errors
- **API-Response:** Sub-Sekunden Mensa-Daten

### Entwicklungsworkflow

```bash
npm run dev              # Frontend & Backend parallel
npm run dev:frontend-only # Nur Vite-Dev-Server
npm run build           # Production Build
npm run preview         # Build-Vorschau
```

### Farbkodierte Logs

- 🎨 **[FRONTEND]** in Cyan - Vite Development Server
- 🔧 **[BACKEND]** in Grün - Flask mit farbigem Logging
- ✅ **INFO** in Grün - Erfolgreiche Operationen
- ⚠️ **WARNING** in Gelb - Wichtige Hinweise
- ❌ **ERROR** in Rot - Fehlerbedingungen

---

## 🌟 Roadmap

### 🔜 Nächste Features

- **🔐 HSRW-SSO Integration** - Authentifizierung über Uni-Accounts
- **📱 PWA Support** - Offline-Fähigkeit & App-Installation
- **🔔 Push-Notifications** - Echtzeit-Alerts für News & Mensa
- **🌐 Internationalisierung** - Deutsch/Englisch Toggle

### 🎯 Langfristige Ziele

- **📊 Analytics Dashboard** - Nutzungsstatistiken
- **🔍 Globale Suche** - Übergreifende Suchfunktion
- **🎨 Theming-System** - Dark Mode & Custom Themes
- **🗓️ Kalender-Sync** - Integration externe Apps

---

## 🤝 Contributing

Wir freuen uns über Beiträge! So kannst du mitmachen:

1. **Fork** das Repository
2. **Feature Branch** erstellen: `git checkout -b feature/amazing-feature`
3. **Commit** deine Änderungen: `git commit -m 'Add amazing feature'`
4. **Push** zum Branch: `git push origin feature/amazing-feature`
5. **Pull Request** öffnen

### Entwicklungsrichtlinien

- **TypeScript** für Typsicherheit verwenden
- **Tailwind CSS** für konsistentes Styling
- **React Hooks** für moderne Komponentenarchitektur
- **API-First** Design für Backend-Integration

---

## 📄 Lizenz & Team

**Projekt:** IT-Projektmanagement Kurs SS2025  
**Institution:** Hochschule Rhein-Waal  
**Entwickler:** Louis M. (Kontakt über HSRW-Platform)

---

<div align="center">
  <p><strong>Entwickelt mit ❤️ für HSRW-Studierende</strong></p>
  <p><em>Eine moderne, vollständige Campus-Lösung für das digitale Studentenleben</em></p>
</div>
