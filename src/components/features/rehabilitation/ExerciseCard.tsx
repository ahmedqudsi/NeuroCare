
"use client";

import type { Exercise } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ListChecks, PlayCircle } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  dictionary: { // For potential translations within the card
    instructionsTitle?: string;
    watchVideoButton?: string;
  }
}

export function ExerciseCard({ exercise, dictionary }: ExerciseCardProps) {
  const handleWatchVideo = () => {
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + " physical therapy exercise")}`;
    window.open(youtubeSearchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {exercise.imageUrl && (
        <div className="relative w-full h-48 bg-secondary">
            <Image
              src={exercise.imageUrl}
              alt={`Image for ${exercise.name}`}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={exercise.imageHint || "physical therapy"}
            />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{exercise.name}</CardTitle>
        <CardDescription className="pt-1">{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div>
          <h4 className="text-sm font-medium flex items-center mb-1">
            <ListChecks className="mr-2 h-4 w-4 text-primary" />
            {dictionary.instructionsTitle || "Instructions:"}
            </h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
            {exercise.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleWatchVideo}>
          <PlayCircle className="mr-2 h-4 w-4" />
          {dictionary.watchVideoButton || "Watch Video"}
        </Button>
      </CardFooter>
    </Card>
  );
}
