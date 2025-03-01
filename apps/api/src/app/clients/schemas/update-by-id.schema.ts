import { z } from "zod";
import {
  clientIdInputSchema,
  clientOutputSchema,
  clientUpdateInputSchema,
} from ".";

export const updateByClientIdInputSchema = z.object({
  filter: clientIdInputSchema,
  update: clientUpdateInputSchema,
});
export type UpdateByClientIdInputType = z.infer<
  typeof updateByClientIdInputSchema
>;

export const updateByClientIdOutputSchema = clientOutputSchema;
export type UpdateByClientIdOutputType = z.infer<
  typeof updateByClientIdOutputSchema
>;
