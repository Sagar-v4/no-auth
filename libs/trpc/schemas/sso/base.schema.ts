import { z } from "zod";
import { STATUS_ENUM } from ".";

export const ssoInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  secret: z.string().nanoid().optional(),
  user_id: z.string().optional(),
  organization_id: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type SSOInputSchema = z.infer<typeof ssoInputSchema>;

export const ssoOutputSchema = z.object({
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
export type SSOOutputSchema = z.infer<typeof ssoOutputSchema>;

export const ssoInsertInputSchema = z.object({
  secret: z.string().nanoid().optional(),
  user_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
});
export type SSOInsertInputSchema = z.infer<typeof ssoInsertInputSchema>;

export const ssoIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
    secret: z.string().nanoid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type SSOIdInputSchema = z.infer<typeof ssoIdInputSchema>;

export const ssoUpdateInputSchema = z.object({
  user_id: z.string().optional(),
  organization_id: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type SSOUpdateInputSchema = z.infer<typeof ssoUpdateInputSchema>;
