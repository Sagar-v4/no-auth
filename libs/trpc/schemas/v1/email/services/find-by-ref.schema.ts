import { z } from "zod";
import { userInput, userOutput } from "../../users";
import { deviceInput, deviceOutput } from "../../devices";
import { emailServiceInput, emailServiceOutput } from ".";

export const findByEmailServiceRefInput = z.object({
  filter: z.object({
    user: userInput,
    device: deviceInput,
    emailService: emailServiceInput,
  }),
});
export type FindByEmailServiceRefInput = z.infer<
  typeof findByEmailServiceRefInput
>;

export const findByEmailServiceRefOutput = z.array(
  emailServiceOutput
    .merge(z.object({ user_id: userOutput }))
    .merge(z.object({ device_id: deviceOutput })),
);
export type FindByEmailServiceRefOutput = z.infer<
  typeof findByEmailServiceRefOutput
>;
