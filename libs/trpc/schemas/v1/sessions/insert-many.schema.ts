import { z } from "zod";
import { sessionInsertInput } from ".";

export const insertManySessionInput = z.object({
  doc: z.array(sessionInsertInput),
});
export type InsertManySessionInput = z.infer<typeof insertManySessionInput>;

export const insertManySessionOutput = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManySessionOutput = z.infer<typeof insertManySessionOutput>;
