import { z } from "zod";
import { clienteleInputSchema, clienteleOutputSchema } from "../../clienteles";
import { clientInputSchema, clientOutputSchema } from "../../clients";
import { deviceInputSchema, deviceOutputSchema } from "../../devices";
import { emailServiceInputSchema, emailServiceOutputSchema } from ".";

export const findByEmailServiceRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    clientele: clienteleInputSchema,
    device: deviceInputSchema,
    emailService: emailServiceInputSchema,
  }),
});
export type FindByEmailServiceRefInputType = z.infer<
  typeof findByEmailServiceRefInputSchema
>;

export const findByEmailServiceRefOutputSchema = z.array(
  emailServiceOutputSchema
    .merge(
      z.object({
        user_id: z.union([clientOutputSchema, clienteleOutputSchema]),
      }),
    )
    .merge(z.object({ device_id: deviceOutputSchema })),
);
export type FindByEmailServiceRefOutputType = z.infer<
  typeof findByEmailServiceRefOutputSchema
>;
