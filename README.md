# 🎓 HSRW University App

A modern, responsive web application for **Hochschule Rhein-Waal (HSRW)** students, featuring real-time mensa menu integration and university services.

![HSRW Logo](src/assets/HSRW_logo.png)

## ✨ Features

### 🍽️ **Real-Time Mensa Integration**
- **Live menu data** scraped from official STW-D website
- **Daily menu updates** with prices and descriptions
- **Responsive design** optimized for mobile and desktop
- **Loading states** and error handling for seamless UX

### 🎨 **Modern UI/UX**
- **Mobile-first responsive design** with Tailwind CSS
- **Smooth animations** and hover effects
- **Touch-friendly interface** (44px minimum touch targets)
- **HSRW brand colors** and professional styling
- **Accessibility features** with ARIA labels

### 🏗️ **Technical Excellence**
- **TypeScript** for type safety and better development experience
- **React 19** with modern hooks and component architecture
- **Flask backend** with colored logging system
- **Real-time web scraping** for live university data
- **Modular component structure** for maintainability

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.8+ with pip
- Modern web browser

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd hsrw-app
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Install backend dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

4. **Start the development servers**:
   ```bash
   npm run dev
   ```

This single command automatically starts:
- 🎨 **Frontend** (Vite) on http://localhost:5173
- 🔧 **Backend** (Flask) on http://localhost:5000

## 📱 App Structure

### **Welcome Flow**
1. **Welcome Screen** → Tap to continue
2. **Login Screen** → Simple login interface  
3. **Home Dashboard** → University service overview

### **Main Features**
- 🍽️ **Mensa** - Real-time cafeteria menu
- 📚 **Kurse** - Course management
- 📅 **Stundenplan** - Schedule overview
- 📰 **News** - University announcements
- 🔔 **Benachrichtigungen** - Notifications
- 🗺️ **Campus Plan** - Interactive campus map

## 🛠️ Technical Architecture

### **Frontend (React + TypeScript)**
```
src/
├── components/
│   ├── icons/          # SVG icon components
│   ├── screens/        # Page-level components
│   └── ui/             # Reusable UI components
├── services/           # API integration layer
├── styles/             # Tailwind CSS configuration
└── types/              # TypeScript definitions
```

### **Backend (Flask + Python)**
```
backend/
├── app.py             # Main Flask application
└── requirements.txt   # Python dependencies
```

### **Key Technologies**
- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Flask, Python, BeautifulSoup (web scraping)
- **Build**: Vite with PostCSS and Tailwind
- **Development**: Concurrently for auto-start workflow

## 🎯 Mensa Integration Details

### **Data Source**
- **Official Website**: https://www.stw-d.de/gastronomie/speiseplaene/mensa-kamp-lintfort/
- **Update Frequency**: Real-time on each request
- **Data Types**: Menu categories, descriptions, prices

### **API Endpoints**
```http
GET /api/mensa    # Get current menu data
GET /api/health   # Backend health check
```

### **Example Response**
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

## 🧩 Component Architecture

### **Screen Components**
- `HomeScreen.tsx` - Main dashboard with service grid
- `LoginScreen.tsx` - User authentication interface  
- `MensaScreen.tsx` - Live menu display with loading states

### **UI Components**
- `Button.tsx` - Enhanced button with hover effects
- `LoadingSpinner.tsx` - Animated loading indicator
- `ErrorMessage.tsx` - Error display with retry functionality
- `LogoImage.tsx` - Responsive HSRW logo component

### **Icon System**
- `HouseIcon`, `UtensilsIcon`, `UserIcon` etc.
- Consistent SVG icons with TypeScript interfaces
- Scalable and accessible design

## 🎨 Design System

### **Colors**
- **Primary Blue**: #003f7f (HSRW brand)
- **Light Blue**: #0066cc
- **Success Green**: #10b981
- **Warning Yellow**: #f59e0b
- **Error Red**: #ef4444

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Responsive scaling** across breakpoints
- **Accessible contrast ratios**

### **Animations**
- **Hover effects**: `scale(1.05)` transform
- **Active states**: `scale(0.95)` feedback
- **Loading spinners**: Smooth rotation animations
- **Transitions**: 200ms duration for professional feel

## 🔧 Development Workflow

### **Available Scripts**
```bash
npm run dev              # Start both frontend and backend
npm run dev:frontend-only # Start only Vite
npm run build           # Production build
npm run preview         # Preview production build
```

### **Colored Development Logs**
- 🎨 **[FRONTEND]** in cyan - Vite development server
- 🔧 **[BACKEND]** in green - Flask with colored logging
- ✅ **INFO** in green - Successful operations
- ⚠️ **WARNING** in yellow - Important notices
- ❌ **ERROR** in red - Error conditions

### **Hot Reload**
- **Frontend**: Instant React component updates
- **Backend**: Auto-restart on Python file changes
- **Styles**: Live Tailwind CSS compilation

## 🏆 Key Achievements

### ✅ **Code Organization**
- **Refactored** entire codebase with logical structure
- **17+ new components** with proper TypeScript interfaces
- **Eliminated code duplication** and legacy files
- **Centralized** API services and type definitions

### ✅ **Responsive Design**
- **Mobile-first approach** with Tailwind breakpoints
- **Touch-friendly interface** with proper target sizes
- **Smooth animations** for professional user experience
- **Accessibility compliance** with ARIA labels

### ✅ **Backend Enhancement**
- **Colored logging system** for better debugging
- **Real-time data scraping** from university website
- **Comprehensive error handling** and API responses
- **CORS enabled** for seamless frontend integration

### ✅ **Developer Experience**
- **Single-command startup** with `npm run dev`
- **Zero TypeScript errors** in production build
- **Color-coded terminal output** for easy debugging
- **Hot reload** for both frontend and backend

## 📊 Performance Metrics

- **Build Time**: < 1 second (985ms)
- **Bundle Size**: 201.40 kB (gzipped: 63.10 kB)
- **API Response**: Sub-second mensa data fetching
- **TypeScript**: Zero compilation errors
- **Lighthouse Score**: Optimized for performance and accessibility

## 🌟 Future Enhancements

- 🔐 **Authentication system** with university credentials
- 📱 **Progressive Web App** (PWA) capabilities
- 🔔 **Push notifications** for menu updates
- 📊 **Analytics dashboard** for usage tracking
- 🌐 **Multi-language support** (German/English)
- 🗓️ **Calendar integration** for course schedules

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is part of the **IT-Projektmanagement** course at **Hochschule Rhein-Waal**.

## 👥 Authors

**IT-Projektmanagement Team SS2025**  
**Hochschule Rhein-Waal**

---

**Built with ❤️ for HSRW students** 🎓
