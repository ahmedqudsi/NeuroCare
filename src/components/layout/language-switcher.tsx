'use client';

import { usePathname, useRouter } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

type Locale = typeof siteConfig.i18n.locales[number];

// This type should match the structure of your languageSwitcher section in common.json
interface LanguageSwitcherTranslations {
  changeLanguage: string;
  en: string;
  te: string;
  hi: string;
  ur: string;
  ar: string;
  zh: string;
  [key: string]: string; // Index signature for dynamic access
}

interface LanguageSwitcherProps {
  currentLocale: Locale;
  translations: LanguageSwitcherTranslations;
}

export function LanguageSwitcher({ currentLocale, translations }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (newLocale: Locale) => {
    if (!pathname) return;
    // Pathname will be /<locale>/... or just / for default locale before middleware redirection
    // For simplicity, we reconstruct the path ensuring the new locale is at the start
    const newPath = `/${newLocale}${pathname.substring(pathname.startsWith(`/${currentLocale}`) ? `/${currentLocale}`.length : 0) || '/'}`;
    
    // If the current path is just `/` (e.g. for default locale before middleware adds prefix),
    // and new locale is also default, ensure we go to /defaultLocale/
    // Or more robustly, rely on Next.js to handle the path correctly when pushing `/${newLocale}/...`
    
    const segments = pathname.split('/');
    if (segments[1] === currentLocale) {
      segments[1] = newLocale;
      router.push(segments.join('/'));
    } else {
      // If pathname doesn't start with currentLocale (e.g. default locale at root)
      router.push(`/${newLocale}${pathname}`);
    }
  };
  
  const getLanguageName = (locale: Locale): string => {
    return translations[locale] || locale.toUpperCase();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{translations.changeLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {siteConfig.i18n.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => changeLocale(locale)}
            disabled={currentLocale === locale}
          >
            {getLanguageName(locale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
