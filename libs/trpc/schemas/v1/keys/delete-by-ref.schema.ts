import { z } from "zod";
import { userInput } from "../users";
import { organizationInput } from "../organizations";
import { keyInput } from ".";

export const deleteByKeyRefInput = z.object({
  filter: z.object({
    user: userInput,
    organization: organizationInput,
    key: keyInput,
  }),
});
export type DeleteByKeyRefInput = z.infer<typeof deleteByKeyRefInput>;

export const deleteByKeyRefOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByKeyRefOutput = z.infer<typeof deleteByKeyRefOutput>;
