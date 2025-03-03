import { z } from "zod";
import {
  clienteleInputSchema,
  clienteleOutputSchema,
} from "../../clienteles/schemas";
import { clientInputSchema, clientOutputSchema } from "../../clients/schemas";
import { deviceInputSchema, deviceOutputSchema } from "../../devices/schemas";
import { sessionInputSchema, sessionOutputSchema } from ".";

export const findBySessionRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    clientele: clienteleInputSchema,
    device: deviceInputSchema,
    session: sessionInputSchema,
  }),
});
export type FindBySessionRefInputType = z.infer<
  typeof findBySessionRefInputSchema
>;

export const findBySessionRefOutputSchema = z.array(
  sessionOutputSchema
    .merge(
      z.object({
        user_id: z.union([clientOutputSchema, clienteleOutputSchema]),
      }),
    )
    .merge(z.object({ device_id: deviceOutputSchema })),
);
export type FindBySessionRefOutputType = z.infer<
  typeof findBySessionRefOutputSchema
>;
