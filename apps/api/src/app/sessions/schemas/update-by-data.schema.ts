import { z } from "zod";
import { sessionInputSchema, sessionUpdateInputSchema } from ".";

export const updateBySessionDataInputSchema = z.object({
  filter: z.array(sessionInputSchema),
  update: sessionUpdateInputSchema,
});
export type UpdateBySessionDataInputType = z.infer<
  typeof updateBySessionDataInputSchema
>;

export const updateBySessionDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateBySessionDataOutputType = z.infer<
  typeof updateBySessionDataOutputSchema
>;
