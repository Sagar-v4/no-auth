import { z } from "zod";
import { emailAppInputSchema, emailAppUpdateInputSchema } from ".";

export const updateByEmailAppDataInputSchema = z.object({
  filter: z.array(emailAppInputSchema),
  update: emailAppUpdateInputSchema,
});
export type UpdateByEmailAppDataInputType = z.infer<
  typeof updateByEmailAppDataInputSchema
>;

export const updateByEmailAppDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByEmailAppDataOutputType = z.infer<
  typeof updateByEmailAppDataOutputSchema
>;
