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
  MONGO_URI: z.string().url().nonempty(),
  GMAIL_USER: z.string().email().nonempty(),
  GMAIL_PASS: z.string().nonempty(),
  ADMIN_EMAIL: z.string().email().nonempty(),
  NO_AUTH_SSO_SECRET: z.string().nanoid().nonempty(),
  NO_AUTH_API_KEY_SECRET: z.string().nanoid().nonempty(),
});

export type Env = z.infer<typeof envSchema>;
