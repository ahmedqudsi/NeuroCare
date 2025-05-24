import { InteractiveFASTTestClient } from '@/components/features/fast-test/InteractiveFASTTestClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAST Stroke Test',
  description: 'Learn to recognize stroke symptoms using the FAST test.',
};

export default function FASTTestPage() {
  return (
    <div className="container mx-auto py-8">
      <InteractiveFASTTestClient />
    </div>
  );
}
