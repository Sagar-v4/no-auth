import { z } from "zod";
import {
  emailAppOutputSchema,
  emailAppIdInputSchema,
  emailAppUpdateInputSchema,
} from ".";

export const updateByEmailAppIdInputSchema = z.object({
  filter: emailAppIdInputSchema,
  update: emailAppUpdateInputSchema,
});
export type UpdateByEmailAppIdInputType = z.infer<
  typeof updateByEmailAppIdInputSchema
>;

export const updateByEmailAppIdOutputSchema = emailAppOutputSchema;
export type UpdateByEmailAppIdOutputType = z.infer<
  typeof updateByEmailAppIdOutputSchema
>;
