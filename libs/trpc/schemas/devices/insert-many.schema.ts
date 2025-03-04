import { z } from "zod";
import { deviceInsertInputSchema } from ".";

export const insertManyDeviceInputSchema = z.object({
  docs: z.array(deviceInsertInputSchema),
});
export type InsertManyDeviceInputType = z.infer<
  typeof insertManyDeviceInputSchema
>;

export const insertManyDeviceOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyDeviceOutputType = z.infer<
  typeof insertManyDeviceOutputSchema
>;
