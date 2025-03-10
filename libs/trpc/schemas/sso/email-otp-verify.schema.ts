import { z } from "zod";

export const verifyEmailOTPSSOInputSchema = z.object({
  service_id: z.string().uuid().nonempty(),
  otp: z.number(),
});
export type VerifyEmailOTPSSOInputType = z.infer<
  typeof verifyEmailOTPSSOInputSchema
>;

export const verifyEmailOTPSSOOutputSchema = z.object({
  is_otp_correct: z.boolean(),
});
export type VerifyEmailOTPSSOOutputType = z.infer<
  typeof verifyEmailOTPSSOOutputSchema
>;
