import { z } from "zod";
import {
  organizationOutput,
  organizationIdInput,
  organizationUpdateInput,
} from ".";

export const updateByOrganizationIdInput = z.object({
  filter: organizationIdInput,
  update: organizationUpdateInput,
});
export type UpdateByOrganizationIdInput = z.infer<
  typeof updateByOrganizationIdInput
>;

export const updateByOrganizationIdOutput = organizationOutput;
export type UpdateByOrganizationIdOutput = z.infer<
  typeof updateByOrganizationIdOutput
>;
