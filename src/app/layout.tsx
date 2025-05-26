
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/types';
import { getDictionary } from '@/lib/get-dictionary';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// generateStaticParams should not be here as this layout doesn't have dynamic segments
// export async function generateStaticParams() {
//   return siteConfig.i18n.locales.map((locale) => ({ locale }));
// }

export async function generateMetadata({ params }: { params: { locale?: Locale } }): Promise<Metadata> {
  // For the root layout, locale might not be in params until middleware redirects.
  // Use defaultLocale for initial metadata.
  const currentLocale = params?.locale || siteConfig.i18n.defaultLocale;
  const dictionary = await getDictionary(currentLocale);
  const appName = dictionary.appName || "NeuroCare";
  const appDescription = dictionary.appDescription || siteConfig.description;
  return {
    title: {
      default: appName,
      template: `%s | ${appName}`,
    },
    description: appDescription,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  // params for RootLayout (app/layout.tsx) will be {} as it has no dynamic segments in its path.
  // locale is determined by middleware and the [locale] segment for nested layouts/pages.
}>) {
  // The lang attribute for the root HTML tag should reflect the actual locale being rendered.
  // Middleware ensures a locale prefix. For initial "/", use default.
  // However, specific [locale] layout will override this for its segment.
  // For the very first render before redirection, using defaultLocale is safest.
  const currentLocale = siteConfig.i18n.defaultLocale;
  return (
    <html lang={currentLocale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
