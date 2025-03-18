import { z } from "zod";
import { clienteleInputSchema } from ".";

export const deleteByClienteleDataInputSchema = z.object({
  filter: z.array(clienteleInputSchema),
});
export type DeleteByClienteleDataInputType = z.infer<
  typeof deleteByClienteleDataInputSchema
>;

export const deleteByClienteleDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByClienteleDataOutputType = z.infer<
  typeof deleteByClienteleDataOutputSchema
>;
