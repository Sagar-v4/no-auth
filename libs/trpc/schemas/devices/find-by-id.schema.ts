import { z } from "zod";
import { deviceIdInputSchema, deviceOutputSchema } from ".";

export const findByDeviceIdInputSchema = z.object({
  filter: deviceIdInputSchema,
});
export type FindByDeviceIdInputType = z.infer<typeof findByDeviceIdInputSchema>;

export const findByDeviceIdOutputSchema = deviceOutputSchema.or(z.undefined());
export type FindByDeviceIdOutputType = z.infer<
  typeof findByDeviceIdOutputSchema
>;
