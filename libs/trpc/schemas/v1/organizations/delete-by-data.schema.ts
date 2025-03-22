import { z } from "zod";
import { organizationInput } from ".";

export const deleteByOrganizationDataInput = z.object({
  filter: z.array(organizationInput),
});
export type DeleteByOrganizationDataInput = z.infer<
  typeof deleteByOrganizationDataInput
>;

export const deleteByOrganizationDataOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByOrganizationDataOutput = z.infer<
  typeof deleteByOrganizationDataOutput
>;
