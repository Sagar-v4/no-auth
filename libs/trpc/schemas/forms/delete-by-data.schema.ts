import { z } from "zod";
import { formInputSchema } from ".";

export const deleteByFormDataInputSchema = z.object({
  filter: z.array(formInputSchema),
});
export type DeleteByFormDataInputType = z.infer<
  typeof deleteByFormDataInputSchema
>;

export const deleteByFormDataOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByFormDataOutputType = z.infer<
  typeof deleteByFormDataOutputSchema
>;
