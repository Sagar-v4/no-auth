import { z } from "zod";
import { ssoInputSchema, ssoOutputSchema } from ".";

export const findBySSODataInputSchema = z.object({
  filter: z.array(ssoInputSchema),
});
export type FindBySSODataInputType = z.infer<typeof findBySSODataInputSchema>;

export const findBySSODataOutputSchema = z.array(ssoOutputSchema);
export type FindBySSODataOutputType = z.infer<typeof findBySSODataOutputSchema>;
