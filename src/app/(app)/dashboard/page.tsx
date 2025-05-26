// This page needs to be adapted for i18n
// For now, it's a server component, we'll need to pass dictionary
// or convert to client component if it uses hooks for locale.
// For simplicity, we'll assume it gets `params` with `locale`.

import { MotivationalQuoteCard } from '@/components/features/common/MotivationalQuoteCard';
import { motivationalQuotes } from '@/lib/constants';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale, Dictionary } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface DashboardPageProps {
  params: { locale: Locale };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const dictionary = await getDictionary(params.locale);
  const appName = dictionary.appName || "NeuroCare";
  const pageTranslations = dictionary.dashboard || {};

  // Select a random quote for display
  // Ensure Math.random() is handled correctly for server/client components if this becomes client-side
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {pageTranslations.welcome ? pageTranslations.welcome.replace('{appName}', appName) : `Welcome to ${appName}`}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {pageTranslations.description || "Your companion for stroke awareness and recovery."}
        </p>
      </div>
      
      <MotivationalQuoteCard quote={randomQuote} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
             <Lightbulb className="mr-2 h-5 w-5 text-accent" />
            Quick Tips {/* This also needs translation */}
          </CardTitle>
          <CardDescription>Important reminders for your well-being. {/* This also needs translation */}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {/* These list items also need to be translated */}
            <li>Explore the FAST Test to learn about stroke symptoms.</li>
            <li>Check out Rehabilitation Exercises to aid your recovery.</li>
            <li>Use the AI Speech Therapy tool to practice your speech.</li>
            <li>Stay positive and consistent with your recovery plan.</li>
          </ul>
        </CardContent>
      </Card>

    </div>
  );
}
