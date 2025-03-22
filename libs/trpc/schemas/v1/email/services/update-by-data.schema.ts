import { z } from "zod";
import { emailServiceInput, emailServiceUpdateInput } from ".";

export const updateByEmailServiceDataInput = z.object({
  filter: z.array(emailServiceInput),
  update: emailServiceUpdateInput,
});
export type UpdateByEmailServiceDataInput = z.infer<
  typeof updateByEmailServiceDataInput
>;

export const updateByEmailServiceDataOutput = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByEmailServiceDataOutput = z.infer<
  typeof updateByEmailServiceDataOutput
>;
