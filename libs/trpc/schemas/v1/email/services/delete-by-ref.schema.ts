import { z } from "zod";
import { deviceInput } from "../../devices";
import { userInput } from "../../users";
import { emailServiceInput } from ".";

export const deleteByEmailServiceRefInput = z.object({
  filter: z.object({
    user: userInput,
    device: deviceInput,
    emailService: emailServiceInput,
  }),
});
export type DeleteByEmailServiceRefInput = z.infer<
  typeof deleteByEmailServiceRefInput
>;

export const deleteByEmailServiceRefOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByEmailServiceRefOutput = z.infer<
  typeof deleteByEmailServiceRefOutput
>;
