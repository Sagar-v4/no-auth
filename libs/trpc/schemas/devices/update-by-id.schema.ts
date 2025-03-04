import { z } from "zod";
import {
  deviceIdInputSchema,
  deviceOutputSchema,
  deviceUpdateInputSchema,
} from ".";

export const updateByDeviceIdInputSchema = z.object({
  filter: deviceIdInputSchema,
  update: deviceUpdateInputSchema,
});
export type UpdateByDeviceIdInputType = z.infer<
  typeof updateByDeviceIdInputSchema
>;

export const updateByDeviceIdOutputSchema = deviceOutputSchema;
export type UpdateByDeviceIdOutputType = z.infer<
  typeof updateByDeviceIdOutputSchema
>;
