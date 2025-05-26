import type { LucideIcon } from 'lucide-react';
import type { siteConfig } from '@/config/site';

export type Locale = typeof siteConfig.i18n.locales[number];

// A very generic type for the dictionary.
// You should create a more specific type based on your common.json structure.
export interface Dictionary {
  appName: string;
  nav: {
    [key: string]: string; // e.g., dashboard: "Dashboard"
  };
  languageSwitcher: {
    changeLanguage: string;
    en: string;
    te: string;
    hi: string;
    ur: string;
    ar: string;
    zh: string;
    [key: string]: string;
  };
  dashboard?: { // Optional for now, as not all pages might have specific translations
    welcome?: string;
    description?: string;
  };
  [key: string]: any; // Allow other keys
}


export type NavigationItem = {
  href: string;
  labelKey: string; // Key for translation, e.g., "dashboard"
  icon: LucideIcon;
  disabled?: boolean;
};

export type Exercise = {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  imageUrl?: string;
  imageHint?: string; // for data-ai-hint
};

export type Quote = {
  id: string;
  text: string;
  author: string;
};

export type Hospital = {
  id: string;
  name: string;
  address: string;
  phone: string;
  services: string[];
  imageUrl?: string;
  imageHint?: string; // for data-ai-hint
};

export type FASTStep = {
  id: 'F' | 'A' | 'S' | 'T';
  title: string;
  description: string;
  checkItems: string[];
  details: string;
  icon?: LucideIcon;
};
