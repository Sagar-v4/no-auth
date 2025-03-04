import { z } from "zod";
import {
  organizationOutputSchema,
  organizationIdInputSchema,
  organizationUpdateInputSchema,
} from ".";

export const updateByOrganizationIdInputSchema = z.object({
  filter: organizationIdInputSchema,
  update: organizationUpdateInputSchema,
});
export type UpdateByOrganizationIdInputType = z.infer<
  typeof updateByOrganizationIdInputSchema
>;

export const updateByOrganizationIdOutputSchema = organizationOutputSchema;
export type UpdateByOrganizationIdOutputType = z.infer<
  typeof updateByOrganizationIdOutputSchema
>;
