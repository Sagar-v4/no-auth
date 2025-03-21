import { z } from "zod";
import { roleInput, roleUpdateInput } from ".";

export const updateByRoleDataInput = z.object({
  filter: z.array(roleInput),
  update: roleUpdateInput,
});
export type UpdateByRoleDataInput = z.infer<typeof updateByRoleDataInput>;

export const updateByRoleDataOutput = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByRoleDataOutput = z.infer<typeof updateByRoleDataOutput>;
