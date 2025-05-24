// src/ai/flows/ai-speech-feedback.ts
'use server';

/**
 * @fileOverview AI-powered speech feedback flow for stroke patients.
 *
 * - aiSpeechFeedback - A function that provides AI-driven feedback on speech.
 * - AISpeechFeedbackInput - The input type for the aiSpeechFeedback function.
 * - AISpeechFeedbackOutput - The return type for the aiSpeechFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISpeechFeedbackInputSchema = z.object({
  speechText: z
    .string()
    .describe('The text of the speech to be analyzed.'),
});
export type AISpeechFeedbackInput = z.infer<typeof AISpeechFeedbackInputSchema>;

const AISpeechFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The AI-generated feedback on the speech.'),
});
export type AISpeechFeedbackOutput = z.infer<typeof AISpeechFeedbackOutputSchema>;

export async function aiSpeechFeedback(input: AISpeechFeedbackInput): Promise<AISpeechFeedbackOutput> {
  return aiSpeechFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSpeechFeedbackPrompt',
  input: {schema: AISpeechFeedbackInputSchema},
  output: {schema: AISpeechFeedbackOutputSchema},
  prompt: `You are a speech therapist specializing in stroke rehabilitation.

You will analyze the following speech and provide feedback to the patient.
Focus on pronunciation, fluency, and clarity.

Speech: {{{speechText}}}
`,
});

const aiSpeechFeedbackFlow = ai.defineFlow(
  {
    name: 'aiSpeechFeedbackFlow',
    inputSchema: AISpeechFeedbackInputSchema,
    outputSchema: AISpeechFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
