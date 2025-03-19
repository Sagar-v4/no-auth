import { z } from "zod";
import {
  organizationInputSchema,
  organizationOutputSchema,
} from "../organizations";
import { userInputSchema, userOutputSchema } from "../users";
import { roleInputSchema, roleOutputSchema } from ".";

export const findByRoleRefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    organization: organizationInputSchema,
    role: roleInputSchema,
  }),
});
export type FindByRoleRefInputType = z.infer<typeof findByRoleRefInputSchema>;

export const findByRoleRefOutputSchema = z.array(
  roleOutputSchema
    .merge(z.object({ user_id: userOutputSchema }))
    .merge(z.object({ organization_id: organizationOutputSchema })),
);
export type FindByRoleRefOutputType = z.infer<typeof findByRoleRefOutputSchema>;
