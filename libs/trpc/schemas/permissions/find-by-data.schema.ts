import { z } from "zod";
import { permissionInputSchema, permissionOutputSchema } from ".";

export const findByPermissionDataInputSchema = z.object({
  filter: z.array(permissionInputSchema),
});
export type FindByPermissionDataInputType = z.infer<
  typeof findByPermissionDataInputSchema
>;

export const findByPermissionDataOutputSchema = z.array(permissionOutputSchema);
export type FindByPermissionDataOutputType = z.infer<
  typeof findByPermissionDataOutputSchema
>;
