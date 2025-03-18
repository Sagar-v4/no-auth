import { z } from "zod";
import { sessionInputSchema } from ".";

export const deleteBySessionDataInputSchema = z.object({
  filter: z.array(sessionInputSchema),
});
export type DeleteBySessionDataInputType = z.infer<
  typeof deleteBySessionDataInputSchema
>;

export const deleteBySessionDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteBySessionDataOutputType = z.infer<
  typeof deleteBySessionDataOutputSchema
>;
