import { z } from "zod";
import {
  emailServiceOutputSchema,
  emailServiceIdInputSchema,
  emailServiceUpdateInputSchema,
} from ".";

export const updateByEmailServiceIdInputSchema = z.object({
  filter: emailServiceIdInputSchema,
  update: emailServiceUpdateInputSchema,
});
export type UpdateByEmailServiceIdInputType = z.infer<
  typeof updateByEmailServiceIdInputSchema
>;

export const updateByEmailServiceIdOutputSchema = emailServiceOutputSchema;
export type UpdateByEmailServiceIdOutputType = z.infer<
  typeof updateByEmailServiceIdOutputSchema
>;
