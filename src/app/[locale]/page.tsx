// src/app/[locale]/page.tsx
import { redirect } from 'next/navigation';
import type { Locale } from '@/types';

interface LocalePageProps {
  params: { locale: Locale };
}

// This page acts as an entry point for a given locale (e.g., /en, /te).
// It immediately redirects to the dashboard for that locale.
export default function LocaleRootPage({ params }: LocalePageProps) {
  redirect(`/${params.locale}/dashboard`);
}
