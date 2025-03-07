import { z } from "zod";
import { permissionInputSchema } from ".";

export const deleteByPermissionDataInputSchema = z.object({
  filter: z.array(permissionInputSchema),
});
export type DeleteByPermissionDataInputType = z.infer<
  typeof deleteByPermissionDataInputSchema
>;

export const deleteByPermissionDataOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByPermissionDataOutputType = z.infer<
  typeof deleteByPermissionDataOutputSchema
>;
