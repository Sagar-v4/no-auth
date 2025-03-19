import { z } from "zod";
import { userInputSchema, userOutputSchema } from "../users";
import { deviceInputSchema, deviceOutputSchema } from "../devices";
import { sessionInputSchema, sessionOutputSchema } from ".";

export const findBySessionRefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    device: deviceInputSchema,
    session: sessionInputSchema,
  }),
});
export type FindBySessionRefInputType = z.infer<
  typeof findBySessionRefInputSchema
>;

export const findBySessionRefOutputSchema = z.array(
  sessionOutputSchema
    .merge(z.object({ user_id: userOutputSchema }))
    .merge(z.object({ device_id: deviceOutputSchema })),
);
export type FindBySessionRefOutputType = z.infer<
  typeof findBySessionRefOutputSchema
>;
