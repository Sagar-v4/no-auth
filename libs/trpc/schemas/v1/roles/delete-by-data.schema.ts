import { z } from "zod";
import { roleInput } from ".";

export const deleteByRoleDataInput = z.object({
  filter: z.array(roleInput),
});
export type DeleteByRoleDataInput = z.infer<typeof deleteByRoleDataInput>;

export const deleteByRoleDataOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByRoleDataOutput = z.infer<typeof deleteByRoleDataOutput>;
