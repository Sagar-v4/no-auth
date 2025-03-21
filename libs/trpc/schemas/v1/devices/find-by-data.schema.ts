import { z } from "zod";
import { deviceInput, deviceOutput } from ".";

export const findByDeviceDataInput = z.object({
  filter: z.array(deviceInput),
});
export type FindByDeviceDataInput = z.infer<typeof findByDeviceDataInput>;

export const findByDeviceDataOutput = z.array(deviceOutput);
export type FindByDeviceDataOutput = z.infer<typeof findByDeviceDataOutput>;
