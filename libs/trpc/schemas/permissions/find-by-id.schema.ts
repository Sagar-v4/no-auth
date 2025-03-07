import { z } from "zod";
import { permissionIdInputSchema, permissionOutputSchema } from ".";

export const findByPermissionIdInputSchema = z.object({
  filter: permissionIdInputSchema,
});
export type FindByPermissionIdInputType = z.infer<
  typeof findByPermissionIdInputSchema
>;

export const findByPermissionIdOutputSchema = permissionOutputSchema.or(
  z.undefined(),
);
export type FindByPermissionIdOutputType = z.infer<
  typeof findByPermissionIdOutputSchema
>;
