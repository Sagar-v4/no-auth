import { z } from "zod";
import { roleInputSchema } from ".";

export const deleteByRoleDataInputSchema = z.object({
  filter: z.array(roleInputSchema),
});
export type DeleteByRoleDataInputType = z.infer<
  typeof deleteByRoleDataInputSchema
>;

export const deleteByRoleDataOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByRoleDataOutputType = z.infer<
  typeof deleteByRoleDataOutputSchema
>;
