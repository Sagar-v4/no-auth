import { z } from "zod";
import { deviceInput, deviceUpdateInput } from ".";

export const updateByDeviceDataInput = z.object({
  filter: z.array(deviceInput),
  update: deviceUpdateInput,
});
export type UpdateByDeviceDataInput = z.infer<typeof updateByDeviceDataInput>;

export const updateByDeviceDataOutput = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByDeviceDataOutput = z.infer<typeof updateByDeviceDataOutput>;
