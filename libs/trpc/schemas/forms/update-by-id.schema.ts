import { z } from "zod";
import { formOutputSchema, formIdInputSchema, formUpdateInputSchema } from ".";

export const updateByFormIdInputSchema = z.object({
  filter: formIdInputSchema,
  update: formUpdateInputSchema,
});
export type UpdateByFormIdInputType = z.infer<typeof updateByFormIdInputSchema>;

export const updateByFormIdOutputSchema = formOutputSchema;
export type UpdateByFormIdOutputType = z.infer<
  typeof updateByFormIdOutputSchema
>;
