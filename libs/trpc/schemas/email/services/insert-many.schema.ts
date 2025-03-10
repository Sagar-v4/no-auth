import { z } from "zod";
import { emailServiceInsertInputSchema } from ".";

export const insertManyEmailServiceInputSchema = z.object({
  docs: z.array(emailServiceInsertInputSchema),
});
export type InsertManyEmailServiceInputType = z.infer<
  typeof insertManyEmailServiceInputSchema
>;

export const insertManyEmailServiceOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyEmailServiceOutputType = z.infer<
  typeof insertManyEmailServiceOutputSchema
>;
