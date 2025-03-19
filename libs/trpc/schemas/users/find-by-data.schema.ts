import { z } from "zod";
import { userInputSchema, userOutputSchema } from ".";

export const findByUserDataInputSchema = z.object({
  filter: z.array(userInputSchema),
});
export type FindByUserDataInputType = z.infer<typeof findByUserDataInputSchema>;

export const findByUserDataOutputSchema = z.array(userOutputSchema);
export type FindByUserDataOutputType = z.infer<
  typeof findByUserDataOutputSchema
>;
