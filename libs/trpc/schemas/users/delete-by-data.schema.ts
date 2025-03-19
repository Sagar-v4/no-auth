import { z } from "zod";
import { userInputSchema } from ".";

export const deleteByUserDataInputSchema = z.object({
  filter: z.array(userInputSchema),
});
export type DeleteByUserDataInputType = z.infer<
  typeof deleteByUserDataInputSchema
>;

export const deleteByUserDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByUserDataOutputType = z.infer<
  typeof deleteByUserDataOutputSchema
>;
