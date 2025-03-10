import { z } from "zod";
import { emailServiceInsertInputSchema, emailServiceOutputSchema } from ".";

export const insertOneEmailServiceInputSchema = z.object({
  doc: emailServiceInsertInputSchema,
});
export type InsertOneEmailServiceInputType = z.infer<
  typeof insertOneEmailServiceInputSchema
>;

export const insertOneEmailServiceOutputSchema = emailServiceOutputSchema;
export type InsertOneEmailServiceOutputType = z.infer<
  typeof insertOneEmailServiceOutputSchema
>;
