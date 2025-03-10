import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3001),
  NODE_ENV: z
    .union([
      z.literal("development"),
      z.literal("test"),
      z.literal("production"),
    ])
    .default("development"),
  MONGO_URI: z.string().url(),
  GMAIL_USER: z.string().email(),
  GMAIL_PASS: z.string(),
});

export type Env = z.infer<typeof envSchema>;
