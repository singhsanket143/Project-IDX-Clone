import dotenv from 'dotenv';
import { envSchema } from './envSchema.js';
dotenv.config();


const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv?.error?.format());
  throw new Error('Environment validation failed.');
}

const validatedEnvData = parsedEnv.data;



/**
 * Retrieves an environment variable with error handling.
 * @param {string} key - The environment variable name.
 * @param {*} defaultValue - The fallback value if the variable is undefined.
 * @returns {*} - The environment variable value or the default value.
 */

export const getEnv = (key, defaultValue = null) => {
  try {

    const value = validatedEnvData[key];
    if (value === undefined || null) { // if not persent then thorw Error
      throw new Error(`Environment variable "${key}" is not defined.`);
    }

    return value;
  } catch (error) {
    console.error(`Error retrieving environment variable: ${error.message}`);
    return defaultValue;
  }
}

export const envObj = {
  MAIN_PORT: getEnv("MAIN_PORT", 3000),
  TERMINAL_SERVER_PORT: getEnv("TERMINAL_SERVER_PORT", 4000),
  REACT_PROJECT_COMMAND: getEnv("REACT_PROJECT_COMMAND")
}

