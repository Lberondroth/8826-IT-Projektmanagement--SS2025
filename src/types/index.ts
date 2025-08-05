export interface MenuItem {
  title: string;
  description: string[];
  price: string;
  image: string;
}

export interface MensaApiResponse {
  date?: string;
  day?: string;
  items: MenuItem[];
  lastUpdated?: string;
  error?: string;
}

export interface MensaScreenProps {
  onNavigateToHome: () => void;
  onNavigateToMensa: () => void;
  onNavigateToCalendar: () => void;
}

export interface HomeScreenProps {
  onNavigateToMensa: () => void;
  onNavigateToCampusMap: () => void;
  onNavigateToCalendar: () => void;
  onNavigateToNews: () => void;
  onNavigateToKurse: () => void;
  onNavigateToHome: () => void;
}

export interface CampusMapScreenProps {
  onNavigateToHome: () => void;
  onNavigateToMensa: () => void;
  onNavigateToCalendar: () => void;
}

export interface LoginScreenProps {
  onLogin: (username?: string, password?: string) => void;
}

export interface LogoProps {
  containerClassName?: string;
  imgClassName?: string;
}

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface CalendarScreenProps {
  onNavigateToHome: () => void;
  onNavigateToMensa: () => void;
  onNavigateToCalendar: () => void;
}

export interface NewsScreenProps {
  onNavigateToHome: () => void;
  onNavigateToMensa: () => void;
  onNavigateToCalendar: () => void;
}

export interface KurseScreenProps {
  onNavigateToHome: () => void;
  onNavigateToMensa: () => void;
  onNavigateToCalendar: () => void;
}

// Hatty Chatbot Types
export interface HattyMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface HattyChatRequest {
  message: string;
}

export interface HattyChatResponse {
  response: string;
  timestamp: string;
  error?: string;
}

export interface HattyStatusResponse {
  available: boolean;
  status: "ready" | "unavailable";
}
