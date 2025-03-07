import { z } from "zod";
import { ssoOutputSchema, ssoIdInputSchema, ssoUpdateInputSchema } from ".";

export const updateBySSOIdInputSchema = z.object({
  filter: ssoIdInputSchema,
  update: ssoUpdateInputSchema,
});
export type UpdateBySSOIdInputType = z.infer<typeof updateBySSOIdInputSchema>;

export const updateBySSOIdOutputSchema = ssoOutputSchema;
export type UpdateBySSOIdOutputType = z.infer<typeof updateBySSOIdOutputSchema>;
