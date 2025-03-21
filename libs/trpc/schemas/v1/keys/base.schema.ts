import { z } from "zod";
import { STATUS_ENUM } from ".";

export const keyInput = z.object({
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
export type KeyInput = z.infer<typeof keyInput>;

export const keyOutput = z.object({
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
export type KeyOutput = z.infer<typeof keyOutput>;

export const keyInsertInput = z.object({
  secret: z.string().nanoid().nonempty(),
  user_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
});
export type KeyInsertInput = z.infer<typeof keyInsertInput>;

export const keyIdInput = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
    secret: z.string().nanoid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type KeyIdInput = z.infer<typeof keyIdInput>;

export const keyUpdateInput = z.object({
  secret: z.string().nanoid().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  expiry: z.number().optional(),
  status: STATUS_ENUM.optional(),
});
export type KeyUpdateInput = z.infer<typeof keyUpdateInput>;
