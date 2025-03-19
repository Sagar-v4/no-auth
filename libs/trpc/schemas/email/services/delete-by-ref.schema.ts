import { z } from "zod";
import { deviceInputSchema } from "../../devices";
import { userInputSchema } from "../../users";
import { emailServiceInputSchema } from ".";

export const deleteByEmailServiceRefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    device: deviceInputSchema,
    emailService: emailServiceInputSchema,
  }),
});
export type DeleteByEmailServiceRefInputType = z.infer<
  typeof deleteByEmailServiceRefInputSchema
>;

export const deleteByEmailServiceRefOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByEmailServiceRefOutputType = z.infer<
  typeof deleteByEmailServiceRefOutputSchema
>;
