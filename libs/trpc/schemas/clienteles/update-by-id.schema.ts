import { z } from "zod";
import {
  clienteleIdInputSchema,
  clienteleOutputSchema,
  clienteleUpdateInputSchema,
} from ".";

export const updateByClienteleIdInputSchema = z.object({
  filter: clienteleIdInputSchema,
  update: clienteleUpdateInputSchema,
});
export type UpdateByClienteleIdInputType = z.infer<
  typeof updateByClienteleIdInputSchema
>;

export const updateByClienteleIdOutputSchema = clienteleOutputSchema;
export type UpdateByClienteleIdOutputType = z.infer<
  typeof updateByClienteleIdOutputSchema
>;
