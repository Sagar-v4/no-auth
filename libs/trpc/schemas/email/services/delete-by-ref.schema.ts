import { z } from "zod";
import { deviceInputSchema } from "../../devices";
import { clientInputSchema } from "../../clients";
import { clienteleInputSchema } from "../../clienteles";
import { emailServiceInputSchema } from ".";

export const deleteByEmailServiceRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    clientele: clienteleInputSchema,
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
