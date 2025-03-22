import { z } from "zod";
import { roleIdInput, roleOutput } from ".";

export const findByRoleIdInput = z.object({
  filter: roleIdInput,
});
export type FindByRoleIdInput = z.infer<typeof findByRoleIdInput>;

export const findByRoleIdOutput = roleOutput.or(z.undefined());
export type FindByRoleIdOutput = z.infer<typeof findByRoleIdOutput>;
