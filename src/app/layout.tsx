import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/types'; // Assuming Locale is defined in types

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// This metadata might need dynamic parts if the title/description change per locale
export const metadata: Metadata = {
  title: {
    default: "NeuroCare", // Fallback, will be replaced by translated appName
    template: `%s | NeuroCare`, // Fallback
  },
  description: siteConfig.description, // This might also need to be translated
};

export async function generateStaticParams() {
  return siteConfig.i18n.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Defaulting to light, system theme removed
          enableSystem={false} // System theme removed
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
