
import { InteractiveFASTTestClient } from '@/components/features/fast-test/InteractiveFASTTestClient';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/types';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  // Assuming nav.fastTest is the key for the title
  const title = dictionary.nav?.fastTest || 'FAST Stroke Test'; 
  const description = dictionary.fastTestPage?.description || 'Learn to recognize stroke symptoms using the FAST test.';
  return {
    title,
    description,
  };
}

export default async function FASTTestPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  // Pass dictionary to client component if it needs translations
  return (
    <div className="container mx-auto py-8">
      <InteractiveFASTTestClient dictionary={dictionary.fastTestPage || {}} />
    </div>
  );
}
