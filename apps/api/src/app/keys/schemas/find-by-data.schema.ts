import { z } from "zod";
import { keyInputSchema, keyOutputSchema } from ".";

export const findByKeyDataInputSchema = z.object({
  filter: z.array(keyInputSchema),
});
export type FindByKeyDataInputType = z.infer<typeof findByKeyDataInputSchema>;

export const findByKeyDataOutputSchema = z.array(keyOutputSchema);
export type FindByKeyDataOutputType = z.infer<typeof findByKeyDataOutputSchema>;
