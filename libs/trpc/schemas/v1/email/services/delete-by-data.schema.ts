import { z } from "zod";
import { emailServiceInput } from ".";

export const deleteByEmailServiceDataInput = z.object({
  filter: z.array(emailServiceInput),
});
export type DeleteByEmailServiceDataInput = z.infer<
  typeof deleteByEmailServiceDataInput
>;

export const deleteByEmailServiceDataOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByEmailServiceDataOutput = z.infer<
  typeof deleteByEmailServiceDataOutput
>;
