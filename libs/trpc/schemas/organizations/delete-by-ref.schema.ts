import { z } from "zod";
import { organizationInputSchema } from ".";
import { clientInputSchema } from "../clients";

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
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByOrganizationRefOutputType = z.infer<
  typeof deleteByOrganizationRefOutputSchema
>;
