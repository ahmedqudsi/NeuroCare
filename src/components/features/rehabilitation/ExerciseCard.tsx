
"use client";

import type { Exercise } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListChecks, PlayCircle, Play } from 'lucide-react'; // Added Play icon

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const handleWatchVideo = () => {
    // Refined search query for better specificity
    const searchQuery = `${exercise.name} stroke rehabilitation exercise guide`;
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    window.open(youtubeSearchUrl, '_blank', 'noopener,noreferrer');
  };

  // Static text, previously from dictionary
  const cardStaticText = {
    instructionsTitle: "Instructions:",
    watchVideoButton: "Watch Video Guide" // Updated button text slightly
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div 
        className="relative w-full h-48 bg-muted flex items-center justify-center cursor-pointer hover:bg-accent/10 transition-colors group"
        onClick={handleWatchVideo}
        aria-label={`Watch video guide for ${exercise.name}`}
      >
        <Play className="h-20 w-20 text-primary group-hover:scale-110 transition-transform duration-200" fill="currentColor" />
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{exercise.name}</CardTitle>
        <CardDescription className="pt-1">{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div>
          <h4 className="text-sm font-medium flex items-center mb-1">
            <ListChecks className="mr-2 h-4 w-4 text-primary" />
            {cardStaticText.instructionsTitle}
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
          {cardStaticText.watchVideoButton}
        </Button>
      </CardFooter>
    </Card>
  );
}
