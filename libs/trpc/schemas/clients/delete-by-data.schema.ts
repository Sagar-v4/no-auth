import { z } from "zod";
import { clientInputSchema } from ".";

export const deleteByClientDataInputSchema = z.object({
  filter: z.array(clientInputSchema),
});
export type DeleteByClientDataInputType = z.infer<
  typeof deleteByClientDataInputSchema
>;

export const deleteByClientDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByClientDataOutputType = z.infer<
  typeof deleteByClientDataOutputSchema
>;
