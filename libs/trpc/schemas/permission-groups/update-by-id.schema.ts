import { z } from "zod";
import {
  permissionGroupOutputSchema,
  permissionGroupIdInputSchema,
  permissionGroupUpdateInputSchema,
} from ".";

export const updateByPermissionGroupIdInputSchema = z.object({
  filter: permissionGroupIdInputSchema,
  update: permissionGroupUpdateInputSchema,
});
export type UpdateByPermissionGroupIdInputType = z.infer<
  typeof updateByPermissionGroupIdInputSchema
>;

export const updateByPermissionGroupIdOutputSchema =
  permissionGroupOutputSchema;
export type UpdateByPermissionGroupIdOutputType = z.infer<
  typeof updateByPermissionGroupIdOutputSchema
>;
