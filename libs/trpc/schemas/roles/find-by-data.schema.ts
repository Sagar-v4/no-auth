import { z } from "zod";
import { roleInputSchema, roleOutputSchema } from ".";

export const findByRoleDataInputSchema = z.object({
  filter: z.array(roleInputSchema),
});
export type FindByRoleDataInputType = z.infer<typeof findByRoleDataInputSchema>;

export const findByRoleDataOutputSchema = z.array(roleOutputSchema);
export type FindByRoleDataOutputType = z.infer<
  typeof findByRoleDataOutputSchema
>;
