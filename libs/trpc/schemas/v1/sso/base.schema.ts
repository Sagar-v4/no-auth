import { z } from "zod";
import { STATUS_ENUM } from ".";

export const ssoInput = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  secret: z.string().nanoid().optional(),
  user_id: z.string().optional(),
  organization_id: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type SSOInput = z.infer<typeof ssoInput>;

export const ssoOutput = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  secret: z.string().nanoid().nonempty(),
  user_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  status: STATUS_ENUM,
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type SSOOutput = z.infer<typeof ssoOutput>;

export const ssoInsertInput = z.object({
  secret: z.string().nanoid().optional(),
  user_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
});
export type SSOInsertInput = z.infer<typeof ssoInsertInput>;

export const ssoIdInput = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
    secret: z.string().nanoid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type SSOIdInput = z.infer<typeof ssoIdInput>;

export const ssoUpdateInput = z.object({
  user_id: z.string().optional(),
  organization_id: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type SSOUpdateInput = z.infer<typeof ssoUpdateInput>;
