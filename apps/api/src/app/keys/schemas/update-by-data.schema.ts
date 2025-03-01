import { z } from "zod";
import { keyInputSchema, keyUpdateInputSchema } from ".";

export const updateByKeyDataInputSchema = z.object({
  filter: z.array(keyInputSchema),
  update: keyUpdateInputSchema,
});
export type UpdateByKeyDataInputType = z.infer<
  typeof updateByKeyDataInputSchema
>;

export const updateByKeyDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByKeyDataOutputType = z.infer<
  typeof updateByKeyDataOutputSchema
>;
