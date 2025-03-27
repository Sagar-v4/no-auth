import { LoginMethodsEnum } from "@/lib/trpc/schemas/v1/users";
import { StringValue } from "ms";
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
  SYS_GMAIL_USER: z.string().email().nonempty(),
  SYS_GMAIL_PASS: z.string().nonempty(),
  SYS_SSO_URL: z.string().url().nonempty(),
  SYS_JWT_ACCESS_EXPIRE: z.custom<StringValue>(),
  SYS_JWT_ACCESS_SECRET: z.string().nonempty(),
  SYS_JWT_REFRESH_EXPIRE: z.custom<StringValue>(),
  SYS_JWT_REFRESH_SECRET: z.string().nonempty(),
  SYS_ADMIN_EMAIL: z.string().email().nonempty(),
  SYS_SSO_UUID: z.string().uuid().nonempty(),
  SYS_SSO_WEBHOOK_URL: z.string().url().nonempty(),
  SYS_SSO_REDIRECT_URL: z.string().url().nonempty(),
  SYS_SSO_LOGIN_METHOD: z.custom<LoginMethodsEnum>(),
  NO_AUTH_SSO_SECRET: z.string().nanoid().nonempty(),
  NO_AUTH_API_KEY_SECRET: z.string().nanoid().nonempty(),
});

export type Env = z.infer<typeof envSchema>;
