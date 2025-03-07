import { z } from "zod";
import { ssoInsertInputSchema, ssoOutputSchema } from ".";

export const insertOneSSOInputSchema = z.object({
  doc: ssoInsertInputSchema,
});
export type InsertOneSSOInputType = z.infer<typeof insertOneSSOInputSchema>;

export const insertOneSSOOutputSchema = ssoOutputSchema;
export type InsertOneSSOOutputType = z.infer<typeof insertOneSSOOutputSchema>;
