// src/components/layout/header.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { ThemeToggleButton } from './theme-toggle-button';
import { LanguageSwitcher } from './language-switcher';
import { Brain, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import type { Locale, Dictionary, NavigationItem } from '@/types';

interface HeaderProps {
  currentLocale: Locale;
  dictionary: Dictionary;
}

export function Header({ currentLocale, dictionary }: HeaderProps) {
  const pathname = usePathname();
  const appName = dictionary.appName || "NeuroCare"; // Fallback app name
  const navTranslations = dictionary.nav || {};
  const langSwitcherTranslations = dictionary.languageSwitcher || {};

  // Filter out sidebarNav items that don't have a valid translation key
  const validSidebarNav = siteConfig.sidebarNav.filter(item => navTranslations[item.labelKey]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href={`/${currentLocale}/dashboard`} className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline-block font-bold">{appName}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-4 lg:space-x-6">
          {validSidebarNav.map((item: NavigationItem) => {
            const itemPath = `/${currentLocale}${item.href}`;
            // More robust active check for nested routes
            const isActive = pathname === itemPath || (item.href !== '/dashboard' && pathname.startsWith(itemPath + '/'));
            return (
              <Link
                key={item.href}
                href={itemPath}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  isActive
                    ? "text-primary font-semibold" // Active link
                    : "text-foreground/75" // Inactive link
                )}
              >
                {navTranslations[item.labelKey] || item.labelKey}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher currentLocale={currentLocale} translations={langSwitcherTranslations} />
          <ThemeToggleButton />
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{langSwitcherTranslations.toggleMenu || "Toggle menu"}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs p-6">
                 <div className="mb-6">
                   <Link href={`/${currentLocale}/dashboard`} className="flex items-center space-x-2">
                     <Brain className="h-7 w-7 text-primary" />
                     <span className="text-lg font-semibold">
                       {appName}
                     </span>
                   </Link>
                 </div>
                <nav className="flex flex-col space-y-3">
                  {validSidebarNav.map((item: NavigationItem) => {
                     const itemPath = `/${currentLocale}${item.href}`;
                     const isActive = pathname === itemPath || (item.href !== '/dashboard' && pathname.startsWith(itemPath + '/'));
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={itemPath}
                          className={cn(
                            "flex items-center rounded-md p-2 text-base font-medium transition-colors",
                            isActive
                              ? "bg-accent text-accent-foreground" // Active mobile link
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground" // Inactive mobile link
                          )}
                        >
                          <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                          <span className="truncate">{navTranslations[item.labelKey] || item.labelKey}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
