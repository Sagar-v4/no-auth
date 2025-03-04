import { z } from "zod";

export const deviceInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  status: z.string().optional(),
});
export type DeviceDataInputType = z.infer<typeof deviceInputSchema>;

export const deviceOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  status: z.string().nonempty(),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type DeviceOutputSchema = z.infer<typeof deviceOutputSchema>;

export const deviceInsertInputSchema = z.object({});
export type DeviceInsertInputSchema = z.infer<typeof deviceInsertInputSchema>;

export const deviceIdInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
});
export type DeviceIdInputSchema = z.infer<typeof deviceIdInputSchema>;

export const deviceUpdateInputSchema = z.object({
  status: z.string().optional(),
});
export type DeviceUpdateInputSchema = z.infer<typeof deviceUpdateInputSchema>;
