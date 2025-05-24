import type { LucideIcon } from 'lucide-react';

export type NavigationItem = {
  href: string;
  label: string;
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
