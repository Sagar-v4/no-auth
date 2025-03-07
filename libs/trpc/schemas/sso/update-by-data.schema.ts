import { z } from "zod";
import { ssoInputSchema, ssoUpdateInputSchema } from ".";

export const updateBySSODataInputSchema = z.object({
  filter: z.array(ssoInputSchema),
  update: ssoUpdateInputSchema,
});
export type UpdateBySSODataInputType = z.infer<
  typeof updateBySSODataInputSchema
>;

export const updateBySSODataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateBySSODataOutputType = z.infer<
  typeof updateBySSODataOutputSchema
>;
