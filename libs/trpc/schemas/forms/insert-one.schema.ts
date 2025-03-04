import { z } from "zod";
import { formInsertInputSchema, formOutputSchema } from ".";

export const insertOneFormInputSchema = z.object({
  doc: formInsertInputSchema,
});
export type InsertOneFormInputType = z.infer<typeof insertOneFormInputSchema>;

export const insertOneFormOutputSchema = formOutputSchema;
export type InsertOneFormOutputType = z.infer<typeof insertOneFormOutputSchema>;
