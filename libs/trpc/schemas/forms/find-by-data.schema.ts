import { z } from "zod";
import { formInputSchema, formOutputSchema } from ".";

export const findByFormDataInputSchema = z.object({
  filter: z.array(formInputSchema),
});
export type FindByFormDataInputType = z.infer<typeof findByFormDataInputSchema>;

export const findByFormDataOutputSchema = z.array(formOutputSchema);
export type FindByFormDataOutputType = z.infer<
  typeof findByFormDataOutputSchema
>;
