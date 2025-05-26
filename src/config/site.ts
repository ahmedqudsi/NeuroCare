import type { NavigationItem, Locale } from '@/types'; // Ensure Locale is imported
import { LayoutDashboard, Activity, Hospital, Bike, Mic } from 'lucide-react';

export const siteConfig = {
  appNameKey: 'appName', // Using a key for app name for i18n
  description: 'A Comprehensive Stroke Awareness & Recovery Companion',
  i18n: {
    locales: ['en', 'te', 'hi', 'ur', 'ar', 'zh'] as const,
    defaultLocale: 'en' as const,
  },
  sidebarNav: [
    {
      href: '/dashboard',
      labelKey: 'dashboard', // Simplified key, assuming 'nav.dashboard' structure in JSON
      icon: LayoutDashboard,
    },
    {
      href: '/fast-test',
      labelKey: 'fastTest',
      icon: Activity,
    },
    {
      href: '/hospital-locator',
      labelKey: 'nearbyHospitals',
      icon: Hospital,
    },
    {
      href: '/rehabilitation',
      labelKey: 'rehabExercises',
      icon: Bike,
    },
    {
      href: '/speech-therapy',
      labelKey: 'speechTherapyAI',
      icon: Mic,
    },
  ] as NavigationItem[],
};

export type SiteConfig = typeof siteConfig;
