import { z } from "zod";
import { keyInputSchema } from ".";

export const deleteByKeyDataInputSchema = z.object({
  filter: z.array(keyInputSchema),
});
export type DeleteByKeyDataInputType = z.infer<
  typeof deleteByKeyDataInputSchema
>;

export const deleteByKeyDataOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByKeyDataOutputType = z.infer<
  typeof deleteByKeyDataOutputSchema
>;
