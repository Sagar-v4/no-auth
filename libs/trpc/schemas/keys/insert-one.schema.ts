import { z } from "zod";
import { keyInsertInputSchema, keyOutputSchema } from ".";

export const insertOneKeyInputSchema = z.object({
  doc: keyInsertInputSchema,
});
export type InsertOneKeyInputType = z.infer<typeof insertOneKeyInputSchema>;

export const insertOneKeyOutputSchema = keyOutputSchema;
export type InsertOneKeyOutputType = z.infer<typeof insertOneKeyOutputSchema>;
