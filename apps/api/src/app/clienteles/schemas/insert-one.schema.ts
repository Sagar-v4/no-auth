import { z } from "zod";
import { clienteleInsertInputSchema, clienteleOutputSchema } from ".";

export const insertOneClienteleInputSchema = z.object({
  doc: clienteleInsertInputSchema,
});
export type InsertOneClienteleInputType = z.infer<
  typeof insertOneClienteleInputSchema
>;

export const insertOneClienteleOutputSchema = clienteleOutputSchema;
export type InsertOneClienteleOutputType = z.infer<
  typeof insertOneClienteleOutputSchema
>;
