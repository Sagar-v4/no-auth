import { z } from "zod";
import { keyIdInput, keyOutput } from ".";

export const findByKeyIdInput = z.object({
  filter: keyIdInput,
});
export type FindByKeyIdInput = z.infer<typeof findByKeyIdInput>;

export const findByKeyIdOutput = keyOutput.or(z.undefined());
export type FindByKeyIdOutput = z.infer<typeof findByKeyIdOutput>;
