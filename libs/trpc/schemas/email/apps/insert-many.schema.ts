import { z } from "zod";
import { emailAppInsertInputSchema } from ".";

export const insertManyEmailAppInputSchema = z.object({
  docs: z.array(emailAppInsertInputSchema),
});
export type InsertManyEmailAppInputType = z.infer<
  typeof insertManyEmailAppInputSchema
>;

export const insertManyEmailAppOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyEmailAppOutputType = z.infer<
  typeof insertManyEmailAppOutputSchema
>;
