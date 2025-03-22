import { z } from "zod";
import { userIdInput, userOutput } from ".";

export const findByUserIdInput = z.object({
  filter: userIdInput,
});
export type FindByUserIdInput = z.infer<typeof findByUserIdInput>;

export const findByUserIdOutput = userOutput.or(z.undefined());
export type FindByUserIdOutput = z.infer<typeof findByUserIdOutput>;
