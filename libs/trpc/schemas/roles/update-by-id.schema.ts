import { z } from "zod";
import { roleOutputSchema, roleIdInputSchema, roleUpdateInputSchema } from ".";

export const updateByRoleIdInputSchema = z.object({
  filter: roleIdInputSchema,
  update: roleUpdateInputSchema,
});
export type UpdateByRoleIdInputType = z.infer<typeof updateByRoleIdInputSchema>;

export const updateByRoleIdOutputSchema = roleOutputSchema;
export type UpdateByRoleIdOutputType = z.infer<
  typeof updateByRoleIdOutputSchema
>;
