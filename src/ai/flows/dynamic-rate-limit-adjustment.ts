'use server';

/**
 * @fileOverview Dynamically adjusts API rate limits using AI, considering the tenant's subscription plan,
 * usage patterns, and real-time system load to ensure fair resource allocation and optimal performance across all subscription tiers.
 *
 * - adjustRateLimit - A function that handles the rate limit adjustment process.
 * - AdjustRateLimitInput - The input type for the adjustRateLimit function.
 * - AdjustRateLimitOutput - The return type for the adjustRateLimit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustRateLimitInputSchema = z.object({
  subscriptionPlan: z
    .enum(['free', 'pro', 'enterprise'])
    .describe('The tenant company subscription plan.'),
  usagePatterns: z.string().describe('The recent usage patterns of the tenant company.'),
  systemLoad: z.string().describe('The real-time system load information.'),
});
export type AdjustRateLimitInput = z.infer<typeof AdjustRateLimitInputSchema>;

const AdjustRateLimitOutputSchema = z.object({
  newRateLimit: z
    .number()
    .describe('The adjusted API rate limit for the tenant company.'),
  reason: z.string().describe('The reason for the rate limit adjustment.'),
});
export type AdjustRateLimitOutput = z.infer<typeof AdjustRateLimitOutputSchema>;

export async function adjustRateLimit(input: AdjustRateLimitInput): Promise<AdjustRateLimitOutput> {
  return adjustRateLimitFlow(input);
}

const adjustRateLimitPrompt = ai.definePrompt({
  name: 'adjustRateLimitPrompt',
  input: {schema: AdjustRateLimitInputSchema},
  output: {schema: AdjustRateLimitOutputSchema},
  prompt: `You are an expert system administrator specializing in adjusting API rate limits based on subscription plan, usage patterns, and real-time system load.

  Based on the following information, determine the appropriate API rate limit for the tenant and provide a reason for the adjustment.

  Subscription Plan: {{{subscriptionPlan}}}
  Usage Patterns: {{{usagePatterns}}}
  System Load: {{{systemLoad}}}

  Consider the subscription plan, usage patterns, and system load to determine the new rate limit and provide a clear explanation for the change.
  The new rate limit should be a number.
  `,
});

const adjustRateLimitFlow = ai.defineFlow(
  {
    name: 'adjustRateLimitFlow',
    inputSchema: AdjustRateLimitInputSchema,
    outputSchema: AdjustRateLimitOutputSchema,
  },
  async input => {
    const {output} = await adjustRateLimitPrompt(input);
    return output!;
  }
);
