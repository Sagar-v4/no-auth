import { z } from "zod";
import { clientInputSchema } from "../clients";
import { organizationInputSchema } from "../organizations";
import { roleInputSchema } from ".";

export const deleteByRoleRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
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
