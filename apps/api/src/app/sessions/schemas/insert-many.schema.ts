import { z } from "zod";
import { sessionInsertInputSchema } from ".";

export const insertManySessionInputSchema = z.object({
  docs: z.array(sessionInsertInputSchema),
});
export type InsertManySessionInputType = z.infer<
  typeof insertManySessionInputSchema
>;

export const insertManySessionOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManySessionOutputType = z.infer<
  typeof insertManySessionOutputSchema
>;
