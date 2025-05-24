import type { NavigationItem } from '@/types';
import { LayoutDashboard, Activity, Hospital, Bike, Mic, HelpCircle } from 'lucide-react';

export const siteConfig = {
  name: 'NeuroCare',
  description: 'A Comprehensive Stroke Awareness & Recovery Companion',
  sidebarNav: [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/fast-test',
      label: 'FAST Test',
      icon: Activity,
    },
    {
      href: '/hospital-locator',
      label: 'Nearby Hospitals',
      icon: Hospital,
    },
    {
      href: '/rehabilitation',
      label: 'Rehab Exercises',
      icon: Bike,
    },
    {
      href: '/speech-therapy',
      label: 'Speech Therapy AI',
      icon: Mic,
    },
  ] as NavigationItem[],
};

export type SiteConfig = typeof siteConfig;
