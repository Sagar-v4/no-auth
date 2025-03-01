import { z } from "zod";
import {
  sessionOutputSchema,
  sessionIdInputSchema,
  sessionUpdateInputSchema,
} from ".";

export const updateBySessionIdInputSchema = z.object({
  filter: sessionIdInputSchema,
  update: sessionUpdateInputSchema,
});
export type UpdateBySessionIdInputType = z.infer<
  typeof updateBySessionIdInputSchema
>;

export const updateBySessionIdOutputSchema = sessionOutputSchema;
export type UpdateBySessionIdOutputType = z.infer<
  typeof updateBySessionIdOutputSchema
>;
