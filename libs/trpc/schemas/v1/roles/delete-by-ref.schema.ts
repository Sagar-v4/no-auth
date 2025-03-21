import { z } from "zod";
import { userInput } from "../users";
import { organizationInput } from "../organizations";
import { roleInput } from ".";

export const deleteByRoleRefInput = z.object({
  filter: z.object({
    user: userInput,
    organization: organizationInput,
    role: roleInput,
  }),
});
export type DeleteByRoleRefInput = z.infer<typeof deleteByRoleRefInput>;

export const deleteByRoleRefOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByRoleRefOutput = z.infer<typeof deleteByRoleRefOutput>;
