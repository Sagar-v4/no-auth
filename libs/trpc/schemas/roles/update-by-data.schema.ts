import { z } from "zod";
import { roleInputSchema, roleUpdateInputSchema } from ".";

export const updateByRoleDataInputSchema = z.object({
  filter: z.array(roleInputSchema),
  update: roleUpdateInputSchema,
});
export type UpdateByRoleDataInputType = z.infer<
  typeof updateByRoleDataInputSchema
>;

export const updateByRoleDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByRoleDataOutputType = z.infer<
  typeof updateByRoleDataOutputSchema
>;
