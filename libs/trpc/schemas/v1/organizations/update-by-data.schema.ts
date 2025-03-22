import { z } from "zod";
import { organizationInput, organizationUpdateInput } from ".";

export const updateByOrganizationDataInput = z.object({
  filter: z.array(organizationInput),
  update: organizationUpdateInput,
});
export type UpdateByOrganizationDataInput = z.infer<
  typeof updateByOrganizationDataInput
>;

export const updateByOrganizationDataOutput = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByOrganizationDataOutput = z.infer<
  typeof updateByOrganizationDataOutput
>;
