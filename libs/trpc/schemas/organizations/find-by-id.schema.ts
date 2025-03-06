import { z } from "zod";
import { organizationIdInputSchema, organizationOutputSchema } from ".";

export const findByOrganizationIdInputSchema = z.object({
  filter: organizationIdInputSchema,
});
export type FindByOrganizationIdInputType = z.infer<
  typeof findByOrganizationIdInputSchema
>;

export const findByOrganizationIdOutputSchema = organizationOutputSchema.or(
  z.undefined(),
);
export type FindByOrganizationIdOutputType = z.infer<
  typeof findByOrganizationIdOutputSchema
>;
