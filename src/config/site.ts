import type { NavigationItem } from '@/types';
import { LayoutDashboard, Activity, Hospital, Bike, Mic } from 'lucide-react';

export const siteConfig = {
  // App name will be handled by translations, e.g., using a key like 'appName'
  // name: 'NeuroCare', 
  description: 'A Comprehensive Stroke Awareness & Recovery Companion',
  i18n: {
    locales: ['en', 'te', 'hi', 'ur', 'ar', 'zh'] as const,
    defaultLocale: 'en' as const,
  },
  sidebarNav: [
    {
      href: '/dashboard',
      labelKey: 'nav.dashboard', // Key for translation
      icon: LayoutDashboard,
    },
    {
      href: '/fast-test',
      labelKey: 'nav.fastTest', // Key for translation
      icon: Activity,
    },
    {
      href: '/hospital-locator',
      labelKey: 'nav.nearbyHospitals', // Key for translation
      icon: Hospital,
    },
    {
      href: '/rehabilitation',
      labelKey: 'nav.rehabExercises', // Key for translation
      icon: Bike,
    },
    {
      href: '/speech-therapy',
      labelKey: 'nav.speechTherapyAI', // Key for translation
      icon: Mic,
    },
  ] as NavigationItem[],
};

export type SiteConfig = typeof siteConfig;
