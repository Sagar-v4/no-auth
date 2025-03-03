import { z } from "zod";
import { deviceInputSchema } from "../../devices/schemas";
import { clientInputSchema } from "../../clients/schemas";
import { clienteleInputSchema } from "../../clienteles/schemas";
import { sessionInputSchema } from ".";

export const deleteBySessionRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    clientele: clienteleInputSchema,
    device: deviceInputSchema,
    session: sessionInputSchema,
  }),
});
export type DeleteBySessionRefInputType = z.infer<
  typeof deleteBySessionRefInputSchema
>;

export const deleteBySessionRefOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteBySessionRefOutputType = z.infer<
  typeof deleteBySessionRefOutputSchema
>;
