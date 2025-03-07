import { z } from "zod";
import { STATUS_ENUM } from ".";

export const ssoInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  client_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  redirect_url: z.string().url().optional(),
  webhook_url: z.string().url().optional(),
  show_device_users: z.boolean().optional(),
  status: STATUS_ENUM.optional(),
});
export type SSOInputSchema = z.infer<typeof ssoInputSchema>;

export const ssoOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  client_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  redirect_url: z.string().url().nonempty(),
  webhook_url: z.string().url().nonempty(),
  show_device_users: z.boolean(),
  status: STATUS_ENUM,
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type SSOOutputSchema = z.infer<typeof ssoOutputSchema>;

export const ssoInsertInputSchema = z.object({
  client_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  redirect_url: z.string().url().nonempty(),
  webhook_url: z.string().url().nonempty(),
  show_device_users: z.boolean().optional(),
});
export type SSOInsertInputSchema = z.infer<typeof ssoInsertInputSchema>;

export const ssoIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type SSOIdInputSchema = z.infer<typeof ssoIdInputSchema>;

export const ssoUpdateInputSchema = z.object({
  client_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  redirect_url: z.string().url().optional(),
  webhook_url: z.string().url().optional(),
  show_device_users: z.boolean().optional(),
  status: STATUS_ENUM.optional(),
});
export type SSOUpdateInputSchema = z.infer<typeof ssoUpdateInputSchema>;
