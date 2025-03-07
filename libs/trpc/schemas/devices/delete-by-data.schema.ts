import { z } from "zod";
import { deviceInputSchema } from ".";

export const deleteByDeviceDataInputSchema = z.object({
  filter: z.array(deviceInputSchema),
});
export type DeleteByDeviceDataInputType = z.infer<
  typeof deleteByDeviceDataInputSchema
>;

export const deleteByDeviceDataOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByDeviceDataOutputType = z.infer<
  typeof deleteByDeviceDataOutputSchema
>;
