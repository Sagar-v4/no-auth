import { z } from "zod";

export const verifyEmailOTPSSOInput = z.object({
  service_id: z.string().uuid().nonempty(),
  otp: z.number(),
});
export type VerifyEmailOTPSSOInput = z.infer<typeof verifyEmailOTPSSOInput>;

export const verifyEmailOTPSSOOutput = z.object({
  is_otp_correct: z.boolean(),
});
export type VerifyEmailOTPSSOOutput = z.infer<typeof verifyEmailOTPSSOOutput>;
