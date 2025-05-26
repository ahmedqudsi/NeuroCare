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
  overallAssessment: z.string().describe('An overall assessment of the speech quality.'),
  pronunciationFeedback: z.string().describe('Specific feedback on pronunciation, including any mispronounced words or sounds.'),
  fluencyFeedback: z.string().describe('Specific feedback on fluency, noting the flow, rhythm, and any hesitations or choppiness.'),
  clarityFeedback: z.string().describe('Specific feedback on clarity, evaluating how easy the speech is to understand.'),
  suggestions: z.array(z.string()).describe('Actionable suggestions for improvement, typically 2-3 specific tips.'),
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
Analyze the following speech and provide detailed, structured feedback to the patient.

Speech: {{{speechText}}}

Please provide your output based on the following structure:
1.  Overall Assessment: Give a brief summary of the speech quality.
2.  Pronunciation Feedback: Comment on any mispronounced words or sounds. Be specific.
3.  Fluency Feedback: Assess the flow and rhythm of the speech. Note any hesitations, repetitions, or choppiness.
4.  Clarity Feedback: Evaluate how easy the speech is to understand. Mention any factors affecting clarity.
5.  Suggestions: Provide 2-3 specific, actionable suggestions for improvement. List them as an array of strings.
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
