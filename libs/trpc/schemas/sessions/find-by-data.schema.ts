import { z } from "zod";
import { sessionInputSchema, sessionOutputSchema } from ".";

export const findBySessionDataInputSchema = z.object({
  filter: z.array(sessionInputSchema),
});
export type FindBySessionDataInputType = z.infer<
  typeof findBySessionDataInputSchema
>;

export const findBySessionDataOutputSchema = z.array(sessionOutputSchema);
export type FindBySessionDataOutputType = z.infer<
  typeof findBySessionDataOutputSchema
>;
