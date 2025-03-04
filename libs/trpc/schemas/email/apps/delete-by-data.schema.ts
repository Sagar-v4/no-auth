import { z } from "zod";
import { emailAppInputSchema } from ".";

export const deleteByEmailAppDataInputSchema = z.object({
  filter: z.array(emailAppInputSchema),
});
export type DeleteByEmailAppDataInputType = z.infer<
  typeof deleteByEmailAppDataInputSchema
>;

export const deleteByEmailAppDataOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByEmailAppDataOutputType = z.infer<
  typeof deleteByEmailAppDataOutputSchema
>;
