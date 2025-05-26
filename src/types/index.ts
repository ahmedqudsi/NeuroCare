
import type { LucideIcon } from 'lucide-react';
// Locale and Dictionary types removed

export type NavigationItem = {
  href: string;
  label: string; // Changed from labelKey
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
  icon?: LucideIcon; // Icon was already optional
};
