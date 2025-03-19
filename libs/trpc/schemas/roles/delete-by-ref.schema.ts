import { z } from "zod";
import { userInputSchema } from "../users";
import { organizationInputSchema } from "../organizations";
import { roleInputSchema } from ".";

export const deleteByRoleRefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    organization: organizationInputSchema,
    role: roleInputSchema,
  }),
});
export type DeleteByRoleRefInputType = z.infer<
  typeof deleteByRoleRefInputSchema
>;

export const deleteByRoleRefOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByRoleRefOutputType = z.infer<
  typeof deleteByRoleRefOutputSchema
>;
