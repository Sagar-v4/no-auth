import { z } from "zod";
import { emailServiceInputSchema } from ".";

export const deleteByEmailServiceDataInputSchema = z.object({
  filter: z.array(emailServiceInputSchema),
});
export type DeleteByEmailServiceDataInputType = z.infer<
  typeof deleteByEmailServiceDataInputSchema
>;

export const deleteByEmailServiceDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByEmailServiceDataOutputType = z.infer<
  typeof deleteByEmailServiceDataOutputSchema
>;
