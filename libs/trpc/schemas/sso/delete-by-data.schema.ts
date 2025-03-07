import { z } from "zod";
import { ssoInputSchema } from ".";

export const deleteBySSODataInputSchema = z.object({
  filter: z.array(ssoInputSchema),
});
export type DeleteBySSODataInputType = z.infer<
  typeof deleteBySSODataInputSchema
>;

export const deleteBySSODataOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteBySSODataOutputType = z.infer<
  typeof deleteBySSODataOutputSchema
>;
