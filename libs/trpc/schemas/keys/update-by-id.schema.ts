import { z } from "zod";
import { keyOutputSchema, keyIdInputSchema, keyUpdateInputSchema } from ".";

export const updateByKeyIdInputSchema = z.object({
  filter: keyIdInputSchema,
  update: keyUpdateInputSchema,
});
export type UpdateByKeyIdInputType = z.infer<typeof updateByKeyIdInputSchema>;

export const updateByKeyIdOutputSchema = keyOutputSchema;
export type UpdateByKeyIdOutputType = z.infer<typeof updateByKeyIdOutputSchema>;
