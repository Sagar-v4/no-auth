import { z } from "zod";
import { userInput, userOutput } from "../users";
import { deviceInput, deviceOutput } from "../devices";
import { sessionInput, sessionOutput } from ".";

export const findBySessionRefInput = z.object({
  filter: z.object({
    user: userInput,
    device: deviceInput,
    session: sessionInput,
  }),
});
export type FindBySessionRefInput = z.infer<typeof findBySessionRefInput>;

export const findBySessionRefOutput = z.array(
  sessionOutput
    .merge(z.object({ user_id: userOutput }))
    .merge(z.object({ device_id: deviceOutput })),
);
export type FindBySessionRefOutput = z.infer<typeof findBySessionRefOutput>;
