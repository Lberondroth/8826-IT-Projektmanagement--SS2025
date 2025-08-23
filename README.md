# 🎓 HSRW Campus App

Eine moderne, responsive Webanwendung für Studierende der **Hochschule Rhein-Waal (HSRW)**, die wichtige Universitätsdienste bündelt – von Echtzeit-Mensa-Speiseplänen bis hin zu einem interaktiven Campus-Navigator und einem KI-gestützten Chatbot.

![HSRW Logo](src/assets/HSRW_logo.png)

<div align="center">

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Flask](https.img.shields.io/badge/Flask-3.x-black?logo=flask)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue?logo=python)](https://www.python.org/)

</div>

## ✨ Kernfunktionen

- **🍽️ Echtzeit-Mensa-Speiseplan:** Tagesaktuelle Gerichte, Preise und Beschreibungen direkt von der offiziellen Webseite des Studierendenwerks.
- **🤖 KI-Chatbot "Hatty":** Ein intelligenter Assistent, der auf der **offiziellen Google API** basiert und Fragen zu Campus, Studium und Mensa beantwortet.
- **🗺️ Interaktiver Campus-Navigator:** Eine immersive 360°-Erkundung des Campus mit hochauflösenden Panoramen, Hotspot-Navigation und einem intelligenten Raumfinder.
- **📰 Intelligentes News-System:** Priorisierte Anzeige von Universitätsnachrichten, von wichtigen Klausurterminen bis zu Campus-Events.
- **🎨 Modernes & Responsives UI:** Ein Mobile-First-Design, entwickelt mit Tailwind CSS, das auf allen Geräten eine optimale User Experience bietet.
- **✅ Barrierefreiheit & GDPR:** Konform mit ARIA-Standards und inklusive eines benutzerfreundlichen Cookie-Banners.

## 🚀 Schnellstart

Für den Start der Anwendung werden **Node.js (18+)** und **Python (3.8+)** benötigt.

### Automatische Installation & Start

Der einfachste Weg, die Anwendung zu starten, ist die Verwendung der bereitgestellten Skripte. Diese kümmern sich um alle notwendigen Schritte.

**1. Windows (Option A: Batch-Skript)**
```cmd
# Führt alle Schritte automatisch aus
start-app.bat
```

**2. Windows (Option B: PowerShell)**
```powershell
# Bietet detailliertere, farbkodierte Ausgaben
./start-app.ps1
```

**3. macOS / Linux (oder plattformübergreifend)**
```bash
# Startet Frontend und Backend parallel
npm run dev
```

Nach dem Start sind die Dienste unter folgenden URLs verfügbar:
- **Frontend:** `http://localhost:5173`
- **Backend-API:** `http://localhost:5000`

---

## 🛠️ Technische Architektur

Das Projekt ist in ein Frontend auf Basis von React und ein Backend auf Basis von Flask unterteilt, um eine klare Trennung der Verantwortlichkeiten zu gewährleisten.

### Schlüsseltechnologien

| Bereich | Technologie | Beschreibung |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS | Eine moderne, typsichere und performante Benutzeroberfläche. |
| **Backend** | Flask, Python 3.8+ | Eine schlanke API für Daten-Scraping und die Chatbot-Anbindung. |
| **KI-Chatbot** | **Google API** | Stellt die Konversations-KI für den "Hatty" Chatbot bereit. |
| **360° Ansicht**| Pannellum.js | Ermöglicht die interaktive Panorama-Navigation auf dem Campus. |
| **Entwicklung**| Concurrently, Vite HMR, Farb-Logging | Ein optimierter Workflow mit parallelen Prozessen und Hot-Reloading. |

### Projektstruktur

```
.
├── backend/                # Flask-Backend
│   ├── app.py              # Hauptanwendung & API-Endpunkte
│   ├── hatty_chatbot.py    # Integration der Google AI API
│   └── requirements.txt    # Python-Abhängigkeiten
│
├── src/                    # React-Frontend
│   ├── components/         # Wiederverwendbare UI- & Screen-Komponenten
│   ├── services/           # API-Kommunikationsschicht
│   ├── styles/             # Tailwind CSS Konfiguration
│   └── types/              # TypeScript-Definitionen
│
└── campus-plan/            # Ressourcen für den 360°-Navigator
    ├── interactive_map.html # Pannellum Viewer
    └── Bilder/             # Hochauflösende Panorama-Bilder
```

## 🤖 Chatbot-Integration: Hatty

"Hatty" ist ein KI-gestützter Chatbot, der speziell für die HSRW entwickelt wurde und über eine REST-API in die Anwendung integriert ist.

- **Technologie:** Der Chatbot nutzt die **offizielle Google API**, um präzise und kontextbezogene Antworten zu generieren.
- **Funktionen:** Beantwortet Fragen zu Mensa-Speiseplänen, Campus-Navigation, Kursen und allgemeinen Studienthemen.
- **API-Endpunkt:** `POST /api/hatty/chat`

**Beispiel-Anfrage:**```javascript
// Nachricht an den Chatbot senden
const response = await fetch("http://localhost:5000/api/hatty/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "Welche vegetarischen Gerichte gibt es heute in der Mensa?" }),
});

const data = await response.json();
console.log(data.response);
```

## 🌟 Zukünftige Erweiterungen

Wir planen, die App kontinuierlich zu verbessern. Folgende Features stehen als Nächstes an:

- **🔐 Benutzer-Authentifizierung:** Sicherer Login über HSRW-Accounts.
- **📱 Progressive Web App (PWA):** Offline-Fähigkeiten und die Möglichkeit, die App zum Homescreen hinzuzufügen.
- **🔔 Push-Benachrichtigungen:** Echtzeit-Alerts für wichtige News oder Mensa-Änderungen.
- **🌐 Mehrsprachigkeit:** Umschaltung zwischen Deutsch und Englisch.

## 🤝 Mitwirken (Contributing)

Wir freuen uns über Beiträge zur Weiterentwicklung der HSRW Campus App! Wenn du mitmachen möchtest, folge bitte diesen Schritten:

1.  Forke das Repository.
2.  Erstelle einen neuen Feature-Branch (`git checkout -b feature/neues-feature`).
3.  Commite deine Änderungen (`git commit -m 'Füge neues Feature hinzu'`).
4.  Pushe zum Branch (`git push origin feature/neues-feature`).
5.  Öffne einen Pull Request.

## 📄 Lizenz

Dieses Projekt wurde im Rahmen des Kurses **IT-Projektmanagement (SS2025)** an der Hochschule Rhein-Waal entwickelt.

## 👥 Autoren

-   **Entwickler:** Louis M. (Kontakt über die offizielle HSRW-Plattform)
-   **Projektteam:** IT-Projektmanagement SS2025

---

<p align="center">
  Entwickelt mit ❤️ für die Studierenden der HSRW.
</p>
