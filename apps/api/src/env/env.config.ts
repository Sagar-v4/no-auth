import { envSchema } from "@/env/env.schema";

export const envConfig = (config: Record<string, unknown>) => {
  return envSchema.parse(config);
};
