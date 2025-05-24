import { MotivationalQuoteCard } from '@/components/features/common/MotivationalQuoteCard';
import { motivationalQuotes } from '@/lib/constants';
import { siteConfig } from '@/config/site';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function DashboardPage() {
  // Select a random quote for display
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Welcome to {siteConfig.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your companion for stroke awareness and recovery.
        </p>
      </div>
      
      <MotivationalQuoteCard quote={randomQuote} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
             <Lightbulb className="mr-2 h-5 w-5 text-accent" />
            Quick Tips
          </CardTitle>
          <CardDescription>Important reminders for your well-being.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
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
