
"use client";

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Mic, Sparkles, MessageSquareWarning } from 'lucide-react';
import { aiSpeechFeedback, type AISpeechFeedbackInput, type AISpeechFeedbackOutput } from '@/ai/flows/ai-speech-feedback';

const formSchema = z.object({
  speechText: z.string().min(10, { message: 'Please enter at least 10 characters of speech.' }).max(1000, {message: 'Speech text cannot exceed 1000 characters.'}),
});

type FormData = z.infer<typeof formSchema>;

interface SpeechAnalysisClientProps {
 dictionary: {
    title?: string;
    description?: string;
    labelText?: string;
    placeholderText?: string;
    buttonLoading?: string;
    buttonDefault?: string;
    errorTitle?: string;
    feedbackTitle?: string;
    overallAssessmentTitle?: string;
    pronunciationTitle?: string;
    fluencyTitle?: string;
    clarityTitle?: string;
    suggestionsTitle?: string;
    validationMinChars?: string;
    validationMaxChars?: string;
 }
}


export function SpeechAnalysisClient({ dictionary }: SpeechAnalysisClientProps) {
  const [feedback, setFeedback] = useState<AISpeechFeedbackOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentFormSchema = z.object({
    speechText: z.string()
      .min(10, { message: dictionary.validationMinChars || 'Please enter at least 10 characters of speech.' })
      .max(1000, { message: dictionary.validationMaxChars || 'Speech text cannot exceed 1000 characters.'}),
  });
  
  const form = useForm<FormData>({
    resolver: zodResolver(currentFormSchema),
    defaultValues: {
      speechText: '',
    },
  });
  
  // Update resolver if dictionary changes (e.g., on locale change)
  useEffect(() => {
    form.reset(undefined, { keepValues: true }); // Re-validate with new messages potentially
  }, [dictionary, form]);


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const inputData: AISpeechFeedbackInput = { speechText: data.speechText };
      const result = await aiSpeechFeedback(inputData);
      setFeedback(result);
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
          {dictionary.title || "AI Speech Rehabilitation"}
        </CardTitle>
        <CardDescription>
          {dictionary.description || "Enter the text of your speech below. Our AI will analyze it and provide structured feedback on pronunciation, fluency, and clarity."}
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
                  <FormLabel htmlFor="speechText" className="text-base">{dictionary.labelText || "Your Speech Text"}</FormLabel>
                  <FormControl>
                    <Textarea
                      id="speechText"
                      placeholder={dictionary.placeholderText || "Type or paste your speech here..."}
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
                  {dictionary.buttonLoading || "Analyzing..."}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {dictionary.buttonDefault || "Get Feedback"}
                </>
              )}
            </Button>
            
            {error && (
              <Alert variant="destructive">
                <MessageSquareWarning className="h-4 w-4" />
                <AlertTitle>{dictionary.errorTitle || "Error"}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {feedback && !error && (
              <Card className="mt-4 bg-secondary">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-accent" />
                    {dictionary.feedbackTitle || "AI Feedback"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-base mb-1">{dictionary.overallAssessmentTitle || "Overall Assessment:"}</h4>
                      <p className="whitespace-pre-wrap text-muted-foreground">{feedback.overallAssessment}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-1">{dictionary.pronunciationTitle || "Pronunciation:"}</h4>
                      <p className="whitespace-pre-wrap text-muted-foreground">{feedback.pronunciationFeedback}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-1">{dictionary.fluencyTitle || "Fluency:"}</h4>
                      <p className="whitespace-pre-wrap text-muted-foreground">{feedback.fluencyFeedback}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-1">{dictionary.clarityTitle || "Clarity:"}</h4>
                      <p className="whitespace-pre-wrap text-muted-foreground">{feedback.clarityFeedback}</p>
                    </div>
                    {feedback.suggestions && feedback.suggestions.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-base mb-1">{dictionary.suggestionsTitle || "Suggestions for Improvement:"}</h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          {feedback.suggestions.map((suggestion, index) => (
                            <li key={index} className="whitespace-pre-wrap">{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
