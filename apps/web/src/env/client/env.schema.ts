"use client";

import { z } from "zod";

const envSchema = z.object({
  APP_BASE_URL: z.string().url(),
});

export const env = envSchema.parse({
  APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});
