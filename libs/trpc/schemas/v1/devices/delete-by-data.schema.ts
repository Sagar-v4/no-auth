import { z } from "zod";
import { deviceInput } from ".";

export const deleteByDeviceDataInput = z.object({
  filter: z.array(deviceInput),
});
export type DeleteByDeviceDataInput = z.infer<typeof deleteByDeviceDataInput>;

export const deleteByDeviceDataOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByDeviceDataOutput = z.infer<typeof deleteByDeviceDataOutput>;
