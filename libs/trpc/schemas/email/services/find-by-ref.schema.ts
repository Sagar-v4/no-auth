import { z } from "zod";
import { userInputSchema, userOutputSchema } from "../../users";
import { deviceInputSchema, deviceOutputSchema } from "../../devices";
import { emailServiceInputSchema, emailServiceOutputSchema } from ".";

export const findByEmailServiceRefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    device: deviceInputSchema,
    emailService: emailServiceInputSchema,
  }),
});
export type FindByEmailServiceRefInputType = z.infer<
  typeof findByEmailServiceRefInputSchema
>;

export const findByEmailServiceRefOutputSchema = z.array(
  emailServiceOutputSchema
    .merge(z.object({ user_id: userOutputSchema }))
    .merge(z.object({ device_id: deviceOutputSchema })),
);
export type FindByEmailServiceRefOutputType = z.infer<
  typeof findByEmailServiceRefOutputSchema
>;
