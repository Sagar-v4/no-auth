import { z } from "zod";
import { ssoOutput, ssoIdInput, ssoUpdateInput } from ".";

export const updateBySSOIdInput = z.object({
  filter: ssoIdInput,
  update: ssoUpdateInput,
});
export type UpdateBySSOIdInput = z.infer<typeof updateBySSOIdInput>;

export const updateBySSOIdOutput = ssoOutput;
export type UpdateBySSOIdOutput = z.infer<typeof updateBySSOIdOutput>;
