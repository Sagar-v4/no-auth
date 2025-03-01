import { z } from "zod";
import { emailAppInputSchema, emailAppOutputSchema } from ".";

export const findByEmailAppDataInputSchema = z.object({
  filter: z.array(emailAppInputSchema),
});
export type FindByEmailAppDataInputType = z.infer<
  typeof findByEmailAppDataInputSchema
>;

export const findByEmailAppDataOutputSchema = z.array(emailAppOutputSchema);
export type FindByEmailAppDataOutputType = z.infer<
  typeof findByEmailAppDataOutputSchema
>;
