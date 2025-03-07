import { z } from "zod";
import { roleIdInputSchema, roleOutputSchema } from ".";

export const findByRoleIdInputSchema = z.object({
  filter: roleIdInputSchema,
});
export type FindByRoleIdInputType = z.infer<typeof findByRoleIdInputSchema>;

export const findByRoleIdOutputSchema = roleOutputSchema.or(z.undefined());
export type FindByRoleIdOutputType = z.infer<typeof findByRoleIdOutputSchema>;
