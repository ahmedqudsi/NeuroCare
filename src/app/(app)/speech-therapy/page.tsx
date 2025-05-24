import { SpeechAnalysisClient } from '@/components/features/speech-therapy/SpeechAnalysisClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Speech Therapy',
  description: 'Get AI-powered feedback on your speech to aid in recovery.',
};

export default function SpeechTherapyPage() {
  return (
    <div className="container mx-auto py-8">
      <SpeechAnalysisClient />
    </div>
  );
}
