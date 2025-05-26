
import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

const { locales, defaultLocale } = siteConfig.i18n;

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
    for (const locale of preferredLocales) {
      if (locales.includes(locale as any)) {
        return locale;
      }
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

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next(); // Continue without redirecting if locale is already present
  }

  const locale = getLocale(request);
  
  // Construct the new URL for redirection
  const newUrl = request.nextUrl.clone(); // Clone the URL object to modify it

  if (pathname === '/') {
    newUrl.pathname = `/${locale}`;
  } else {
    // Ensure leading slash for the original pathname if it's not just the root
    const originalPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
    newUrl.pathname = `/${locale}${originalPath}`;
  }
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images/).*)'],
};
