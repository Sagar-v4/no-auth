import { z } from "zod";
import { deviceIdInput, deviceOutput, deviceUpdateInput } from ".";

export const updateByDeviceIdInput = z.object({
  filter: deviceIdInput,
  update: deviceUpdateInput,
});
export type UpdateByDeviceIdInput = z.infer<typeof updateByDeviceIdInput>;

export const updateByDeviceIdOutput = deviceOutput;
export type UpdateByDeviceIdOutput = z.infer<typeof updateByDeviceIdOutput>;
