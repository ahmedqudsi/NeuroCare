// src/app/page.tsx
// This page will be caught by middleware and redirected to /[locale]
// So, it can remain simple or be removed if all access goes through middleware.
// For now, a redirect here is fine as a fallback, though middleware should handle it.
import { siteConfig } from '@/config/site';
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to the default locale's dashboard or root.
  // Middleware should handle this, but as a fallback:
  redirect(`/${siteConfig.i18n.defaultLocale}/dashboard`);
}
