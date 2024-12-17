import { z } from 'zod';

// Parse environment variables
const envSchema = z.object({
  VITE_BACKEND_URL: z.string().url(), 
  VITE_TERMINAL_BACKEND_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

// Check if the environment variables are valid
if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv?.error?.format());
  throw new Error('Environment validation failed.');
}
const validatedEnv = parsedEnv.data;


/**
 * getEnv: Function to safely retrieve environment variables.
 *
 * @param {string} key - The environment variable key to retrieve.
 * @param {string} [fallback] - A fallback value if the key is not found.
 * @returns {string} - The value of the environment variable or fallback.
 * @throws {Error} - If the key is missing and no fallback is provided.
 */
export const getEnv = (key, fallback) => {
  const value = validatedEnv[key];
  if (value === undefined) {
    if (fallback !== undefined) {
      return fallback; 
    } else {
      throw new Error(`Missing environment variable: ${key}`); // Throw error for missing key
    }
  }
  return value;
};
