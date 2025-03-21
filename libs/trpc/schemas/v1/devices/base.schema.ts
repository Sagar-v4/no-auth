import { z } from "zod";
import { STATUS_ENUM } from ".";

export const deviceInput = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  status: STATUS_ENUM.optional(),
});
export type DeviceInput = z.infer<typeof deviceInput>;

export const deviceOutput = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  status: STATUS_ENUM,
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type DeviceOutput = z.infer<typeof deviceOutput>;

export const deviceInsertInput = z.object({});
export type DeviceInsertInput = z.infer<typeof deviceInsertInput>;

export const deviceIdInput = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type DeviceIdInput = z.infer<typeof deviceIdInput>;

export const deviceUpdateInput = z.object({
  status: STATUS_ENUM.optional(),
});
export type DeviceUpdateInput = z.infer<typeof deviceUpdateInput>;
