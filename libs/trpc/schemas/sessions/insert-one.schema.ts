import { z } from "zod";
import { sessionInsertInputSchema, sessionOutputSchema } from ".";

export const insertOneSessionInputSchema = z.object({
  doc: sessionInsertInputSchema,
});
export type InsertOneSessionInputType = z.infer<
  typeof insertOneSessionInputSchema
>;

export const insertOneSessionOutputSchema = sessionOutputSchema;
export type InsertOneSessionOutputType = z.infer<
  typeof insertOneSessionOutputSchema
>;
