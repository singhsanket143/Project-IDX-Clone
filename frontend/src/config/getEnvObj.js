import { getEnv } from "./getEnv";

/**
 * getEnvObj: Centralized object to access environment variables in a clean and structured way.
 */
export const getEnvObj = {
  BACKEND_URL: getEnv('VITE_BACKEND_URL'),
  TERMINAL_BACKEND_URL: getEnv('VITE_TERMINAL_BACKEND_URL', ''),
};