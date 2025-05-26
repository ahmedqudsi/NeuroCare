
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

export async function generateStaticParams() {
  return siteConfig.i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale?: Locale } }): Promise<Metadata> {
  const currentLocale = params?.locale || siteConfig.i18n.defaultLocale;
  const dictionary = await getDictionary(currentLocale);
  const appName = dictionary.appName || "NeuroCare"; // Fallback if not in dictionary
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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: Locale }; // locale can be undefined initially for root "/"
}>) {
  const currentLocale = params?.locale || siteConfig.i18n.defaultLocale;
  return (
    <html lang={currentLocale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Changed from "system"
          enableSystem={false} // Explicitly false as "System" option was removed
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
