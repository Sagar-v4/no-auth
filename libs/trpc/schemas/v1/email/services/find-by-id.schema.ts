import { z } from "zod";
import { emailServiceIdInput, emailServiceOutput } from ".";

export const findByEmailServiceIdInput = z.object({
  filter: emailServiceIdInput,
});
export type FindByEmailServiceIdInput = z.infer<
  typeof findByEmailServiceIdInput
>;

export const findByEmailServiceIdOutput = emailServiceOutput.or(z.undefined());
export type FindByEmailServiceIdOutput = z.infer<
  typeof findByEmailServiceIdOutput
>;
