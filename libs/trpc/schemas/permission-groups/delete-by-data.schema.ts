import { z } from "zod";
import { permissionGroupInputSchema } from ".";

export const deleteByPermissionGroupDataInputSchema = z.object({
  filter: z.array(permissionGroupInputSchema),
});
export type DeleteByPermissionGroupDataInputType = z.infer<
  typeof deleteByPermissionGroupDataInputSchema
>;

export const deleteByPermissionGroupDataOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByPermissionGroupDataOutputType = z.infer<
  typeof deleteByPermissionGroupDataOutputSchema
>;
