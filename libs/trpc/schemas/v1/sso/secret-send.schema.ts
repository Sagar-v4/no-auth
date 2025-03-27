import { z } from "zod";
import { LOGIN_METHODS_ENUM } from "../users";

export const secretSendInput = z.object({
  email: z.string().email().nonempty(),
  sso_uuid: z.string().uuid().nonempty(),
});
export type SecretSendInput = z.infer<typeof secretSendInput>;

export const secretSendOutput = z.object({
  email_service_uuid: z.string().uuid().nonempty(),
  login_method: LOGIN_METHODS_ENUM,
});
export type SecretSendOutput = z.infer<typeof secretSendOutput>;
