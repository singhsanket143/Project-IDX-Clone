import { z } from "zod";

export const envSchema = z.object({
  MAIN_PORT: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().int().positive().default(3000)
  ),
  TERMINAL_SERVER_PORT: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().int().positive().default(3000)
  ),
  REACT_PROJECT_COMMAND: z.string()
})