import { z } from "zod";
import { sessionInputSchema } from ".";
import { deviceInputSchema } from "../../devices/schemas";

export const deleteBySessionRefInputSchema = z.object({
  filter: z.object({
    device: deviceInputSchema,
    session: sessionInputSchema,
  }),
});
export type DeleteBySessionRefInputType = z.infer<
  typeof deleteBySessionRefInputSchema
>;

export const deleteBySessionRefOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteBySessionRefOutputType = z.infer<
  typeof deleteBySessionRefOutputSchema
>;
