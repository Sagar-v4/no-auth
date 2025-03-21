import { z } from "zod";
import { keyOutput, keyIdInput, keyUpdateInput } from ".";

export const updateByKeyIdInput = z.object({
  filter: keyIdInput,
  update: keyUpdateInput,
});
export type UpdateByKeyIdInput = z.infer<typeof updateByKeyIdInput>;

export const updateByKeyIdOutput = keyOutput;
export type UpdateByKeyIdOutput = z.infer<typeof updateByKeyIdOutput>;
