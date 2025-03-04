import { z } from "zod";
import { clienteleInputSchema, clienteleOutputSchema } from ".";

export const findByClienteleDataInputSchema = z.object({
  filter: z.array(clienteleInputSchema),
});
export type FindByClienteleDataInputType = z.infer<
  typeof findByClienteleDataInputSchema
>;

export const findByClienteleDataOutputSchema = z.array(clienteleOutputSchema);
export type FindByClienteleDataOutputType = z.infer<
  typeof findByClienteleDataOutputSchema
>;
