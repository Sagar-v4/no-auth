import { z } from "zod";
import { formInsertInputSchema } from ".";

export const insertManyFormInputSchema = z.object({
  docs: z.array(formInsertInputSchema),
});
export type InsertManyFormInputType = z.infer<typeof insertManyFormInputSchema>;

export const insertManyFormOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyFormOutputType = z.infer<
  typeof insertManyFormOutputSchema
>;
