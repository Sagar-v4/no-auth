import { z } from "zod";
import { clienteleInputSchema, clienteleUpdateInputSchema } from ".";

export const updateByClienteleDataInputSchema = z.object({
  filter: z.array(clienteleInputSchema),
  update: clienteleUpdateInputSchema,
});
export type UpdateByClienteleDataInputType = z.infer<
  typeof updateByClienteleDataInputSchema
>;

export const updateByClienteleDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByClienteleDataOutputType = z.infer<
  typeof updateByClienteleDataOutputSchema
>;
