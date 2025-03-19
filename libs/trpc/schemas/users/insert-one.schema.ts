import { z } from "zod";
import { userInsertInputSchema, userOutputSchema } from ".";

export const insertOneUserInputSchema = z.object({
  doc: userInsertInputSchema,
});
export type InsertOneUserInputType = z.infer<typeof insertOneUserInputSchema>;

export const insertOneUserOutputSchema = userOutputSchema;
export type InsertOneUserOutputType = z.infer<typeof insertOneUserOutputSchema>;
