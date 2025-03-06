import { z } from "zod";
import { emailAppInsertInputSchema, emailAppOutputSchema } from ".";

export const insertOneEmailAppInputSchema = z.object({
  doc: emailAppInsertInputSchema,
});
export type InsertOneEmailAppInputType = z.infer<
  typeof insertOneEmailAppInputSchema
>;

export const insertOneEmailAppOutputSchema = emailAppOutputSchema;
export type InsertOneEmailAppOutputType = z.infer<
  typeof insertOneEmailAppOutputSchema
>;
