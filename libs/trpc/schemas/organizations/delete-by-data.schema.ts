import { z } from "zod";
import { organizationInputSchema } from ".";

export const deleteByOrganizationDataInputSchema = z.object({
  filter: z.array(organizationInputSchema),
});
export type DeleteByOrganizationDataInputType = z.infer<
  typeof deleteByOrganizationDataInputSchema
>;

export const deleteByOrganizationDataOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByOrganizationDataOutputType = z.infer<
  typeof deleteByOrganizationDataOutputSchema
>;
