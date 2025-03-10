import { z } from "zod";
import { emailServiceInputSchema, emailServiceOutputSchema } from ".";

export const findByEmailServiceDataInputSchema = z.object({
  filter: z.array(emailServiceInputSchema),
});
export type FindByEmailServiceDataInputType = z.infer<
  typeof findByEmailServiceDataInputSchema
>;

export const findByEmailServiceDataOutputSchema = z.array(
  emailServiceOutputSchema,
);
export type FindByEmailServiceDataOutputType = z.infer<
  typeof findByEmailServiceDataOutputSchema
>;
