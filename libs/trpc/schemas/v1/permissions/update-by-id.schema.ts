import { z } from "zod";
import { permissionOutput, permissionIdInput, permissionUpdateInput } from ".";

export const updateByPermissionIdInput = z.object({
  filter: permissionIdInput,
  update: permissionUpdateInput,
});
export type UpdateByPermissionIdInput = z.infer<
  typeof updateByPermissionIdInput
>;

export const updateByPermissionIdOutput = permissionOutput;
export type UpdateByPermissionIdOutput = z.infer<
  typeof updateByPermissionIdOutput
>;
