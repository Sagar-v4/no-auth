import { z } from "zod";
import { STATUS_ENUM } from ".";

export const keyInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  secret: z.string().nanoid().optional(),
  user_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  expiry: z.number().optional(),
  status: STATUS_ENUM.optional(),
});
export type KeyInputSchema = z.infer<typeof keyInputSchema>;

export const keyOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  secret: z.string().nanoid().nonempty(),
  user_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  expiry: z.number(),
  status: STATUS_ENUM,
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type KeyOutputSchema = z.infer<typeof keyOutputSchema>;

export const keyInsertInputSchema = z.object({
  secret: z.string().nanoid().nonempty(),
  user_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
});
export type KeyInsertInputSchema = z.infer<typeof keyInsertInputSchema>;

export const keyIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
    secret: z.string().nanoid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type KeyIdInputSchema = z.infer<typeof keyIdInputSchema>;

export const keyUpdateInputSchema = z.object({
  secret: z.string().nanoid().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  expiry: z.number().optional(),
  status: STATUS_ENUM.optional(),
});
export type KeyUpdateInputSchema = z.infer<typeof keyUpdateInputSchema>;
