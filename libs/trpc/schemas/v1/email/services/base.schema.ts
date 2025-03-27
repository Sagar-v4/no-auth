import { z } from "zod";
import { LOGIN_METHODS_ENUM } from "../../users";

export const metadata = z.object({
  secret: z.string().nonempty(),
  login_method: LOGIN_METHODS_ENUM,
});
export type Metadata = z.infer<typeof metadata>;

export const emailServiceInput = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  user_id: z.string().optional(),
  user_uuid: z.string().uuid().optional(),
  device_id: z.string().optional(),
  device_uuid: z.string().uuid().optional(),
  organization_id: z.string().optional(),
  sso_id: z.string().optional(),
  sso_uuid: z.string().uuid().optional(),
  metadata: metadata.optional(),
});
export type EmailServiceInput = z.infer<typeof emailServiceInput>;

export const emailServiceOutput = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  user_id: z.string().nonempty(),
  user_uuid: z.string().uuid().nonempty(),
  device_id: z.string().nonempty(),
  device_uuid: z.string().uuid().nonempty(),
  organization_id: z.string().nonempty(),
  sso_id: z.string().nonempty(),
  sso_uuid: z.string().uuid().nonempty(),
  metadata: metadata.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type EmailServiceOutput = z.infer<typeof emailServiceOutput>;

export const emailServiceInsertInput = z.object({
  user_id: z.string().nonempty(),
  user_uuid: z.string().uuid().nonempty(),
  device_id: z.string().nonempty(),
  device_uuid: z.string().uuid().nonempty(),
  organization_id: z.string().nonempty(),
  sso_id: z.string().nonempty(),
  sso_uuid: z.string().uuid().nonempty(),
  metadata: metadata.optional(),
});
export type EmailServiceInsertInput = z.infer<typeof emailServiceInsertInput>;

export const emailServiceIdInput = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type EmailServiceIdInput = z.infer<typeof emailServiceIdInput>;

export const emailServiceUpdateInput = z.object({
  user_id: z.string().optional(),
  device_id: z.string().optional(),
});
export type EmailServiceUpdateInput = z.infer<typeof emailServiceUpdateInput>;
