import { z } from "zod";
import {
  permissionOutputSchema,
  permissionIdInputSchema,
  permissionUpdateInputSchema,
} from ".";

export const updateByPermissionIdInputSchema = z.object({
  filter: permissionIdInputSchema,
  update: permissionUpdateInputSchema,
});
export type UpdateByPermissionIdInputType = z.infer<
  typeof updateByPermissionIdInputSchema
>;

export const updateByPermissionIdOutputSchema = permissionOutputSchema;
export type UpdateByPermissionIdOutputType = z.infer<
  typeof updateByPermissionIdOutputSchema
>;
