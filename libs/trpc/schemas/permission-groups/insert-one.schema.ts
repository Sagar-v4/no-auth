import { z } from "zod";
import {
  permissionGroupInsertInputSchema,
  permissionGroupOutputSchema,
} from ".";

export const insertOnePermissionGroupInputSchema = z.object({
  doc: permissionGroupInsertInputSchema,
});
export type InsertOnePermissionGroupInputType = z.infer<
  typeof insertOnePermissionGroupInputSchema
>;

export const insertOnePermissionGroupOutputSchema = permissionGroupOutputSchema;
export type InsertOnePermissionGroupOutputType = z.infer<
  typeof insertOnePermissionGroupOutputSchema
>;
