import { z } from "zod";
import { formInputSchema, formUpdateInputSchema } from ".";

export const updateByFormDataInputSchema = z.object({
  filter: z.array(formInputSchema),
  update: formUpdateInputSchema,
});
export type UpdateByFormDataInputType = z.infer<
  typeof updateByFormDataInputSchema
>;

export const updateByFormDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByFormDataOutputType = z.infer<
  typeof updateByFormDataOutputSchema
>;
