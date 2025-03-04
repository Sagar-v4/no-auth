import { z } from "zod";
import { deviceInputSchema, deviceOutputSchema } from ".";

export const findByDeviceDataInputSchema = z.object({
  filter: z.array(deviceInputSchema),
});
export type FindByDeviceDataInputType = z.infer<
  typeof findByDeviceDataInputSchema
>;

export const findByDeviceDataOutputSchema = z.array(deviceOutputSchema);
export type FindByDeviceDataOutputType = z.infer<
  typeof findByDeviceDataOutputSchema
>;
