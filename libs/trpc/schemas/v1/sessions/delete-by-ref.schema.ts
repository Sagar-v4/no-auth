import { z } from "zod";
import { deviceInput } from "../devices";
import { userInput } from "../users";
import { sessionInput } from ".";

export const deleteBySessionRefInput = z.object({
  filter: z.object({
    user: userInput,
    device: deviceInput,
    session: sessionInput,
  }),
});
export type DeleteBySessionRefInput = z.infer<typeof deleteBySessionRefInput>;

export const deleteBySessionRefOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteBySessionRefOutput = z.infer<typeof deleteBySessionRefOutput>;
