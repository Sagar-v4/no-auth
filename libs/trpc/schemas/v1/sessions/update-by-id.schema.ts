import { z } from "zod";
import { sessionOutput, sessionIdInput, sessionUpdateInput } from ".";

export const updateBySessionIdInput = z.object({
  filter: sessionIdInput,
  update: sessionUpdateInput,
});
export type UpdateBySessionIdInput = z.infer<typeof updateBySessionIdInput>;

export const updateBySessionIdOutput = sessionOutput;
export type UpdateBySessionIdOutput = z.infer<typeof updateBySessionIdOutput>;
