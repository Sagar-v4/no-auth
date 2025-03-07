import { z } from "zod";
import { roleInsertInputSchema } from ".";

export const insertManyRoleInputSchema = z.object({
  docs: z.array(roleInsertInputSchema),
});
export type InsertManyRoleInputType = z.infer<typeof insertManyRoleInputSchema>;

export const insertManyRoleOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyRoleOutputType = z.infer<
  typeof insertManyRoleOutputSchema
>;
