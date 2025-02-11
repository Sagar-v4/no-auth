import { envSchema } from "@/env/zod/env.zod";

export const envConfig = (config: Record<string, unknown>) => {
  return envSchema.parse(config);
};
