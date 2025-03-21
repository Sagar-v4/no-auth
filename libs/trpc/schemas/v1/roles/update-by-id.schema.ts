import { z } from "zod";
import { roleOutput, roleIdInput, roleUpdateInput } from ".";

export const updateByRoleIdInput = z.object({
  filter: roleIdInput,
  update: roleUpdateInput,
});
export type UpdateByRoleIdInput = z.infer<typeof updateByRoleIdInput>;

export const updateByRoleIdOutput = roleOutput;
export type UpdateByRoleIdOutput = z.infer<typeof updateByRoleIdOutput>;
