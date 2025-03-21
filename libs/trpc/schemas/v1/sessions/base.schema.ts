import { z } from "zod";
import { STATUS_ENUM } from ".";

export const sessionInput = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  user_id: z.string().optional(),
  device_id: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type SessionInput = z.infer<typeof sessionInput>;

export const sessionOutput = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  user_id: z.string().nonempty(),
  device_id: z.string().nonempty(),
  status: STATUS_ENUM,
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type SessionOutput = z.infer<typeof sessionOutput>;

export const sessionInsertInput = z.object({
  user_id: z.string().nonempty(),
  device_id: z.string().nonempty(),
});
export type SessionInsertInput = z.infer<typeof sessionInsertInput>;

export const sessionIdInput = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type SessionIdInput = z.infer<typeof sessionIdInput>;

export const sessionUpdateInput = z.object({
  user_id: z.string().optional(),
  device_id: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type SessionUpdateInput = z.infer<typeof sessionUpdateInput>;
