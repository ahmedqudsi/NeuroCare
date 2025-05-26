import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

const { locales, defaultLocale } = siteConfig.i18n;

// Function to get locale from request headers or default
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Basic parsing, can be improved with a library like `accept-language-parser`
    const preferredLocales = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
    for (const locale of preferredLocales) {
      if (locales.includes(locale as any)) {
        return locale;
      }
      // Check for base locale (e.g., 'en' from 'en-US')
      const baseLocale = locale.split('-')[0];
      if (locales.includes(baseLocale as any)) {
        return baseLocale;
      }
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // If no locale is in the path, redirect to the detected or default locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
  
  // For root path, ensure it redirects to /<locale>/
  if (pathname === '/') {
    request.nextUrl.pathname = `/${locale}`;
  }
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/` and static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images/).*)'],
};
