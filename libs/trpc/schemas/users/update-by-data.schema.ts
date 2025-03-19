import { z } from "zod";
import { userInputSchema, userUpdateInputSchema } from ".";

export const updateByUserDataInputSchema = z.object({
  filter: z.array(userInputSchema),
  update: userUpdateInputSchema,
});
export type UpdateByUserDataInputType = z.infer<
  typeof updateByUserDataInputSchema
>;

export const updateByUserDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByUserDataOutputType = z.infer<
  typeof updateByUserDataOutputSchema
>;
