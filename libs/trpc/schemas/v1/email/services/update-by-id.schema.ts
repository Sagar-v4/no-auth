import { z } from "zod";
import {
  emailServiceOutput,
  emailServiceIdInput,
  emailServiceUpdateInput,
} from ".";

export const updateByEmailServiceIdInput = z.object({
  filter: emailServiceIdInput,
  update: emailServiceUpdateInput,
});
export type UpdateByEmailServiceIdInput = z.infer<
  typeof updateByEmailServiceIdInput
>;

export const updateByEmailServiceIdOutput = emailServiceOutput;
export type UpdateByEmailServiceIdOutput = z.infer<
  typeof updateByEmailServiceIdOutput
>;
