import { clientInputSchema, clientOutputSchema } from "../clients";
import { z } from "zod";
import { organizationInputSchema, organizationOutputSchema } from ".";

export const findByOrganizationRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
  }),
});
export type FindByOrganizationRefInputType = z.infer<
  typeof findByOrganizationRefInputSchema
>;

export const findByOrganizationRefOutputSchema = z.array(
  organizationOutputSchema.merge(z.object({ client_id: clientOutputSchema })),
);
export type FindByOrganizationRefOutputType = z.infer<
  typeof findByOrganizationRefOutputSchema
>;
