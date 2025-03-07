import { z } from "zod";
import { permissionGroupIdInputSchema, permissionGroupOutputSchema } from ".";

export const findByPermissionGroupIdInputSchema = z.object({
  filter: permissionGroupIdInputSchema,
});
export type FindByPermissionGroupIdInputType = z.infer<
  typeof findByPermissionGroupIdInputSchema
>;

export const findByPermissionGroupIdOutputSchema =
  permissionGroupOutputSchema.or(z.undefined());
export type FindByPermissionGroupIdOutputType = z.infer<
  typeof findByPermissionGroupIdOutputSchema
>;
