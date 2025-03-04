import { z } from "zod";
import { deviceInputSchema, deviceUpdateInputSchema } from ".";

export const updateByDeviceDataInputSchema = z.object({
  filter: z.array(deviceInputSchema),
  update: deviceUpdateInputSchema,
});
export type UpdateByDeviceDataInputType = z.infer<
  typeof updateByDeviceDataInputSchema
>;

export const updateByDeviceDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByDeviceDataOutputType = z.infer<
  typeof updateByDeviceDataOutputSchema
>;
