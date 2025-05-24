"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Mic, Sparkles, MessageSquareWarning } from 'lucide-react';
import { aiSpeechFeedback, type AISpeechFeedbackInput } from '@/ai/flows/ai-speech-feedback';

const formSchema = z.object({
  speechText: z.string().min(10, { message: 'Please enter at least 10 characters of speech.' }).max(1000, {message: 'Speech text cannot exceed 1000 characters.'}),
});

type FormData = z.infer<typeof formSchema>;

export function SpeechAnalysisClient() {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      speechText: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const inputData: AISpeechFeedbackInput = { speechText: data.speechText };
      const result = await aiSpeechFeedback(inputData);
      setFeedback(result.feedback);
    } catch (err) {
      console.error("Error getting speech feedback:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Mic className="mr-2 h-6 w-6 text-primary" />
          AI Speech Rehabilitation
        </CardTitle>
        <CardDescription>
          Enter the text of your speech below. Our AI will analyze it and provide feedback on pronunciation, fluency, and clarity.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="speechText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="speechText" className="text-base">Your Speech Text</FormLabel>
                  <FormControl>
                    <Textarea
                      id="speechText"
                      placeholder="Type or paste your speech here..."
                      rows={6}
                      className="resize-none"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-4">
            <Button type="submit" disabled={isLoading} className="w-full shadow-md hover:shadow-lg transition-shadow">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Feedback
                </>
              )}
            </Button>
            
            {error && (
              <Alert variant="destructive">
                <MessageSquareWarning className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {feedback && !error && (
              <Card className="mt-4 bg-secondary">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-accent" />
                    AI Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-sm">{feedback}</p>
                </CardContent>
              </Card>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
