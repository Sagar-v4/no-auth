import { z } from "zod";
import { userIdInput, userOutput, userUpdateInput } from ".";

export const updateByUserIdInput = z.object({
  filter: userIdInput,
  update: userUpdateInput,
});
export type UpdateByUserIdInput = z.infer<typeof updateByUserIdInput>;

export const updateByUserIdOutput = userOutput;
export type UpdateByUserIdOutput = z.infer<typeof updateByUserIdOutput>;
