"use client"; // Keep as client component if Header or other children need it

import { Header } from '@/components/layout/header';
import { getDictionary } from '@/lib/get-dictionary'; // Assuming getDictionary can run client-side or is handled appropriately
import type { Locale, Dictionary } from '@/types';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';

// Helper to extract locale from pathname client-side
const getLocaleFromPathname = (pathname: string): Locale => {
  const segments = pathname.split('/');
  const locale = segments[1] as Locale;
  return siteConfig.i18n.locales.includes(locale) ? locale : siteConfig.i18n.defaultLocale;
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(siteConfig.i18n.defaultLocale);
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentLocale = getLocaleFromPathname(pathname);
    setLocale(currentLocale);
    
    async function fetchDictionary() {
      try {
        const dict = await getDictionary(currentLocale);
        setDictionary(dict);
      } catch (error) {
        console.error("Failed to load dictionary for", currentLocale, error);
        // Fallback to default locale's dictionary if current one fails
        const defaultDict = await getDictionary(siteConfig.i18n.defaultLocale);
        setDictionary(defaultDict);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDictionary();
  }, [pathname]);

  if (isLoading || !dictionary) {
    // You might want a more sophisticated loading state here
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        Loading translations...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentLocale={locale} dictionary={dictionary} />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
