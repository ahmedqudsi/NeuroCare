
import { MotivationalQuoteCard } from '@/components/features/common/MotivationalQuoteCard';
import { motivationalQuotes } from '@/lib/constants';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { headers } from 'next/headers'; // For unique key for Math.random on server

interface DashboardPageProps {
  params: { locale: Locale };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const dictionary = await getDictionary(params.locale);
  const appName = dictionary.appName || "NeuroCare";
  const pageTranslations = dictionary.dashboard || {};
  const commonTranslations = dictionary.common || {}; // Assuming common translations like 'quickTips'

  // To ensure random quote selection is deterministic for SSR or changes on refresh
  // Using a simple pseudo-random based on something unique per request if needed, or just basic Math.random
  // For server components, Math.random() is fine as it runs once per render on the server.
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {pageTranslations.welcome?.replace('{appName}', appName) || `Welcome to ${appName}`}
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
            {commonTranslations.quickTipsTitle || "Quick Tips"}
          </CardTitle>
          <CardDescription>
            {commonTranslations.quickTipsDescription || "Important reminders for your well-being."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>{commonTranslations.tipExploreFAST || "Explore the FAST Test to learn about stroke symptoms."}</li>
            <li>{commonTranslations.tipRehabExercises || "Check out Rehabilitation Exercises to aid your recovery."}</li>
            <li>{commonTranslations.tipSpeechTherapy || "Use the AI Speech Therapy tool to practice your speech."}</li>
            <li>{commonTranslations.tipStayPositive || "Stay positive and consistent with your recovery plan."}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
