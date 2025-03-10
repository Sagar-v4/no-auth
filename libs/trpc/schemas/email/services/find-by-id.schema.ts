import { z } from "zod";
import { emailServiceIdInputSchema, emailServiceOutputSchema } from ".";

export const findByEmailServiceIdInputSchema = z.object({
  filter: emailServiceIdInputSchema,
});
export type FindByEmailServiceIdInputType = z.infer<
  typeof findByEmailServiceIdInputSchema
>;

export const findByEmailServiceIdOutputSchema = emailServiceOutputSchema.or(
  z.undefined(),
);
export type FindByEmailServiceIdOutputType = z.infer<
  typeof findByEmailServiceIdOutputSchema
>;
