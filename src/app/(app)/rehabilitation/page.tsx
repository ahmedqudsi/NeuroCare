import { ExerciseCard } from '@/components/features/rehabilitation/ExerciseCard';
import { rehabilitationExercises } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rehabilitation Exercises',
  description: 'Guided physical therapy exercises to aid in stroke recovery.',
};

export default function RehabilitationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Rehabilitation Exercises</h1>
        <p className="mt-1 text-muted-foreground">
          Follow these exercises to help regain strength and mobility. Consult your doctor or therapist before starting any new exercise program.
        </p>
      </div>
      
      {rehabilitationExercises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rehabilitationExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No exercises available at the moment. Please check back later.</p>
      )}
    </div>
  );
}
