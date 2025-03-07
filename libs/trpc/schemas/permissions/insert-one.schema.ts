import { z } from "zod";
import { permissionInsertInputSchema, permissionOutputSchema } from ".";

export const insertOnePermissionInputSchema = z.object({
  doc: permissionInsertInputSchema,
});
export type InsertOnePermissionInputType = z.infer<
  typeof insertOnePermissionInputSchema
>;

export const insertOnePermissionOutputSchema = permissionOutputSchema;
export type InsertOnePermissionOutputType = z.infer<
  typeof insertOnePermissionOutputSchema
>;
