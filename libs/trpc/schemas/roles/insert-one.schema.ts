import { z } from "zod";
import { roleInsertInputSchema, roleOutputSchema } from ".";

export const insertOneRoleInputSchema = z.object({
  doc: roleInsertInputSchema,
});
export type InsertOneRoleInputType = z.infer<typeof insertOneRoleInputSchema>;

export const insertOneRoleOutputSchema = roleOutputSchema;
export type InsertOneRoleOutputType = z.infer<typeof insertOneRoleOutputSchema>;
