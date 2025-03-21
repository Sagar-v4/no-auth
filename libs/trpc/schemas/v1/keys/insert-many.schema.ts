import { z } from "zod";
import { keyInsertInput } from ".";

export const insertManyKeyInput = z.object({
  doc: z.array(keyInsertInput),
});
export type InsertManyKeyInput = z.infer<typeof insertManyKeyInput>;

export const insertManyKeyOutput = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyKeyOutput = z.infer<typeof insertManyKeyOutput>;
