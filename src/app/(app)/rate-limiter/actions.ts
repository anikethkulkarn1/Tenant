'use server';

import { adjustRateLimit, AdjustRateLimitInput, AdjustRateLimitOutput } from '@/ai/flows/dynamic-rate-limit-adjustment';

export async function getAdjustedRateLimit(
  input: AdjustRateLimitInput
): Promise<{ success: boolean; data?: AdjustRateLimitOutput; error?: string }> {
  try {
    const result = await adjustRateLimit(input);
    return { success: true, data: result };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    console.error(error);
    return { success: false, error };
  }
}
