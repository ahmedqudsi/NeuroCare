
import type { LucideIcon } from 'lucide-react';
import type { siteConfig } from '@/config/site';

export type Locale = typeof siteConfig.i18n.locales[number];

export interface Dictionary {
  appName: string;
  appDescription?: string; // For root layout metadata
  nav: {
    [key: string]: string; 
  };
  languageSwitcher: {
    changeLanguage: string;
    en: string;
    te: string;
    hi: string;
    ur: string;
    ar: string;
    zh: string;
    toggleMenu?: string;
    [key: string]: string;
  };
  dashboard?: {
    welcome?: string;
    description?: string;
  };
  common?: { // For shared translations like quick tips
    [key: string]: string;
  };
  // Page specific translation sections
  fastTestPage?: any;
  hospitalLocatorPage?: any;
  rehabPage?: any;
  exerciseCard?: any;
  speechTherapyPage?: any;
  [key: string]: any; // Allow other keys
}


export type NavigationItem = {
  href: string;
  labelKey: string; 
  icon: LucideIcon;
  disabled?: boolean;
};

export type Exercise = {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  imageUrl?: string;
  imageHint?: string;
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
  imageHint?: string; 
};

export type FASTStep = {
  id: 'F' | 'A' | 'S' | 'T';
  title: string;
  description: string;
  checkItems: string[];
  details: string;
  icon?: LucideIcon; // Made icon optional as it's from constants
};
