import { z } from "zod";
import { keyIdInputSchema, keyOutputSchema } from ".";

export const findByKeyIdInputSchema = z.object({
  filter: keyIdInputSchema,
});
export type FindByKeyIdInputType = z.infer<typeof findByKeyIdInputSchema>;

export const findByKeyIdOutputSchema = keyOutputSchema;
export type FindByKeyIdOutputType = z.infer<typeof findByKeyIdOutputSchema>;
