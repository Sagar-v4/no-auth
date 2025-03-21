import { z } from "zod";
import { organizationInput, organizationOutput } from ".";

export const findByOrganizationDataInput = z.object({
  filter: z.array(organizationInput),
});
export type FindByOrganizationDataInput = z.infer<
  typeof findByOrganizationDataInput
>;

export const findByOrganizationDataOutput = z.array(organizationOutput);
export type FindByOrganizationDataOutput = z.infer<
  typeof findByOrganizationDataOutput
>;
