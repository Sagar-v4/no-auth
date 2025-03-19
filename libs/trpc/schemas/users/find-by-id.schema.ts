import { z } from "zod";
import { userIdInputSchema, userOutputSchema } from ".";

export const findByUserIdInputSchema = z.object({
  filter: userIdInputSchema,
});
export type FindByUserIdInputType = z.infer<typeof findByUserIdInputSchema>;

export const findByUserIdOutputSchema = userOutputSchema.or(z.undefined());
export type FindByUserIdOutputType = z.infer<typeof findByUserIdOutputSchema>;
