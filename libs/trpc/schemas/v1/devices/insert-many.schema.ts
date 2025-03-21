import { z } from "zod";
import { deviceInsertInput } from ".";

export const insertManyDeviceInput = z.object({
  doc: z.array(deviceInsertInput),
});
export type InsertManyDeviceInput = z.infer<typeof insertManyDeviceInput>;

export const insertManyDeviceOutput = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyDeviceOutput = z.infer<typeof insertManyDeviceOutput>;
