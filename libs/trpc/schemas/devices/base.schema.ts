import { z } from "zod";
import { STATUS_ENUM } from ".";

export const deviceInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  status: STATUS_ENUM.optional(),
});
export type DeviceDataInputType = z.infer<typeof deviceInputSchema>;

export const deviceOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  status: STATUS_ENUM,
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type DeviceOutputSchema = z.infer<typeof deviceOutputSchema>;

export const deviceInsertInputSchema = z.object({});
export type DeviceInsertInputSchema = z.infer<typeof deviceInsertInputSchema>;

export const deviceIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type DeviceIdInputSchema = z.infer<typeof deviceIdInputSchema>;

export const deviceUpdateInputSchema = z.object({
  status: STATUS_ENUM.optional(),
});
export type DeviceUpdateInputSchema = z.infer<typeof deviceUpdateInputSchema>;
