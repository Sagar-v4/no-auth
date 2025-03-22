import { z } from "zod";
import { organizationIdInput, organizationOutput } from ".";

export const findByOrganizationIdInput = z.object({
  filter: organizationIdInput,
});
export type FindByOrganizationIdInput = z.infer<
  typeof findByOrganizationIdInput
>;

export const findByOrganizationIdOutput = organizationOutput.or(z.undefined());
export type FindByOrganizationIdOutput = z.infer<
  typeof findByOrganizationIdOutput
>;
