import { z } from "zod";
import { clientInsertInputSchema, clientOutputSchema } from ".";

export const insertOneClientInputSchema = z.object({
  doc: clientInsertInputSchema,
});
export type InsertOneClientInputType = z.infer<
  typeof insertOneClientInputSchema
>;

export const insertOneClientOutputSchema = clientOutputSchema;
export type InsertOneClientOutputType = z.infer<
  typeof insertOneClientOutputSchema
>;
