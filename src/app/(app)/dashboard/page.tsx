
import { MotivationalQuoteCard } from '@/components/features/common/MotivationalQuoteCard';
import { motivationalQuotes } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Brain, Stethoscope } from 'lucide-react'; 
import { siteConfig } from '@/config/site'; 
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Welcome to your NeuroCare dashboard.',
};

export default async function DashboardPage() {
  const appName = siteConfig.appName;

  // For server components, Math.random() is fine as it runs once per render on the server.
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  // Static text, previously from dictionary
  const pageTranslations = {
    welcome: `Welcome to`, 
    description: "Your companion for stroke awareness and recovery."
  };
  const commonTranslations = {
    quickTipsTitle: "Quick Tips",
    quickTipsDescription: "Important reminders for your well-being.",
    tipExploreFAST: "Explore the FAST Test to learn about stroke symptoms.",
    tipRehabExercises: "Check out Rehabilitation Exercises to aid your recovery.",
    tipSpeechTherapy: "Use the AI Speech Therapy tool to practice your speech.",
    tipStayPositive: "Stay positive and consistent with your recovery plan."
  };

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl animate-in fade-in slide-in-from-top-8 duration-700">
          {pageTranslations.welcome}{' '}
          <span className="text-primary animate-pulse">{appName}</span>
          <Stethoscope className="inline-block h-8 w-8 mx-1 text-primary animate-pulse" />
          <Brain className="inline-block h-8 w-8 text-primary animate-pulse" />
        </h1>
        <p className="mt-2 text-lg text-muted-foreground animate-in fade-in-0 slide-in-from-top-10 duration-700 delay-200">
          {pageTranslations.description}
        </p>
      </div>
      
      <div className="animate-in fade-in-0 slide-in-from-left-8 duration-700 delay-400">
        <MotivationalQuoteCard quote={randomQuote} />
      </div>

      <Card className="animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-600">
        <CardHeader>
          <CardTitle className="flex items-center">
             <Lightbulb className="mr-2 h-5 w-5 text-accent" />
            {commonTranslations.quickTipsTitle}
          </CardTitle>
          <CardDescription>
            {commonTranslations.quickTipsDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li className="hover:scale-105 hover:text-foreground/90 transform transition-transform duration-200 ease-in-out origin-left">{commonTranslations.tipExploreFAST}</li>
            <li className="hover:scale-105 hover:text-foreground/90 transform transition-transform duration-200 ease-in-out origin-left">{commonTranslations.tipRehabExercises}</li>
            <li className="hover:scale-105 hover:text-foreground/90 transform transition-transform duration-200 ease-in-out origin-left">{commonTranslations.tipSpeechTherapy}</li>
            <li className="hover:scale-105 hover:text-foreground/90 transform transition-transform duration-200 ease-in-out origin-left">{commonTranslations.tipStayPositive}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
