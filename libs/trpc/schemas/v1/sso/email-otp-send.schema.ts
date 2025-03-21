import { z } from "zod";

export const sendEmailOTPSSOInput = z.object({
  email: z.string().email().nonempty(),
  sso_uuid: z.string().uuid().optional(),
  device_uuid: z.string().uuid().nonempty(),
});
export type SendEmailOTPSSOInput = z.infer<typeof sendEmailOTPSSOInput>;

export const sendEmailOTPSSOOutput = z.object({
  service_id: z.string().uuid().nonempty(),
});
export type SendEmailOTPSSOOutput = z.infer<typeof sendEmailOTPSSOOutput>;
