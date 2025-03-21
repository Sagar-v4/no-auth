import { z } from "zod";
import { userInput } from ".";

export const deleteByUserDataInput = z.object({
  filter: z.array(userInput),
});
export type DeleteByUserDataInput = z.infer<typeof deleteByUserDataInput>;

export const deleteByUserDataOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByUserDataOutput = z.infer<typeof deleteByUserDataOutput>;
