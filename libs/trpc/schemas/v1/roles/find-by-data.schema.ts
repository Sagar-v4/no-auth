import { z } from "zod";
import { roleInput, roleOutput } from ".";

export const findByRoleDataInput = z.object({
  filter: z.array(roleInput),
});
export type FindByRoleDataInput = z.infer<typeof findByRoleDataInput>;

export const findByRoleDataOutput = z.array(roleOutput);
export type FindByRoleDataOutput = z.infer<typeof findByRoleDataOutput>;
