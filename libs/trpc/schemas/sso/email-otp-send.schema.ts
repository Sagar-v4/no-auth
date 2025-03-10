import { z } from "zod";

export const sendEmailOTPSSOInputSchema = z.object({
  email: z.string().email().nonempty(),
  sso_uuid: z.string().uuid().optional(),
  device_uuid: z.string().uuid().nonempty(),
});
export type SendEmailOTPSSOInputType = z.infer<
  typeof sendEmailOTPSSOInputSchema
>;

export const sendEmailOTPSSOOutputSchema = z.object({
  service_id: z.string().uuid().nonempty(),
});
export type SendEmailOTPSSOOutputType = z.infer<
  typeof sendEmailOTPSSOOutputSchema
>;
