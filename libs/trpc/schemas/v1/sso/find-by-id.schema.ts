import { z } from "zod";
import { ssoIdInput, ssoOutput } from ".";

export const findBySSOIdInput = z.object({
  filter: ssoIdInput,
});
export type FindBySSOIdInput = z.infer<typeof findBySSOIdInput>;

export const findBySSOIdOutput = ssoOutput.or(z.undefined());
export type FindBySSOIdOutput = z.infer<typeof findBySSOIdOutput>;
