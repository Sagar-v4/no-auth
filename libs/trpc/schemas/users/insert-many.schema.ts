import { z } from "zod";
import { userInsertInputSchema } from ".";

export const insertManyUserInputSchema = z.object({
  doc: z.array(userInsertInputSchema),
});
export type InsertManyUserInputType = z.infer<typeof insertManyUserInputSchema>;

export const insertManyUserOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyUserOutputType = z.infer<
  typeof insertManyUserOutputSchema
>;
