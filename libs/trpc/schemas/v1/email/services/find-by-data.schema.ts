import { z } from "zod";
import { emailServiceInput, emailServiceOutput } from ".";

export const findByEmailServiceDataInput = z.object({
  filter: z.array(emailServiceInput),
});
export type FindByEmailServiceDataInput = z.infer<
  typeof findByEmailServiceDataInput
>;

export const findByEmailServiceDataOutput = z.array(emailServiceOutput);
export type FindByEmailServiceDataOutput = z.infer<
  typeof findByEmailServiceDataOutput
>;
