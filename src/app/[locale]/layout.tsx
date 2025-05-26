
"use client";

import { Header } from '@/components/layout/header';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale, Dictionary } from '@/types';
import { useEffect, useState } from 'react'; // Corrected import
import { siteConfig } from '@/config/site';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = params;
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDictionary() {
      setIsLoading(true);
      try {
        const dict = await getDictionary(locale);
        setDictionary(dict);
      } catch (error) {
        console.error("Failed to load dictionary for locale:", locale, error);
        // Fallback to default locale's dictionary if current one fails
        try {
            const defaultDict = await getDictionary(siteConfig.i18n.defaultLocale);
            setDictionary(defaultDict);
        } catch (defaultError) {
            console.error("Failed to load default dictionary:", defaultError);
            // Set a minimal dictionary or handle error appropriately
            setDictionary({ appName: "Error Loading App", nav: {}, languageSwitcher: {} });
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (locale) {
      fetchDictionary();
    }
  }, [locale]);

  if (isLoading || !dictionary) {
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
