import { z } from "zod";
import { userIdInputSchema, userOutputSchema, userUpdateInputSchema } from ".";

export const updateByUserIdInputSchema = z.object({
  filter: userIdInputSchema,
  update: userUpdateInputSchema,
});
export type UpdateByUserIdInputType = z.infer<typeof updateByUserIdInputSchema>;

export const updateByUserIdOutputSchema = userOutputSchema;
export type UpdateByUserIdOutputType = z.infer<
  typeof updateByUserIdOutputSchema
>;
