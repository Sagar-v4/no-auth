import { z } from "zod";
import { emailAppIdInputSchema, emailAppOutputSchema } from ".";

export const findByEmailAppIdInputSchema = z.object({
  filter: emailAppIdInputSchema,
});
export type FindByEmailAppIdInputType = z.infer<
  typeof findByEmailAppIdInputSchema
>;

export const findByEmailAppIdOutputSchema = emailAppOutputSchema;
export type FindByEmailAppIdOutputType = z.infer<
  typeof findByEmailAppIdOutputSchema
>;
