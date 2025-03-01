import { z } from "zod";
import { organizationInputSchema } from ".";
import { clientInputSchema } from "../../clients/schemas";

export const deleteByOrganizationRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
  }),
});
export type DeleteByOrganizationRefInputType = z.infer<
  typeof deleteByOrganizationRefInputSchema
>;

export const deleteByOrganizationRefOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByOrganizationRefOutputType = z.infer<
  typeof deleteByOrganizationRefOutputSchema
>;
