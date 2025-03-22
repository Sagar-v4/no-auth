import { z } from "zod";
import { organizationInsertInput } from ".";

export const insertManyOrganizationInput = z.object({
  doc: z.array(organizationInsertInput),
});
export type InsertManyOrganizationInput = z.infer<
  typeof insertManyOrganizationInput
>;

export const insertManyOrganizationOutput = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyOrganizationOutput = z.infer<
  typeof insertManyOrganizationOutput
>;
