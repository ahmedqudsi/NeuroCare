
import { SpeechAnalysisClient } from '@/components/features/speech-therapy/SpeechAnalysisClient';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/types';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  const title = dictionary.nav?.speechTherapyAI || 'AI Speech Therapy';
  const description = dictionary.speechTherapyPage?.description || 'Get AI-powered feedback on your speech to aid in recovery.';
  return {
    title,
    description,
  };
}

export default async function SpeechTherapyPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  return (
    <div className="container mx-auto py-8">
      <SpeechAnalysisClient dictionary={dictionary.speechTherapyPage || {}} />
    </div>
  );
}
