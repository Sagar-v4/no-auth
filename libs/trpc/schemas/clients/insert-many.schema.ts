import { z } from "zod";
import { clientInsertInputSchema } from ".";

export const insertManyClientInputSchema = z.object({
  docs: z.array(clientInsertInputSchema),
});
export type InsertManyClientInputType = z.infer<
  typeof insertManyClientInputSchema
>;

export const insertManyClientOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyClientOutputType = z.infer<
  typeof insertManyClientOutputSchema
>;
