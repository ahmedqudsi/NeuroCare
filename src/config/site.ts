
import type { NavigationItem } from '@/types';
import { LayoutDashboard, Activity, Hospital, Bike, Mic } from 'lucide-react';

export const siteConfig = {
  appName: 'NeuroCare', // Direct string
  description: 'A Comprehensive Stroke Awareness & Recovery Companion',
  // i18n configuration removed
  sidebarNav: [
    {
      href: '/dashboard',
      label: 'Dashboard', // Direct label
      icon: LayoutDashboard,
    },
    {
      href: '/fast-test',
      label: 'FAST Test', // Direct label
      icon: Activity,
    },
    {
      href: '/hospital-locator',
      label: 'Nearby Hospitals', // Direct label
      icon: Hospital,
    },
    {
      href: '/rehabilitation',
      label: 'Rehab Exercises', // Direct label
      icon: Bike,
    },
    {
      href: '/speech-therapy',
      label: 'Speech Therapy AI', // Direct label
      icon: Mic,
    },
  ] as NavigationItem[],
};

export type SiteConfig = typeof siteConfig;
