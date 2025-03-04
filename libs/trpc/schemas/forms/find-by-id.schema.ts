import { z } from "zod";
import { formIdInputSchema, formOutputSchema } from ".";

export const findByFormIdInputSchema = z.object({
  filter: formIdInputSchema,
});
export type FindByFormIdInputType = z.infer<typeof findByFormIdInputSchema>;

export const findByFormIdOutputSchema = formOutputSchema.or(z.undefined());
export type FindByFormIdOutputType = z.infer<typeof findByFormIdOutputSchema>;
