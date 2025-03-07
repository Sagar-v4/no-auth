import { z } from "zod";
import {
  organizationInputSchema,
  organizationOutputSchema,
} from "../organizations";
import { clientInputSchema, clientOutputSchema } from "../clients";
import { roleInputSchema, roleOutputSchema } from ".";

export const findByRoleRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
    role: roleInputSchema,
  }),
});
export type FindByRoleRefInputType = z.infer<typeof findByRoleRefInputSchema>;

export const findByRoleRefOutputSchema = z.array(
  roleOutputSchema
    .merge(z.object({ client_id: clientOutputSchema }))
    .merge(z.object({ organization_id: organizationOutputSchema })),
);
export type FindByRoleRefOutputType = z.infer<typeof findByRoleRefOutputSchema>;
