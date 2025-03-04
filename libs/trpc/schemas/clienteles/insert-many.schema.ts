import { z } from "zod";
import { clienteleInsertInputSchema } from ".";

export const insertManyClienteleInputSchema = z.object({
  docs: z.array(clienteleInsertInputSchema),
});
export type InsertManyClienteleInputType = z.infer<
  typeof insertManyClienteleInputSchema
>;

export const insertManyClienteleOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyClienteleOutputType = z.infer<
  typeof insertManyClienteleOutputSchema
>;
