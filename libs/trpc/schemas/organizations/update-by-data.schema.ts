import { z } from "zod";
import { organizationInputSchema, organizationUpdateInputSchema } from ".";

export const updateByOrganizationDataInputSchema = z.object({
  filter: z.array(organizationInputSchema),
  update: organizationUpdateInputSchema,
});
export type UpdateByOrganizationDataInputType = z.infer<
  typeof updateByOrganizationDataInputSchema
>;

export const updateByOrganizationDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByOrganizationDataOutputType = z.infer<
  typeof updateByOrganizationDataOutputSchema
>;
