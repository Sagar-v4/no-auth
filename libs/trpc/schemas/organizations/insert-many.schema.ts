import { z } from "zod";
import { organizationInsertInputSchema } from ".";

export const insertManyOrganizationInputSchema = z.object({
  doc: z.array(organizationInsertInputSchema),
});
export type InsertManyOrganizationInputType = z.infer<
  typeof insertManyOrganizationInputSchema
>;

export const insertManyOrganizationOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyOrganizationOutputType = z.infer<
  typeof insertManyOrganizationOutputSchema
>;
