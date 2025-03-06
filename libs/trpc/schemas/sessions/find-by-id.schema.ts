import { z } from "zod";
import { sessionIdInputSchema, sessionOutputSchema } from ".";

export const findBySessionIdInputSchema = z.object({
  filter: sessionIdInputSchema,
});
export type FindBySessionIdInputType = z.infer<
  typeof findBySessionIdInputSchema
>;

export const findBySessionIdOutputSchema = sessionOutputSchema.or(
  z.undefined(),
);
export type FindBySessionIdOutputType = z.infer<
  typeof findBySessionIdOutputSchema
>;
