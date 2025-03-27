import { z } from "zod";

export const secretVerifyInput = z.object({
  email_service_uuid: z.string().uuid().nonempty(),
  secret: z.string().nonempty(),
});
export type SecretVerifyInput = z.infer<typeof secretVerifyInput>;

export const secretVerifyOutput = z.object({
  is_valid_secret: z.boolean(),
  user_uuid: z.string().uuid().optional(),
});
export type SecretVerifyOutput = z.infer<typeof secretVerifyOutput>;
