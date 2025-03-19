import { z } from "zod";
import { deviceInputSchema } from "../devices";
import { userInputSchema } from "../users";
import { sessionInputSchema } from ".";

export const deleteBySessionRefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    device: deviceInputSchema,
    session: sessionInputSchema,
  }),
});
export type DeleteBySessionRefInputType = z.infer<
  typeof deleteBySessionRefInputSchema
>;

export const deleteBySessionRefOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteBySessionRefOutputType = z.infer<
  typeof deleteBySessionRefOutputSchema
>;
