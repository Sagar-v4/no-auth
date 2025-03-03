import { z } from "zod";
import { clienteleIdInputSchema, clienteleOutputSchema } from ".";

export const findByClienteleIdInputSchema = z.object({
  filter: clienteleIdInputSchema,
});
export type FindByClienteleIdInputType = z.infer<
  typeof findByClienteleIdInputSchema
>;

export const findByClienteleIdOutputSchema = clienteleOutputSchema.or(
  z.undefined(),
);
export type FindByClienteleIdOutputType = z.infer<
  typeof findByClienteleIdOutputSchema
>;
