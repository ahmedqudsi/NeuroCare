
import { MotivationalQuoteCard } from '@/components/features/common/MotivationalQuoteCard';
import { motivationalQuotes } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react'; 
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
          {/* Custom SVG for Brain in Stethoscope - Revised for better visibility */}
          <svg
            viewBox="0 0 24 24"
            className="inline-block h-10 w-10 ml-2 text-primary animate-pulse"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2" 
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stethoscope Tube pointing left, adjusted for thicker stroke */}
            <path d="M8 12 A4 4 0 0 0 2 10" fill="none"/>
            {/* Stethoscope Bell (Circle) */}
            <circle cx="15.5" cy="12" r="6.5" fill="none"/> 
            {/* Simplified Brain inside Bell - 3 larger circles */}
            <circle cx="15.5" cy="10" r="2.5" stroke="none" /> {/* Central top */}
            <circle cx="13" cy="13.5" r="2.5" stroke="none" /> {/* Bottom left */}
            <circle cx="18" cy="13.5" r="2.5" stroke="none" /> {/* Bottom right */}
          </svg>
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
