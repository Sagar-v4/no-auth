import { z } from "zod";
import { emailServiceInputSchema, emailServiceUpdateInputSchema } from ".";

export const updateByEmailServiceDataInputSchema = z.object({
  filter: z.array(emailServiceInputSchema),
  update: emailServiceUpdateInputSchema,
});
export type UpdateByEmailServiceDataInputType = z.infer<
  typeof updateByEmailServiceDataInputSchema
>;

export const updateByEmailServiceDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByEmailServiceDataOutputType = z.infer<
  typeof updateByEmailServiceDataOutputSchema
>;
