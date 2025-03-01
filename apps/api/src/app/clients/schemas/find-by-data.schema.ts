import { z } from "zod";
import { clientInputSchema, clientOutputSchema } from ".";

export const findByClientDataInputSchema = z.object({
  filter: z.array(clientInputSchema),
});
export type FindByClientDataInputType = z.infer<
  typeof findByClientDataInputSchema
>;

export const findByClientDataOutputSchema = z.array(clientOutputSchema);
export type FindByClientDataOutputType = z.infer<
  typeof findByClientDataOutputSchema
>;
