import { z } from "zod";
import { keyInsertInputSchema } from ".";

export const insertManyKeyInputSchema = z.object({
  docs: z.array(keyInsertInputSchema),
});
export type InsertManyKeyInputType = z.infer<typeof insertManyKeyInputSchema>;

export const insertManyKeyOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyKeyOutputType = z.infer<typeof insertManyKeyOutputSchema>;
