import { z } from "zod";
import { clientIdInputSchema, clientOutputSchema } from ".";

export const findByClientIdInputSchema = z.object({
  filter: clientIdInputSchema,
});
export type FindByClientIdInputType = z.infer<typeof findByClientIdInputSchema>;

export const findByClientIdOutputSchema = clientOutputSchema.or(z.undefined());
export type FindByClientIdOutputType = z.infer<
  typeof findByClientIdOutputSchema
>;
