
import type { NavigationItem } from '@/types';
import { LayoutDashboard, Activity, Hospital, Bike } from 'lucide-react'; // Removed Mic

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
    // Removed Speech Therapy AI entry
  ] as NavigationItem[],
};

export type SiteConfig = typeof siteConfig;
