import { z } from "zod";
import { permissionInsertInputSchema } from ".";

export const insertManyPermissionInputSchema = z.object({
  docs: z.array(permissionInsertInputSchema),
});
export type InsertManyPermissionInputType = z.infer<
  typeof insertManyPermissionInputSchema
>;

export const insertManyPermissionOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyPermissionOutputType = z.infer<
  typeof insertManyPermissionOutputSchema
>;
