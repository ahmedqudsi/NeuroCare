
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
  imageHint?: string;
  videoUrl?: string;
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
  description:string;
  checkItems: string[];
  details: string;
  icon?: LucideIcon;
};

// New Types for Healthcare Services
export interface HealthcareService {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  cta: string;
}

export interface Nurse {
  id: string;
  name: string;
  specializations: string[];
  experienceYears: number;
  hourlyRate: number; // in INR or a common currency
  availability: string; // e.g., "Mon-Fri, 9am-5pm", "Weekends only"
  imageUrl?: string;
  imageHint?: string;
  bio?: string;
}

export type NurseBookingFormData = {
  patientName: string;
  selectedNurseId: string;
  bookingDate: Date;
  bookingTime: string; // e.g., "10:00 AM - 12:00 PM"
  address: string;
  notes?: string;
};
