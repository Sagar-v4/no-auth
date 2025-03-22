import { z } from "zod";
import { sessionIdInput, sessionOutput } from ".";

export const findBySessionIdInput = z.object({
  filter: sessionIdInput,
});
export type FindBySessionIdInput = z.infer<typeof findBySessionIdInput>;

export const findBySessionIdOutput = sessionOutput.or(z.undefined());
export type FindBySessionIdOutput = z.infer<typeof findBySessionIdOutput>;
