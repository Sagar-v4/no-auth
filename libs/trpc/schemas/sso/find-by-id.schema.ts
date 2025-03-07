import { z } from "zod";
import { ssoIdInputSchema, ssoOutputSchema } from ".";

export const findBySSOIdInputSchema = z.object({
  filter: ssoIdInputSchema,
});
export type FindBySSOIdInputType = z.infer<typeof findBySSOIdInputSchema>;

export const findBySSOIdOutputSchema = ssoOutputSchema.or(z.undefined());
export type FindBySSOIdOutputType = z.infer<typeof findBySSOIdOutputSchema>;
