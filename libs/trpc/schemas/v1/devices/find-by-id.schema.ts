import { z } from "zod";
import { deviceIdInput, deviceOutput } from ".";

export const findByDeviceIdInput = z.object({
  filter: deviceIdInput,
});
export type FindByDeviceIdInput = z.infer<typeof findByDeviceIdInput>;

export const findByDeviceIdOutput = deviceOutput.or(z.undefined());
export type FindByDeviceIdOutput = z.infer<typeof findByDeviceIdOutput>;
