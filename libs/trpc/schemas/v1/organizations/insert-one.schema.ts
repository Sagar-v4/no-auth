import { z } from "zod";
import { organizationInsertInput, organizationOutput } from ".";

export const insertOneOrganizationInput = z.object({
  doc: organizationInsertInput,
});
export type InsertOneOrganizationInput = z.infer<
  typeof insertOneOrganizationInput
>;

export const insertOneOrganizationOutput = organizationOutput;
export type InsertOneOrganizationOutput = z.infer<
  typeof insertOneOrganizationOutput
>;
