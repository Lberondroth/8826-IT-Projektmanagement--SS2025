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
}

export interface HomeScreenProps {
  onNavigateToMensa: () => void;
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
