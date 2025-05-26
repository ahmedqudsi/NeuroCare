
import { ExerciseCard } from '@/components/features/rehabilitation/ExerciseCard';
import { rehabilitationExercises } from '@/lib/constants';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/types';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  const title = dictionary.nav?.rehabExercises || 'Rehabilitation Exercises';
  const description = dictionary.rehabPage?.description || 'Guided physical therapy exercises to aid in stroke recovery.';
  return {
    title,
    description,
  };
}

export default async function RehabilitationPage({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale);
  const pageDict = dictionary.rehabPage || {};
  const exerciseCardDict = dictionary.exerciseCard || {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {pageDict.title || 'Rehabilitation Exercises'}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {pageDict.subTitle || 'Follow these exercises to help regain strength and mobility. Consult your doctor or therapist before starting any new exercise program.'}
        </p>
      </div>
      
      {rehabilitationExercises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rehabilitationExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} dictionary={exerciseCardDict} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          {pageDict.noExercises || 'No exercises available at the moment. Please check back later.'}
        </p>
      )}
    </div>
  );
}
