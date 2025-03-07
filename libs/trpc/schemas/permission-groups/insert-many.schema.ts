import { z } from "zod";
import { permissionGroupInsertInputSchema } from ".";

export const insertManyPermissionGroupInputSchema = z.object({
  docs: z.array(permissionGroupInsertInputSchema),
});
export type InsertManyPermissionGroupInputType = z.infer<
  typeof insertManyPermissionGroupInputSchema
>;

export const insertManyPermissionGroupOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyPermissionGroupOutputType = z.infer<
  typeof insertManyPermissionGroupOutputSchema
>;
