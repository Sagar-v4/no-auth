import { z } from "zod";
import { permissionGroupInputSchema, permissionGroupOutputSchema } from ".";

export const findByPermissionGroupDataInputSchema = z.object({
  filter: z.array(permissionGroupInputSchema),
});
export type FindByPermissionGroupDataInputType = z.infer<
  typeof findByPermissionGroupDataInputSchema
>;

export const findByPermissionGroupDataOutputSchema = z.array(
  permissionGroupOutputSchema,
);
export type FindByPermissionGroupDataOutputType = z.infer<
  typeof findByPermissionGroupDataOutputSchema
>;
