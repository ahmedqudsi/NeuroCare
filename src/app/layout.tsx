
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
// import { ThemeProvider } from '@/providers/theme-provider'; // Temporarily commented out
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/config/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.appName,
    template: `%s | ${siteConfig.appName}`,
  },
  description: siteConfig.description,
  icons: ['/favicon.ico'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false} // Was previously set to false
          disableTransitionOnChange
        > */}
          {children}
          <Toaster />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
