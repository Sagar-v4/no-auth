import { z } from "zod";
import { clientInputSchema, clientUpdateInputSchema } from ".";

export const updateByClientDataInputSchema = z.object({
  filter: z.array(clientInputSchema),
  update: clientUpdateInputSchema,
});
export type UpdateByClientDataInputType = z.infer<
  typeof updateByClientDataInputSchema
>;

export const updateByClientDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByClientDataOutputType = z.infer<
  typeof updateByClientDataOutputSchema
>;
