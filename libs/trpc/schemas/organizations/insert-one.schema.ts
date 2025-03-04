import { z } from "zod";
import { organizationInsertInputSchema, organizationOutputSchema } from ".";

export const insertOneOrganizationInputSchema = z.object({
  doc: organizationInsertInputSchema,
});
export type InsertOneOrganizationInputType = z.infer<
  typeof insertOneOrganizationInputSchema
>;

export const insertOneOrganizationOutputSchema = organizationOutputSchema;
export type InsertOneOrganizationOutputType = z.infer<
  typeof insertOneOrganizationOutputSchema
>;
