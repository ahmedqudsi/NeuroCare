
import { SpeechAnalysisClient } from '@/components/features/speech-therapy/SpeechAnalysisClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Speech Therapy',
  description: 'Get AI-powered feedback on your speech to aid in recovery.',
};

export default async function SpeechTherapyPage() {
  return (
    <div className="container mx-auto py-8">
      <SpeechAnalysisClient /> {/* dictionary prop removed */}
    </div>
  );
}
