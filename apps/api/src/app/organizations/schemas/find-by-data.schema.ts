import { z } from "zod";
import { organizationInputSchema, organizationOutputSchema } from ".";

export const findByOrganizationDataInputSchema = z.object({
  filter: z.array(organizationInputSchema),
});
export type FindByOrganizationDataInputType = z.infer<
  typeof findByOrganizationDataInputSchema
>;

export const findByOrganizationDataOutputSchema = z.array(
  organizationOutputSchema,
);
export type FindByOrganizationDataOutputType = z.infer<
  typeof findByOrganizationDataOutputSchema
>;
