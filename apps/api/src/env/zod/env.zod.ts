import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3001),
  NODE_ENV: z
    .union([
      z.literal("DEVELOPMENT"),
      z.literal("TESTING"),
      z.literal("PRODUCTION"),
    ])
    .default("DEVELOPMENT"),
  MONGO_URI: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
